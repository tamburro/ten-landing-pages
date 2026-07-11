import type { Metadata } from "next";
import { Guide } from "@/components/Guide";

export const metadata: Metadata = {
  title: "Rio — guia de construção",
};

export default function GuidePage() {
  return (
    <Guide
      slug="globo/rio"
      title="O GLOBO — Rio"
      tagline="Conversão por pertencimento: a página vende CEP, não conteúdo — e o amanhecer sobre a silhueta da cidade é o argumento."
    >
      <h2>Ângulo de conversão</h2>
      <p>
        Identidade local. Contra a percepção de "notícia é tudo igual", a página posiciona o
        produto pelo que nenhum concorrente nacional tem: alma carioca. O hero é um amanhecer em
        gradiente (noite → laranja → areia) com o sol nascendo por GSAP e a silhueta de Dois
        Irmãos, Corcovado e Pão de Açúcar desenhada à mão em um único path SVG — zero imagens.
      </p>
      <h2>Padrões de conversão aplicados</h2>
      <ul>
        <li>Promessa operacional concreta no topo: "na porta antes das 7h".</li>
        <li>Colunistas como rostos (iniciais em avatar) — pessoas convertem mais que features.</li>
        <li>Nuvem de bairros: o visitante procura o seu — engajamento por reconhecimento — e a pílula laranja fecha a objeção de cobertura.</li>
        <li>Dois planos apenas, com o impresso em card invertido navy (contraste = destaque).</li>
      </ul>
      <h2>Técnica</h2>
      <ul>
        <li>Silhueta: <code>preserveAspectRatio="none"</code> estica o path na largura sem deformar a leitura das montanhas.</li>
        <li>Sol com <code>box-shadow</code> gigante como glow (barato, sem blur em camada).</li>
        <li>Paleta síntese da cidade: navy <code>#1d3557</code>, laranja <code>#e07a2f</code>, areia <code>#fdf9f3</code>.</li>
      </ul>
    </Guide>
  );
}
