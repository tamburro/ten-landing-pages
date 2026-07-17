import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "O jornal no seu bolso — assine o app",
  description:
    "O app d'O GLOBO demonstrado dentro de um iPhone desenhado em CSS: feed vivo, alerta de urgente, modo noturno. Conceito de portfólio.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
