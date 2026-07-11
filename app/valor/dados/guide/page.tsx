import type { Metadata } from "next";
import { Guide } from "@/components/Guide";

export const metadata: Metadata = {
  title: "Dados — guia de construção",
};

export default function GuidePage() {
  return (
    <Guide
      slug="valor/dados"
      title="Valor — Dados"
      tagline="A landing como demo: o hero é um painel de indicadores funcionando, e a assinatura é o upgrade do número para o contexto."
    >
      <h2>Ângulo de conversão</h2>
      <p>
        Mostrar, não descrever. O visitante cai dentro de um painel com 4 indicadores tickando e
        sparklines — a experiência do produto antes do pitch. A tese de venda vem em três camadas
        (o número → o contexto → a consequência), terminando na oferta como consequência lógica.
      </p>
      <h2>Padrões de conversão aplicados</h2>
      <ul>
        <li>Demonstração funcional acima da dobra (padrão de product-led growth aplicado a jornal).</li>
        <li>Honestidade demonstrativa: os dados são rotulados como congelados para portfólio — confiança primeiro.</li>
        <li>Oferta em card único com preço grande e o impresso como upsell no microcopy, sem segunda decisão visual.</li>
        <li>Verde/laranja de alta/baixa seguindo convenção de mercado — o público-alvo lê isso sem legenda.</li>
      </ul>
      <h2>Técnica</h2>
      <ul>
        <li>Sparklines em SVG puro (<code>polyline</code> normalizada por min/max) — sem lib de gráfico, séries determinísticas para SSR estável.</li>
        <li>Números animados por GSAP com <code>toLocaleString("pt-BR")</code> e <code>tabular-nums</code>.</li>
        <li>Fundo de grade via dois <code>linear-gradient</code> de 1px — o "papel milimetrado" custa zero bytes de asset.</li>
      </ul>
    </Guide>
  );
}
