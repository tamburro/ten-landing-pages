import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "O Rio explicado pelo Rio — assine",
  description:
    "Assinatura d'O GLOBO com alma carioca: colunistas, bairros e o jornal na porta antes das 7h. Conceito de portfólio.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
