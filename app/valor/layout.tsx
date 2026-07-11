import type { Metadata } from "next";
import { IBM_Plex_Serif, IBM_Plex_Sans } from "next/font/google";

const serif = IBM_Plex_Serif({
  variable: "--font-valor-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const sans = IBM_Plex_Sans({
  variable: "--font-valor-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Assine o Valor Econômico",
    template: "%s — Valor Econômico",
  },
  description:
    "Landing pages conceituais de assinatura digital e impressa para o Valor Econômico. Páginas de portfólio, sem vínculo oficial.",
};

export default function ValorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={`${serif.variable} ${sans.variable}`}>{children}</div>;
}
