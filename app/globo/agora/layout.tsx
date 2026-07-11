import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "A redação não dorme — assine",
  description:
    "Assinatura digital d'O GLOBO com a urgência de uma redação ao vivo. Conceito de portfólio.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
