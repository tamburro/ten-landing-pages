import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Um século de manchetes — assine",
  description:
    "Assinatura digital e impressa d'O GLOBO: a página como primeira página. Conceito de portfólio.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
