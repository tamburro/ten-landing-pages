import type { Metadata } from "next";
import { Inter, Fragment_Mono } from "next/font/google";

const inter = Inter({
  variable: "--font-field-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const fragment = Fragment_Mono({
  variable: "--font-field-mono",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "FIELD — wind, notated",
  description:
    "Seeded generative flow fields on a strict Swiss grid. Every artwork is a number; every number is reproducible.",
};

export default function FieldLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${inter.variable} ${fragment.variable}`}>{children}</div>
  );
}
