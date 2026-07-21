import { HlsVideo } from "@/components/hls-video";

const STREAM =
  "https://stream.mux.com/tLkHO1qZoaaQOUeVWo8hEBeGQfySP02EPS02BmnNFyXys.m3u8";

export function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#000000]">
      {/* Background video */}
      <HlsVideo
        src={STREAM}
        className="absolute inset-0 size-full object-contain object-center"
      />

      {/* Readability gradients. Both fall off early (35% / 30%) so the wash
          sits behind the text column and the rest of the frame stays clear. */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#000000] via-[#000000]/35 via-35% to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/85 via-[#000000]/15 via-30% to-transparent" />

      {/* Vertical grid lines */}
      <div className="pointer-events-none absolute inset-0 hidden md:block">
        {["25%", "50%", "75%"].map((left) => (
          <div
            key={left}
            style={{ left }}
            className="absolute inset-y-0 w-px bg-white/10"
          />
        ))}
      </div>

      {/* Content */}
      {/* Height, column flow and end-alignment are inline: the Tailwind
          equivalents (h-screen / flex-col / mt-auto) were being dropped, which
          collapsed the container and let the text overlap the nav. */}
      <div
        className="relative z-10"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          minHeight: "100vh",
          paddingTop: "40px",
          paddingBottom: "64px",
          /* Inline, not px-6/lg:px-10 — those were being dropped and the text
             sat flush against the viewport edge. */
          paddingLeft: "clamp(24px, 4vw, 56px)",
          paddingRight: "clamp(24px, 4vw, 56px)",
        }}
      >
        {/* justify-content: flex-end on the parent bottom-anchors this. */}
        <div>
          <p
            className="rise font-display font-bold uppercase text-[#5ed29c]"
            style={
              {
                "--rise-delay": "380ms",
                fontSize: "10px",
                letterSpacing: "0.15em",
              } as React.CSSProperties
            }
          >
            Career-Ready Curriculum
          </p>

          <h1
            className="rise font-extrabold uppercase text-white"
            style={
              {
                "--rise-delay": "440ms",
                /* Inline rather than arbitrary Tailwind classes: these are the
                   values a stale JIT scan silently dropped before. */
                marginTop: "26px",
                fontSize: "clamp(2.25rem, 7.5vw, 4.5rem)",
                /* Inline: the h1 base rule (font-weight 500) was beating the
                   font-extrabold utility. */
                fontWeight: 800,
                lineHeight: 1.08,
                letterSpacing: "-0.02em",
              } as React.CSSProperties
            }
          >
            Launch your <br className="hidden sm:block" />
            coding career
            <span className="text-[#5ed29c]">.</span>
          </h1>

          <p
            className="rise text-white/70"
            style={
              {
                "--rise-delay": "500ms",
                marginTop: "0px",
                /* ~640px fits the copy in two lines at 13px; 420px broke it
                   into three. */
                maxWidth: "640px",
                fontSize: "13px",
                lineHeight: 1.8,
              } as React.CSSProperties
            }
          >
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
