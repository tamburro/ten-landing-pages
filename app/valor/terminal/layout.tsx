import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "O terminal de quem opera — Valor PRO",
  description:
    "O Valor PRO demonstrado num laptop desenhado em CSS: watchlist clicável, gráfico e feed em tempo real. Conceito de portfólio.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
