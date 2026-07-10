import type { Metadata } from "next";
import { Space_Grotesk, IBM_Plex_Mono } from "next/font/google";

const display = Space_Grotesk({
  variable: "--font-helios-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const mono = IBM_Plex_Mono({
  variable: "--font-helios-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Helios — utility-scale solar",
  description:
    "A raymarched GLSL sun rendered live in your browser. Utility-scale solar, priced like software.",
};

export default function HeliosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${display.variable} ${mono.variable}`}>{children}</div>
  );
}
