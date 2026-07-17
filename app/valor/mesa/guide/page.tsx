import type { Metadata } from "next";
import { Guide } from "@/components/Guide";

export const metadata: Metadata = {
  title: "Mesa — guia de construção",
};

export default function GuidePage() {
  return (
    <Guide
      slug="valor/mesa"
      title="Valor — Mesa"
      tagline="Um flat-lay desenhado em CSS: a mesa das 7h vista de cima, com quatro hotspots que fazem o tour do ecossistema."
    >
      <h2>Ângulo de conversão</h2>
      <p>
        Tour de produto como cena, não como lista. A mesa de madeira (gradiente + veios em{" "}
        <code>repeating-linear-gradient</code>) sustenta quatro objetos construídos com divs:
        o jornal salmão, o celular com push do Valor, o laptop com a newsletter aberta e o café
        com alça e brilho. Cada hotspot numerado troca o painel lateral — e a quarta peça, o
        café, vira a régua de preço ("custa menos que um por dia").
      </p>
      <h2>Padrões de conversão aplicados</h2>
      <ul>
        <li>Exploração guiada: 4 toques cobrem o ecossistema inteiro sem rolagem de features.</li>
        <li>Os planos mapeiam para a cena: "mesa digital" (peças 2 e 3) vs "mesa completa" (1, 2 e 3) — o visitante compra o que acabou de tocar.</li>
        <li>Humor de fechamento que desarma: "o café é com você".</li>
      </ul>
      <h2>Técnica</h2>
      <ul>
        <li>Cena em <code>aspect-[4/3]</code> com objetos posicionados por porcentagem — o flat-lay escala inteiro sem media queries.</li>
        <li>Hotspots são <code>button</code> reais com <code>aria-label</code>; o painel usa <code>aria-live="polite"</code> e fica <code>sticky</code> no desktop.</li>
        <li>Objetos entram com <code>back.out</code> em stagger, como coisas pousando na mesa; o selecionado ganha anel <code>ring</code> laranja.</li>
      </ul>
    </Guide>
  );
}
