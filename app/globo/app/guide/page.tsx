import type { Metadata } from "next";
import { Guide } from "@/components/Guide";

export const metadata: Metadata = {
  title: "App — guia de construção",
};

export default function GuidePage() {
  return (
    <Guide
      slug="globo/app"
      title="O GLOBO — App"
      tagline="O produto demonstrado dentro de um iPhone desenhado em CSS: o feed rola, o alerta chega e o modo noturno funciona — sem um pixel de screenshot."
    >
      <h2>Ângulo de conversão</h2>
      <p>
        Demonstração viva do produto digital. Em vez de descrever o app, a página o encena: um
        iPhone construído inteiramente com divs (moldura, dynamic island, botões laterais, status
        bar com a hora real do visitante) roda um feed de manchetes em loop. Dois botões na copy
        controlam o aparelho — "testar alerta de urgente" dispara um push que desliza com
        overshoot, e o toggle de modo noturno re-tematiza a UI interna com transição.
      </p>
      <h2>Padrões de conversão aplicados</h2>
      <ul>
        <li>Try-before-you-buy sem instalar nada: o visitante interage com o produto na própria landing.</li>
        <li>O recurso "modo noturno" manda testar no aparelho ao lado — copy e demo se referenciam.</li>
        <li>Prova social de loja (★ 4,8) junto do preço-âncora no hero.</li>
        <li>Headline de contraste concreto: "Cem anos de jornal. 188 gramas de bolso."</li>
      </ul>
      <h2>Técnica</h2>
      <ul>
        <li>iPhone: moldura <code>border-[10px]</code> + <code>rounded-[3rem]</code>, ilha dinâmica e botões como spans absolutos; tela interna com <code>overflow-hidden</code>.</li>
        <li>Feed duplicado ×2 e tween <code>yPercent: −50</code> em loop — o mesmo padrão de marquee, na vertical, dentro do "vidro".</li>
        <li>Push notification com <code>cubic-bezier(0.34, 1.4, 0.64, 1)</code> (overshoot de mola) e auto-dismiss em 3,2s.</li>
        <li>Tema do aparelho é estado React independente do tema da página — só o mockup escurece.</li>
        <li>Hora da status bar via <code>toLocaleTimeString</code> real, atualizada a cada 30s.</li>
      </ul>
    </Guide>
  );
}
