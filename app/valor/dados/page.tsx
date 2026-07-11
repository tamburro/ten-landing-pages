"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// séries demonstrativas (fictícias, determinísticas para SSR estável)
const INDICADORES = [
  { nome: "IBOVESPA", valor: 148_212, sufixo: " pts", delta: "+0,84%", up: true, serie: [40, 44, 42, 47, 45, 52, 50, 56, 54, 60, 58, 64] },
  { nome: "DÓLAR", valor: 5.21, decimais: 2, prefixo: "R$ ", delta: "−0,32%", up: false, serie: [60, 56, 58, 52, 55, 49, 51, 46, 48, 44, 46, 41] },
  { nome: "SELIC", valor: 10.5, decimais: 2, sufixo: "% a.a.", delta: "estável", up: true, serie: [50, 50, 48, 48, 46, 46, 46, 44, 44, 44, 44, 44] },
  { nome: "IPCA 12M", valor: 3.9, decimais: 1, sufixo: "%", delta: "−0,1 p.p.", up: false, serie: [62, 60, 58, 59, 55, 54, 52, 50, 49, 47, 46, 44] },
];

function Sparkline({ serie, up }: { serie: number[]; up: boolean }) {
  const W = 120;
  const H = 40;
  const max = Math.max(...serie);
  const min = Math.min(...serie);
  const pts = serie
    .map((v, i) => {
      const x = (i / (serie.length - 1)) * W;
      const y = H - ((v - min) / (max - min || 1)) * (H - 6) - 3;
      return `${x},${y}`;
    })
    .join(" ");
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-10 w-full" aria-hidden>
      <polyline
        points={pts}
        fill="none"
        stroke={up ? "#37b24d" : "#e8590c"}
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

const CAMADAS = [
  { n: "01", t: "O número", d: "Painéis e alertas com os indicadores que movem o seu setor." },
  { n: "02", t: "O contexto", d: "A matéria que explica por que o número mexeu — e quem mexeu nele." },
  { n: "03", t: "A consequência", d: "Análise assinada sobre o que fazer com isso antes da concorrência." },
];

export default function ValorDadosPage() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (reduced) return;

      gsap.fromTo(
        ".vd-card",
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power2.out", delay: 0.2 }
      );

      gsap.utils.toArray<HTMLElement>(".vd-num").forEach((el) => {
        const target = parseFloat(el.dataset.value ?? "0");
        const dec = parseInt(el.dataset.dec ?? "0", 10);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 1.8,
          ease: "power2.out",
          delay: 0.4,
          onUpdate: () => {
            el.textContent = obj.v.toLocaleString("pt-BR", {
              minimumFractionDigits: dec,
              maximumFractionDigits: dec,
            });
          },
        });
      });

      gsap.utils.toArray<HTMLElement>(".vd-up").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 26 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 86%" },
          }
        );
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      className="min-h-screen bg-[#081a2e] text-[#e9eef5] selection:bg-[#e8590c] selection:text-white"
      style={{ fontFamily: "var(--font-valor-sans), sans-serif" }}
    >
      <style>{`
        .vd-serif { font-family: var(--font-valor-serif), serif; }
        .vd-grid-bg {
          background-image: linear-gradient(rgba(44,74,112,0.25) 1px, transparent 1px),
            linear-gradient(90deg, rgba(44,74,112,0.25) 1px, transparent 1px);
          background-size: 44px 44px;
        }
      `}</style>

      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-8">
        <span className="vd-serif text-2xl font-bold">
          Valor <span className="font-normal italic">Econômico</span>
        </span>
        <span className="hidden text-xs font-semibold tracking-[0.2em] text-[#7fa3cc] uppercase sm:block">
          painel do assinante · dados demonstrativos
        </span>
        <a href="#assinar" className="rounded bg-[#e8590c] px-5 py-2.5 text-sm font-bold text-white transition-transform hover:scale-105">
          Assinar
        </a>
      </header>

      {/* hero-painel */}
      <section className="vd-grid-bg border-y border-[#2c4a70] px-4 py-14 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <h1 className="vd-serif max-w-2xl text-4xl leading-[1.08] font-bold sm:text-5xl">
            O dia tem 4 números.
            <br />
            <em className="text-[#f6b26b]">Só o contexto tem dono.</em>
          </h1>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {INDICADORES.map((ind) => (
              <article key={ind.nome} className="vd-card rounded-lg border border-[#2c4a70] bg-[#0e2b4c]/80 p-5 backdrop-blur-sm">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-xs font-bold tracking-[0.15em] text-[#7fa3cc]">{ind.nome}</h3>
                  <span className={`text-xs font-bold ${ind.up ? "text-[#37b24d]" : "text-[#e8590c]"}`}>
                    {ind.delta}
                  </span>
                </div>
                <p className="vd-serif mt-2 text-3xl font-bold tabular-nums">
                  {ind.prefixo}
                  <span className="vd-num" data-value={ind.valor} data-dec={ind.decimais ?? 0}>
                    {ind.valor.toLocaleString("pt-BR", {
                      minimumFractionDigits: ind.decimais ?? 0,
                      maximumFractionDigits: ind.decimais ?? 0,
                    })}
                  </span>
                  <span className="text-base font-normal text-[#7fa3cc]">{ind.sufixo}</span>
                </p>
                <div className="mt-3">
                  <Sparkline serie={ind.serie} up={ind.up} />
                </div>
              </article>
            ))}
          </div>
          <p className="mt-4 text-[11px] text-[#54739a]">
            Valores demonstrativos, congelados para fins de portfólio — no produto real, em tempo quase-real.
          </p>
        </div>
      </section>

      {/* camadas de valor */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-8">
        <h2 className="vd-serif vd-up max-w-xl text-3xl font-bold sm:text-4xl">
          Número sem leitura é ruído.
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {CAMADAS.map((c) => (
            <article key={c.n} className="vd-up rounded-lg border border-[#2c4a70] p-6">
              <p className="vd-serif text-4xl font-bold text-[#e8590c]">{c.n}</p>
              <h3 className="mt-3 text-lg font-bold">{c.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#b9c9dc]">{c.d}</p>
            </article>
          ))}
        </div>
      </section>

      {/* oferta */}
      <section id="assinar" className="border-t border-[#2c4a70] bg-[#0e2b4c] px-4 py-16 sm:px-8">
        <div className="mx-auto grid max-w-4xl items-center gap-10 sm:grid-cols-2">
          <div className="vd-up">
            <h2 className="vd-serif text-3xl font-bold sm:text-4xl">
              Assine o painel
              <br />
              <em className="text-[#f6b26b]">com a redação atrás.</em>
            </h2>
            <ul className="mt-6 space-y-2 text-sm text-[#b9c9dc]">
              <li>✓ Valor Data completo no app e na web</li>
              <li>✓ Alertas por indicador e por setor</li>
              <li>✓ Todas as matérias e colunas, sem limite</li>
              <li>✓ Opcional: impresso na mesa até 7h30</li>
            </ul>
          </div>
          <div className="vd-up rounded-xl border border-[#2c4a70] bg-[#081a2e] p-8 text-center">
            <p className="text-xs font-bold tracking-[0.2em] text-[#7fa3cc] uppercase">digital</p>
            <p className="vd-serif mt-2 text-6xl font-bold">
              R$ 34,90
            </p>
            <p className="text-xs text-[#7fa3cc]">/mês* nos 12 primeiros meses</p>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="mt-6 block rounded bg-[#e8590c] py-3.5 text-sm font-bold text-white transition-transform hover:scale-[1.02]"
            >
              Começar a assinar
            </a>
            <p className="mt-3 text-[11px] text-[#54739a]">
              *Valor ilustrativo de portfólio. + Impresso: R$ 89,90/mês. Cancele o digital quando quiser.
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#2c4a70] px-4 py-6 text-xs text-[#54739a] sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3">
          <span>Página conceitual de portfólio — sem vínculo oficial com o Valor Econômico / Globo.</span>
          <Link href="/valor/dados/guide" className="underline underline-offset-2 hover:text-[#f6b26b]">
            Como esta página foi feita →
          </Link>
        </div>
      </footer>
    </div>
  );
}
