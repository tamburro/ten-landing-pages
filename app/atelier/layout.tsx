import type { Metadata } from "next";
import { Cormorant_Garamond, Karla } from "next/font/google";

const cormorant = Cormorant_Garamond({
  variable: "--font-atelier-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const karla = Karla({
  variable: "--font-atelier-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "ATELIER N°9 — Statuary",
  description:
    "An editorial issue as a landing page: asymmetric grid, serif display, a pinned horizontal gallery of looks.",
};

export default function AtelierLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${cormorant.variable} ${karla.variable}`}>{children}</div>
  );
}
