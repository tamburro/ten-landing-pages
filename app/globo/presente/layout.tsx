import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dê um ano de mundo — assinatura de presente",
  description:
    "Assinatura d'O GLOBO para presentear: escolha a duração, escreva o cartão, a gente entrega. Conceito de portfólio.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
