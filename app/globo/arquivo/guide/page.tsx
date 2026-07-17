import type { Metadata } from "next";
import { Guide } from "@/components/Guide";

export const metadata: Metadata = {
  title: "Arquivo — guia de construção",
};

export default function GuidePage() {
  return (
    <Guide
      slug="globo/arquivo"
      title="O GLOBO — Arquivo"
      tagline="Uma máquina do tempo de manchetes: o slider troca a edição e o papel envelhece por CSS — cor, sépia, contraste e até a inclinação."
    >
      <h2>Ângulo de conversão</h2>
      <p>
        O acervo é o benefício mais difícil de comunicar de uma assinatura — e o mais defensável.
        A solução: deixar o visitante <em>viajar</em>. Um slider de 1925 a 2026 troca a primeira
        página renderizada em HTML (sete edições-marco, da fundação ao "você está aqui"), e o
        envelhecimento do papel é calculado do índice: quanto mais antigo, mais amarelo, mais
        sépia, menos contraste e um leve giro de pilha de arquivo.
      </p>
      <h2>Padrões de conversão aplicados</h2>
      <ul>
        <li>Benefício intangível transformado em brinquedo tátil — exploração gera posse.</li>
        <li>Três usos concretos do acervo (pesquisar, provar, lembrar), incluindo o gancho emocional da "capa do dia em que você nasceu".</li>
        <li>Detalhes de época como prova de cuidado: grafia de 1925 ("numero", "ás"), preço de banca em réis → cruzeiro → real.</li>
        <li>CTA no vocabulário do produto: "Abrir os cem anos".</li>
      </ul>
      <h2>Técnica</h2>
      <ul>
        <li>Envelhecimento paramétrico: <code>hsl()</code> interpolado para o amarelo do papel + <code>filter: sepia()/contrast()</code> + <code>rotate</code>, tudo derivado de um único valor <code>idade</code>.</li>
        <li>Transições via <code>transition-all</code> de 500ms — o tempo "anda" suave entre décadas.</li>
        <li>Slider nativo com <code>aria-valuetext</code> anunciando o ano; o cartão da edição fica em <code>aria-live="polite"</code>.</li>
      </ul>
    </Guide>
  );
}
