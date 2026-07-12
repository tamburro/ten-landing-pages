import type { Metadata } from "next";
import { Guide } from "@/components/Guide";

export const metadata: Metadata = {
  title: "Global — guia de construção",
};

export default function GuidePage() {
  return (
    <Guide
      slug="valor/global"
      title="Valor — Global"
      tagline="Quatro fusos no topo da página, com hora real e status de pregão calculados no navegador do visitante."
    >
      <h2>Ângulo de conversão</h2>
      <p>
        Assimetria de fuso como dor. "Entre o fechamento de Tóquio e a abertura da B3 existem
        oito horas em que o seu preço muda de dono" — a faixa de relógios no topo mostra
        Tóquio, Londres, Nova York e São Paulo com a hora real de cada praça e o pregão
        aberto/fechado, tornando a dor visível e verdadeira no momento da visita.
      </p>
      <h2>Padrões de conversão aplicados</h2>
      <ul>
        <li>Widget de relógios verdadeiro (não decorativo): quem entra às 7h vê Londres operando e o Brasil fechado — o argumento se prova sozinho.</li>
        <li>Três fios editoriais mapeados ao dia do leitor (antes de Tóquio fechar / enquanto Londres opera / quando NY dita o tom).</li>
        <li>Diferenciação explícita: "análise própria, não agência traduzida".</li>
        <li>Dourado <code>#d4a418</code> como acento exclusivo desta página dentro do sistema navy do Valor.</li>
      </ul>
      <h2>Técnica</h2>
      <ul>
        <li>Horas por <code>Intl.DateTimeFormat</code> com <code>timeZone</code> — DST correto de graça, sem biblioteca.</li>
        <li>Status de pregão comparando a hora decimal local da praça com horários de abertura/fechamento.</li>
        <li>Atualização a cada 30s (<code>setInterval</code> com cleanup); estado inicial "--:--" evita mismatch de hidratação.</li>
      </ul>
    </Guide>
  );
}
