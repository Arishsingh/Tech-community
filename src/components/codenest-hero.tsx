"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";

const LINKS = ["PROJECTS", "BLOG", "ABOUT", "RESUME"];

/* Deterministic pseudo-random: the same input always yields the same output,
   so server and client render identical bars. Math.random() here would produce
   different values on each side and trip a hydration mismatch. */
function rand(seed: number) {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

const BAR_COUNT = 96;

/* Bars cluster toward center-right via a gaussian falloff around t = 0.62.
   Height and opacity both scale with the cluster so the edges thin out into
   the vignette rather than stopping abruptly. */
const BARS = Array.from({ length: BAR_COUNT }, (_, i) => {
  const t = i / (BAR_COUNT - 1);
  const cluster = Math.exp(-((t - 0.62) ** 2) / (2 * 0.19 ** 2));
  const jitter = rand(i);
  const spike = rand(i * 3.7) > 0.88 ? 1.35 : 1;

  return {
    left: t * 100,
    height: Math.min(96, (10 + jitter * 74) * cluster * spike),
    opacity: 0.12 + cluster * (0.35 + jitter * 0.55),
    width: jitter > 0.8 ? 3 : jitter > 0.5 ? 2 : 1,
    offset: (rand(i * 5.3) - 0.5) * 14,
  };
});

export function CodeNestHero() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <section className="relative h-screen min-h-[640px] w-full overflow-hidden bg-[#050706]">
      {/* ---- Background: audio-spectrum bars ---- */}
      <div aria-hidden className="absolute inset-0">
        {BARS.map((bar, i) => (
          <span
            key={i}
            className="absolute w-px rounded-full"
            style={{
              left: `${bar.left}%`,
              width: `${bar.width}px`,
              height: `${bar.height}%`,
              opacity: bar.opacity,
              top: `${50 - bar.height / 2 + bar.offset}%`,
              background:
                "linear-gradient(180deg, #7affc4 0%, #2fd07f 45%, #1a3d2e 100%)",
            }}
          />
        ))}

        {/* Center light beam */}
        <span
          className="absolute inset-y-0 left-1/2 w-[2px] -translate-x-1/2"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, #7affc4 35%, #eafff5 50%, #7affc4 65%, transparent 100%)",
            boxShadow: "0 0 24px 6px rgba(122, 255, 196, 0.35)",
            opacity: 0.75,
          }}
        />
      </div>

      {/* ---- Vignette: edges fade to black so text stays readable ---- */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 75% 65% at 58% 50%, transparent 0%, rgba(5,7,6,0.55) 55%, #050706 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-[#050706] via-[#050706]/45 via-35% to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-[#050706] via-[#050706]/30 via-30% to-transparent"
      />

      {/* ---- Film grain ---- */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 size-full opacity-[0.08]"
      >
        <filter id="cn-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#cn-grain)" />
      </svg>

      {/* ---- Nav ---- */}
      <header className="absolute inset-x-0 top-0 z-30">
        <nav className="flex items-center justify-between px-6 py-7 lg:px-10">
          <a
            href="#"
            className="font-poster text-xl tracking-[0.08em] text-white"
            style={{ textShadow: "0 0 18px rgba(122,255,196,0.25)" }}
          >
            CODENEST
          </a>

          <ul className="hidden items-center gap-11 md:flex">
            {LINKS.map((link) => (
              <li key={link}>
                <a
                  href="#"
                  className="text-[13px] tracking-[0.16em] text-white/85 transition-colors duration-150 hover:text-[#2fd07f]"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#"
            className="hidden text-[13px] tracking-[0.16em] text-white transition-colors duration-150 hover:text-[#2fd07f] md:block"
            style={{ textShadow: "0 0 14px rgba(122,255,196,0.45)" }}
          >
            [ REGISTER NOW ]
          </a>

          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
            className="text-white transition-transform duration-150 active:scale-95 md:hidden"
          >
            <Menu className="size-6" />
          </button>
        </nav>
      </header>

      {/* Mobile menu — kept mounted so it can animate out */}
      <div
        inert={!open}
        aria-hidden={!open}
        data-open={open}
        className="invisible fixed inset-0 z-50 bg-[#050706] opacity-0 transition-[opacity,visibility] duration-200 data-[open=true]:visible data-[open=true]:opacity-100 md:hidden"
      >
        <div className="flex items-center justify-between px-6 py-7">
          <span className="font-poster text-xl tracking-[0.08em] text-white">
            CODENEST
          </span>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="text-white transition-transform duration-150 active:scale-95"
          >
            <X className="size-6" />
          </button>
        </div>

        <ul className="mt-10 flex flex-col gap-8 px-6">
          {[...LINKS, "[ REGISTER NOW ]"].map((link) => (
            <li key={link}>
              <a
                href="#"
                onClick={() => setOpen(false)}
                className="font-poster text-3xl tracking-[0.06em] text-white transition-colors hover:text-[#2fd07f]"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* ---- Content ---- */}
      <div className="relative z-10 flex h-full flex-col px-6 pb-14 pt-28 lg:px-10 lg:pb-20 lg:pt-40">
        {/* Floating glass card */}
        <div className="w-[min(300px,100%)] rounded-[20px] border border-white/12 bg-white/[0.04] p-5 backdrop-blur-md sm:w-[300px]">
          <span className="font-playfair text-[13px] tracking-wide text-white/55">
            [ 2025 ]
          </span>

          <h2 className="mt-4 text-[20px] font-semibold leading-[1.3] text-white">
            Taught by{" "}
            <em className="font-playfair text-[22px] font-normal italic">
              Industry
            </em>{" "}
            Professionals
          </h2>

          <p className="mt-3 text-[12px] leading-[1.65] text-white/55">
            Get mentorship and instruction from top tech software engineers.
          </p>

          <div className="mt-5 flex justify-end">
            <button
              type="button"
              aria-label="Learn more"
              className="flex size-9 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white/80 transition-transform duration-150 hover:scale-105 active:scale-95"
            >
              <ArrowRight className="size-4" strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Hero text */}
        <div className="mt-auto">
          <p className="font-display text-[11px] font-bold uppercase tracking-[0.22em] text-[#2fd07f]">
            Career-Ready Curriculum
          </p>

          <h1 className="mt-5 font-poster text-[clamp(2.5rem,9.5vw,7rem)] uppercase leading-[0.9] tracking-[-0.01em] text-white">
            Launch your <br className="hidden sm:block" />
            coding career
            <span className="text-[#2fd07f]">.</span>
          </h1>

          <p className="mt-6 max-w-[520px] text-[15px] leading-[1.7] text-white/60">
            Master in-demand coding skills with hands-on projects, guided
            lessons, and real-world mentorship. Whether you&rsquo;re a beginner
            or looking to upskill, CodeNest helps you go from zero to
            hire-ready.
          </p>
        </div>
      </div>
    </section>
  );
}
