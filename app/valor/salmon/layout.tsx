import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "O papel tem cor de mercado — assine o impresso",
  description:
    "Uma ode ao papel salmão do Valor Econômico: assinatura impressa + digital. Conceito de portfólio.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
