"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";

const ITEMS = [
  {
    q: "Who is Techies Community for?",
    a: "Builders who already start things. Students, self-taught engineers, and early-career developers who want to ship real software with people who will push them. You do not need a degree or a referral — you need something you are working on.",
  },
  {
    q: "How much does membership cost?",
    a: "Core membership is free and always will be. Guild infrastructure, mentor hours, and demo day are funded by our partner network, not by members. Optional paid intensives exist, but nothing behind the main door is gated.",
  },
  {
    q: "What is a guild, exactly?",
    a: "A self-directed pod of five to nine people who own a domain end to end. Guilds set their own cadence, run their own reviews, and answer to the work rather than a syllabus. You join one in your first fortnight.",
  },
  {
    q: "How much time does it take each week?",
    a: "Most members spend six to ten hours a week — one sprint session, one architecture review, and their own build time. Sprints run in two-week cycles, and you can pause between cycles without losing your place.",
  },
  {
    q: "Do I need to be an advanced developer?",
    a: "No, but you do need fundamentals: you should be able to build and deploy something small on your own. Everything above that line we teach through pair-review rather than lectures.",
  },
  {
    q: "What is a TechPass?",
    a: "Your portable credential in the network — identity, expertise matrix, and verified builder status in one card. It is generated entirely in your browser; nothing is uploaded to a server.",
  },
  {
    q: "Is the work really open source?",
    a: "Public by default. Architecture decisions, post-mortems, and templates all live in the shared knowledge base. Members can keep commercial projects private, but the learning artefacts stay open.",
  },
  {
    q: "How do I get an invitation?",
    a: "Claim a TechPass, then bring a project to the next open sprint. There is no application queue and no gatekeeping committee — you are evaluated on what you build once you are inside.",
  },
];

export function Faq() {
  const uid = useId();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="faq">
      <div className="faq-cols">
        <div className="faq-aside">
          <span className="faq-pill">FAQ</span>
          <h2>
            Frequently asked
            <br />
            questions<span style={{ color: "#5ed29c" }}>.</span>
          </h2>
          <p>
            Still stuck? Ask in the open — every question gets answered in the
            public channel, so the next person finds it too.
          </p>
          <a href="#" className="faq-link">
            Talk to the community →
          </a>
        </div>

        <ul className="faq-list">
          {ITEMS.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={item.q} className="faq-item" data-open={isOpen}>
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`${uid}-panel-${i}`}
                    id={`${uid}-trigger-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span>{item.q}</span>
                    <Plus size={17} aria-hidden />
                  </button>
                </h3>

                {/* 0fr -> 1fr animates height; visibility keeps it out of
                    the a11y tree without killing the transition */}
                <div
                  className="faq-panel"
                  id={`${uid}-panel-${i}`}
                  role="region"
                  aria-labelledby={`${uid}-trigger-${i}`}
                >
                  <div>
                    <p>{item.a}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
