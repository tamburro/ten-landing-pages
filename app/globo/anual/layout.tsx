import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "12 meses, 40% off — assinatura anual",
  description:
    "Oferta anual d'O GLOBO: uma página, um número, uma decisão. Conceito de portfólio.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
