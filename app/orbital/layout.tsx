import type { Metadata } from "next";
import { Unbounded, Manrope } from "next/font/google";

const unbounded = Unbounded({
  variable: "--font-orbital-display",
  subsets: ["latin"],
  weight: ["300", "500", "700"],
});

const manrope = Manrope({
  variable: "--font-orbital-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "ORBITAL OS-1 — a machine for looking at",
  description:
    "A physically-based glass sculpture rendered live: transmission, iridescence, and a camera rig driven by scroll.",
};

export default function OrbitalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${unbounded.variable} ${manrope.variable}`}>{children}</div>
  );
}
