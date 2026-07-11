"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const COLUNISTAS = [
  { ini: "AC", nome: "Ana Clara Duarte", tema: "A cidade e o poder", freq: "seg · qua · sex" },
  { ini: "JM", nome: "João Meirelles", tema: "Economia do dia a dia", freq: "ter · qui" },
  { ini: "LP", nome: "Lúcia Prado", tema: "Cultura e botequim", freq: "sábado" },
  { ini: "RS", nome: "Rui Santoro", tema: "Futebol sem clubismo", freq: "domingo" },
];

const BAIRROS = [
  "Copacabana", "Tijuca", "Madureira", "Barra", "Niterói", "Méier",
  "Ipanema", "Campo Grande", "Botafogo", "Bangu", "Leblon", "Penha",
];

export default function GloboRioPage() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (reduced) return;
      gsap.fromTo(
        ".gr-sol",
        { y: 60, opacity: 0.6 },
        { y: 0, opacity: 1, duration: 2.2, ease: "power2.out" }
      );
      gsap.fromTo(
        ".gr-hero-el",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: "power2.out", delay: 0.3 }
      );
      gsap.utils.toArray<HTMLElement>(".gr-up").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 28 },
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
      className="min-h-screen bg-[#fdf9f3] text-[#1d2b3a] selection:bg-[#f08c00] selection:text-white"
      style={{ fontFamily: "var(--font-globo-sans), sans-serif" }}
    >
      <style>{`.gr-serif { font-family: var(--font-globo-serif), serif; }`}</style>

      {/* hero amanhecer */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#1d3557] via-[#e07a2f] to-[#ffd8a8]">
        <header className="relative z-10 flex items-center justify-between px-4 py-5 text-white sm:px-8">
          <span className="gr-serif text-2xl font-black">O GLOBO</span>
          <a
            href="#planos"
            className="rounded-full border border-white/50 px-5 py-2 text-xs font-bold tracking-wider uppercase backdrop-blur-sm transition-colors hover:bg-white hover:text-[#1d3557]"
          >
            Assinar
          </a>
        </header>

        <div className="relative z-10 mx-auto max-w-4xl px-4 pt-14 pb-56 text-center text-white sm:px-8 sm:pb-64">
          <p className="gr-hero-el text-xs font-bold tracking-[0.3em] uppercase text-[#ffd8a8]">
            Edição Rio · na porta antes das 7h
          </p>
          <h1 className="gr-serif gr-hero-el mt-4 text-4xl leading-[1.05] font-black sm:text-6xl">
            O Rio explicado
            <br />
            pelo Rio.
          </h1>
          <p className="gr-hero-el mx-auto mt-5 max-w-xl text-lg leading-relaxed text-white/85">
            Quem nasce aqui sabe: a cidade não cabe em agência internacional.
            Assine o jornal que tem CEP carioca — no papel e no app.
          </p>
          <a
            href="#planos"
            className="gr-hero-el mt-8 inline-block rounded-full bg-white px-8 py-4 text-base font-bold text-[#1d3557] shadow-xl transition-transform hover:scale-[1.03]"
          >
            Assinar a partir de R$ 9,90/mês*
          </a>
        </div>

        {/* sol */}
        <div
          className="gr-sol absolute bottom-24 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-[#fff3bf] shadow-[0_0_120px_60px_rgba(255,243,191,0.55)]"
          aria-hidden
        />

        {/* silhueta: Dois Irmãos, Corcovado, Pão de Açúcar */}
        <svg
          viewBox="0 0 1440 220"
          className="absolute bottom-0 left-0 w-full"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path
            d="M0,220 L0,150 C60,140 110,90 150,88 C190,86 210,120 250,128 C290,136 320,60 355,52 C370,49 378,60 390,72 L397,58 L404,72 C428,90 460,140 520,150 C600,163 660,120 720,116 C760,113 790,60 830,40 C845,33 852,44 860,58 C900,120 960,150 1040,158 C1100,163 1140,120 1180,90 C1205,71 1225,20 1260,14 C1268,13 1272,22 1278,34 C1298,80 1330,130 1380,150 C1400,158 1420,160 1440,162 L1440,220 Z"
            fill="#122033"
          />
        </svg>
      </section>

      {/* colunistas */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-8">
        <h2 className="gr-serif gr-up text-3xl font-black sm:text-4xl">
          Vozes que a cidade escuta
        </h2>
        <p className="gr-up mt-2 max-w-xl text-[#54677a]">
          Colunistas fictícios para um conceito real: opinião local, assinada e
          exclusiva para assinantes.
        </p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {COLUNISTAS.map((c) => (
            <article
              key={c.ini}
              className="gr-up rounded-2xl border border-[#e8dfd2] bg-white p-6 transition-shadow hover:shadow-[0_18px_40px_-20px_rgba(29,43,58,0.35)]"
            >
              <span className="gr-serif flex h-14 w-14 items-center justify-center rounded-full bg-[#1d3557] text-lg font-black text-white">
                {c.ini}
              </span>
              <h3 className="mt-4 text-lg font-bold">{c.nome}</h3>
              <p className="gr-serif mt-1 text-sm italic text-[#e07a2f]">{c.tema}</p>
              <p className="mt-3 text-xs font-semibold tracking-wider text-[#54677a] uppercase">{c.freq}</p>
            </article>
          ))}
        </div>
      </section>

      {/* bairros */}
      <section className="border-y border-[#e8dfd2] bg-white px-4 py-14 sm:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="gr-serif gr-up text-2xl font-black sm:text-3xl">
            Entrega impressa, bairro a bairro
          </h2>
          <p className="gr-up mt-3 flex flex-wrap justify-center gap-x-2 gap-y-2 text-sm">
            {BAIRROS.map((b) => (
              <span key={b} className="rounded-full bg-[#fdf9f3] px-4 py-1.5 font-semibold text-[#54677a]">
                {b}
              </span>
            ))}
            <span className="rounded-full bg-[#e07a2f] px-4 py-1.5 font-bold text-white">
              + todo o Grande Rio
            </span>
          </p>
        </div>
      </section>

      {/* planos */}
      <section id="planos" className="mx-auto max-w-4xl px-4 py-16 sm:px-8">
        <h2 className="gr-serif gr-up text-center text-3xl font-black sm:text-4xl">
          Dois jeitos de ser carioca
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <article className="gr-up rounded-2xl border border-[#e8dfd2] bg-white p-8">
            <h3 className="gr-serif text-2xl font-black">Digital</h3>
            <p className="mt-3">
              <span className="gr-serif text-5xl font-black">R$ 9,90</span>
              <span className="text-sm text-[#54677a]">/mês*</span>
            </p>
            <ul className="mt-5 space-y-2 text-sm text-[#54677a]">
              <li>✓ App e site sem limites</li>
              <li>✓ Colunistas exclusivos</li>
              <li>✓ Alertas do seu bairro</li>
            </ul>
            <a href="#" onClick={(e) => e.preventDefault()} className="mt-7 block rounded-full border-2 border-[#1d3557] py-3 text-center text-sm font-bold transition-colors hover:bg-[#1d3557] hover:text-white">
              Assinar Digital
            </a>
          </article>
          <article className="gr-up rounded-2xl bg-[#1d3557] p-8 text-white shadow-[0_24px_50px_-20px_rgba(29,53,87,0.6)]">
            <p className="text-[11px] font-bold tracking-widest text-[#ffd8a8] uppercase">na porta antes das 7h</p>
            <h3 className="gr-serif mt-1 text-2xl font-black">Digital + Impresso</h3>
            <p className="mt-3">
              <span className="gr-serif text-5xl font-black">R$ 49,90</span>
              <span className="text-sm text-white/70">/mês*</span>
            </p>
            <ul className="mt-5 space-y-2 text-sm text-white/85">
              <li>✓ Tudo do Digital</li>
              <li>✓ Jornal impresso todos os dias</li>
              <li>✓ Caderno Rio aos sábados</li>
            </ul>
            <a href="#" onClick={(e) => e.preventDefault()} className="mt-7 block rounded-full bg-[#e07a2f] py-3 text-center text-sm font-bold transition-transform hover:scale-[1.02]">
              Quero na minha porta
            </a>
          </article>
        </div>
        <p className="gr-up mt-6 text-center text-xs text-[#54677a]">
          *Valores ilustrativos de portfólio. Cancele o digital quando quiser.
        </p>
      </section>

      <footer className="border-t border-[#e8dfd2] px-4 py-6 text-xs text-[#54677a] sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3">
          <span>Página conceitual de portfólio — sem vínculo oficial com O GLOBO / Editora Globo.</span>
          <Link href="/globo/rio/guide" className="underline underline-offset-2 hover:text-[#e07a2f]">
            Como esta página foi feita →
          </Link>
        </div>
      </footer>
    </div>
  );
}
