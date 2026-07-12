import type { Metadata } from "next";
import { Guide } from "@/components/Guide";

export const metadata: Metadata = {
  title: "Análise — guia de construção",
};

export default function GuidePage() {
  return (
    <Guide
      slug="valor/analise"
      title="Valor — Análise"
      tagline="O paywall como demonstração: um ensaio de verdade que corta no melhor parágrafo — a frustração é o argumento."
    >
      <h2>Ângulo de conversão</h2>
      <p>
        Content-led. A landing É uma página de leitura: um ensaio fictício plausível (câmbio ×
        safra) com tipografia de artigo, notas de margem do editor e grifo laranja — que
        desaparece num gradiente exatamente na frase "as três variáveis que respondem são…".
        O card seguinte nomeia a experiência: "isso que você acabou de sentir é o produto".
      </p>
      <h2>Padrões de conversão aplicados</h2>
      <ul>
        <li>Paywall dramatizado com honestidade — o corte vem depois de valor real entregue (4 parágrafos de tese).</li>
        <li>Notas de margem como prova do método (dado linkado, condição de invalidação, acervo).</li>
        <li>Dois CTAs lado a lado (digital / com impresso) — decisão binária no momento de pico de interesse.</li>
        <li>Métricas de integridade no fecho: "0 textos pagos por quem aparece neles".</li>
      </ul>
      <h2>Técnica</h2>
      <ul>
        <li>Grid <code>1fr 220px</code>: coluna de leitura + margem de anotações que entram da direita via ScrollTrigger (escondidas no mobile).</li>
        <li>O "fade de paywall" é um gradiente absoluto de 10rem sobre o fim do artigo — nenhum texto é realmente cortado do DOM (acessível para leitores de tela).</li>
        <li>Grifo com <code>linear-gradient</code> a 55% da linha, tipografia serifada em <code>line-height 1.8</code> — a página lê como produto final, porque é isso que ela vende.</li>
      </ul>
    </Guide>
  );
}
