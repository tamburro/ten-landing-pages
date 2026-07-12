import type { Metadata } from "next";
import { Guide } from "@/components/Guide";

export const metadata: Metadata = {
  title: "Presente — guia de construção",
};

export default function GuidePage() {
  return (
    <Guide
      slug="globo/presente"
      title="O GLOBO — Presente"
      tagline="Configurador emocional: ocasião, duração e cartão escrito na hora — e o vale-presente se monta ao vivo na tela."
    >
      <h2>Ângulo de conversão</h2>
      <p>
        Gifting. O comprador não é o leitor, então a página não vende jornalismo — vende um
        presente que "fica o ano inteiro" contra flor e vinho. O centro é um configurador de três
        toques (ocasião → duração → cartão) cujo resultado aparece imediatamente no vale-presente
        ao lado, com a mensagem digitada em itálico serifado.
      </p>
      <h2>Padrões de conversão aplicados</h2>
      <ul>
        <li>Preview ao vivo = posse antecipada: quem escreveu o cartão já deu o presente.</li>
        <li>As três objeções do gifting resolvidas em "como funciona": pagamento único sem renovação, entrega agendada, ativação sem cartão de quem recebe.</li>
        <li>CTA final dinâmico que repete a escolha ("1 ano de jornal por R$ 94,80*") — confirmação, não venda.</li>
        <li>Duração default no plano de 12 meses (ancoragem no maior ticket).</li>
      </ul>
      <h2>Técnica</h2>
      <ul>
        <li>Estado React puro para o configurador; GSAP só na apresentação (cartão entra com <code>rotateY</code> em perspectiva e flutua em yoyo).</li>
        <li>A fita do presente são duas faixas <code>bg-white/20</code> cruzadas; nenhum asset.</li>
        <li><code>textarea</code> com <code>maxLength</code> e <code>min-height</code> reservada no cartão para não pular layout enquanto digita.</li>
      </ul>
    </Guide>
  );
}
