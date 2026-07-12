import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MenuButton } from "@/components/MenuButton";

const sans = Geist({ variable: "--font-root-sans", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-root-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "LPS — thirty landing pages",
    template: "%s — LPS",
  },
  description:
    "Ten portfolio-grade landing pages, each pushing a different craft: WebGL, scroll choreography, color systems, typography.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body className="antialiased">
        {children}
        <MenuButton />
      </body>
    </html>
  );
}
