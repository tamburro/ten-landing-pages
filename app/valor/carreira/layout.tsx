import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quem lê antes, sobe antes — assine",
  description:
    "A assinatura do Valor como degrau de carreira: do estágio ao conselho. Conceito de portfólio.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
