import type { Metadata } from "next";
import { Guide } from "@/components/Guide";

export const metadata: Metadata = {
  title: "Jogos — guia de construção",
};

export default function GuidePage() {
  return (
    <Guide
      slug="globo/jogos"
      title="O GLOBO — Jogos"
      tagline="A landing é o jogo: uma palavra-do-dia completa e jogável (teclado físico e virtual), e o CTA aparece exatamente quando a partida acaba."
    >
      <h2>Ângulo de conversão</h2>
      <p>
        Hábito antes da assinatura — a estratégia que transformou os Games do NYT em máquina de
        retenção. O visitante joga uma partida inteira de "palavra do dia" na própria página
        (resposta: PAUTA, com dica de redação de jornal). O paywall fica no <em>arquivo</em> e nos
        outros jogos, e o CTA contextual só aparece no fim da partida — com copy diferente para
        vitória ("quero jogar o arquivo inteiro") e derrota ("assinar e treinar").
      </p>
      <h2>Padrões de conversão aplicados</h2>
      <ul>
        <li>Ative o produto, depois peça o dinheiro: engajamento antes de qualquer preço.</li>
        <li>Streak como moeda de retenção anunciada ("streak médio: 34 dias").</li>
        <li>Grid de outros jogos com selo "só para assinantes" — o desejo se transfere.</li>
      </ul>
      <h2>Técnica</h2>
      <ul>
        <li>Mecânica Wordle completa: avaliação em duas passadas (certas primeiro, depois posições) com contagem de letras repetidas correta.</li>
        <li>Entrada dupla: teclado físico via <code>keydown</code> global e teclado virtual em botões; as teclas herdam a melhor avaliação já vista (verde &gt; amarelo &gt; cinza).</li>
        <li>Micro-animação <code>gj-pop</code> só em CSS ao digitar; <code>role="status"</code> anuncia avisos e resultado para leitores de tela.</li>
        <li>Tudo em estado React puro — nenhuma dependência além do GSAP dos reveals.</li>
      </ul>
    </Guide>
  );
}
