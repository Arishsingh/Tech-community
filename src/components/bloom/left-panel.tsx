import Image from "next/image";
import { Download, Menu } from "lucide-react";

const PILLS = ["Artistic Gallery", "AI Generation", "3D Structures"];

export function LeftPanel() {
  return (
    <div className="relative flex w-full flex-col lg:w-[52%]">
      {/* Panel surface */}
      <div className="liquid-glass-strong pointer-events-none absolute inset-4 rounded-3xl lg:inset-6" />

      <div className="relative z-10 flex flex-1 flex-col px-10 py-12 lg:px-14">
        {/* Nav */}
        <nav className="flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5">
            <Image src="/logo.png" alt="" width={32} height={32} priority />
            <span className="text-2xl font-semibold tracking-tighter text-white">
              bloom
            </span>
          </a>

          <button
            type="button"
            className="liquid-glass flex items-center gap-2 rounded-full px-4 py-2 text-sm text-white transition-transform hover:scale-105"
          >
            <Menu className="size-4" />
            Menu
          </button>
        </nav>

        {/* Hero */}
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <Image
            src="/logo.png"
            alt=""
            width={80}
            height={80}
            priority
            className="mb-8"
          />

          <h1 className="max-w-[12ch] text-6xl leading-[1.05] tracking-[-0.05em] text-white lg:text-7xl">
            Innovating the spirit of <em className="text-white/80">bloom AI</em>
          </h1>

          <button
            type="button"
            className="liquid-glass-strong mt-10 flex items-center gap-3 rounded-full py-2 pl-6 pr-2 text-sm text-white transition-transform hover:scale-105 active:scale-95"
          >
            Explore Now
            <span className="flex size-7 items-center justify-center rounded-full bg-white/15">
              <Download className="size-3.5" />
            </span>
          </button>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
            {PILLS.map((pill) => (
              <span
                key={pill}
                className="liquid-glass rounded-full px-4 py-2 text-xs text-white/80"
              >
                {pill}
              </span>
            ))}
          </div>
        </div>

        {/* Quote */}
        <div className="text-center">
          <p className="text-xs uppercase tracking-widest text-white/50">
            Visionary Design
          </p>

          <blockquote className="mx-auto mt-4 max-w-md text-2xl tracking-tight text-white">
            <span className="font-poppins">&quot;We imagined a </span>
            <span className="font-serif italic">realm</span>
            <span className="font-poppins"> with </span>
            <span className="font-serif italic">no ending</span>
            <span className="font-poppins">.&quot;</span>
          </blockquote>

          <div className="mt-5 flex flex-col items-center gap-3">
            <span className="h-px w-10 bg-white/25" />
            <span className="text-xs uppercase tracking-widest text-white/60">
              Marcus Aurelio
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
