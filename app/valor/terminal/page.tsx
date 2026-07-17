"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const TICKERS = [
  { s: "IBOV", nome: "Ibovespa", v: "148.212", d: "+0,84%", up: true, serie: [30, 34, 32, 38, 36, 42, 40, 47, 45, 52], nota: "Fluxo estrangeiro positivo pelo 4º pregão; bancos puxam a alta." },
  { s: "USDBRL", nome: "Dólar", v: "5,21", d: "−0,32%", up: false, serie: [52, 50, 53, 48, 49, 45, 47, 43, 44, 40], nota: "Real segue commodities; mercado testa piso de R$ 5,18." },
  { s: "DI27", nome: "Juro jan/27", v: "10,86", d: "−0,05 pp", up: false, serie: [55, 54, 52, 53, 50, 49, 48, 46, 47, 44], nota: "Curva precifica corte em duas reuniões; ata reforçou o tom." },
  { s: "PETR4", nome: "Petrobras PN", v: "41,87", d: "+1,12%", up: true, serie: [28, 30, 29, 33, 35, 34, 38, 40, 39, 44], nota: "Brent acima de US$ 84 e produção recorde no pré-sal." },
];

const FEED_INICIAL = [
  "09:58 · Ata do Copom reforça cautela com serviços",
  "09:41 · Varejo de março vem acima do consenso",
  "09:15 · Tesouro anuncia leilão extraordinário de NTN-B",
];

const FEED_NOVAS = [
  "10:12 · Petrobras confirma recorde de produção no tri",
  "10:26 · Fluxo estrangeiro soma R$ 2,1 bi na semana",
  "10:40 · Focus: mediana do IPCA 2026 cai a 3,8%",
  "10:55 · BNDES aprova linha de R$ 8 bi para transmissão",
];

function Mini({ serie, up, grande }: { serie: number[]; up: boolean; grande?: boolean }) {
  const W = grande ? 260 : 64;
  const H = grande ? 90 : 24;
  const max = Math.max(...serie);
  const min = Math.min(...serie);
  const pts = serie
    .map((v, i) => `${(i / (serie.length - 1)) * W},${H - ((v - min) / (max - min || 1)) * (H - 6) - 3}`)
    .join(" ");
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={grande ? "h-24 w-full" : "h-6 w-16"} aria-hidden>
      <polyline points={pts} fill="none" stroke={up ? "#37b24d" : "#e8590c"} strokeWidth={grande ? 2.5 : 1.8} strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

export default function ValorTerminalPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [sel, setSel] = useState(0);
  const [feed, setFeed] = useState(FEED_INICIAL);

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      if (i < FEED_NOVAS.length) {
        setFeed((f) => [FEED_NOVAS[i], ...f].slice(0, 5));
        i++;
      }
    }, 4000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (reduced) return;
      gsap.fromTo(
        ".vt-hero-el",
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power2.out", delay: 0.15 }
      );
      gsap.fromTo(
        ".vt-laptop",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, ease: "power3.out", delay: 0.4 }
      );
      gsap.utils.toArray<HTMLElement>(".vt-up").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 26 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 87%" } }
        );
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const t = TICKERS[sel];

  return (
    <div
      ref={rootRef}
      className="min-h-screen bg-[#0a1626] text-[#e9eef5] selection:bg-[#e8590c] selection:text-white"
      style={{ fontFamily: "var(--font-valor-sans), sans-serif" }}
    >
      <style>{`.vt-serif { font-family: var(--font-valor-serif), serif; }`}</style>

      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-8">
        <span className="vt-serif text-2xl font-bold">
          Valor <span className="rounded bg-[#e8590c] px-2 py-0.5 text-sm font-bold text-white uppercase">PRO</span>
        </span>
        <a href="#assinar" className="rounded bg-[#e8590c] px-5 py-2.5 text-sm font-bold text-white transition-transform hover:scale-105">
          Assinar o PRO
        </a>
      </header>

      {/* hero */}
      <section className="mx-auto max-w-6xl px-4 pt-8 pb-6 text-center sm:px-8">
        <p className="vt-hero-el text-xs font-bold tracking-[0.3em] text-[#7fa3cc] uppercase">
          jornal + dados na mesma tela
        </p>
        <h1 className="vt-serif vt-hero-el mt-4 text-4xl leading-[1.06] font-bold sm:text-6xl">
          O terminal de quem
          <br />
          <em className="text-[#f6b26b]">não pode esperar a manchete.</em>
        </h1>
        <p className="vt-hero-el mx-auto mt-5 max-w-xl text-lg text-[#b9c9dc]">
          Clique nos ativos da watchlist aí embaixo — o terminal é de verdade.
          Cotações demonstrativas; a redação atrás delas, não.
        </p>
      </section>

      {/* laptop */}
      <section className="mx-auto max-w-5xl px-4 pb-20 sm:px-8">
        <div className="vt-laptop">
          {/* tela */}
          <div className="rounded-t-2xl border-[10px] border-b-0 border-[#1c2a3d] bg-[#060d17] p-4 shadow-[0_50px_100px_-40px_rgba(0,0,0,0.8)]">
            {/* barra do app */}
            <div className="flex items-center justify-between border-b border-[#1c2a3d] pb-2 text-[11px]">
              <span className="vt-serif font-bold">
                Valor <span className="text-[#e8590c]">PRO</span>
              </span>
              <span className="hidden text-[#54739a] sm:block">⌘K para buscar ativo, matéria ou série</span>
              <span className="flex items-center gap-1.5 text-[#37b24d]">
                <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-[#37b24d]" /> ao vivo
              </span>
            </div>

            <div className="mt-3 grid gap-3 sm:grid-cols-[180px_1fr_220px]">
              {/* watchlist */}
              <div className="rounded-lg border border-[#1c2a3d] p-2">
                <p className="px-1 pb-1 text-[9px] font-bold tracking-[0.2em] text-[#54739a] uppercase">watchlist</p>
                {TICKERS.map((tk, i) => (
                  <button
                    key={tk.s}
                    onClick={() => setSel(i)}
                    className={`flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left text-[11px] transition-colors ${
                      i === sel ? "bg-[#e8590c]/15 text-white" : "text-[#b9c9dc] hover:bg-white/5"
                    }`}
                    aria-pressed={i === sel}
                  >
                    <span className="font-bold">{tk.s}</span>
                    <span className={`tabular-nums ${tk.up ? "text-[#37b24d]" : "text-[#e8590c]"}`}>{tk.d}</span>
                  </button>
                ))}
              </div>

              {/* gráfico */}
              <div className="rounded-lg border border-[#1c2a3d] p-3">
                <div className="flex items-baseline justify-between">
                  <div>
                    <p className="text-[11px] font-bold text-[#7fa3cc]">{t.nome}</p>
                    <p className="vt-serif text-2xl font-bold tabular-nums">{t.v}</p>
                  </div>
                  <span className={`text-sm font-bold tabular-nums ${t.up ? "text-[#37b24d]" : "text-[#e8590c]"}`}>{t.d}</span>
                </div>
                <div className="mt-2">
                  <Mini serie={t.serie} up={t.up} grande />
                </div>
                <p className="mt-2 border-t border-[#1c2a3d] pt-2 text-[11px] leading-relaxed text-[#b9c9dc]">
                  <span className="font-bold text-[#f6b26b]">análise da redação — </span>
                  {t.nota}
                </p>
              </div>

              {/* feed */}
              <div className="rounded-lg border border-[#1c2a3d] p-2">
                <p className="px-1 pb-1 text-[9px] font-bold tracking-[0.2em] text-[#54739a] uppercase">tempo real</p>
                <ul className="space-y-1.5" aria-live="polite">
                  {feed.map((n) => (
                    <li key={n} className="rounded-md bg-white/[0.03] px-2 py-1.5 text-[10px] leading-snug text-[#b9c9dc]">
                      {n}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          {/* base do laptop */}
          <div className="mx-auto h-4 rounded-b-2xl bg-[#1c2a3d]" />
          <div className="mx-auto h-1.5 w-1/3 rounded-b-xl bg-[#141f2e]" />
        </div>
        <p className="mt-3 text-center text-[11px] text-[#54739a]">Cotações e notas demonstrativas, congeladas para o portfólio.</p>
      </section>

      {/* argumentos */}
      <section className="border-y border-[#1c2a3d] bg-[#0e2b4c] px-4 py-14 sm:px-8">
        <div className="mx-auto grid max-w-5xl gap-8 sm:grid-cols-3">
          {[
            { t: "Preço com contexto", d: "Todo ativo carrega a última análise da redação — o número e o porquê, lado a lado." },
            { t: "Alertas operáveis", d: "Não 'o dólar subiu': o quê, quanto, e a matéria de 2 parágrafos que explica." },
            { t: "Séries exportáveis", d: "CSV de qualquer série do Valor Data direto para a sua planilha de comitê." },
          ].map((b) => (
            <article key={b.t} className="vt-up border-l-2 border-[#e8590c] pl-5">
              <h3 className="vt-serif text-xl font-bold">{b.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#b9c9dc]">{b.d}</p>
            </article>
          ))}
        </div>
      </section>

      {/* oferta */}
      <section id="assinar" className="px-4 py-16 sm:px-8">
        <div className="vt-up mx-auto max-w-lg rounded-xl border border-[#1c2a3d] bg-[#060d17] p-8 text-center">
          <p className="text-xs font-bold tracking-[0.25em] text-[#7fa3cc] uppercase">valor pro · anual</p>
          <p className="vt-serif mt-3 text-6xl font-bold">R$ 119</p>
          <p className="text-xs text-[#7fa3cc]">/mês* no plano anual · inclui o jornal completo</p>
          <ul className="mx-auto mt-5 max-w-xs space-y-1.5 text-left text-sm text-[#b9c9dc]">
            <li>✓ Terminal com watchlist e alertas</li>
            <li>✓ Valor Data completo + exportação</li>
            <li>✓ Todas as análises e colunas do diário</li>
          </ul>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="mt-7 block rounded bg-[#e8590c] py-3.5 text-sm font-bold text-white transition-transform hover:scale-[1.02]"
          >
            Testar o PRO por 14 dias
          </a>
          <p className="mt-3 text-[11px] text-[#54739a]">*Valor ilustrativo de portfólio. Trial sem cartão.</p>
        </div>
      </section>

      <footer className="border-t border-[#1c2a3d] px-4 py-6 text-xs text-[#54739a] sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3">
          <span>Página conceitual de portfólio — sem vínculo oficial com o Valor Econômico / Globo.</span>
          <Link href="/valor/terminal/guide" className="underline underline-offset-2 hover:text-[#f6b26b]">
            Como esta página foi feita →
          </Link>
        </div>
      </footer>
    </div>
  );
}
