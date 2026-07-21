"use client";

import { useState } from "react";
import Image from "next/image";
import heroFlowers from "@/assets/hero-flowers.png";
import { LazyVideo } from "@/components/lazy-video";

const VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260315_073750_51473149-4350-4920-ae24-c8214286f323.mp4";

type Card = {
  area: "a" | "b" | "c";
  caption: string;
  kind: "gradient" | "video" | "image";
  eyebrow?: string;
};

const TABS = {
  Projects: [
    {
      area: "a",
      kind: "gradient",
      eyebrow: "Capstone",
      caption:
        "Techies Community ships a multilingual learning platform with NVIDIA ACE at Computex",
    },
    {
      area: "b",
      kind: "video",
      caption:
        "Inside the twelve-week build sprint that took forty engineers from zero to production",
    },
    {
      area: "c",
      kind: "image",
      caption:
        "Techies Impact announces $1B in-kind donation and releases original docuseries",
    },
  ],
  Mentorship: [
    {
      area: "a",
      kind: "gradient",
      eyebrow: "Office hours",
      caption:
        "Weekly small-group sessions with staff engineers from the teams that are hiring",
    },
    {
      area: "b",
      kind: "video",
      caption:
        "How pair-review turned a cohort of self-taught developers into shipping teammates",
    },
    {
      area: "c",
      kind: "image",
      caption:
        "Mentor network passes 500 volunteers across 40 countries and 12 time zones",
    },
  ],
} satisfies Record<string, Card[]>;

type TabName = keyof typeof TABS;
const TAB_NAMES = Object.keys(TABS) as TabName[];

export function Showcase() {
  const [tab, setTab] = useState<TabName>("Projects");

  return (
    <section className="showcase">
      <h2 className="showcase-title">
        Showcasing the global
        <br />
        impact of our community
      </h2>

      {/* Tab pill */}
      <div className="showcase-tabs" role="tablist" aria-label="Showcase">
        {TAB_NAMES.map((name) => (
          <button
            key={name}
            type="button"
            role="tab"
            aria-selected={tab === name}
            data-active={tab === name}
            onClick={() => setTab(name)}
            className="showcase-tab"
          >
            {name}
          </button>
        ))}
      </div>

      <div className="showcase-grid">
        {TABS[tab].map((card) => (
          <article
            key={card.area}
            className="showcase-card"
            style={{ gridArea: card.area }}
          >
            {card.kind === "gradient" && (
              <span aria-hidden className="showcase-mesh" />
            )}

            {card.kind === "video" && <LazyVideo src={VIDEO} />}

            {card.kind === "image" && (
              <Image
                src={heroFlowers}
                alt=""
                fill
                sizes="(max-width: 900px) 90vw, 33vw"
                placeholder="blur"
              />
            )}

            <span aria-hidden className="showcase-scrim" />

            <div className="showcase-copy">
              {"eyebrow" in card && card.eyebrow && (
                <span className="showcase-eyebrow">{card.eyebrow}</span>
              )}
              <p>{card.caption}</p>
            </div>
          </article>
        ))}

        {/* Empty tiles — the negative space that gives the grid its rhythm */}
        <span aria-hidden className="showcase-tile" style={{ gridArea: "d" }} />
        <span aria-hidden className="showcase-tile" style={{ gridArea: "e" }} />
      </div>
    </section>
  );
}
