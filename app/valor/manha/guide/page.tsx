import type { Metadata } from "next";
import { Guide } from "@/components/Guide";

export const metadata: Metadata = {
  title: "Manhã — guia de construção",
};

export default function GuidePage() {
  return (
    <Guide
      slug="valor/manha"
      title="Valor — Manhã"
      tagline="Vender rotina, não conteúdo: a página é uma linha do tempo das 5h50 às 9h00, e o plano é a manhã que você escolhe."
    >
      <h2>Ângulo de conversão</h2>
      <p>
        Hábito e ritual. Em vez de listar features, a página narra a manhã do assinante em cinco
        atos com horário — do fechamento da edição ao pregão aberto — e fecha no clímax: "você
        já sabia". O hero em gradiente madrugada→amanhecer prepara o arco; a página clareia
        conforme a manhã avança.
      </p>
      <h2>Padrões de conversão aplicados</h2>
      <ul>
        <li>Storytelling temporal com horários específicos (6h15, 7h30) — especificidade gera credibilidade.</li>
        <li>Os planos são nomeados pela experiência ("manhã digital" / "manhã completa"), não pelo formato.</li>
        <li>O impresso vira protagonista do combo com promessa logística ("na porta antes do pão").</li>
        <li>CTA do hero leva à rotina, não ao preço — página de convencimento, com decisão no fim.</li>
      </ul>
      <h2>Técnica</h2>
      <ul>
        <li>Linha vertical da rotina desenha com <code>scaleY</code> scrubado por ScrollTrigger; cada passo entra da esquerda ao cruzar 80% do viewport.</li>
        <li>Gradiente do hero atravessa navy <code>#14273f</code> → âmbar → papel <code>#fdf6ef</code>, emendando no fundo da página — o amanhecer é o layout.</li>
        <li>IBM Plex Serif nos horários e títulos, como cabeço de coluna de jornal.</li>
      </ul>
    </Guide>
  );
}
