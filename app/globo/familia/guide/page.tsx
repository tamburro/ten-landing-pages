import type { Metadata } from "next";
import { Guide } from "@/components/Guide";

export const metadata: Metadata = {
  title: "Família — guia de construção",
};

export default function GuidePage() {
  return (
    <Guide
      slug="globo/familia"
      title="O GLOBO — Família"
      tagline="Venda por divisão: o preço deixa de ser custo individual e vira o menor preço por leitor da casa."
    >
      <h2>Ângulo de conversão</h2>
      <p>
        Reenquadramento de valor: "R$ 19,90 para todo mundo" transforma a comparação mental de
        <em> jornal vs. streaming</em> em <em>R$ 5 por pessoa</em>. Os quatro perfis são
        apresentados como pessoas (quem decide, quem estuda, quem cozinha, quem torce) antes de
        qualquer tabela — benefício antes de feature.
      </p>
      <h2>Padrões de conversão aplicados</h2>
      <ul>
        <li>Tabela comparativa com coluna do meio destacada (ancoragem no plano-alvo) e CTAs dentro da própria tabela.</li>
        <li>Depoimento com objeção real resolvida ("acabou a disputa pelo login").</li>
        <li>FAQ com as 4 objeções de checkout: perfis, upgrade, fidelidade, área de entrega — em <code>&lt;details&gt;</code> nativo, acessível de graça.</li>
        <li>CTA final repete preço e plano — quem chegou ao fim decide sem rolar de volta.</li>
      </ul>
      <h2>Técnica</h2>
      <ul>
        <li>Tom visual distinto das irmãs: azul-claro <code>#eef5fd</code>, cantos grandes, blobs orgânicos (border-radius assimétrico) flutuando em yoyo GSAP.</li>
        <li>Tabela rola horizontalmente no mobile dentro do próprio card (<code>overflow-x-auto</code>) — nada quebra.</li>
        <li>Acordeão 100% nativo (<code>details/summary</code>), só o "+" gira via CSS quando aberto.</li>
      </ul>
    </Guide>
  );
}
