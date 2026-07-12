import type { Metadata } from "next";
import { Guide } from "@/components/Guide";

export const metadata: Metadata = {
  title: "Equipes — guia de construção",
};

export default function GuidePage() {
  return (
    <Guide
      slug="valor/equipes"
      title="Valor — Equipes"
      tagline="B2B com cotação ao vivo: um slider de assentos, faixas de desconto e a economia contra assinaturas individuais calculada na hora."
    >
      <h2>Ângulo de conversão</h2>
      <p>
        Dor operacional, não editorial. O inimigo é o print torto no grupo e o reembolso de
        assinatura pessoal — "informação estratégica não escala por CC de e-mail". O centro é uma
        calculadora de assentos com preço unitário decrescente por faixa, que mostra o total, o
        comparativo contra N assinaturas individuais e a economia em verde.
      </p>
      <h2>Padrões de conversão aplicados</h2>
      <ul>
        <li>Cotação self-service antes do contato comercial — o lead chega sabendo o preço.</li>
        <li>Tabela de faixas visível sob o slider: transparência de pricing corporativo.</li>
        <li>Recursos endereçados a quem aprova (painel do gestor, NF única, SSO), não a quem lê.</li>
        <li>CTA honesto de B2B: "Falar com o time comercial" — ticket alto não fecha em botão.</li>
        <li>Depoimento de persona compradora (head de operações), rotulado como fictício.</li>
      </ul>
      <h2>Técnica</h2>
      <ul>
        <li>Pricing por função pura (<code>precoPorAssento</code>) + <code>useMemo</code>; total, comparativo e economia derivam do mesmo estado — nunca desalinham.</li>
        <li><code>tabular-nums</code> em todos os números da cotação para o slider não fazer o layout tremer.</li>
        <li>Slider nativo com <code>accent-color</code> laranja e <code>aria-label</code>.</li>
      </ul>
    </Guide>
  );
}
