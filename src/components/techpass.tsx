"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
/* lucide-react v1 dropped brand glyphs, so these are semantic stand-ins —
   the aria-labels remain accurate. */
import {
  Check,
  Download,
  Briefcase,
  Camera,
  Code2,
  Plus,
  Share2,
  Shield,
  Sparkles,
  Upload,
  X,
} from "lucide-react";

const QUICK_TAGS = [
  "AI",
  "Web",
  "UI/UX",
  "Startup",
  "Content",
  "Rust",
  "Cyber",
  "Cloud",
];

const STYLES = [
  { id: "silver", label: "Silver Glass" },
  { id: "pure", label: "Pure Glass" },
  { id: "frosted", label: "Dark Frosted" },
  { id: "platinum", label: "Platinum Ring" },
] as const;

type StyleId = (typeof STYLES)[number]["id"];

const MAX_TAGS = 6;

/* Deterministic so the server and client render the same pattern — this is a
   decorative matrix, not a scannable QR code. */
function matrixCells(seed: string) {
  const cells: boolean[] = [];
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  for (let i = 0; i < 144; i++) {
    h ^= h << 13;
    h ^= h >>> 17;
    h ^= h << 5;
    cells.push((h & 1) === 1);
  }
  return cells;
}

export function TechPass() {
  const uid = useId();
  const [name, setName] = useState("Alex Vance");
  const [role, setRole] = useState("AI & Systems Architect");
  const [org, setOrg] = useState("Stanford University");
  const [tags, setTags] = useState<string[]>([
    "AI",
    "Web Architecture",
    "UI/UX",
    "Startups",
  ]);
  const [draft, setDraft] = useState("");
  const [instagram, setInstagram] = useState("https://instagram.com");
  const [linkedin, setLinkedin] = useState("https://linkedin.com");
  const [github, setGithub] = useState("https://github.com");
  const [whatsapp, setWhatsapp] = useState("14155552671");
  const [email, setEmail] = useState("alex@vance.ai");
  const [style, setStyle] = useState<StyleId>("silver");
  const [avatar, setAvatar] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  // Blob URLs leak unless revoked when replaced or unmounted.
  useEffect(() => {
    return () => {
      if (avatar) URL.revokeObjectURL(avatar);
    };
  }, [avatar]);

  const passId = useMemo(() => {
    let h = 0;
    for (const c of name + org) h = (h * 31 + c.charCodeAt(0)) % 10000;
    return `TECH-${String(h).padStart(4, "0")}`;
  }, [name, org]);

  const cells = useMemo(
    () => matrixCells(`${name}|${org}|${whatsapp}`),
    [name, org, whatsapp],
  );

  const issued = useMemo(
    () =>
      new Date()
        .toLocaleDateString("en-US", { month: "short", year: "numeric" })
        .toUpperCase(),
    [],
  );

  function addTag(value: string) {
    const v = value.trim().replace(/^#/, "");
    if (!v || tags.length >= MAX_TAGS) return;
    if (tags.some((t) => t.toLowerCase() === v.toLowerCase())) return;
    setTags([...tags, v]);
    setDraft("");
  }

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (avatar) URL.revokeObjectURL(avatar);
    setAvatar(URL.createObjectURL(file));
  }

  async function share() {
    const text = `${name} — ${role} @ ${org} · ${passId}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section className="tp">
      <header className="tp-head">
        <span className="tp-pill">
          <Sparkles size={12} /> Your digital identity
        </span>
        <h2 className="tp-title">
          Forge Your <span>TechPass</span>
        </h2>
        <p className="tp-sub">
          Create your digital credential for our society of builders. All
          processing runs 100% locally in your browser — zero tracking, zero
          database.
        </p>
      </header>

      <div className="tp-cols">
        {/* ---- Form ---- */}
        <div className="tp-panel">
          <div className="tp-panel-head">
            <h3>
              <Sparkles size={15} /> Identity Configuration
            </h3>
            <span className="tp-chip">{passId}</span>
          </div>

          <label className="tp-label">Builder profile avatar</label>
          <div className="tp-avatar-row">
            <span className="tp-avatar">
              {avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={avatar} alt="" />
              ) : (
                (name.trim()[0] ?? "A").toUpperCase()
              )}
            </span>
            <button
              type="button"
              className="tp-btn"
              onClick={() => fileRef.current?.click()}
            >
              <Upload size={14} /> Upload photo
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              hidden
              onChange={onFile}
            />
          </div>

          <div className="tp-grid2">
            <Field
              id={`${uid}-name`}
              label="Full name"
              value={name}
              onChange={setName}
            />
            <Field
              id={`${uid}-role`}
              label="Designation / role"
              value={role}
              onChange={setRole}
            />
          </div>

          <Field
            id={`${uid}-org`}
            label="College / company / incubator"
            value={org}
            onChange={setOrg}
          />

          <label className="tp-label">Expertise tags (max {MAX_TAGS})</label>
          <div className="tp-tags">
            {tags.map((t) => (
              <span key={t} className="tp-tag">
                #{t}
                <button
                  type="button"
                  aria-label={`Remove ${t}`}
                  onClick={() => setTags(tags.filter((x) => x !== t))}
                >
                  <X size={11} />
                </button>
              </span>
            ))}
          </div>

          <div className="tp-quick">
            <span>Quick add:</span>
            {QUICK_TAGS.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => addTag(t)}
                disabled={tags.length >= MAX_TAGS}
              >
                +{t}
              </button>
            ))}
          </div>

          <form
            className="tp-add"
            onSubmit={(e) => {
              e.preventDefault();
              addTag(draft);
            }}
          >
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Add custom tag (e.g., Solidity, Next.js)"
              aria-label="Add custom tag"
            />
            <button type="submit" disabled={tags.length >= MAX_TAGS}>
              <Plus size={13} /> Add
            </button>
          </form>

          <div className="tp-grid2">
            <Field
              id={`${uid}-ig`}
              label="Instagram URL"
              value={instagram}
              onChange={setInstagram}
            />
            <Field
              id={`${uid}-li`}
              label="LinkedIn URL"
              value={linkedin}
              onChange={setLinkedin}
            />
            <Field
              id={`${uid}-gh`}
              label="GitHub URL"
              value={github}
              onChange={setGithub}
            />
            <Field
              id={`${uid}-wa`}
              label="WhatsApp number"
              value={whatsapp}
              onChange={setWhatsapp}
            />
          </div>

          <Field
            id={`${uid}-email`}
            label="Email address"
            value={email}
            onChange={setEmail}
            type="email"
          />

          <label className="tp-label">Select card accent style</label>
          <div className="tp-styles">
            {STYLES.map((s) => (
              <button
                key={s.id}
                type="button"
                data-active={style === s.id}
                onClick={() => setStyle(s.id)}
              >
                <span data-dot={s.id} /> {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* ---- Live preview ---- */}
        <div className="tp-preview">
          <span className="tp-preview-label">● Live card preview</span>

          <article className="tp-card" data-style={style}>
            <div className="tp-card-top">
              <span className="tp-brand">
                <Shield size={13} /> TECHIES
              </span>
              <span className="tp-verified">Verified builder</span>
            </div>

            <div className="tp-identity">
              <span className="tp-photo">
                {avatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={avatar} alt="" />
                ) : (
                  "NO PHOTO"
                )}
              </span>
              <div>
                <span className="tp-id">ID: {passId}</span>
                <strong>{name || "Your name"}</strong>
                <span className="tp-role">{role}</span>
                <span className="tp-org">@ {org}</span>
              </div>
            </div>

            <span className="tp-section">Expertise matrix</span>
            <div className="tp-card-tags">
              {tags.map((t) => (
                <span key={t}>#{t}</span>
              ))}
            </div>

            <span className="tp-section">Network link</span>
            <div className="tp-network">
              <div className="tp-socials">
                {github && (
                  <a href={github} aria-label="GitHub">
                    <Code2 size={13} />
                  </a>
                )}
                {linkedin && (
                  <a href={linkedin} aria-label="LinkedIn">
                    <Briefcase size={13} />
                  </a>
                )}
                {instagram && (
                  <a href={instagram} aria-label="Instagram">
                    <Camera size={13} />
                  </a>
                )}
                <span className="tp-issued">Issued: {issued}</span>
              </div>

              <span className="tp-matrix" aria-hidden>
                {cells.map((on, i) => (
                  <i key={i} data-on={on} />
                ))}
              </span>
            </div>

            <div className="tp-footer">
              <span>Techies network passport</span>
              <span>[secure id]</span>
            </div>
          </article>

          <div className="tp-actions">
            <button type="button" onClick={() => window.print()}>
              <Download size={15} />
              Print / PDF
            </button>
            <button type="button" onClick={share}>
              {copied ? <Check size={15} /> : <Share2 size={15} />}
              {copied ? "Copied" : "Share"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  type = "text",
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div className="tp-field">
      <label className="tp-label" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
