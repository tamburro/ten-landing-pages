import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Um jornal, quatro leitores — assine o plano Família",
  description:
    "Plano Família d'O GLOBO: até 4 perfis, digital e impresso. Conceito de portfólio.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
