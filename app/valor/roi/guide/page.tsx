import type { Metadata } from "next";
import { Guide } from "@/components/Guide";

export const metadata: Metadata = {
  title: "ROI — guia de construção",
};

export default function GuidePage() {
  return (
    <Guide
      slug="valor/roi"
      title="Valor — ROI"
      tagline="A landing como calculadora: o visitante mexe num slider e a página faz a conta da assinatura em cafés."
    >
      <h2>Ângulo de conversão</h2>
      <p>
        Reancoragem de preço por interação. Em vez de afirmar que é barato, a página pede um dado
        do visitante (o preço do café da esquina dele) e devolve a conta personalizada: o mês do
        Valor em cafés, e o dia como fração de um café. Quem mexe no slider fez a conta sozinho —
        e conta feita por si convence mais do que qualquer claim.
      </p>
      <h2>Padrões de conversão aplicados</h2>
      <ul>
        <li>Custo de oportunidade no headline ("quanto custa decidir sem saber?") antes do preço.</li>
        <li>Interação de baixo atrito: um único slider, resultado imediato, CTA dentro do card de resultado.</li>
        <li>Depoimentos orientados a retorno (contrato, timing, ritual de equipe) com cargos — e rotulados como fictícios.</li>
        <li>Fecho aforístico + CTA que devolve à calculadora: o loop de convencimento é a própria página.</li>
      </ul>
      <h2>Técnica</h2>
      <ul>
        <li>Estado React puro (<code>useState</code> + <code>useMemo</code>); nada de GSAP na conta — números interativos não devem ter easing, respondem no frame.</li>
        <li><code>input[type=range]</code> nativo com <code>accent-color</code> — acessível por teclado de graça, com <code>aria-label</code>.</li>
        <li>Formatação centralizada em um helper <code>toLocaleString("pt-BR")</code> para vírgulas corretas em toda a página.</li>
      </ul>
    </Guide>
  );
}
