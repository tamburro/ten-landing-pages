import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cem anos de primeira página — assine o acervo",
  description:
    "Uma máquina do tempo de manchetes: arraste o ano e a primeira página envelhece. O acervo d'O GLOBO como argumento de assinatura. Conceito de portfólio.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
