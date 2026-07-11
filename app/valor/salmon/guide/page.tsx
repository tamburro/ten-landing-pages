import type { Metadata } from "next";
import { Guide } from "@/components/Guide";

export const metadata: Metadata = {
  title: "Salmon — guia de construção",
};

export default function GuidePage() {
  return (
    <Guide
      slug="valor/salmon"
      title="Valor — Salmon"
      tagline="Vender o físico pelo que a tela não faz: a página é papel salmão com textura, e o jornal se desdobra em CSS 3D no hero."
    >
      <h2>Ângulo de conversão</h2>
      <p>
        Diferenciação sensorial. Numa série onde todas as irmãs vendem velocidade e dado, esta
        vende o rito físico: a dobra, o recorte, a edição de sábado que "pede a mesa inteira".
        O plano é um só (impresso + digital) — página de produto único para o upgrade de maior
        ticket.
      </p>
      <h2>Padrões de conversão aplicados</h2>
      <ul>
        <li>Benefícios impossíveis de replicar em tela ("nenhum PDF dobra") — argumento sem contra-ataque.</li>
        <li>Card de oferta única com sombra dura navy e checklist logístico completo (horário, dias, área).</li>
        <li>Atritos declarados no microcopy (fidelidade de 12 meses, consulte área) antes do checkout.</li>
        <li>CTA com voz de dono: "Quero o salmão na porta".</li>
      </ul>
      <h2>Técnica</h2>
      <ul>
        <li>Jornal desenhado com divs (barras de texto, "gráfico" em gradiente linear) — nenhum screenshot; a folha direita desdobra com <code>rotateY −168°→0</code> sob <code>perspective: 1400px</code>.</li>
        <li>Textura de papel: <code>feTurbulence</code> inline em data-URI com <code>mix-blend-mode: multiply</code> a 5% — o grão vale para a página inteira.</li>
        <li>Paleta salmão em três tons (<code>#f6dccb</code>, <code>#f9e7dc</code>, terracota <code>#b8552a</code>) contra o navy da marca.</li>
      </ul>
    </Guide>
  );
}
