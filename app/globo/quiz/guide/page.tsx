import type { Metadata } from "next";
import { Guide } from "@/components/Guide";

export const metadata: Metadata = {
  title: "Quiz — guia de construção",
};

export default function GuidePage() {
  return (
    <Guide
      slug="globo/quiz"
      title="O GLOBO — Quiz"
      tagline="Diagnóstico gamificado: três perguntas sobre 'ontem', feedback com contexto de assinante e um CTA que muda conforme a nota."
    >
      <h2>Ângulo de conversão</h2>
      <p>
        Consciência do problema antes da oferta. O visitante não é convencido — é <em>testado</em>.
        Cada resposta revela o "contexto de assinante" (o parágrafo que ele teria lido), fazendo o
        produto aparecer três vezes antes do preço. O veredito final tem quatro versões por
        pontuação, e o CTA acompanha: quem gabarita lê "oficializar minha assinatura"; quem erra,
        "nunca mais perder um ontem".
      </p>
      <h2>Padrões de conversão aplicados</h2>
      <ul>
        <li>Quiz de 3 passos com barra de progresso — compromisso incremental barato.</li>
        <li>Feedback imediato certo/errado com cores semânticas e o contexto como amostra do produto.</li>
        <li>Oferta enquadrada como "remédio" do diagnóstico que o próprio visitante gerou.</li>
        <li>"Refazer o teste" mantém quem não converteu dentro do loop.</li>
      </ul>
      <h2>Técnica</h2>
      <ul>
        <li>Máquina de estados mínima em React: etapa, respostas acumuladas e escolha corrente; veredito derivado por lookup de faixa.</li>
        <li>Opções desabilitadas após a escolha (<code>disabled</code>) para impedir replay da mesma pergunta; resultado em <code>role="status"</code>.</li>
        <li>Fundo azul de marca com o cartão branco central — padrão de typeform, hierarquia de um item por vez.</li>
      </ul>
    </Guide>
  );
}
