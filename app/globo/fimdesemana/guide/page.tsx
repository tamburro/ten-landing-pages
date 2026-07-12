import type { Metadata } from "next";
import { Guide } from "@/components/Guide";

export const metadata: Metadata = {
  title: "Fim de semana — guia de construção",
};

export default function GuidePage() {
  return (
    <Guide
      slug="globo/fimdesemana"
      title="O GLOBO — Fim de semana"
      tagline="O plano híbrido certo para quem não quer impresso diário: tela na semana, papel no sábado — e os cadernos se espalham na mesa."
    >
      <h2>Ângulo de conversão</h2>
      <p>
        Downsell inteligente do impresso. Muita gente quer papel, mas não sete dias por semana.
        A página assume a tela ("a semana pode ser tela") e vende só o ritual que o digital não
        substitui: a edição gorda de sábado e domingo, por metade do preço do impresso diário.
      </p>
      <h2>Padrões de conversão aplicados</h2>
      <ul>
        <li>Produto híbrido explicado em uma linha no topo: "impresso sáb + dom · digital a semana inteira".</li>
        <li>Os cadernos como cards que caem e se espalham levemente rotacionados — a "mesa de sábado" visualizada.</li>
        <li>Ritual em três atos com horários (8h, 9h, 11h) — narrativa sensorial, do "baque na porta" à divisão dos cadernos.</li>
        <li>Plano único com preço-âncora contra o impresso diário e atritos declarados (fidelidade, área de entrega).</li>
      </ul>
      <h2>Técnica</h2>
      <ul>
        <li>Cards de caderno com <code>border-top</code> na cor editorial de cada um e rotações finais distintas por índice via função no <code>gsap.fromTo</code>.</li>
        <li>Paleta de papel envelhecido (<code>#f7f1e5</code>/<code>#efe6d4</code>) com vinho <code>#a61e4d</code> — quente e analógica, distinta das irmãs azuis.</li>
        <li>Easings longos e stagger alto: a página se move no andamento do produto, devagar.</li>
      </ul>
    </Guide>
  );
}
