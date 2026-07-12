import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Informação não escala por CC — Valor Equipes",
  description:
    "Licenças corporativas do Valor Econômico: assentos, gestão e nota fiscal única. Conceito de portfólio.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
