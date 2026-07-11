import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Antes do mercado abrir — assine",
  description:
    "A manhã de quem assina o Valor, das 5h50 às 9h00. Digital e impresso. Conceito de portfólio.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
