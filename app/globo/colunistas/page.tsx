"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const FRASES = [
  { texto: "Opinião sem apuração é palpite. Aqui, o palpite não passa da portaria.", voz: "coluna de política" },
  { texto: "O leitor não precisa concordar comigo. Precisa saber por que discordo.", voz: "coluna de economia" },
  { texto: "Crônica é o jeito carioca de editar a semana.", voz: "crônica de sábado" },
];

const VOZES = [
  { ini: "MT", nome: "Marta Teles", area: "Política", dias: "seg · qua · sex", frase: "Bastidor não é fofoca: é o rascunho da decisão." },
  { ini: "CB", nome: "Caio Bastos", area: "Economia", dias: "ter · qui", frase: "Juros são a gramática; eu traduzo o texto." },
  { ini: "DN", nome: "Dora Nunes", area: "Cultura", dias: "sáb", frase: "A cidade se explica melhor no palco que no plenário." },
  { ini: "HV", nome: "Hugo Valle", area: "Esporte", dias: "dom", frase: "Torcida é paixão; análise é ofício. Escrevo com os dois." },
  { ini: "SR", nome: "Selma Rocha", area: "Crônica", dias: "dom", frase: "Todo domingo cabe numa lauda, se a lauda for honesta." },
  { ini: "PA", nome: "Pedro Assis", area: "Internacional", dias: "qua · sáb", frase: "O mundo fica perto quando alguém explica o mapa." },
];

export default function GloboColunistasPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const fraseRef = useRef<HTMLQuoteElement>(null);
  const vozRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      // rotação de citações no hero
      if (!reduced && fraseRef.current && vozRef.current) {
        let i = 0;
        const tl = gsap.timeline({ repeat: -1, repeatDelay: 3.2, delay: 3.2 });
        tl.to([fraseRef.current, vozRef.current], {
          opacity: 0,
          y: -14,
          duration: 0.45,
          ease: "power2.in",
          onComplete: () => {
            i = (i + 1) % FRASES.length;
            if (fraseRef.current) fraseRef.current.textContent = `“${FRASES[i].texto}”`;
            if (vozRef.current) vozRef.current.textContent = `— ${FRASES[i].voz}`;
          },
        }).to([fraseRef.current, vozRef.current], {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: "power2.out",
        });
      }

      if (reduced) return;
      gsap.fromTo(
        ".gc-hero-el",
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power2.out", delay: 0.15 }
      );
      gsap.utils.toArray<HTMLElement>(".gc-up").forEach((el) => {
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
      className="min-h-screen bg-white text-[#14181d] selection:bg-[#0a5cb8] selection:text-white"
      style={{ fontFamily: "var(--font-globo-sans), sans-serif" }}
    >
      <style>{`.gc-serif { font-family: var(--font-globo-serif), serif; }`}</style>

      <header className="mx-auto flex max-w-5xl items-center justify-between px-4 py-5 sm:px-8">
        <span className="gc-serif text-2xl font-black">O GLOBO</span>
        <a
          href="#assinar"
          className="rounded-md bg-[#0a5cb8] px-5 py-2.5 text-sm font-bold text-white transition-transform hover:scale-105"
        >
          Assinar
        </a>
      </header>

      {/* hero de citação */}
      <section className="mx-auto max-w-4xl px-4 pt-14 pb-20 text-center sm:px-8">
        <p className="gc-hero-el text-xs font-bold tracking-[0.3em] text-[#0a5cb8] uppercase">
          As vozes do jornal
        </p>
        <h1 className="gc-serif gc-hero-el mt-4 text-4xl leading-[1.06] font-black sm:text-6xl">
          Assine pessoas,
          <br />
          não páginas.
        </h1>
        <div className="gc-hero-el mx-auto mt-10 min-h-40 max-w-2xl border-y-2 border-[#14181d] py-8 sm:min-h-36">
          <blockquote ref={fraseRef} className="gc-serif text-xl leading-snug font-bold italic sm:text-2xl">
            “{FRASES[0].texto}”
          </blockquote>
          <p ref={vozRef} className="mt-3 text-xs font-bold tracking-[0.2em] text-[#5c6570] uppercase">
            — {FRASES[0].voz}
          </p>
        </div>
        <p className="gc-hero-el mx-auto mt-8 max-w-xl text-lg leading-relaxed text-[#3d454f]">
          Notícia todo mundo dá. O que se assina é o time que pensa junto com
          você — todo dia, com nome, cara e responsabilidade.
        </p>
      </section>

      {/* grade de vozes */}
      <section className="border-t-2 border-[#14181d] bg-[#f4f7fb] px-4 py-16 sm:px-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="gc-serif gc-up text-3xl font-black sm:text-4xl">
            Seu conselho editorial pessoal
          </h2>
          <p className="gc-up mt-2 text-sm text-[#5c6570]">
            Colunistas fictícios para um conceito real de assinatura.
          </p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {VOZES.map((v) => (
              <article key={v.ini} className="gc-up group rounded-xl border border-[#dde5ee] bg-white p-6 transition-shadow hover:shadow-[0_16px_36px_-18px_rgba(20,24,29,0.3)]">
                <div className="flex items-center gap-4">
                  <span className="gc-serif flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#0a5cb8] text-base font-black text-white">
                    {v.ini}
                  </span>
                  <div>
                    <h3 className="font-bold">{v.nome}</h3>
                    <p className="text-xs font-semibold tracking-wider text-[#0a5cb8] uppercase">
                      {v.area} · {v.dias}
                    </p>
                  </div>
                </div>
                <p className="gc-serif mt-4 text-[15px] leading-snug italic text-[#3d454f]">
                  “{v.frase}”
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* argumento + oferta */}
      <section id="assinar" className="mx-auto grid max-w-5xl items-center gap-12 px-4 py-20 sm:grid-cols-2 sm:px-8">
        <div className="gc-up">
          <h2 className="gc-serif text-3xl leading-tight font-black sm:text-4xl">
            Opinião de graça existe.
            <br />
            <span className="text-[#0a5cb8]">Responsabilidade, não.</span>
          </h2>
          <p className="mt-5 leading-relaxed text-[#3d454f]">
            Colunista de jornal erra com o nome em cima e corrige no mesmo
            lugar. É esse contrato — não o acesso — que a sua assinatura
            financia. As newsletters de cada voz chegam direto no seu e-mail,
            antes do texto abrir para o site.
          </p>
          <ul className="mt-6 space-y-2 text-sm font-semibold text-[#3d454f]">
            <li>✓ Newsletters exclusivas de cada colunista</li>
            <li>✓ Comentários abertos só para assinantes</li>
            <li>✓ Arquivo completo de cada coluna desde 1925</li>
          </ul>
        </div>
        <div className="gc-up rounded-2xl border-2 border-[#14181d] p-8 text-center shadow-[8px_8px_0_#0a5cb8]">
          <p className="text-xs font-bold tracking-[0.25em] text-[#0a5cb8] uppercase">digital completo</p>
          <p className="gc-serif mt-3 text-6xl font-black">
            R$ 9,90
          </p>
          <p className="text-xs text-[#5c6570]">/mês* nos 12 primeiros meses · depois R$ 29,90</p>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="mt-6 block rounded-md bg-[#0a5cb8] py-3.5 text-sm font-bold text-white transition-transform hover:scale-[1.02]"
          >
            Assinar e seguir minhas vozes
          </a>
          <p className="mt-3 text-[11px] text-[#5c6570]">
            *Valor ilustrativo de portfólio. Cancele quando quiser. Impresso opcional por R$ 49,90/mês.
          </p>
        </div>
      </section>

      <footer className="border-t border-[#dde5ee] px-4 py-6 text-xs text-[#5c6570] sm:px-8">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3">
          <span>Página conceitual de portfólio — sem vínculo oficial com O GLOBO / Editora Globo.</span>
          <Link href="/globo/colunistas/guide" className="underline underline-offset-2 hover:text-[#0a5cb8]">
            Como esta página foi feita →
          </Link>
        </div>
      </footer>
    </div>
  );
}
