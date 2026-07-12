import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "O domingo pede papel — assinatura fim de semana",
  description:
    "Impresso no sábado e domingo, digital a semana inteira. O ritual de fim de semana d'O GLOBO. Conceito de portfólio.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
