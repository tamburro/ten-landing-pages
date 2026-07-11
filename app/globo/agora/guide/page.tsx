import type { Metadata } from "next";
import { Guide } from "@/components/Guide";

export const metadata: Metadata = {
  title: "Agora — guia de construção",
};

export default function GuidePage() {
  return (
    <Guide
      slug="globo/agora"
      title="O GLOBO — Agora"
      tagline="Urgência honesta: a página se comporta como uma redação ao vivo, e a oferta expira junto com o dia."
    >
      <h2>Ângulo de conversão</h2>
      <p>
        Escassez temporal + demonstração de ritmo. Tudo na página está <em>acontecendo</em>:
        ticker de urgentes, relógio da redação em tempo real, contador de matérias do dia subindo,
        countdown que corre de verdade até 23:59 do dia do visitante — urgência mecânica, não
        retórica de banner.
      </p>
      <h2>Padrões de conversão aplicados</h2>
      <ul>
        <li>Uma única oferta (Digital 50% off) com preço riscado e prazo visível — sem paradoxo de escolha.</li>
        <li>Contadores como prova de valor (1.284 matérias/dia, 80+ repórteres em turno).</li>
        <li>CTA de topo persistente ("Oferta do dia") ancorando direto na seção de decisão.</li>
        <li>Disclaimer de renovação junto do CTA — atrito legal antecipado gera confiança.</li>
      </ul>
      <h2>Técnica</h2>
      <ul>
        <li>Countdown e relógio em <code>setInterval</code> de 1s com cleanup; números <code>tabular-nums</code> para não tremer.</li>
        <li>Contador de matérias tweened por GSAP com <code>toLocaleString("pt-BR")</code>.</li>
        <li>Dark UI <code>#0b0e12</code> com vermelho breaking <code>#e03131</code> restrito a urgência/oferta e azul <code>#4d9fff</code> para a marca.</li>
        <li><code>prefers-reduced-motion</code> desliga ticker, pulso e contadores animados.</li>
      </ul>
    </Guide>
  );
}
