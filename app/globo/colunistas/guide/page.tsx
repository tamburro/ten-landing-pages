import type { Metadata } from "next";
import { Guide } from "@/components/Guide";

export const metadata: Metadata = {
  title: "Colunistas — guia de construção",
};

export default function GuidePage() {
  return (
    <Guide
      slug="globo/colunistas"
      title="O GLOBO — Colunistas"
      tagline="Parasocial a favor da conversão: a página vende o vínculo com pessoas, e a citação rotativa é o produto falando."
    >
      <h2>Ângulo de conversão</h2>
      <p>
        Vínculo pessoal. Streaming vende catálogo; jornal vende <em>vozes</em>. O hero é uma
        citação entre fios tipográficos que troca sozinha a cada ~4s — o visitante "ouve" três
        colunas diferentes antes do primeiro scroll. O fechamento reposiciona a assinatura como
        contrato de responsabilidade ("opinião de graça existe; responsabilidade, não").
      </p>
      <h2>Padrões de conversão aplicados</h2>
      <ul>
        <li>Grade de 6 vozes com nome, área, dias e uma frase-assinatura — repertório antes do preço.</li>
        <li>Benefícios de relacionamento (newsletter da voz, comentários de assinante), não de acesso.</li>
        <li>Card de oferta com sombra dura azul, preço promocional + preço cheio declarado na mesma linha.</li>
        <li>CTA com posse: "Assinar e seguir minhas vozes".</li>
      </ul>
      <h2>Técnica</h2>
      <ul>
        <li>Rotação de citações com timeline GSAP em loop (<code>repeat: -1, repeatDelay</code>): fade/slide out, troca de <code>textContent</code> no <code>onComplete</code>, fade in — sem estado React, sem re-render.</li>
        <li><code>min-height</code> reservada no bloco de citação para zero layout shift entre frases de tamanhos diferentes.</li>
        <li>Com <code>prefers-reduced-motion</code>, a primeira citação fica fixa.</li>
      </ul>
    </Guide>
  );
}
