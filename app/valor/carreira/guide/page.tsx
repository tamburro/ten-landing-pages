import type { Metadata } from "next";
import { Guide } from "@/components/Guide";

export const metadata: Metadata = {
  title: "Carreira — guia de construção",
};

export default function GuidePage() {
  return (
    <Guide
      slug="valor/carreira"
      title="Valor — Carreira"
      tagline="A escada tipográfica: cinco cargos em corpo crescente e indentação progressiva — a hierarquia visual é a promessa."
    >
      <h2>Ângulo de conversão</h2>
      <p>
        Aspiração individual. Enquanto /valor/pro fala com quem já decide, esta fala com quem
        quer chegar lá. O argumento central é aritmético — "nenhum MBA custa R$ 34,90/mês" — e
        a escada do Estágio ao Conselho mostra o mesmo hábito rendendo mais a cada degrau, com
        a honestidade de rotular a escada como fictícia e o padrão como real.
      </p>
      <h2>Padrões de conversão aplicados</h2>
      <ul>
        <li>Metáfora carregada pelo layout: corpo tipográfico cresce (2xl → 7xl) e cada degrau indenta 4% a mais.</li>
        <li>Cada cargo tem uma microcena social (a daily, o relatório, o conselho) — status, não features.</li>
        <li>Aritmética de esforço: 12 min/dia → ≈70h/ano → R$ 1,16/dia.</li>
        <li>Benefício de RH no checklist: recibo para reembolso de educação — destrava quem não paga do próprio bolso.</li>
        <li>CTA na metáfora: "Começar a subir".</li>
      </ul>
      <h2>Técnica</h2>
      <ul>
        <li>Indentação por <code>marginLeft: i*4%</code> inline — a escada segue responsiva sem media queries.</li>
        <li>Degraus entram da esquerda (sentido da leitura da escada) via ScrollTrigger.</li>
        <li>Página inteira sem canvas nem SVG: só tipografia IBM Plex e o sistema navy/laranja da marca.</li>
      </ul>
    </Guide>
  );
}
