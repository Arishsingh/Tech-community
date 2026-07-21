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

    // safari handles hls natively
    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
      return;
    }

    let destroy: (() => void) | undefined;
    let cancelled = false;

    import("hls.js").then(({ default: Hls }) => {
      if (cancelled || !Hls.isSupported()) return;
      // workers are flaky in sandboxed frames
      const hls = new Hls({ enableWorker: false });
      hls.loadSource(src);
      hls.attachMedia(video);
      destroy = () => hls.destroy();
    });

    return () => {
      cancelled = true;
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
      preload="auto"
    />
  );
}
