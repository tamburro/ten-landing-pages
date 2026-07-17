import type { Metadata } from "next";
import { Guide } from "@/components/Guide";

export const metadata: Metadata = {
  title: "Sinal — guia de construção",
};

export default function GuidePage() {
  return (
    <Guide
      slug="valor/sinal"
      title="Valor — Sinal"
      tagline="Um interruptor muda a página inteira de estado: do feed escuro que treme e grita para uma análise clara em fundo de papel."
    >
      <h2>Ângulo de conversão</h2>
      <p>
        Contraste vivido. A página abre no modo <em>ruído</em>: fundo escuro, headline tremendo
        (<code>vsg-shake</code>), três marquees dessincronizados de manchetes de rede social
        (caps, emoji, urgência falsa). Um switch rotulado ruído/sinal inverte tudo — fundo de
        papel, uma única análise serifada em corpo de leitura, silêncio. O CTA fecha a metáfora:
        "Desligar o ruído".
      </p>
      <h2>Padrões de conversão aplicados</h2>
      <ul>
        <li>O problema é sentido fisicamente (velocidade, tremor, cores de alerta) antes de qualquer argumento.</li>
        <li>A amostra do sinal é uma análise fictícia completa e boa de ler — produto como prova, com a régua editorial no rodapé.</li>
        <li>Todo o chrome (header, oferta, footer) transiciona junto entre os modos — coerência de estado total.</li>
      </ul>
      <h2>Técnica</h2>
      <ul>
        <li>Um único estado booleano; cores trocam por classes condicionais + <code>transition-colors duration-700</code>.</li>
        <li>Switch com semântica correta: <code>role="switch"</code> + <code>aria-checked</code>.</li>
        <li>Marquees em três velocidades/direções (16s, 11s reverso, 21s) para o caos parecer orgânico; tremor e marquees desligam com <code>prefers-reduced-motion</code>.</li>
      </ul>
    </Guide>
  );
}
