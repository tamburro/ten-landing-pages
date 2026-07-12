"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const TEMAS = [
  { tag: "geopolítica", caiu: "ENEM 2024 · questão 54" },
  { tag: "clima e energia", caiu: "ENEM 2023 · redação" },
  { tag: "inteligência artificial", caiu: "FUVEST 2025 · 2ª fase" },
  { tag: "democracia", caiu: "UERJ 2024 · discursiva" },
  { tag: "economia do cotidiano", caiu: "concursos · atualidades" },
  { tag: "saúde pública", caiu: "ENEM 2022 · redação" },
];

const KIT = [
  { t: "Resumo da semana", d: "Toda sexta, os 7 assuntos que podem virar prova, em linguagem de quem estuda." },
  { t: "Acervo para citar", d: "Reportagens desde 1925 para fundamentar redação com fonte de verdade, não print de rede social." },
  { t: "Redação nota mil", d: "Análises de temas prováveis com repertório sociocultural pronto para usar." },
];

export default function GloboEstudantePage() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (reduced) return;
      gsap.fromTo(
        ".ge-hero-el",
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power2.out", delay: 0.15 }
      );
      // marca-texto pinta o destaque
      gsap.fromTo(
        ".ge-marker",
        { backgroundSize: "0% 100%" },
        { backgroundSize: "100% 100%", duration: 0.9, ease: "power2.inOut", delay: 0.9 }
      );
      gsap.utils.toArray<HTMLElement>(".ge-up").forEach((el) => {
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
      className="ge-caderno min-h-screen text-[#1c2733] selection:bg-[#ffe066] selection:text-[#1c2733]"
      style={{ fontFamily: "var(--font-globo-sans), sans-serif" }}
    >
      <style>{`
        .ge-serif { font-family: var(--font-globo-serif), serif; }
        .ge-caderno {
          background-color: #fbfcfe;
          background-image: linear-gradient(to bottom, rgba(10,92,184,0.10) 1px, transparent 1px);
          background-size: 100% 2rem;
        }
        .ge-margem { box-shadow: inset 3px 0 0 #f4a7b9; }
        .ge-marker {
          background-image: linear-gradient(#ffe066, #ffe066);
          background-repeat: no-repeat;
          background-size: 100% 100%;
          background-position: 0 60%;
          padding: 0 0.15em;
        }
        .ge-sticker { transform: rotate(-2.5deg); }
      `}</style>

      <header className="mx-auto flex max-w-4xl items-center justify-between px-4 py-5 sm:px-8">
        <span className="ge-serif text-2xl font-black">O GLOBO</span>
        <span className="ge-sticker rounded-md bg-[#0a5cb8] px-3 py-1.5 text-xs font-extrabold tracking-wider text-white uppercase">
          −50% estudante
        </span>
      </header>

      {/* hero */}
      <section className="ge-margem mx-auto max-w-4xl px-6 pt-12 pb-16 sm:px-10">
        <p className="ge-hero-el text-xs font-extrabold tracking-[0.25em] text-[#0a5cb8] uppercase">
          plano estudante · enem, vestibular e concursos
        </p>
        <h1 className="ge-serif ge-hero-el mt-4 max-w-2xl text-4xl leading-[1.15] font-black sm:text-5xl">
          Atualidades que <span className="ge-marker">caem na prova</span> não
          nascem em resumo de véspera.
        </h1>
        <p className="ge-hero-el mt-6 max-w-xl text-lg leading-relaxed text-[#44546a]">
          Quem corrige redação percebe em duas linhas quem lê jornal. Metade do
          preço para quem tem matrícula: repertório o ano inteiro por menos que
          um açaí por semana.
        </p>
        <div className="ge-hero-el mt-8 flex flex-wrap items-center gap-4">
          <a
            href="#plano"
            className="rounded-lg bg-[#0a5cb8] px-8 py-4 text-base font-bold text-white shadow-[0_10px_24px_-10px_rgba(10,92,184,0.7)] transition-transform hover:scale-[1.03]"
          >
            Ativar meus 50%
          </a>
          <span className="text-sm font-semibold text-[#44546a]">
            R$ 4,95/mês* com e-mail de instituição de ensino
          </span>
        </div>
      </section>

      {/* já caiu na prova */}
      <section className="border-y-2 border-[#0a5cb8]/20 bg-white/70 px-6 py-14 sm:px-10">
        <div className="mx-auto max-w-4xl">
          <h2 className="ge-serif ge-up text-2xl font-black sm:text-3xl">
            Isto aqui já caiu na prova
          </h2>
          <div className="mt-8 flex flex-wrap gap-3">
            {TEMAS.map((t) => (
              <div key={t.tag} className="ge-up rounded-lg border border-[#dbe4f0] bg-white px-4 py-3">
                <p className="font-bold text-[#0a5cb8]">{t.tag}</p>
                <p className="mt-0.5 text-[11px] font-semibold tracking-wide text-[#8494a7] uppercase">
                  {t.caiu}
                </p>
              </div>
            ))}
          </div>
          <p className="ge-up mt-4 text-xs text-[#8494a7]">
            Referências ilustrativas de portfólio — o padrão é real: atualidades são o eixo das provas.
          </p>
        </div>
      </section>

      {/* kit */}
      <section className="ge-margem mx-auto max-w-4xl px-6 py-16 sm:px-10">
        <h2 className="ge-serif ge-up text-2xl font-black sm:text-3xl">O kit de repertório</h2>
        <ol className="mt-8 space-y-6">
          {KIT.map((k, i) => (
            <li key={k.t} className="ge-up flex gap-5">
              <span className="ge-serif flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#ffe066] text-lg font-black">
                {i + 1}
              </span>
              <div>
                <h3 className="text-lg font-bold">{k.t}</h3>
                <p className="mt-1 leading-relaxed text-[#44546a]">{k.d}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* plano */}
      <section id="plano" className="px-6 pb-20 sm:px-10">
        <div className="ge-up mx-auto max-w-lg rounded-2xl border-2 border-[#1c2733] bg-white p-8 text-center shadow-[6px_6px_0_#ffe066]">
          <p className="text-xs font-extrabold tracking-[0.25em] text-[#0a5cb8] uppercase">
            digital estudante
          </p>
          <p className="mt-3">
            <span className="text-base font-bold text-[#8494a7] line-through">R$ 9,90</span>{" "}
            <span className="ge-serif text-6xl font-black">R$ 4,95</span>
            <span className="text-sm text-[#8494a7]">/mês*</span>
          </p>
          <ul className="mx-auto mt-5 max-w-xs space-y-1.5 text-left text-sm text-[#44546a]">
            <li>✓ Tudo do plano digital, sem limite</li>
            <li>✓ Resumo da semana toda sexta</li>
            <li>✓ Validação por e-mail institucional (.edu.br e afins)</li>
          </ul>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="mt-7 block rounded-lg bg-[#0a5cb8] py-3.5 text-sm font-bold text-white transition-transform hover:scale-[1.02]"
          >
            Comprovar matrícula e assinar
          </a>
          <p className="mt-3 text-[11px] text-[#8494a7]">
            *Valor ilustrativo de portfólio. Renova enquanto durar a matrícula. Cancele quando quiser.
          </p>
        </div>
      </section>

      <footer className="border-t border-[#dbe4f0] bg-white/70 px-6 py-6 text-xs text-[#8494a7] sm:px-10">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-3">
          <span>Página conceitual de portfólio — sem vínculo oficial com O GLOBO / Editora Globo.</span>
          <Link href="/globo/estudante/guide" className="underline underline-offset-2 hover:text-[#0a5cb8]">
            Como esta página foi feita →
          </Link>
        </div>
      </footer>
    </div>
  );
}
