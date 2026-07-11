"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const PRECO_MES = 34.9;

const DEPOIMENTOS = [
  {
    frase: "Uma matéria sobre mudança no crédito rural pagou minha assinatura por uns dez anos.",
    quem: "Diretor financeiro, agroindústria — MT",
  },
  {
    frase: "Parei de entrar em reunião de conselho descobrindo o assunto na hora.",
    quem: "Conselheira independente — SP",
  },
  {
    frase: "O estagiário lê o Valor Manhã em voz alta às 7h. Virou instituição no escritório.",
    quem: "Sócio de gestora — RJ",
  },
];

const fmt = (v: number, dec = 2) =>
  v.toLocaleString("pt-BR", { minimumFractionDigits: dec, maximumFractionDigits: dec });

export default function ValorRoiPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [cafe, setCafe] = useState(7);

  const porDia = PRECO_MES / 30;
  const cafesPorMes = useMemo(() => PRECO_MES / cafe, [cafe]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (reduced) return;
      gsap.fromTo(
        ".vr-hero-el",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: "power2.out", delay: 0.2 }
      );
      gsap.utils.toArray<HTMLElement>(".vr-up").forEach((el) => {
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
      className="min-h-screen bg-[#f4f1ec] text-[#1f2933] selection:bg-[#0e2b4c] selection:text-white"
      style={{ fontFamily: "var(--font-valor-sans), sans-serif" }}
    >
      <style>{`
        .vr-serif { font-family: var(--font-valor-serif), serif; }
        .vr-range { accent-color: #e8590c; }
      `}</style>

      <header className="mx-auto flex max-w-5xl items-center justify-between px-4 py-5 sm:px-8">
        <span className="vr-serif text-2xl font-bold">
          Valor <span className="font-normal italic">Econômico</span>
        </span>
        <a href="#conta" className="rounded bg-[#0e2b4c] px-5 py-2.5 text-sm font-bold text-white transition-transform hover:scale-105">
          Fazer a conta
        </a>
      </header>

      {/* hero */}
      <section className="mx-auto max-w-5xl px-4 pt-14 pb-16 sm:px-8">
        <p className="vr-hero-el text-xs font-bold tracking-[0.3em] text-[#e8590c] uppercase">
          A conta que ninguém faz
        </p>
        <h1 className="vr-serif vr-hero-el mt-4 max-w-3xl text-4xl leading-[1.06] font-bold sm:text-6xl">
          Quanto custa decidir
          <br />
          <em className="text-[#0e2b4c] underline decoration-[#e8590c] decoration-4 underline-offset-8">sem saber?</em>
        </h1>
        <p className="vr-hero-el mt-6 max-w-xl text-lg leading-relaxed text-[#52606d]">
          Uma decisão mal informada custa contratos, timing e reputação. A
          informação que evita isso custa{" "}
          <strong className="text-[#1f2933]">R$ {fmt(porDia)} por dia</strong>. A
          página inteira é só essa conta, feita com você.
        </p>
      </section>

      {/* calculadora */}
      <section id="conta" className="border-y border-[#ddd6ca] bg-white px-4 py-16 sm:px-8">
        <div className="mx-auto grid max-w-4xl items-center gap-12 sm:grid-cols-2">
          <div className="vr-up">
            <h2 className="vr-serif text-3xl font-bold">A régua do cafezinho</h2>
            <p className="mt-3 text-[#52606d]">
              Quanto custa um café perto do seu escritório?
            </p>
            <p className="vr-serif mt-6 text-5xl font-bold text-[#e8590c]">
              R$ {fmt(cafe, 2)}
            </p>
            <input
              type="range"
              min={4}
              max={18}
              step={0.5}
              value={cafe}
              onChange={(e) => setCafe(parseFloat(e.target.value))}
              className="vr-range mt-4 w-full"
              aria-label="Preço do café na sua região"
            />
            <div className="mt-1 flex justify-between text-xs text-[#9aa5b1]">
              <span>R$ 4 · padaria heroica</span>
              <span>R$ 18 · coado no sifão</span>
            </div>
          </div>
          <div className="vr-up rounded-2xl bg-[#0e2b4c] p-8 text-white">
            <p className="text-xs font-bold tracking-[0.2em] text-[#f6b26b] uppercase">resultado</p>
            <p className="vr-serif mt-4 text-2xl leading-snug font-bold">
              O mês inteiro do Valor custa{" "}
              <span className="text-[#f6b26b]">{fmt(cafesPorMes, 1)} cafés</span>.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-white/80">
              R$ {fmt(PRECO_MES)}/mês* ÷ R$ {fmt(cafe, 2)} o café ={" "}
              {fmt(cafesPorMes, 1)} cafés por 30 dias de análise, dados e
              furos. Por dia: R$ {fmt(porDia)} —{" "}
              {porDia < cafe
                ? `${fmt((porDia / cafe) * 100, 0)}% de um café.`
                : "um café mais barato que o seu."}
            </p>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="mt-8 block rounded bg-[#e8590c] py-3.5 text-center text-sm font-bold transition-transform hover:scale-[1.02]"
            >
              Assinar por R$ {fmt(PRECO_MES)}/mês*
            </a>
            <p className="mt-3 text-[11px] text-white/50">
              *Valor ilustrativo de portfólio, 12 primeiros meses. Cancele quando quiser.
            </p>
          </div>
        </div>
      </section>

      {/* depoimentos */}
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-8">
        <h2 className="vr-serif vr-up text-3xl font-bold">O retorno, contado por quem colheu</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {DEPOIMENTOS.map((d) => (
            <figure key={d.quem} className="vr-up rounded-xl border border-[#ddd6ca] bg-white p-6">
              <blockquote className="vr-serif text-lg leading-snug font-medium italic">
                “{d.frase}”
              </blockquote>
              <figcaption className="mt-4 text-xs font-bold tracking-wide text-[#52606d] uppercase">
                {d.quem}
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="vr-up mt-4 text-xs text-[#9aa5b1]">Depoimentos fictícios para conceito de portfólio.</p>
      </section>

      {/* fecho */}
      <section className="border-t border-[#ddd6ca] bg-[#f9e7dc] px-4 py-16 text-center sm:px-8">
        <h2 className="vr-serif vr-up mx-auto max-w-2xl text-3xl leading-snug font-bold sm:text-4xl">
          Informação boa é o único custo que se paga sozinho.
        </h2>
        <a
          href="#conta"
          className="vr-up mt-8 inline-block rounded bg-[#0e2b4c] px-10 py-4 text-base font-bold text-white transition-transform hover:scale-[1.03]"
        >
          Refazer a conta e assinar
        </a>
      </section>

      <footer className="border-t border-[#ddd6ca] px-4 py-6 text-xs text-[#9aa5b1] sm:px-8">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3">
          <span>Página conceitual de portfólio — sem vínculo oficial com o Valor Econômico / Globo.</span>
          <Link href="/valor/roi/guide" className="underline underline-offset-2 hover:text-[#e8590c]">
            Como esta página foi feita →
          </Link>
        </div>
      </footer>
    </div>
  );
}
