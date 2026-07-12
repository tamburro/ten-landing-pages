import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checar dá trabalho. É esse o produto — assine",
  description:
    "A assinatura como financiamento de jornalismo verificado: boato riscado, fato carimbado. Conceito de portfólio.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
