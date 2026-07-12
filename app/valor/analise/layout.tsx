import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Menos notícia, mais tese — assine",
  description:
    "Uma análise de verdade, interrompida no melhor parágrafo: o paywall como demonstração. Conceito de portfólio.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
