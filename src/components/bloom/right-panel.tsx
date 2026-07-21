import Image from "next/image";
import {
  ArrowRight,
  Bird,
  BookOpen,
  Briefcase,
  Camera,
  Sparkles,
  Wand2,
} from "lucide-react";
import heroFlowers from "@/assets/hero-flowers.png";

/* lucide-react v1 removed brand glyphs (Twitter/Linkedin/Instagram), so these
   are semantic stand-ins. Swap in real brand SVGs when you have them —
   the aria-labels are already correct. */
const SOCIALS = [
  { Icon: Bird, label: "Twitter" },
  { Icon: Briefcase, label: "LinkedIn" },
  { Icon: Camera, label: "Instagram" },
];

const FEATURES = [
  {
    Icon: Wand2,
    title: "Processing",
    body: "High-end processing functions that bring floral beauty to form",
  },
  {
    Icon: BookOpen,
    title: "Growth Archive",
    body: "Set-up templates and choices for different plant varieties",
  },
];

export function RightPanel() {
  return (
    <div className="relative z-10 hidden w-[48%] flex-col px-10 py-12 lg:flex">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <div className="liquid-glass flex items-center gap-4 rounded-full px-5 py-2.5">
          {SOCIALS.map(({ Icon, label }) => (
            <a
              key={label}
              href="#"
              aria-label={label}
              className="text-white transition-colors hover:text-white/80"
            >
              <Icon className="size-4" />
            </a>
          ))}
          <ArrowRight className="size-4 text-white/60" />
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Assist"
            className="liquid-glass flex size-10 items-center justify-center rounded-full text-white transition-transform hover:scale-105"
          >
            <Sparkles className="size-4" />
          </button>
          <button
            type="button"
            className="liquid-glass rounded-full px-5 py-2.5 text-sm text-white transition-transform hover:scale-105"
          >
            Account
          </button>
        </div>
      </div>

      {/* Community card */}
      <div className="liquid-glass mt-8 w-56 rounded-3xl p-5">
        <h3 className="text-sm text-white">Enter our ecosystem</h3>
        <p className="mt-3 text-xs leading-relaxed text-white/60">
          Connect with creators and keep active with Bloom&apos;s modern
          AI-powered systems.
        </p>
      </div>

      {/* Feature section */}
      <div className="liquid-glass mt-auto rounded-[2.5rem] p-4">
        <div className="flex gap-4">
          {FEATURES.map(({ Icon, title, body }) => (
            <div key={title} className="liquid-glass flex-1 rounded-3xl p-5">
              <div className="flex items-center gap-3">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white/10">
                  <Icon className="size-4 text-white" />
                </span>
                <h3 className="text-sm text-white">{title}</h3>
              </div>
              <p className="mt-4 text-xs leading-relaxed text-white/60">
                {body}
              </p>
            </div>
          ))}
        </div>

        <div className="liquid-glass mt-4 flex items-center gap-4 rounded-3xl p-4">
          <Image
            src={heroFlowers}
            alt=""
            width={96}
            height={64}
            className="h-16 w-24 shrink-0 rounded-2xl object-cover"
          />

          <div className="min-w-0 flex-1">
            <h3 className="text-sm text-white">Advanced Plant Sculpting</h3>
            <p className="mt-1.5 text-xs leading-relaxed text-white/60">
              Modern 3D crafting assets that permit you to build very complex
              and lifelike forms
            </p>
          </div>

          <button
            type="button"
            aria-label="Add"
            className="liquid-glass flex size-8 shrink-0 items-center justify-center rounded-full text-lg text-white transition-transform hover:scale-105"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
