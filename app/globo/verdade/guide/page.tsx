import type { Metadata } from "next";
import { Guide } from "@/components/Guide";

export const metadata: Metadata = {
  title: "Verdade — guia de construção",
};

export default function GuidePage() {
  return (
    <Guide
      slug="globo/verdade"
      title="O GLOBO — Verdade"
      tagline="Assinatura como causa: a página risca o boato, carimba o 'não checado' e vende o trabalho de verificar."
    >
      <h2>Ângulo de conversão</h2>
      <p>
        Propósito com produto dentro. Em vez de vender acesso, a página vende o custo invisível
        do jornalismo — "checar dá trabalho; é esse o produto" — e transforma a mensalidade em
        financiamento de um método. O hero encena isso: a frase "li num grupo que é verdade" é
        riscada em vermelho e recebe um carimbo NÃO CHECADO que bate na tela.
      </p>
      <h2>Padrões de conversão aplicados</h2>
      <ul>
        <li>Demonstração boato × fato em pares lado a lado, com tempo de checagem — o valor vira mensurável (e rotulado como ilustrativo).</li>
        <li>"Contrato editorial" em 3 cláusulas concretas (duas fontes, contraditório, correção pública) — princípios como termos de serviço.</li>
        <li>CTA de identidade: "Financiar jornalismo checado" — quem clica está se declarando.</li>
        <li>Preço promocional com o preço cheio na mesma linha; sem carimbo de urgência, coerente com o tom.</li>
      </ul>
      <h2>Técnica</h2>
      <ul>
        <li>Risco animado por <code>background-size</code> (0%→100% de uma linha de 3px) — mais controlável que <code>text-decoration</code>.</li>
        <li>Carimbo com <code>scale 2.2→1</code> e <code>power4.in</code>: acelera até o impacto, como um carimbo de verdade.</li>
        <li>Design mais seco da série: branco, tinta, azul e um único vermelho semântico para o falso.</li>
      </ul>
    </Guide>
  );
}
