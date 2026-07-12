import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Atualidades que caem na prova — plano estudante",
  description:
    "Plano estudante d'O GLOBO: metade do preço, o dobro de repertório para ENEM e concursos. Conceito de portfólio.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
