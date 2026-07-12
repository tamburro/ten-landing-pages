import type { Metadata } from "next";
import { Guide } from "@/components/Guide";

export const metadata: Metadata = {
  title: "Agro — guia de construção",
};

export default function GuidePage() {
  return (
    <Guide
      slug="valor/agro"
      title="Valor — Agro"
      tagline="Vertical setorial: o navy do Valor vira verde de lavoura, e o board de commodities abre a página falando a língua do leitor."
    >
      <h2>Ângulo de conversão</h2>
      <p>
        Segmentação por setor. Uma página genérica diz "cobrimos tudo"; esta abre com um board de
        soja, milho, boi, café e algodão (demonstrativo e rotulado) — o visitante do agro se
        reconhece na primeira dobra. A tese "do talhão ao pregão" conecta as duas pontas do
        negócio que o leitor vive separadas.
      </p>
      <h2>Padrões de conversão aplicados</h2>
      <ul>
        <li>Board de cotações como handshake setorial, com verde/vermelho de mercado e unidades corretas (sc 60kg, @, lb).</li>
        <li>Cobertura em 4 promessas operacionais (veranico no boletim de terça, Chicago antes do Brasil abrir).</li>
        <li>Plano impresso adaptado à realidade rural: edição semanal "onde o Correio chega" — a limitação virou copy honesta.</li>
        <li>Frequência como diferencial: "boletins na frequência da safra, não do feed".</li>
      </ul>
      <h2>Técnica</h2>
      <ul>
        <li>Única página da marca em paleta derivada: verdes profundos (<code>#0f2417</code>/<code>#122b1c</code>) mantendo o laranja e o salmão do Valor como âncoras.</li>
        <li>Board com <code>overflow-x-auto</code> e <code>min-w-max</code> — vira ticker rolável no mobile sem JS.</li>
        <li>Itens do board entram em stagger curto no load; resto da página segue o padrão de reveals da série.</li>
      </ul>
    </Guide>
  );
}
