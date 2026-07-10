import type { Metadata } from "next";
import { Anton, Inter_Tight } from "next/font/google";

const anton = Anton({
  variable: "--font-kinetic-display",
  subsets: ["latin"],
  weight: "400",
});

const inter = Inter_Tight({
  variable: "--font-kinetic-sans",
  subsets: ["latin"],
  weight: ["400", "600", "800"],
});

export const metadata: Metadata = {
  title: "RUPTURA FEST 2027 — três noites de ruído bonito",
  description:
    "Velocity-reactive kinetic typography in acid colors: marquees that accelerate with your scroll, type that skews with momentum.",
};

export default function KineticLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={`${anton.variable} ${inter.variable}`}>{children}</div>;
}
