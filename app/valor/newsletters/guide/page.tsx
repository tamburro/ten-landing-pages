import type { Metadata } from "next";
import { Guide } from "@/components/Guide";

export const metadata: Metadata = {
  title: "Newsletters — guia de construção",
};

export default function GuidePage() {
  return (
    <Guide
      slug="valor/newsletters"
      title="Valor — Newsletters"
      tagline="Um configurador de caixa de entrada: marque newsletters à esquerda e o inbox de amanhã se monta à direita, ordenado por horário."
    >
      <h2>Ângulo de conversão</h2>
      <p>
        Personalização como prévia de posse. O visitante monta a própria manhã: seis newsletters
        com horário e proposta, e um mock de cliente de e-mail que reflete a seleção em tempo
        real — com assunto plausível, remetente e bolinha de não-lido. O rodapé do inbox soma o
        custo de atenção (~4 min por newsletter), vendendo volume controlado, não volume.
      </p>
      <h2>Padrões de conversão aplicados</h2>
      <ul>
        <li>Endowment effect: a caixa montada já parece do visitante antes de assinar — e o CTA confirma: "assinar com a minha seleção".</li>
        <li>Duas pré-marcadas (Manhã, Fechamento) — default com âncora de uso, não página vazia.</li>
        <li>Estado vazio com personalidade ("como o resto da internet quer que ela fique").</li>
        <li>Anti-objeção de spam explícita: contagem de minutos + "zero spam" + gerenciar em um clique.</li>
      </ul>
      <h2>Técnica</h2>
      <ul>
        <li>Seleção em <code>Set</code> no estado; o inbox deriva ordenando por horário (<code>localeCompare</code>) — chegada cronológica de verdade.</li>
        <li>Checkboxes nativos com <code>accent-color</code> dentro de <code>label</code> — área de clique inteira, acessível sem JS extra.</li>
        <li>Inbox em <code>aria-live="polite"</code>; preview <code>sticky</code> acompanha a rolagem do seletor no desktop.</li>
      </ul>
    </Guide>
  );
}
