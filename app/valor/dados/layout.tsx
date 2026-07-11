import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "O dia em números — assine",
  description:
    "O Valor Econômico como painel: indicadores, sparklines e a assinatura que explica o número. Conceito de portfólio.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
