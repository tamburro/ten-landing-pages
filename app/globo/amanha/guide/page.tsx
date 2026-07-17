import type { Metadata } from "next";
import { Guide } from "@/components/Guide";

export const metadata: Metadata = {
  title: "Amanhã — guia de construção",
};

export default function GuidePage() {
  return (
    <Guide
      slug="globo/amanha"
      title="O GLOBO — Amanhã"
      tagline="O benefício encenado: a capa de amanhã (com a data real de amanhã) está na página — embaçada, atrás do cadeado."
    >
      <h2>Ângulo de conversão</h2>
      <p>
        Um único privilégio, dramatizado. A página vende um benefício exclusivo — receber a
        primeira página da edição seguinte às 22h — e o encena com uma capa de jornal desenhada
        em HTML que carrega a <strong>data real de amanhã</strong> do visitante. O toggle
        hoje/amanhã deixa comparar: a de hoje abre nítida; a de amanhã fica com{" "}
        <code>blur(7px)</code> atrás de um cadeado com CTA.
      </p>
      <h2>Padrões de conversão aplicados</h2>
      <ul>
        <li>Curiosity gap físico: dá para quase ler a manchete embaçada — a fricção é o desejo.</li>
        <li>CTA dentro do bloqueio ("Desbloquear por R$ 9,90*") no exato ponto de atenção.</li>
        <li>Linha do tempo 22h04 → 22h10 → 6h30 terminando na frase de status: "você já sabia, há oito horas".</li>
        <li>Honestidade: badge explica que as capas são fictícias e o mecanismo é o produto.</li>
      </ul>
      <h2>Técnica</h2>
      <ul>
        <li>A capa é um componente HTML fiel à gramática de primeira página: cabeço, fios duplos, manchete, três chamadas em colunas, expediente com número de edição e preço de banca.</li>
        <li>Datas via <code>toLocaleDateString("pt-BR")</code> com <code>useMemo</code>; amanhã = <code>setDate(+1)</code> — sem lib de data.</li>
        <li>Blur transiciona por <code>transition-[filter]</code>; o conteúdo embaçado recebe <code>aria-hidden</code> e <code>select-none</code> (o "vidro" também vale para copy/paste).</li>
        <li>Toggle com semântica de <code>role="tablist"/tab</code> e <code>aria-selected</code>.</li>
      </ul>
    </Guide>
  );
}
