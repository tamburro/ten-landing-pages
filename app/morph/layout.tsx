import type { Metadata } from "next";
import { Syne, Space_Mono } from "next/font/google";

const syne = Syne({
  variable: "--font-morph-display",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const spaceMono = Space_Mono({
  variable: "--font-morph-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Morph — structure from noise",
  description:
    "30,000 GPU particles morphing between procedural forms as you scroll: noise, sphere, knot, galaxy.",
};

export default function MorphLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${syne.variable} ${spaceMono.variable}`}>{children}</div>
  );
}
