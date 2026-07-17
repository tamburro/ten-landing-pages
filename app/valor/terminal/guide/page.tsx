import type { Metadata } from "next";
import { Guide } from "@/components/Guide";

export const metadata: Metadata = {
  title: "Terminal — guia de construção",
};

export default function GuidePage() {
  return (
    <Guide
      slug="valor/terminal"
      title="Valor — Terminal"
      tagline="Um laptop em CSS rodando o produto: watchlist clicável, gráfico que troca, feed que recebe notas novas a cada 4 segundos."
    >
      <h2>Ângulo de conversão</h2>
      <p>
        Demo funcional do tier mais caro (Valor PRO). O laptop é desenhado em CSS (tela com
        moldura, base e dobradiça em três divs) e dentro dele roda uma UI de terminal de três
        painéis. A watchlist é clicável de verdade: selecionar um ativo troca o gráfico, o preço
        e — o diferencial do produto — a "análise da redação" acoplada ao número.
      </p>
      <h2>Padrões de conversão aplicados</h2>
      <ul>
        <li>A copy manda interagir ("clique nos ativos — o terminal é de verdade") e o produto responde.</li>
        <li>Feed em tempo real simulado: uma nota nova entra a cada 4s, vendendo a sensação de fluxo sem WebSocket.</li>
        <li>Diferencial editorial explícito: preço + porquê na mesma célula — o que Bloomberg não tem.</li>
        <li>Trial de 14 dias sem cartão como CTA — padrão de produto SaaS para ticket alto.</li>
      </ul>
      <h2>Técnica</h2>
      <ul>
        <li>Painéis em grid <code>180px/1fr/220px</code>; sparklines SVG reutilizadas em dois tamanhos pelo mesmo componente.</li>
        <li>Feed com <code>setInterval</code> + slice(0,5), lista em <code>aria-live="polite"</code>; botões da watchlist com <code>aria-pressed</code>.</li>
        <li>Tudo <code>tabular-nums</code>; verde/laranja seguindo a convenção de mercado da série.</li>
      </ul>
    </Guide>
  );
}
