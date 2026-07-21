"use client";

import { useEffect, useRef } from "react";

export function HlsVideo({
  src,
  className,
}: {
  src: string;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let destroy: (() => void) | undefined;
    let cancelled = false;

    const start = () => {
      // safari handles hls natively
      if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = src;
        video.play().catch(() => {});
        return;
      }

      import("hls.js").then(({ default: Hls }) => {
        if (cancelled || !Hls.isSupported()) return;
        // workers are flaky in sandboxed frames
        const hls = new Hls({ enableWorker: false });
        hls.loadSource(src);
        hls.attachMedia(video);
        destroy = () => hls.destroy();
      });
    };

    // hold the hls.js chunk + first segments until the browser is done with
    // the initial paint
    const ric = window.requestIdleCallback;
    let handle: number;

    if (typeof ric === "function") {
      handle = ric(start, { timeout: 1500 });
    } else {
      handle = window.setTimeout(start, 250);
    }

    return () => {
      cancelled = true;
      if (typeof ric === "function") {
        window.cancelIdleCallback(handle);
      } else {
        clearTimeout(handle);
      }
      destroy?.();
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      className={className}
      autoPlay
      muted
      loop
      playsInline
      preload="none"
    />
  );
}
