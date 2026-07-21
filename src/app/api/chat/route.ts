import { KNOWLEDGE } from "@/lib/knowledge";

const API = "https://generativelanguage.googleapis.com/v1beta/models";
const EMBED_MODEL = "gemini-embedding-001";
const CHAT_MODEL = process.env.GEMINI_MODEL ?? "gemini-2.5-flash";
const TOP_K = 4;

type Msg = { role: "user" | "assistant"; content: string };

// embeddings for the corpus are computed once per server process
let corpus: number[][] | null = null;
let building: Promise<number[][]> | null = null;

function cosine(a: number[], b: number[]) {
  let dot = 0;
  let ma = 0;
  let mb = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    ma += a[i] * a[i];
    mb += b[i] * b[i];
  }
  return dot / (Math.sqrt(ma) * Math.sqrt(mb) || 1);
}

async function embed(key: string, texts: string[], taskType: string) {
  const res = await fetch(
    `${API}/${EMBED_MODEL}:batchEmbedContents?key=${key}`,
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        requests: texts.map((text) => ({
          model: `models/${EMBED_MODEL}`,
          content: { parts: [{ text }] },
          taskType,
        })),
      }),
    },
  );

  if (!res.ok) throw new Error(`embed failed: ${res.status}`);
  const json = await res.json();
  return (json.embeddings ?? []).map(
    (e: { values: number[] }) => e.values,
  ) as number[][];
}

async function getCorpus(key: string) {
  if (corpus) return corpus;
  building ??= embed(
    key,
    KNOWLEDGE.map((d) => `${d.title}. ${d.text}`),
    "RETRIEVAL_DOCUMENT",
  ).then((v) => (corpus = v));
  return building;
}

// falls back to word overlap if the embedding call fails, so the bot still
// answers rather than dying on a network hiccup
function keywordRank(query: string) {
  const words = query.toLowerCase().match(/[a-z]{3,}/g) ?? [];
  return KNOWLEDGE.map((doc) => {
    const hay = `${doc.title} ${doc.text}`.toLowerCase();
    return { doc, score: words.filter((w) => hay.includes(w)).length };
  })
    .sort((a, b) => b.score - a.score)
    .slice(0, TOP_K)
    .map((r) => r.doc);
}

async function retrieve(key: string, query: string) {
  try {
    const [docs, [q]] = await Promise.all([
      getCorpus(key),
      embed(key, [query], "RETRIEVAL_QUERY"),
    ]);
    return KNOWLEDGE.map((doc, i) => ({ doc, score: cosine(q, docs[i]) }))
      .sort((a, b) => b.score - a.score)
      .slice(0, TOP_K)
      .map((r) => r.doc);
  } catch {
    return keywordRank(query);
  }
}

export async function POST(req: Request) {
  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    return Response.json(
      { error: "GEMINI_API_KEY is not set" },
      { status: 500 },
    );
  }

  let body: { messages?: Msg[] };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "invalid json" }, { status: 400 });
  }

  const messages = (body.messages ?? []).slice(-8);
  const question = messages.at(-1)?.content?.trim();
  if (!question) {
    return Response.json({ error: "no question" }, { status: 400 });
  }

  const docs = await retrieve(key, question);
  const context = docs.map((d) => `## ${d.title}\n${d.text}`).join("\n\n");

  const system = [
    "You are the assistant for Techies Community, an autonomous engineering collective.",
    "Answer only from the context below. If the context does not cover it, say you do not have that detail and point the user to the community hub.",
    "Be direct and concise - two or three sentences unless asked for more. No markdown headings, no bullet lists unless the user asks for a list.",
    "Write in second person. Never invent numbers, dates, prices or names.",
    "",
    "CONTEXT",
    context,
  ].join("\n");

  const res = await fetch(`${API}/${CHAT_MODEL}:generateContent?key=${key}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: system }] },
      contents: messages.map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      })),
      generationConfig: { temperature: 0.3, maxOutputTokens: 500 },
    }),
  });

  if (!res.ok) {
    const detail = await res.text();
    console.error("gemini error", res.status, detail.slice(0, 300));
    return Response.json({ error: "upstream error" }, { status: 502 });
  }

  const json = await res.json();
  const reply =
    json.candidates?.[0]?.content?.parts
      ?.map((p: { text?: string }) => p.text ?? "")
      .join("")
      .trim() ?? "";

  return Response.json({
    reply: reply || "I could not find that in the community docs.",
    sources: docs.map((d) => d.title),
  });
}
