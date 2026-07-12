import type { Metadata } from "next";
import { Guide } from "@/components/Guide";

export const metadata: Metadata = {
  title: "Estudante — guia de construção",
};

export default function GuidePage() {
  return (
    <Guide
      slug="globo/estudante"
      title="O GLOBO — Estudante"
      tagline="A landing como caderno: pauta azul, margem rosa e marca-texto que pinta a promessa — desconto com identidade, não com banner."
    >
      <h2>Ângulo de conversão</h2>
      <p>
        Utilidade para prova. O desconto de 50% existe em toda concorrência; o que converte é o
        enquadramento — "quem corrige redação percebe em duas linhas quem lê jornal" — e a seção
        <em> Isto aqui já caiu na prova</em>, que conecta temas do jornal a bancas reais
        (rotuladas como ilustrativas). Preço reancorado em moeda estudantil: "menos que um açaí
        por semana".
      </p>
      <h2>Padrões de conversão aplicados</h2>
      <ul>
        <li>Prova de relevância antes do preço (temas × provas) — o produto vira material de estudo.</li>
        <li>Mecânica de elegibilidade explícita (e-mail institucional) no CTA: "Comprovar matrícula e assinar".</li>
        <li>Preço riscado R$ 9,90 → R$ 4,95 com renovação condicionada declarada.</li>
        <li>Kit numerado de 3 entregas concretas, sem substantivos abstratos.</li>
      </ul>
      <h2>Técnica</h2>
      <ul>
        <li>Caderno em CSS puro: pauta com <code>linear-gradient</code> repetido a cada 2rem e margem rosa via <code>box-shadow inset</code>.</li>
        <li>Marca-texto: <code>background-image</code> amarelo com <code>background-size</code> animado de 0%→100% por GSAP — o destaque se pinta sozinho.</li>
        <li>Selo "−50%" rotacionado −2,5° como adesivo; sombras duras amarelas no card do plano.</li>
      </ul>
    </Guide>
  );
}
