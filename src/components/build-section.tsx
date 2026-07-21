"use client";

import { useEffect, useRef } from "react";
import Image, { type StaticImageData } from "next/image";
import { ArrowRight } from "lucide-react";

import autonomy from "@/assets/build/autonomy.png";
import matrix from "@/assets/build/matrix.png";
import architecture from "@/assets/build/architecture.png";
import opensource from "@/assets/build/opensource.png";
import agency from "@/assets/build/agency.png";

const CARDS = [
  {
    title: "Autonomy Protocol",
    body: "Distributed guild nodes run themselves. Members self-organise into pods, ship on their own cadence, and answer to the work rather than a syllabus.",
    meta: "Latency <12ms · System OK",
    img: autonomy as StaticImageData,
  },
  {
    title: "Live Build Matrix",
    body: "Global hackathons and sprints running continuously across time zones, with 42 swarms deployed at any given moment.",
    meta: "42 swarms active",
    img: matrix as StaticImageData,
  },
  {
    title: "Zero-to-One Architecture",
    body: "Every member receives access to high-concurrency cloud clusters, mentor code reviews, and direct investor channels.",
    meta: "v2.6.0",
    img: architecture as StaticImageData,
  },
  {
    title: "100% Open Source",
    body: "A shared knowledge base where every architecture decision, post-mortem and template stays public by default.",
    meta: "Shared knowledge base",
    img: opensource as StaticImageData,
  },
  {
    title: "High-Agency Only",
    body: "No gatekeepers, no passive seats. You arrive with something to build and leave having shipped it with people who pushed you.",
    meta: "Read the manifesto",
    img: agency as StaticImageData,
  },
];

/* Fraction of the remaining distance covered per frame — turns the
   scrollbar's jittery deltas into continuous motion. */
const EASE = 0.12;

export function BuildSection() {
  const outer = useRef<HTMLElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const o = outer.current;
    const v = viewport.current;
    const t = track.current;
    if (!o || !v || !t) return;

    // Opt out of scroll-jacking for reduced-motion users and on phones,
    // where a native swipeable rail is both faster and more expected.
    const optOut = window.matchMedia(
      "(prefers-reduced-motion: reduce), (max-width: 640px)",
    );
    if (optOut.matches) {
      o.dataset.reduced = "true";
      o.style.height = "auto";
      return;
    }

    let raf = 0;
    let current = 0;
    let target = 0;
    let max = 0;

    const measure = () => {
      // Overflow is measured against the rail's own viewport, not the window,
      // because the rail only occupies the column beside the intro.
      max = Math.max(0, t.scrollWidth - v.clientWidth);
      o.style.height = `${window.innerHeight + max}px`;
    };

    const compute = () => {
      const total = o.offsetHeight - window.innerHeight;
      target =
        total > 0
          ? Math.min(1, Math.max(0, -o.getBoundingClientRect().top / total)) *
            max
          : 0;
    };

    const tick = () => {
      current += (target - current) * EASE;
      if (Math.abs(target - current) < 0.08) current = target;
      t.style.transform = `translate3d(${-current}px, 0, 0)`;
      raf = requestAnimationFrame(tick);
    };

    measure();
    compute();
    raf = requestAnimationFrame(tick);

    const onScroll = () => compute();
    const onResize = () => {
      measure();
      compute();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section className="build" ref={outer}>
      {/* Everything stays pinned for one viewport while the rail pans */}
      <div className="build-pin">
        <div className="build-head">
          <Mark />
          <h2 className="build-title">
            Where dreamers, builders &amp; innovators
            <br />
            shape what&rsquo;s next
            <span style={{ color: "#5ed29c" }}>.</span>
          </h2>
        </div>

        <hr className="build-rule" />

        <div className="build-cols">
          <div className="build-intro">
            <span className="build-pill">About Techies</span>
            <p>
              We are not a traditional student club or a passive study group.
              Techies Community is an autonomous engineering ecosystem built for
              creators who choose to forge their own paths. Here, we design,
              code, and scale breakthrough zero-to-one technologies across
              global domains.
            </p>
          </div>

          <div className="build-viewport" ref={viewport}>
            <div className="build-rail-track" ref={track}>
              {CARDS.map((card) => (
                <article key={card.title} className="build-card">
                  <span aria-hidden className="build-thumb">
                    <Image src={card.img} alt="" fill sizes="360px" />
                  </span>
                  <h3>{card.title}</h3>
                  <p>{card.body}</p>
                  <span className="build-meta">{card.meta}</span>
                  <a href="#" className="build-more">
                    Learn More
                    <ArrowRight size={15} />
                  </a>
                </article>
              ))}

              <article className="build-card build-card--plain">
                <h3>
                  Learn more about
                  <br />
                  Techies Community
                </h3>
                <a href="#" className="build-more">
                  Explore
                  <ArrowRight size={15} />
                </a>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Rotated cross-bar mark, echoing the reference's lockup */
function Mark() {
  return (
    <svg
      className="build-mark"
      viewBox="0 0 120 120"
      fill="currentColor"
      aria-hidden
    >
      <path d="M52 0 H68 V44 H120 V60 H68 V120 H52 V60 H0 V44 H52 Z" />
    </svg>
  );
}
