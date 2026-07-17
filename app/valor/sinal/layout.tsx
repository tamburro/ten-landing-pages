import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "O mercado grita. O Valor fala baixo — assine",
  description:
    "Um interruptor entre o ruído do feed e o sinal de uma análise: a página inteira muda de estado. Conceito de portfólio.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
