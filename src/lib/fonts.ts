import { Inter, Instrument_Serif, Plus_Jakarta_Sans } from "next/font/google";

// body + headline
export const fontSans = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// eyebrows and small labels
export const fontJakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

// italic accent inside headings
export const fontInstrument = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

export const fontVariables = [
  fontSans.variable,
  fontJakarta.variable,
  fontInstrument.variable,
].join(" ");
