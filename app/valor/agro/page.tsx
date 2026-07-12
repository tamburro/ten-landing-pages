"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const BOARD = [
  { c: "SOJA", u: "sc 60kg", v: "R$ 128,40", d: "+1,2%", up: true },
  { c: "MILHO", u: "sc 60kg", v: "R$ 61,75", d: "−0,4%", up: false },
  { c: "BOI GORDO", u: "@", v: "R$ 312,90", d: "+0,8%", up: true },
  { c: "CAFÉ", u: "sc 60kg", v: "R$ 1.840,00", d: "+2,1%", up: true },
  { c: "ALGODÃO", u: "lb", v: "US¢ 82,3", d: "−1,1%", up: false },
];

const COBERTURA = [
  { t: "Clima que vira preço", d: "O veranico de janeiro no boletim de terça, não no prejuízo de março." },
  { t: "Crédito e Plano Safra", d: "Juro, subvenção e o que muda no custeio — traduzido antes da assinatura do contrato." },
  { t: "Logística e barter", d: "Frete, armazenagem e a relação de troca acompanhadas semana a semana." },
  { t: "Chicago em português", d: "O que a CBOT decidiu de madrugada, explicado antes do Brasil abrir." },
];

export default function ValorAgroPage() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (reduced) return;
      gsap.fromTo(
        ".vg-hero-el",
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power2.out", delay: 0.15 }
      );
      gsap.fromTo(
        ".vg-board-item",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power2.out", delay: 0.5 }
      );
      gsap.utils.toArray<HTMLElement>(".vg-up").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 26 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 87%" },
          }
        );
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      className="min-h-screen bg-[#0f2417] text-[#eaf2ec] selection:bg-[#e8590c] selection:text-white"
      style={{ fontFamily: "var(--font-valor-sans), sans-serif" }}
    >
      <style>{`.vg-serif { font-family: var(--font-valor-serif), serif; }`}</style>

      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-8">
        <span className="vg-serif text-2xl font-bold">
          Valor <span className="font-normal italic">Econômico</span>
          <span className="ml-2 rounded bg-[#2f9e44] px-2 py-0.5 text-xs font-bold text-white uppercase">agro</span>
        </span>
        <a href="#planos" className="rounded bg-[#e8590c] px-5 py-2.5 text-sm font-bold text-white transition-transform hover:scale-105">
          Assinar
        </a>
      </header>

      {/* board de cotações */}
      <div className="overflow-x-auto border-y border-[#28503a] bg-[#0a1b10]">
        <div className="mx-auto flex min-w-max max-w-6xl gap-8 px-4 py-3 sm:px-8">
          {BOARD.map((b) => (
            <div key={b.c} className="vg-board-item flex items-baseline gap-2 text-sm whitespace-nowrap">
              <span className="font-bold text-[#8fbf9f]">{b.c}</span>
              <span className="text-xs text-[#5d8a6e]">{b.u}</span>
              <span className="font-semibold tabular-nums">{b.v}</span>
              <span className={`text-xs font-bold ${b.up ? "text-[#69db7c]" : "text-[#ff8787]"}`}>{b.d}</span>
            </div>
          ))}
          <span className="text-xs text-[#5d8a6e] self-center">cotações demonstrativas</span>
        </div>
      </div>

      {/* hero */}
      <section className="mx-auto max-w-6xl px-4 pt-14 pb-16 sm:px-8">
        <p className="vg-hero-el text-xs font-bold tracking-[0.3em] text-[#69db7c] uppercase">
          a vertical de agronegócio
        </p>
        <h1 className="vg-serif vg-hero-el mt-4 max-w-3xl text-4xl leading-[1.06] font-bold sm:text-6xl">
          Do talhão
          <br />
          <em className="text-[#69db7c]">ao pregão.</em>
        </h1>
        <p className="vg-hero-el mt-6 max-w-xl text-lg leading-relaxed text-[#b7cfc0]">
          A porteira e a B3 são o mesmo negócio — só a linguagem muda. O Valor
          Agro traduz as duas pontas: o clima que vira preço, o juro que vira
          custeio, Chicago que vira a sua margem.
        </p>
        <div className="vg-hero-el mt-8 flex flex-wrap items-center gap-4">
          <a
            href="#planos"
            className="rounded bg-[#e8590c] px-8 py-4 text-base font-bold text-white shadow-[0_14px_30px_-12px_rgba(232,89,12,0.6)] transition-transform hover:scale-[1.03]"
          >
            Assinar o Valor com Agro
          </a>
          <span className="text-sm text-[#8fbf9f]">boletins na frequência da safra, não do feed</span>
        </div>
      </section>

      {/* cobertura */}
      <section className="border-y border-[#28503a] bg-[#122b1c] px-4 py-16 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="vg-serif vg-up text-3xl font-bold sm:text-4xl">O que a cobertura acompanha</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {COBERTURA.map((c) => (
              <article key={c.t} className="vg-up rounded-lg border border-[#28503a] bg-[#0f2417] p-6">
                <h3 className="vg-serif text-lg font-bold text-[#69db7c]">{c.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#b7cfc0]">{c.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* planos */}
      <section id="planos" className="mx-auto max-w-4xl px-4 py-16 sm:px-8">
        <h2 className="vg-serif vg-up text-center text-3xl font-bold sm:text-4xl">
          Dois jeitos de acompanhar a safra
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <article className="vg-up rounded-xl border border-[#28503a] bg-[#122b1c] p-8">
            <h3 className="vg-serif text-2xl font-bold">Digital + Agro</h3>
            <p className="mt-3">
              <span className="vg-serif text-5xl font-bold">R$ 39,90</span>
              <span className="text-sm text-[#8fbf9f]">/mês*</span>
            </p>
            <ul className="mt-5 space-y-2 text-sm text-[#b7cfc0]">
              <li>✓ Jornal digital completo</li>
              <li>✓ Boletim Agro 2× por semana</li>
              <li>✓ Alertas de clima e commodities</li>
            </ul>
            <a href="#" onClick={(e) => e.preventDefault()} className="mt-7 block rounded border border-[#69db7c] py-3 text-center text-sm font-bold text-[#69db7c] transition-colors hover:bg-[#69db7c] hover:text-[#0f2417]">
              Assinar digital
            </a>
          </article>
          <article className="vg-up rounded-xl bg-[#f9e7dc] p-8 text-[#0e2b4c]">
            <p className="text-[11px] font-bold tracking-widest text-[#b8552a] uppercase">para a sede da fazenda</p>
            <h3 className="vg-serif mt-1 text-2xl font-bold">Com impresso semanal</h3>
            <p className="mt-3">
              <span className="vg-serif text-5xl font-bold">R$ 69,90</span>
              <span className="text-sm text-[#6d5142]">/mês*</span>
            </p>
            <ul className="mt-5 space-y-2 text-sm text-[#38506c]">
              <li>✓ Tudo do Digital + Agro</li>
              <li>✓ Edição de sábado impressa, onde o Correio chega</li>
              <li>✓ Anuário do Agronegócio incluso</li>
            </ul>
            <a href="#" onClick={(e) => e.preventDefault()} className="mt-7 block rounded bg-[#e8590c] py-3 text-center text-sm font-bold text-white transition-transform hover:scale-[1.02]">
              Assinar com impresso
            </a>
          </article>
        </div>
        <p className="vg-up mt-6 text-center text-xs text-[#5d8a6e]">
          *Valores ilustrativos de portfólio. Cancele o digital quando quiser.
        </p>
      </section>

      <footer className="border-t border-[#28503a] px-4 py-6 text-xs text-[#5d8a6e] sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3">
          <span>Página conceitual de portfólio — sem vínculo oficial com o Valor Econômico / Globo.</span>
          <Link href="/valor/agro/guide" className="underline underline-offset-2 hover:text-[#69db7c]">
            Como esta página foi feita →
          </Link>
        </div>
      </footer>
    </div>
  );
}
