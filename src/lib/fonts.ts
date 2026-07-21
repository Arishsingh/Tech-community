import {
  Anton,
  Inter,
  Instrument_Serif,
  Playfair_Display,
  Plus_Jakarta_Sans,
  Poppins,
  Source_Serif_4,
} from "next/font/google";

/** Poster headline — heavy condensed grotesque. */
export const fontPoster = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

/** Italic serif accent inside the glass card heading. */
export const fontPlayfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["italic", "normal"],
  display: "swap",
});

/* ---- CodeNest ---- */

/** Body + headline. */
export const fontSans = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

/** Eyebrow / label text. */
export const fontJakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

/** Italic accent inside the glass card headline. */
export const fontInstrument = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

/* ---- Bloom ---- */

export const fontPoppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const fontSourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

export const fontVariables = [
  fontSans.variable,
  fontJakarta.variable,
  fontInstrument.variable,
  fontPoster.variable,
  fontPlayfair.variable,
  fontPoppins.variable,
  fontSourceSerif.variable,
].join(" ");
