import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Monte a sua manhã — newsletters do Valor",
  description:
    "Escolha as newsletters e veja sua caixa de entrada de amanhã se montar ao vivo. Conceito de portfólio.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
