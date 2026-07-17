import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jogos d'O GLOBO — jogue a palavra do dia",
  description:
    "Palavra do dia jogável na própria landing: seis tentativas, streak e o arquivo completo para assinantes. Conceito de portfólio.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
