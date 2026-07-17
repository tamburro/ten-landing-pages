import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Você é o CFO — jogue e assine",
  description:
    "Três decisões de CFO, cada uma com uma manchete do Valor publicada antes. O placar mostra quanto custa decidir sem ler. Conceito de portfólio.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
