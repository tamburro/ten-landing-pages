"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const BENEFICIOS = [
  {
    t: "Análise, não manchete",
    d: "O fato todo mundo tem em segundos. O que ele significa para a sua empresa, só quem apura setor por setor.",
  },
  {
    t: "Colunistas do mercado",
    d: "Quem escreve aqui conversa com quem decide — e assina embaixo do que ouve.",
  },
  {
    t: "Valor Data",
    d: "Séries históricas, câmbio, curva de juros e balanços organizados para citar em reunião.",
  },
];

const PLANOS = [
  {
    nome: "Digital",
    preco: "34,90",
    obs: "por mês* nos 12 primeiros meses",
    itens: ["Site e app ilimitados", "Newsletter Valor PRO manhã", "Valor Data essencial"],
    destaque: false,
  },
  {
    nome: "Digital + Impresso",
    preco: "89,90",
    obs: "por mês* · edição na mesa até 7h30",
    itens: [
      "Tudo do Digital",
      "Jornal impresso de seg. a sáb.",
      "Revistas e anuários setoriais",
      "Acesso para 1 convidado da equipe",
    ],
    destaque: true,
  },
];

export default function ValorProPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const path = pathRef.current;
      if (path && !reduced) {
        const len = path.getTotalLength();
        gsap.fromTo(
          path,
          { strokeDasharray: len, strokeDashoffset: len },
          { strokeDashoffset: 0, duration: 2.4, ease: "power2.inOut", delay: 0.3 }
        );
      }
      if (reduced) return;

      gsap.fromTo(
        ".vp-hero-el",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: "power2.out", delay: 0.2 }
      );
      gsap.utils.toArray<HTMLElement>(".vp-up").forEach((el) => {
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
      className="min-h-screen bg-[#0e2b4c] text-[#e9eef5] selection:bg-[#e8590c] selection:text-white"
      style={{ fontFamily: "var(--font-valor-sans), sans-serif" }}
    >
      <style>{`.vp-serif { font-family: var(--font-valor-serif), serif; }`}</style>

      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-8">
        <span className="vp-serif text-2xl font-bold tracking-tight">
          Valor <span className="font-normal italic">Econômico</span>
        </span>
        <a
          href="#planos"
          className="rounded bg-[#e8590c] px-5 py-2.5 text-sm font-bold text-white transition-transform hover:scale-105"
        >
          Assinar
        </a>
      </header>

      {/* hero com gráfico */}
      <section className="relative mx-auto max-w-6xl overflow-hidden px-4 pt-14 pb-24 sm:px-8">
        <svg
          viewBox="0 0 800 300"
          className="pointer-events-none absolute right-0 bottom-0 w-full max-w-3xl opacity-40"
          aria-hidden
        >
          {[60, 120, 180, 240].map((y) => (
            <line key={y} x1="0" y1={y} x2="800" y2={y} stroke="#2c4a70" strokeWidth="1" />
          ))}
          <path
            ref={pathRef}
            d="M0,260 L60,244 L120,252 L180,214 L240,226 L300,180 L360,196 L420,150 L480,166 L540,118 L600,132 L660,84 L720,96 L800,42"
            fill="none"
            stroke="#e8590c"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <circle cx="800" cy="42" r="5" fill="#e8590c" />
        </svg>

        <div className="relative max-w-2xl">
          <p className="vp-hero-el text-xs font-bold tracking-[0.3em] text-[#7fa3cc] uppercase">
            O diário da economia brasileira
          </p>
          <h1 className="vp-serif vp-hero-el mt-4 text-4xl leading-[1.06] font-bold sm:text-6xl">
            Quem decide
            <br />
            <em className="text-[#f6b26b]">lê antes.</em>
          </h1>
          <p className="vp-hero-el mt-6 max-w-lg text-lg leading-relaxed text-[#b9c9dc]">
            A reunião das 9h começa às 6h30, quando o Valor chega. Assine o
            jornal que as mesas de operação, os conselhos e o seu concorrente
            leem primeiro.
          </p>
          <div className="vp-hero-el mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#planos"
              className="rounded bg-[#e8590c] px-8 py-4 text-base font-bold text-white shadow-[0_14px_30px_-12px_rgba(232,89,12,0.6)] transition-transform hover:scale-[1.03]"
            >
              Assinar o Valor
            </a>
            <span className="text-sm text-[#7fa3cc]">a partir de R$ 34,90/mês*</span>
          </div>
          <ul className="vp-hero-el mt-10 flex flex-wrap gap-x-10 gap-y-3 text-sm text-[#b9c9dc]">
            <li>
              <strong className="vp-serif block text-2xl text-white">25 anos</strong>
              de cobertura de mercado
            </li>
            <li>
              <strong className="vp-serif block text-2xl text-white">120+</strong>
              jornalistas especializados
            </li>
            <li>
              <strong className="vp-serif block text-2xl text-white">6h30</strong>
              edição fechada e entregue
            </li>
          </ul>
        </div>
      </section>

      {/* benefícios */}
      <section className="border-y border-[#2c4a70] bg-[#0a2038] px-4 py-16 sm:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-3">
          {BENEFICIOS.map((b) => (
            <article key={b.t} className="vp-up border-l-2 border-[#e8590c] pl-5">
              <h3 className="vp-serif text-xl font-bold">{b.t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#b9c9dc]">{b.d}</p>
            </article>
          ))}
        </div>
      </section>

      {/* planos */}
      <section id="planos" className="mx-auto max-w-4xl px-4 py-16 sm:px-8">
        <h2 className="vp-serif vp-up text-center text-3xl font-bold sm:text-4xl">
          Escolha seu acesso
        </h2>
        <p className="vp-up mt-2 text-center text-sm text-[#7fa3cc]">
          *Valores ilustrativos de portfólio.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {PLANOS.map((p) => (
            <article
              key={p.nome}
              className={`vp-up flex flex-col rounded-lg p-8 ${
                p.destaque
                  ? "bg-[#f9e7dc] text-[#0e2b4c]"
                  : "border border-[#2c4a70] bg-[#0a2038]"
              }`}
            >
              {p.destaque && (
                <p className="text-[11px] font-bold tracking-widest text-[#e8590c] uppercase">
                  o ritual completo
                </p>
              )}
              <h3 className="vp-serif mt-1 text-2xl font-bold">{p.nome}</h3>
              <p className="mt-4">
                <span className="align-top text-lg font-semibold">R$</span>
                <span className="vp-serif text-6xl font-bold">{p.preco}</span>
              </p>
              <p className={`text-xs ${p.destaque ? "text-[#5c6570]" : "text-[#7fa3cc]"}`}>{p.obs}</p>
              <ul className={`mt-6 flex-1 space-y-2 text-sm ${p.destaque ? "text-[#38506c]" : "text-[#b9c9dc]"}`}>
                {p.itens.map((i) => (
                  <li key={i}>✓ {i}</li>
                ))}
              </ul>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className={`mt-8 block rounded py-3.5 text-center text-sm font-bold transition-transform hover:scale-[1.02] ${
                  p.destaque
                    ? "bg-[#e8590c] text-white"
                    : "border border-[#7fa3cc] text-[#e9eef5] hover:border-[#e8590c] hover:text-[#f6b26b]"
                }`}
              >
                Assinar {p.nome}
              </a>
            </article>
          ))}
        </div>
        <p className="vp-up mt-8 text-center text-sm text-[#7fa3cc]">
          Nota fiscal para reembolso corporativo · cancele o digital quando quiser
        </p>
      </section>

      <footer className="border-t border-[#2c4a70] px-4 py-6 text-xs text-[#7fa3cc] sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3">
          <span>Página conceitual de portfólio — sem vínculo oficial com o Valor Econômico / Globo.</span>
          <Link href="/valor/pro/guide" className="underline underline-offset-2 hover:text-[#f6b26b]">
            Como esta página foi feita →
          </Link>
        </div>
      </footer>
    </div>
  );
}
