import type { Metadata } from "next";
import { Fraunces, Azeret_Mono } from "next/font/google";

const fraunces = Fraunces({
  variable: "--font-drift-display",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
});

const azeret = Azeret_Mono({
  variable: "--font-drift-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "DRIFT — the ocean is a vertical country",
  description:
    "A scroll-driven descent from the surface to the hadal zone. Color is depth, scroll is a dive profile.",
};

export default function DriftLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${fraunces.variable} ${azeret.variable}`}>{children}</div>
  );
}
