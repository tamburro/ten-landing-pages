import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "O mundo fecha, o Brasil abre — assine",
  description:
    "Cobertura internacional do Valor Econômico: quatro fusos, uma leitura. Conceito de portfólio.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
