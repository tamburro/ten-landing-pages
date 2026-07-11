import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quanto custa decidir sem saber? — assine",
  description:
    "Calculadora de ROI da assinatura do Valor Econômico: o preço por dia contra o custo de decidir mal informado. Conceito de portfólio.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
