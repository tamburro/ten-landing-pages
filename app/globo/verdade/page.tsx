"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const CHECAGENS = [
  {
    boato: "“Áudio vazado prova fraude na urna”",
    fato: "O áudio circulava desde 2018, era de outro estado e tratava de eleição de sindicato.",
    tempo: "checado em 3h41",
  },
  {
    boato: "“Remédio caseiro derruba dengue em 24h”",
    fato: "Nenhum estudo sustenta a alegação; a receita atrasava a ida ao posto de saúde.",
    tempo: "checado em 5h12",
  },
  {
    boato: "“Cidade vai cortar água por 15 dias”",
    fato: "A manutenção anunciada durava 6 horas, em um único reservatório da Zona Norte.",
    tempo: "checado em 1h58",
  },
];

const PROCESSO = [
  { n: "1", t: "Duas fontes, no mínimo", d: "Nada é publicado com uma voz só. Nem furo compensa retratação." },
  { n: "2", t: "Contraditório sempre", d: "O citado fala antes de a matéria ir ao ar — não depois, no processo." },
  { n: "3", t: "Erro se corrige em público", d: "Correções têm página própria, nome do editor e data. Sem apagar tuíte." },
];

export default function GloboVerdadePage() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (reduced) return;
      gsap.fromTo(
        ".gv-hero-el",
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power2.out", delay: 0.15 }
      );
      // risco no boato do hero
      gsap.fromTo(
        ".gv-strike",
        { backgroundSize: "0% 3px" },
        { backgroundSize: "100% 3px", duration: 0.7, ease: "power2.inOut", delay: 1.0 }
      );
      // carimbo bate
      gsap.fromTo(
        ".gv-stamp",
        { scale: 2.2, opacity: 0, rotation: -18 },
        { scale: 1, opacity: 1, rotation: -8, duration: 0.45, ease: "power4.in", delay: 1.6 }
      );
      gsap.utils.toArray<HTMLElement>(".gv-up").forEach((el) => {
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
      className="min-h-screen bg-white text-[#14181d] selection:bg-[#14181d] selection:text-white"
      style={{ fontFamily: "var(--font-globo-sans), sans-serif" }}
    >
      <style>{`
        .gv-serif { font-family: var(--font-globo-serif), serif; }
        .gv-strike {
          background-image: linear-gradient(#e03131, #e03131);
          background-repeat: no-repeat;
          background-position: 0 55%;
          background-size: 100% 3px;
        }
      `}</style>

      <header className="mx-auto flex max-w-4xl items-center justify-between px-4 py-5 sm:px-8">
        <span className="gv-serif text-2xl font-black">O GLOBO</span>
        <a href="#assinar" className="rounded-md bg-[#0a5cb8] px-5 py-2.5 text-sm font-bold text-white transition-transform hover:scale-105">
          Assinar
        </a>
      </header>

      {/* hero */}
      <section className="mx-auto max-w-4xl overflow-x-clip px-4 pt-14 pb-20 text-center sm:px-8">
        <p className="gv-hero-el text-xs font-extrabold tracking-[0.3em] text-[#0a5cb8] uppercase">
          jornalismo verificado
        </p>
        <div className="gv-hero-el relative mx-auto mt-8 max-w-2xl">
          <p className="gv-serif text-2xl leading-snug font-bold text-[#8b93a1] sm:text-4xl">
            <span className="gv-strike">“Li num grupo que é verdade.”</span>
          </p>
          <span
            className="gv-stamp absolute -top-6 right-0 border-4 border-[#e03131] px-3 py-1 text-sm font-black tracking-[0.2em] text-[#e03131] uppercase sm:-right-10"
            style={{ transform: "rotate(-8deg)" }}
          >
            não checado
          </span>
        </div>
        <h1 className="gv-serif gv-hero-el mt-10 text-4xl leading-[1.06] font-black sm:text-6xl">
          Checar dá trabalho.
          <br />
          <span className="text-[#0a5cb8]">É esse o produto.</span>
        </h1>
        <p className="gv-hero-el mx-auto mt-6 max-w-xl text-lg leading-relaxed text-[#3d454f]">
          Sua assinatura não compra acesso: paga o salário de quem liga,
          confere, ouve o outro lado e assina embaixo. R$ 9,90/mês* pelo fim do
          “será que é verdade?”.
        </p>
        <a
          href="#assinar"
          className="gv-hero-el mt-9 inline-block rounded-md bg-[#0a5cb8] px-9 py-4 text-base font-bold text-white shadow-[0_12px_28px_-10px_rgba(10,92,184,0.7)] transition-transform hover:scale-[1.03]"
        >
          Financiar jornalismo checado
        </a>
      </section>

      {/* boato vs fato */}
      <section className="border-y-2 border-[#14181d] bg-[#f4f7fb] px-4 py-16 sm:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="gv-serif gv-up text-3xl font-black sm:text-4xl">
            Boato vs. fato — casos ilustrativos
          </h2>
          <div className="mt-10 space-y-5">
            {CHECAGENS.map((c) => (
              <article key={c.boato} className="gv-up grid gap-4 rounded-xl border border-[#dde5ee] bg-white p-6 sm:grid-cols-2">
                <div>
                  <p className="text-[11px] font-extrabold tracking-[0.2em] text-[#e03131] uppercase">circulou no zap</p>
                  <p className="gv-serif mt-2 text-lg font-bold text-[#8b93a1] line-through decoration-[#e03131] decoration-2">
                    {c.boato}
                  </p>
                </div>
                <div className="border-t border-[#dde5ee] pt-4 sm:border-t-0 sm:border-l sm:pt-0 sm:pl-6">
                  <p className="text-[11px] font-extrabold tracking-[0.2em] text-[#0a5cb8] uppercase">
                    apurado · {c.tempo}
                  </p>
                  <p className="mt-2 text-[15px] leading-relaxed text-[#3d454f]">{c.fato}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* processo */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-8">
        <h2 className="gv-serif gv-up text-3xl font-black">O contrato editorial</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {PROCESSO.map((p) => (
            <article key={p.n} className="gv-up border-t-4 border-[#0a5cb8] pt-4">
              <p className="gv-serif text-4xl font-black text-[#0a5cb8]">{p.n}</p>
              <h3 className="mt-2 text-lg font-bold">{p.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#3d454f]">{p.d}</p>
            </article>
          ))}
        </div>
      </section>

      {/* oferta */}
      <section id="assinar" className="border-t-2 border-[#14181d] px-4 py-16 sm:px-8">
        <div className="gv-up mx-auto max-w-lg rounded-xl border-2 border-[#14181d] p-8 text-center">
          <p className="text-xs font-extrabold tracking-[0.25em] text-[#0a5cb8] uppercase">digital completo</p>
          <p className="gv-serif mt-3 text-6xl font-black">R$ 9,90</p>
          <p className="text-xs text-[#5c6570]">/mês* nos 12 primeiros meses · depois R$ 29,90</p>
          <ul className="mx-auto mt-5 max-w-xs space-y-1.5 text-left text-sm text-[#3d454f]">
            <li>✓ Todas as matérias e colunas verificadas</li>
            <li>✓ Página pública de correções</li>
            <li>✓ Impresso opcional por R$ 49,90/mês</li>
          </ul>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="mt-7 block rounded-md bg-[#0a5cb8] py-3.5 text-sm font-bold text-white transition-transform hover:scale-[1.02]"
          >
            Assinar O GLOBO
          </a>
          <p className="mt-3 text-[11px] text-[#5c6570]">
            *Valor ilustrativo de portfólio. Cancele quando quiser.
          </p>
        </div>
      </section>

      <footer className="border-t border-[#dde5ee] px-4 py-6 text-xs text-[#5c6570] sm:px-8">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-3">
          <span>Página conceitual de portfólio — checagens fictícias, sem vínculo oficial com O GLOBO / Editora Globo.</span>
          <Link href="/globo/verdade/guide" className="underline underline-offset-2 hover:text-[#0a5cb8]">
            Como esta página foi feita →
          </Link>
        </div>
      </footer>
    </div>
  );
}
