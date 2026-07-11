import type { Metadata } from "next";
import { Guide } from "@/components/Guide";

export const metadata: Metadata = {
  title: "Herança — guia de construção",
};

export default function GuidePage() {
  return (
    <Guide
      slug="globo/heranca"
      title="O GLOBO — Herança"
      tagline="A landing de assinatura como primeira página de jornal: o produto é o século de arquivo, e o layout é a prova."
    >
      <h2>Ângulo de conversão</h2>
      <p>
        Autoridade por longevidade. O visitante não vê uma promoção — vê uma capa: cabeçalho
        centenário, fios tipográficos, colunas justificadas com <code>column-count</code> e{" "}
        <code>column-rule</code>, ticker de manchetes históricas reais. A oferta (R$ 9,90*)
        aparece dentro da manchete, não em um banner.
      </p>
      <h2>Padrões de conversão aplicados</h2>
      <ul>
        <li>Preço âncora no hero + CTA para a seção de planos (uma única decisão por vez).</li>
        <li>Prova social específica (leitores/mês, prêmios, acervo) como bullets de manchete.</li>
        <li>Card de plano em destaque com sombra dura azul e selo — hierarquia sem badge genérico.</li>
        <li>Barra de CTA fixa que só aparece depois que o hero sai de cena (ScrollTrigger <code>onEnter/onLeaveBack</code>).</li>
        <li>Redutores de risco repetidos: 7 dias grátis, cancele em dois cliques, sem multa.</li>
      </ul>
      <h2>Técnica</h2>
      <ul>
        <li>Fios do cabeçalho desenham com <code>scaleX 0→1</code>; blocos sobem com fades curtos — movimento de página impressa, nada flutua.</li>
        <li>Merriweather black para o "chapéu" e manchetes; Libre Franklin para UI e bullets.</li>
        <li>Paleta: papel <code>#f8f5ee</code>, tinta <code>#14181d</code>, azul da marca <code>#0a5cb8</code> usado só em oferta e CTAs.</li>
      </ul>
    </Guide>
  );
}
