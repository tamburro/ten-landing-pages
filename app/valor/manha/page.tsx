"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const ROTINA = [
  {
    hora: "5h50",
    titulo: "A edição fecha",
    texto: "Enquanto a cidade dorme, a redação bate o martelo da primeira página. O que importa já está decidido — e conferido.",
  },
  {
    hora: "6h15",
    titulo: "A newsletter chega",
    texto: "“Valor Manhã” no seu e-mail: os cinco assuntos do dia em oito minutos de leitura, antes de qualquer reunião.",
  },
  {
    hora: "6h40",
    titulo: "O impresso na porta",
    texto: "Para quem assina o combo, o papel chega antes do pão. O ritual de abrir o jornal continua imbatível para pensar devagar.",
  },
  {
    hora: "7h30",
    titulo: "O mercado esquenta",
    texto: "Pré-abertura comentada no app: câmbio, juros e o humor de Nova York — com análise, não achismo.",
  },
  {
    hora: "9h00",
    titulo: "Você já sabia",
    texto: "O pregão abre e a pauta da sua reunião já estava na sua cabeça desde as 6h15. É essa a diferença que se assina.",
  },
];

export default function ValorManhaPage() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (reduced) return;

      gsap.fromTo(
        ".vm-hero-el",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: "power2.out", delay: 0.2 }
      );

      // linha da rotina desenha conforme o scroll
      gsap.fromTo(
        ".vm-linha",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top center",
          scrollTrigger: {
            trigger: ".vm-rotina",
            start: "top 70%",
            end: "bottom 60%",
            scrub: 0.4,
          },
        }
      );

      gsap.utils.toArray<HTMLElement>(".vm-passo").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, x: -24 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 80%" },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>(".vm-up").forEach((el) => {
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
      className="min-h-screen bg-[#fdf6ef] text-[#33302b] selection:bg-[#e8590c] selection:text-white"
      style={{ fontFamily: "var(--font-valor-sans), sans-serif" }}
    >
      <style>{`.vm-serif { font-family: var(--font-valor-serif), serif; }`}</style>

      {/* hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#14273f] via-[#8c5a3b] to-[#fdf6ef] text-white">
        <header className="relative z-10 mx-auto flex max-w-5xl items-center justify-between px-4 py-5 sm:px-8">
          <span className="vm-serif text-2xl font-bold">
            Valor <span className="font-normal italic">Econômico</span>
          </span>
          <a
            href="#planos"
            className="rounded-full border border-white/60 px-5 py-2 text-xs font-bold tracking-widest uppercase transition-colors hover:bg-white hover:text-[#14273f]"
          >
            Assinar
          </a>
        </header>
        <div className="relative z-10 mx-auto max-w-3xl px-4 pt-16 pb-28 text-center sm:px-8">
          <p className="vm-hero-el text-xs font-bold tracking-[0.3em] text-[#ffd8a8] uppercase">
            das 5h50 às 9h00
          </p>
          <h1 className="vm-serif vm-hero-el mt-4 text-4xl leading-[1.06] font-bold sm:text-6xl">
            O dia de quem assina
            <br />
            começa <em className="text-[#ffd8a8]">antes do dia.</em>
          </h1>
          <p className="vm-hero-el mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/85">
            Uma assinatura do Valor não é um site liberado — é uma rotina de
            manhã inteira, do e-mail das 6h15 ao papel na porta.
          </p>
          <a
            href="#rotina"
            className="vm-hero-el mt-9 inline-block rounded-full bg-[#e8590c] px-8 py-4 text-base font-bold shadow-xl transition-transform hover:scale-[1.03]"
          >
            Ver como é a manhã
          </a>
        </div>
        {/* xícara: vapor sutil */}
        <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 text-4xl" aria-hidden>
          ☕
        </div>
      </section>

      {/* rotina */}
      <section id="rotina" className="vm-rotina mx-auto max-w-2xl px-4 py-20 sm:px-8">
        <div className="relative pl-10">
          <div className="vm-linha absolute top-1 bottom-1 left-[7px] w-[2px] bg-[#e8590c]" aria-hidden />
          <ol className="space-y-12">
            {ROTINA.map((r) => (
              <li key={r.hora} className="vm-passo relative">
                <span className="absolute top-1.5 -left-10 h-4 w-4 rounded-full border-[3px] border-[#e8590c] bg-[#fdf6ef]" aria-hidden />
                <p className="vm-serif text-sm font-bold text-[#e8590c]">{r.hora}</p>
                <h3 className="vm-serif mt-1 text-2xl font-bold">{r.titulo}</h3>
                <p className="mt-2 leading-relaxed text-[#6b6459]">{r.texto}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* planos */}
      <section id="planos" className="border-t border-[#eadfd2] bg-[#f9e7dc] px-4 py-16 sm:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="vm-serif vm-up text-center text-3xl font-bold sm:text-4xl">
            Escolha a sua manhã
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <article className="vm-up rounded-2xl bg-white p-8 shadow-[0_16px_40px_-24px_rgba(51,48,43,0.4)]">
              <p className="text-xs font-bold tracking-widest text-[#e8590c] uppercase">manhã digital</p>
              <h3 className="vm-serif mt-1 text-2xl font-bold">Newsletter + app</h3>
              <p className="mt-4">
                <span className="vm-serif text-5xl font-bold">R$ 34,90</span>
                <span className="text-sm text-[#6b6459]">/mês*</span>
              </p>
              <ul className="mt-5 space-y-2 text-sm text-[#6b6459]">
                <li>✓ Valor Manhã às 6h15</li>
                <li>✓ Pré-abertura comentada no app</li>
                <li>✓ Jornal digital completo</li>
              </ul>
              <a href="#" onClick={(e) => e.preventDefault()} className="mt-7 block rounded-full border-2 border-[#33302b] py-3 text-center text-sm font-bold transition-colors hover:bg-[#33302b] hover:text-white">
                Assinar a manhã digital
              </a>
            </article>
            <article className="vm-up rounded-2xl bg-[#14273f] p-8 text-white shadow-[0_24px_50px_-24px_rgba(20,39,63,0.7)]">
              <p className="text-xs font-bold tracking-widest text-[#ffd8a8] uppercase">manhã completa</p>
              <h3 className="vm-serif mt-1 text-2xl font-bold">Digital + impresso na porta</h3>
              <p className="mt-4">
                <span className="vm-serif text-5xl font-bold">R$ 89,90</span>
                <span className="text-sm text-white/70">/mês*</span>
              </p>
              <ul className="mt-5 space-y-2 text-sm text-white/85">
                <li>✓ Tudo da manhã digital</li>
                <li>✓ Impresso de seg. a sáb. até 7h30</li>
                <li>✓ Anuários e revistas setoriais</li>
              </ul>
              <a href="#" onClick={(e) => e.preventDefault()} className="mt-7 block rounded-full bg-[#e8590c] py-3 text-center text-sm font-bold transition-transform hover:scale-[1.02]">
                Assinar a manhã completa
              </a>
            </article>
          </div>
          <p className="vm-up mt-6 text-center text-xs text-[#6b6459]">
            *Valores ilustrativos de portfólio. Digital sem fidelidade.
          </p>
        </div>
      </section>

      <footer className="border-t border-[#eadfd2] px-4 py-6 text-xs text-[#6b6459] sm:px-8">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3">
          <span>Página conceitual de portfólio — sem vínculo oficial com o Valor Econômico / Globo.</span>
          <Link href="/valor/manha/guide" className="underline underline-offset-2 hover:text-[#e8590c]">
            Como esta página foi feita →
          </Link>
        </div>
      </footer>
    </div>
  );
}
