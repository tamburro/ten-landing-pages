import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "A mesa das 7h — assine o ecossistema",
  description:
    "A mesa de quem decide, vista de cima e desenhada em CSS: jornal, celular, laptop e café — cada peça é um pedaço da assinatura. Conceito de portfólio.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
