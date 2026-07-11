import type { Metadata } from "next";
import { Merriweather, Libre_Franklin } from "next/font/google";

const serif = Merriweather({
  variable: "--font-globo-serif",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  style: ["normal", "italic"],
});

const sans = Libre_Franklin({
  variable: "--font-globo-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Assine O GLOBO",
    template: "%s — O GLOBO",
  },
  description:
    "Landing pages conceituais de assinatura digital e impressa para O GLOBO. Páginas de portfólio, sem vínculo oficial.",
};

export default function GloboLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={`${serif.variable} ${sans.variable}`}>{children}</div>;
}
