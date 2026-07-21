import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

// Point Chakra's font tokens at the same next/font CSS variables Tailwind uses,
// so shadcn and Chakra components render with one type system.
const config = defineConfig({
  theme: {
    tokens: {
      fonts: {
        body: { value: "var(--font-inter), sans-serif" },
        heading: { value: "var(--font-instrument-serif), serif" },
        mono: { value: "var(--font-jetbrains-mono), monospace" },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
