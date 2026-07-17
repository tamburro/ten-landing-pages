import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leia a capa de amanhã hoje — assine",
  description:
    "Assinante d'O GLOBO recebe a primeira página da edição seguinte na noite anterior. A capa de amanhã, desenhada em HTML, atrás do vidro. Conceito de portfólio.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
