import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Assine pessoas, não páginas",
  description:
    "As vozes d'O GLOBO como argumento de assinatura: colunistas, horários e opinião assinada. Conceito de portfólio.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
