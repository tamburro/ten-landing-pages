import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quem decide lê antes — assine",
  description:
    "Assinatura do Valor Econômico para quem decide: digital e impresso. Conceito de portfólio.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
