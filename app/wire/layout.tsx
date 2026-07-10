import type { Metadata } from "next";
import { VT323, JetBrains_Mono } from "next/font/google";

const vt = VT323({
  variable: "--font-wire-display",
  subsets: ["latin"],
  weight: "400",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-wire-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "wire — tail your whole stack",
  description:
    "A CRT phosphor terminal as a landing page: boot sequence, scanlines, scramble-decode text, flickering grid.",
};

export default function WireLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={`${vt.variable} ${jetbrains.variable}`}>{children}</div>;
}
