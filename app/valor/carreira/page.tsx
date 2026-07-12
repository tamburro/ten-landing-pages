"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const DEGRAUS = [
  {
    cargo: "Estágio",
    tam: "text-2xl sm:text-3xl",
    habito: "Lê o Valor Manhã no busão. Chega na daily sabendo o que o diretor ainda não leu.",
  },
  {
    cargo: "Analista",
    tam: "text-3xl sm:text-4xl",
    habito: "Cita a matéria certa no relatório. O chefe pergunta de onde veio o dado.",
  },
  {
    cargo: "Gerente",
    tam: "text-4xl sm:text-5xl",
    habito: "Abre a reunião com o contexto que faltava. A pauta passa a ser a dela.",
  },
  {
    cargo: "Diretor",
    tam: "text-5xl sm:text-6xl",
    habito: "Antecipa a pergunta do conselho porque leu a análise na terça.",
  },
  {
    cargo: "Conselho",
    tam: "text-6xl sm:text-7xl",
    habito: "Assina há vinte anos. Acha que todo mundo lê. Está errado — e na frente.",
  },
];

export default function ValorCarreiraPage() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (reduced) return;
      gsap.fromTo(
        ".vc-hero-el",
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power2.out", delay: 0.15 }
      );
      gsap.utils.toArray<HTMLElement>(".vc-degrau").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 82%" },
          }
        );
      });
      gsap.utils.toArray<HTMLElement>(".vc-up").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 24 },
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
      className="min-h-screen bg-[#f4f1ec] text-[#1f2933] selection:bg-[#e8590c] selection:text-white"
      style={{ fontFamily: "var(--font-valor-sans), sans-serif" }}
    >
      <style>{`.vc-serif { font-family: var(--font-valor-serif), serif; }`}</style>

      <header className="mx-auto flex max-w-4xl items-center justify-between px-4 py-5 sm:px-8">
        <span className="vc-serif text-2xl font-bold text-[#0e2b4c]">
          Valor <span className="font-normal italic">Econômico</span>
        </span>
        <a href="#assinar" className="rounded bg-[#e8590c] px-5 py-2.5 text-sm font-bold text-white transition-transform hover:scale-105">
          Assinar
        </a>
      </header>

      {/* hero */}
      <section className="mx-auto max-w-4xl px-4 pt-14 pb-10 sm:px-8">
        <p className="vc-hero-el text-xs font-bold tracking-[0.3em] text-[#b8552a] uppercase">
          plano de carreira, edição diária
        </p>
        <h1 className="vc-serif vc-hero-el mt-4 max-w-2xl text-4xl leading-[1.06] font-bold text-[#0e2b4c] sm:text-6xl">
          Quem lê antes,
          <br />
          <em className="text-[#e8590c]">sobe antes.</em>
        </h1>
        <p className="vc-hero-el mt-6 max-w-xl text-lg leading-relaxed text-[#52606d]">
          Nenhum MBA custa R$ 34,90 por mês. A escada abaixo é fictícia; o
          padrão, qualquer RH confirma: contexto composto — como juros — e quem
          começa cedo colhe mais.
        </p>
      </section>

      {/* escada */}
      <section className="mx-auto max-w-4xl px-4 py-10 sm:px-8">
        <ol className="space-y-10">
          {DEGRAUS.map((d, i) => (
            <li key={d.cargo} className="vc-degrau border-l-4 border-[#0e2b4c] pl-6" style={{ marginLeft: `${i * 4}%` }}>
              <h2 className={`vc-serif font-bold text-[#0e2b4c] ${d.tam}`}>{d.cargo}</h2>
              <p className="mt-2 max-w-md leading-relaxed text-[#52606d]">{d.habito}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* aritmética */}
      <section className="border-y border-[#ddd6ca] bg-white px-4 py-14 sm:px-8">
        <div className="mx-auto grid max-w-4xl gap-8 text-center sm:grid-cols-3">
          {[
            { n: "12 min", d: "por dia de leitura dirigida — cabe no trajeto" },
            { n: "≈ 70h", d: "de contexto acumulado por ano; um MBA modular, sem TCC" },
            { n: "R$ 1,16", d: "por dia. O degrau mais barato da sua escada" },
          ].map((s) => (
            <div key={s.n} className="vc-up">
              <p className="vc-serif text-4xl font-bold text-[#e8590c]">{s.n}</p>
              <p className="mt-2 text-sm leading-relaxed text-[#52606d]">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* oferta */}
      <section id="assinar" className="px-4 py-16 sm:px-8">
        <div className="vc-up mx-auto max-w-lg rounded-2xl bg-[#0e2b4c] p-8 text-center text-white">
          <p className="text-xs font-bold tracking-[0.25em] text-[#f6b26b] uppercase">digital completo</p>
          <p className="vc-serif mt-3 text-6xl font-bold">R$ 34,90</p>
          <p className="text-xs text-white/60">/mês* nos 12 primeiros meses</p>
          <ul className="mx-auto mt-5 max-w-xs space-y-1.5 text-left text-sm text-white/85">
            <li>✓ Valor Manhã para o trajeto</li>
            <li>✓ Análises assinadas e Valor Data</li>
            <li>✓ Recibo para pedir reembolso de educação ao RH</li>
          </ul>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="mt-7 block rounded bg-[#e8590c] py-3.5 text-sm font-bold transition-transform hover:scale-[1.02]"
          >
            Começar a subir
          </a>
          <p className="mt-3 text-[11px] text-white/50">
            *Valor ilustrativo de portfólio. Cancele quando quiser.
          </p>
        </div>
      </section>

      <footer className="border-t border-[#ddd6ca] px-4 py-6 text-xs text-[#9aa5b1] sm:px-8">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-3">
          <span>Página conceitual de portfólio — sem vínculo oficial com o Valor Econômico / Globo.</span>
          <Link href="/valor/carreira/guide" className="underline underline-offset-2 hover:text-[#e8590c]">
            Como esta página foi feita →
          </Link>
        </div>
      </footer>
    </div>
  );
}
