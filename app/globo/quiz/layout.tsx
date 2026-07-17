import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Você sabe o que aconteceu ontem? — teste e assine",
  description:
    "Três perguntas de atualidades, um diagnóstico honesto e a assinatura como remédio. Conceito de portfólio.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
