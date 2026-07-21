import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // avif first, webp fallback - the card art is flat gradient work and
    // compresses far better than the source png
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
  },
};

export default nextConfig;
