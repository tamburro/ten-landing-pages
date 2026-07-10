import type { Metadata } from "next";
import { Outfit, Instrument_Serif } from "next/font/google";

const outfit = Outfit({
  variable: "--font-bloom-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const instrument = Instrument_Serif({
  variable: "--font-bloom-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Bloom — barrier-first skincare",
  description:
    "An iridescent pastel color system: animated canvas mesh gradients, glassmorphism, and a bottle made of pure CSS.",
};

export default function BloomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${outfit.variable} ${instrument.variable}`}>{children}</div>
  );
}
