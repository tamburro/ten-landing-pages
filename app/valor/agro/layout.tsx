import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Do talhão ao pregão — Valor Agro",
  description:
    "A vertical de agronegócio do Valor Econômico: commodities, clima e crédito rural. Conceito de portfólio.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
