import type { Metadata } from "next";
import { Guide } from "@/components/Guide";

export const metadata: Metadata = {
  title: "Simulador — guia de construção",
};

export default function GuidePage() {
  return (
    <Guide
      slug="valor/simulador"
      title="Valor — Simulador"
      tagline="Um jogo de decisão com placar em reais: cada rodada mostra a manchete que estava na mesa antes — e o caixa cobra de quem não leu."
    >
      <h2>Ângulo de conversão</h2>
      <p>
        ROI vivido, não argumentado. O visitante toma três decisões de CFO (câmbio, captação,
        reação a concorrente); em cada uma, a manchete do Valor publicada dias antes está visível
        no card "na sua mesa desde ontem". O placar acumula em reais no header, e o fechamento
        compara: a assinatura custa 0,03% do que o jogo acabou de mostrar.
      </p>
      <h2>Padrões de conversão aplicados</h2>
      <ul>
        <li>Perda simulada é mais persuasiva que benefício prometido (aversão à perda, aplicada).</li>
        <li>A informação correta está sempre à vista — o jogo pune ignorá-la, como a realidade.</li>
        <li>Resultado com três leituras (perfeito / no azul / vermelho) e o CTA na mesma lógica: "ler antes da próxima decisão".</li>
        <li>Copy do preço ancorada no próprio placar do jogador, não em comparação genérica.</li>
      </ul>
      <h2>Técnica</h2>
      <ul>
        <li>Estado: rodada, saldo, escolha e histórico; deltas somados ao placar do header com verde/vermelho e <code>tabular-nums</code>.</li>
        <li>Cartão salmão sobre navy (inversão da paleta da marca) para o "tabuleiro"; feedback em <code>role="status"</code>.</li>
        <li>Máximo teórico calculado dos dados (<code>reduce</code>) — o veredito "placar perfeito" nunca desalinha das rodadas.</li>
      </ul>
    </Guide>
  );
}
