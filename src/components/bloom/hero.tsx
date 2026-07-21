import { LeftPanel } from "@/components/bloom/left-panel";
import { RightPanel } from "@/components/bloom/right-panel";

const VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260315_073750_51473149-4350-4920-ae24-c8214286f323.mp4";

export function BloomHero() {
  return (
    <section className="font-poppins relative min-h-screen w-full overflow-hidden bg-black">
      {/* Footage is desaturated so no colour survives into the palette, then
          darkened toward black so the glass panels read as light on dark. */}
      <video
        className="absolute inset-0 z-0 size-full object-cover grayscale brightness-[0.45] contrast-[1.1]"
        src={VIDEO}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      />

      {/* Black wash — holds the scene down even on bright frames. */}
      <div className="absolute inset-0 z-0 bg-black/55" />

      <div className="relative z-10 flex min-h-screen w-full">
        <LeftPanel />
        <RightPanel />
      </div>
    </section>
  );
}
