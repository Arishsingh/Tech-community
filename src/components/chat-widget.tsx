"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp, MessageSquare, X } from "lucide-react";

type Msg = { role: "user" | "assistant"; content: string };

const OPENERS = [
  "How do I join?",
  "What is a guild?",
  "Does it cost anything?",
];

const GREETING: Msg = {
  role: "assistant",
  content:
    "Ask me anything about Techies Community - how guilds work, what a TechPass is, or how to get in.",
};

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([GREETING]);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    inputRef.current?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [msgs, busy]);

  async function send(text: string) {
    const question = text.trim();
    if (!question || busy) return;

    const next = [...msgs, { role: "user" as const, content: question }];
    setMsgs(next);
    setDraft("");
    setBusy(true);
    setFailed(false);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        // greeting is local-only, so it never goes upstream
        body: JSON.stringify({ messages: next.slice(1) }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "failed");
      setMsgs([...next, { role: "assistant", content: data.reply }]);
    } catch {
      setFailed(true);
      setMsgs([
        ...next,
        {
          role: "assistant",
          content: "Something went wrong reaching the assistant. Try again?",
        },
      ]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <button
        type="button"
        className="cw-fab"
        aria-label={open ? "Close chat" : "Ask about the community"}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={20} /> : <MessageSquare size={19} />}
      </button>

      <div
        className="cw-panel"
        data-open={open}
        role="dialog"
        aria-label="Community assistant"
      >
        <header className="cw-head">
          <span className="cw-dot" aria-hidden />
          <div>
            <strong>Community assistant</strong>
            <span>Answers from the Techies docs</span>
          </div>
        </header>

        <div className="cw-log" ref={logRef}>
          {msgs.map((m, i) => (
            <p key={i} className="cw-msg" data-role={m.role}>
              {m.content}
            </p>
          ))}

          {busy && (
            <p
              className="cw-msg cw-typing"
              data-role="assistant"
              aria-live="polite"
            >
              <i />
              <i />
              <i />
            </p>
          )}

          {msgs.length === 1 && !busy && (
            <div className="cw-openers">
              {OPENERS.map((q) => (
                <button key={q} type="button" onClick={() => send(q)}>
                  {q}
                </button>
              ))}
            </div>
          )}
        </div>

        <form
          className="cw-input"
          onSubmit={(e) => {
            e.preventDefault();
            send(draft);
          }}
        >
          <input
            ref={inputRef}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Ask about guilds, sprints, TechPass..."
            aria-label="Your question"
            aria-invalid={failed}
          />
          <button
            type="submit"
            disabled={busy || !draft.trim()}
            aria-label="Send"
          >
            <ArrowUp size={16} />
          </button>
        </form>
      </div>
    </>
  );
}
