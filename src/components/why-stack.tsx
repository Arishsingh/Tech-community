import type { CSSProperties } from "react";
import { LazyVideo } from "@/components/lazy-video";

// palette climbs from near-black toward the accent, one hue per panel
const PANELS = [
  {
    id: "panel-01",
    index: "01",
    label: "Foundation",
    title: "Fast. Powerful. Secure.",
    body: "The groundbreaking Techies Community platform powers a network of fast, efficient, highly-optimized learning paths that get you shipping almost instantly. Accompanied by a best-in-class developer experience and suite of tools, we're the platform of choice for builders ready for what's next.",
    from: "#0a0d0c",
    to: "#0f1614",
    fg: "#ffffff",
    accent: "#7fe3c0",
    Icon: Chevrons,
  },
  {
    id: "panel-02",
    index: "02",
    label: "Scale",
    title: "Infinitely Scalable by Design",
    body: "Techies Community is where big ideas scale with confidence. Whether it's a single project, or launching a fully-customizable curriculum track, we make it easy to scale up — or across — in an interconnected ecosystem.",
    from: "#0b1f1a",
    to: "#102b23",
    fg: "#ffffff",
    accent: "#4fd6b0",
    Icon: Hexagons,
  },
  {
    id: "panel-03",
    index: "03",
    label: "Flexibility",
    title: "Customizable Tracks",
    body: "Whatever your goal, Techies Community makes launching your own track more accessible, simpler to customize, smoother to maintain and quicker to bring to market. The programme is anchored by a lightning-fast core curriculum and a universe of specialist paths, all natively connected through shared mentorship.",
    from: "#113224",
    to: "#163a2c",
    fg: "#ffffff",
    accent: "#5ed29c",
    Icon: Petal,
  },
  {
    id: "panel-04",
    index: "04",
    label: "People",
    title: "Global Community",
    body: "Techies Community is more than just a learning platform. It's a global community of builders, creators, and collaborators, all on a mission to drive the adoption of modern engineering practice. No gatekeepers — just an open ecosystem where knowledge is shared and ideas turn into real-world impact.",
    from: "#0e3a2f",
    to: "#0a2b23",
    fg: "#ffffff",
    accent: "#8ff0cd",
    Icon: HalfMoon,
  },
];

const PAGE_BG = "#000000";

// plain mp4 here - four hls.js instances would each own an MSE buffer
const PANEL_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260315_073750_51473149-4350-4920-ae24-c8214286f323.mp4";

export function WhyStack() {
  return (
    <section
      style={{
        background: PAGE_BG,
        paddingTop: "clamp(72px, 12vh, 160px)",
        paddingLeft: "clamp(16px, 4vw, 56px)",
        paddingRight: "clamp(16px, 4vw, 56px)",
      }}
    >
      <header
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          paddingBottom: "clamp(32px, 5vh, 72px)",
        }}
      >
        <span
          style={{
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#5ed29c",
          }}
        >
          Four reasons
        </span>

        <h2
          style={{
            margin: "18px 0 0",
            color: "#ffffff",
            fontWeight: 800,
            textAlign: "right",
            textTransform: "uppercase",
            fontSize: "clamp(1.6rem, 3.6vw, 2.75rem)",
            lineHeight: 1,
            letterSpacing: "-0.035em",
          }}
        >
          Why
          <br />
          Techies Community
          <span style={{ color: "#5ed29c" }}>.</span>
        </h2>
      </header>

      {PANELS.map((panel, i) => (
        <Panel key={panel.id} panel={panel} index={i} />
      ))}

      <div style={{ height: "40vh" }} />
    </section>
  );
}

function Panel({
  panel,
  index: order,
}: {
  panel: (typeof PANELS)[number];
  index: number;
}) {
  const { id, index, label, title, body, from, to, fg, accent, Icon } = panel;

  return (
    <article
      id={id}
      className="why-panel"
      style={
        {
          "--panel-i": order,
          "--accent": accent,
          position: "sticky",
          top: "var(--stack-top, 0px)",
          background: `linear-gradient(155deg, ${from} 0%, ${to} 100%)`,
          color: fg,
          borderRadius: "26px 26px 0 0",
          minHeight: "88vh",
          overflow: "hidden",
        } as CSSProperties
      }
    >
      {/* light source, top right */}
      <span
        aria-hidden
        className="why-bloom"
        style={{
          background: `radial-gradient(60% 70% at 78% 0%, ${accent}22 0%, transparent 70%)`,
        }}
      />

      {/* corner cut */}
      <span
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "76px",
          height: "76px",
          background: PAGE_BG,
          clipPath: "polygon(100% 0, 0 0, 100% 100%)",
          zIndex: 3,
        }}
      />

      <div className="why-grid">
        <div className="why-left">
          {/* one row, so both survive in the collapsed tab strip */}
          <a href={`#${id}`} className="why-head">
            <span className="why-head-main">
              <span className="why-index" style={{ color: accent }}>
                {index}
              </span>
              <h3
                style={{
                  margin: 0,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  fontSize: "clamp(1.25rem, 2.9vw, 2.15rem)",
                  lineHeight: 1.03,
                  letterSpacing: "-0.035em",
                }}
              >
                {title}
              </h3>
            </span>

            <span className="why-label">{label}</span>
          </a>

          <p className="why-body">{body}</p>

          <div className="why-video">
            <LazyVideo src={PANEL_VIDEO} />
            <span aria-hidden className="why-video-tint" />
          </div>
        </div>

        <div className="why-mark">
          <Icon color={accent} />
        </div>
      </div>
    </article>
  );
}

function Chevrons({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 120 100" width="100%" height="100%" fill={color}>
      <path d="M4 4 L44 50 L4 96 L34 96 L74 50 L34 4 Z" />
      <path d="M50 4 L90 50 L50 96 L80 96 L120 50 L80 4 Z" />
    </svg>
  );
}

function Hexagons({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 120 100" width="100%" height="100%" fill={color}>
      <path d="M22 4 H98 L120 26 Q60 62 0 26 Z" />
      <path d="M0 74 Q60 38 120 74 L98 96 H22 Z" />
    </svg>
  );
}

function Petal({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" fill={color}>
      <path d="M46 0 H0 V46 Q46 46 46 0 Z" />
      <path d="M54 0 Q54 46 100 46 V0 Z" />
      <path d="M0 54 V100 H46 Q46 54 0 54 Z" />
      <path d="M100 54 Q54 54 54 100 H100 Z" />
    </svg>
  );
}

function HalfMoon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 110 100" width="100%" height="100%" fill={color}>
      <path d="M52 0 A50 50 0 0 0 52 100 Z" />
      <path d="M60 0 H70 A40 50 0 0 1 70 100 H60 Z" />
    </svg>
  );
}
