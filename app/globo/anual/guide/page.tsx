import type { Metadata } from "next";
import { Guide } from "@/components/Guide";

export const metadata: Metadata = {
  title: "Anual — guia de construção",
};

export default function GuidePage() {
  return (
    <Guide
      slug="globo/anual"
      title="O GLOBO — Anual"
      tagline="Uma página, um número: o 40% é o hero, e todo o resto existe só para justificá-lo."
    >
      <h2>Ângulo de conversão</h2>
      <p>
        Redução radical de escolha. Página de oferta única (upgrade mensal → anual) com um número
        em corpo 17rem como herói. A hierarquia é brutal de propósito: quem chega já conhece o
        produto; o trabalho aqui é só vencer a inércia do plano mensal.
      </p>
      <h2>Padrões de conversão aplicados</h2>
      <ul>
        <li>Preço âncora riscado + preço/mês equivalente + total anual explícito no CTA (nada de surpresa no checkout).</li>
        <li>Economia anual contada em GSAP (R$ 144,00) e traduzida em algo tangível — "o café de dois meses".</li>
        <li>Comparação de exatamente 2 colunas, com a anual em borda amarela e selo "melhor por mês".</li>
        <li>Reversão de risco explícita: 7 dias reembolso total, depois proporcional.</li>
        <li>Parcelamento no microcopy do CTA (12x sem juros) — a objeção do valor cheio morre no botão.</li>
      </ul>
      <h2>Técnica</h2>
      <ul>
        <li>O "40%" entra com <code>back.out(1.6)</code> — um único momento de teatro na página.</li>
        <li>Preços derivados de constantes (<code>MENSAL</code>, <code>ANUAL_MES</code>): o contador de economia nunca desalinha da copy.</li>
        <li>Paleta de liquidação sem perder a marca: preto, amarelo <code>#ffd43b</code>, azul <code>#4d9fff</code> só na economia.</li>
      </ul>
    </Guide>
  );
}
