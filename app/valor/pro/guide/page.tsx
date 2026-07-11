import type { Metadata } from "next";
import { Guide } from "@/components/Guide";

export const metadata: Metadata = {
  title: "Pro — guia de construção",
};

export default function GuidePage() {
  return (
    <Guide
      slug="valor/pro"
      title="Valor — Pro"
      tagline="Status e antecipação: a página vende chegar antes, e o gráfico subindo desenha a promessa atrás da manchete."
    >
      <h2>Ângulo de conversão</h2>
      <p>
        FOMO profissional. "Quem decide lê antes" + "o jornal que o seu concorrente lê primeiro"
        posicionam a assinatura como vantagem competitiva, não como leitura. A prova são horários
        e números concretos: edição fechada às 6h30, 120+ jornalistas, 25 anos de série.
      </p>
      <h2>Padrões de conversão aplicados</h2>
      <ul>
        <li>Um único CTA repetido (Assinar) — página de decisão executiva, sem passeios.</li>
        <li>Plano impresso em card salmão invertido: o papel do Valor é o próprio destaque visual.</li>
        <li>Microcopy B2B onde importa: nota fiscal para reembolso corporativo, acesso para convidado da equipe.</li>
        <li>Benefícios como argumentos com borda laranja — formato de tese, não de grid de ícones.</li>
      </ul>
      <h2>Técnica</h2>
      <ul>
        <li>Gráfico de linha SVG com <code>strokeDasharray/strokeDashoffset</code> medido por <code>getTotalLength()</code>, desenhado em 2,4s no load — o único ornamento da página.</li>
        <li>Paleta da marca: navy <code>#0e2b4c</code>, laranja <code>#e8590c</code>, salmão <code>#f9e7dc</code>; IBM Plex Serif para números e títulos (voz de imprensa financeira).</li>
        <li><code>prefers-reduced-motion</code>: gráfico já desenhado, sem reveals.</li>
      </ul>
    </Guide>
  );
}
