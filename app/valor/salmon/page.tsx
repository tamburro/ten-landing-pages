"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const NOISE = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E")`;

const RITOS = [
  {
    t: "Sábado, 8h04",
    d: "A edição de fim de semana pesa o dobro e pede a mesa inteira. Café do lado direito, caneta do esquerdo.",
  },
  {
    t: "A dobra ao meio",
    d: "Nenhum PDF dobra. O vinco no meio da página é o gesto que separa ler de rolar.",
  },
  {
    t: "O recorte na geladeira",
    d: "Tem análise que vira decoração de escritório. Papel aceita tesoura; tela, não.",
  },
];

export default function ValorSalmonPage() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (reduced) return;

      // o jornal "desdobra" no load
      gsap.fromTo(
        ".vs-folha-dir",
        { rotateY: -168 },
        { rotateY: 0, duration: 1.6, ease: "power3.inOut", delay: 0.4 }
      );
      gsap.fromTo(
        ".vs-hero-el",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: "power2.out", delay: 0.2 }
      );
      gsap.utils.toArray<HTMLElement>(".vs-up").forEach((el) => {
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
      className="vs-paper min-h-screen bg-[#f6dccb] text-[#3d2b22] selection:bg-[#0e2b4c] selection:text-white"
      style={{ fontFamily: "var(--font-valor-sans), sans-serif" }}
    >
      <style>{`
        .vs-serif { font-family: var(--font-valor-serif), serif; }
        .vs-paper::before {
          content: ""; position: fixed; inset: 0; z-index: 40; pointer-events: none;
          background-image: ${NOISE}; opacity: 0.05; mix-blend-mode: multiply;
        }
        .vs-cena { perspective: 1400px; }
        .vs-folha-dir { transform-origin: left center; transform-style: preserve-3d; }
      `}</style>

      <header className="mx-auto flex max-w-5xl items-center justify-between px-4 py-5 sm:px-8">
        <span className="vs-serif text-2xl font-bold text-[#0e2b4c]">
          Valor <span className="font-normal italic">Econômico</span>
        </span>
        <a href="#plano" className="rounded bg-[#0e2b4c] px-5 py-2.5 text-sm font-bold text-white transition-transform hover:scale-105">
          Assinar o impresso
        </a>
      </header>

      {/* hero com jornal que desdobra */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 pt-12 pb-20 sm:grid-cols-2 sm:px-8">
        <div>
          <p className="vs-hero-el text-xs font-bold tracking-[0.3em] text-[#b8552a] uppercase">
            desde sempre, no papel salmão
          </p>
          <h1 className="vs-serif vs-hero-el mt-4 text-4xl leading-[1.05] font-bold text-[#0e2b4c] sm:text-6xl">
            O papel tem
            <br />
            cor de mercado.
          </h1>
          <p className="vs-hero-el mt-6 max-w-md text-lg leading-relaxed text-[#6d5142]">
            No mundo inteiro, finanças sérias se imprimem em salmão. Assine a
            edição impressa do Valor — com o digital inteiro junto — e receba a
            cor do mercado na sua porta.
          </p>
          <div className="vs-hero-el mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#plano"
              className="rounded bg-[#b8552a] px-8 py-4 text-base font-bold text-white shadow-[0_14px_30px_-12px_rgba(184,85,42,0.6)] transition-transform hover:scale-[1.03]"
            >
              Assinar impresso + digital
            </a>
            <span className="text-sm font-semibold text-[#6d5142]">R$ 89,90/mês*</span>
          </div>
        </div>

        {/* jornal dobrado em CSS */}
        <div className="vs-cena mx-auto w-full max-w-md" aria-hidden>
          <div className="relative grid grid-cols-2">
            <div className="border border-[#d9b8a2] bg-[#f9e7dc] p-5 shadow-[0_20px_50px_-20px_rgba(61,43,34,0.4)]">
              <p className="vs-serif border-b-2 border-[#0e2b4c] pb-1 text-lg font-bold text-[#0e2b4c]">
                Valor
              </p>
              <div className="mt-3 space-y-1.5">
                <div className="h-2 w-full bg-[#0e2b4c]/80" />
                <div className="h-2 w-4/5 bg-[#0e2b4c]/80" />
                <div className="mt-3 h-1.5 w-full bg-[#3d2b22]/25" />
                <div className="h-1.5 w-full bg-[#3d2b22]/25" />
                <div className="h-1.5 w-3/5 bg-[#3d2b22]/25" />
                <div className="mt-3 h-14 w-full bg-[#b8552a]/30" />
                <div className="mt-2 h-1.5 w-full bg-[#3d2b22]/25" />
                <div className="h-1.5 w-4/5 bg-[#3d2b22]/25" />
              </div>
            </div>
            <div className="vs-folha-dir border border-l-0 border-[#d9b8a2] bg-[#f6dccb] p-5 shadow-[0_20px_50px_-20px_rgba(61,43,34,0.4)]">
              <div className="space-y-1.5">
                <div className="h-1.5 w-full bg-[#3d2b22]/25" />
                <div className="h-1.5 w-full bg-[#3d2b22]/25" />
                <div className="h-1.5 w-2/3 bg-[#3d2b22]/25" />
                <div className="mt-3 h-20 w-full border border-[#3d2b22]/20 bg-white/40 p-2">
                  <div className="h-full w-full" style={{
                    background: "linear-gradient(to top right, transparent 48%, #b8552a 48%, #b8552a 52%, transparent 52%)",
                  }} />
                </div>
                <div className="mt-3 h-1.5 w-full bg-[#3d2b22]/25" />
                <div className="h-1.5 w-full bg-[#3d2b22]/25" />
                <div className="h-1.5 w-1/2 bg-[#3d2b22]/25" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ritos do papel */}
      <section className="border-y border-[#d9b8a2] bg-[#f9e7dc] px-4 py-16 sm:px-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="vs-serif vs-up text-3xl font-bold text-[#0e2b4c] sm:text-4xl">
            Coisas que só o papel faz
          </h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            {RITOS.map((r) => (
              <article key={r.t} className="vs-up border-t-2 border-[#b8552a] pt-4">
                <h3 className="vs-serif text-xl font-bold text-[#0e2b4c]">{r.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#6d5142]">{r.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* plano único */}
      <section id="plano" className="mx-auto max-w-3xl px-4 py-20 sm:px-8">
        <div className="vs-up rounded-2xl border-2 border-[#0e2b4c] bg-[#f9e7dc] p-10 text-center shadow-[10px_10px_0_#0e2b4c]">
          <p className="text-xs font-bold tracking-[0.25em] text-[#b8552a] uppercase">
            impresso + digital · o combo completo
          </p>
          <p className="vs-serif mt-4 text-6xl font-bold text-[#0e2b4c]">
            R$ 89,90<span className="text-lg font-normal text-[#6d5142]">/mês*</span>
          </p>
          <ul className="mx-auto mt-6 max-w-md space-y-2 text-left text-sm text-[#6d5142]">
            <li>✓ Jornal impresso de segunda a sábado, na porta até 7h30</li>
            <li>✓ Edição ampliada de fim de semana</li>
            <li>✓ Digital completo: app, site, newsletters e Valor Data</li>
            <li>✓ Anuários setoriais impressos inclusos</li>
          </ul>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="mt-8 inline-block rounded bg-[#b8552a] px-10 py-4 text-base font-bold text-white transition-transform hover:scale-[1.03]"
          >
            Quero o salmão na porta
          </a>
          <p className="mt-3 text-xs text-[#6d5142]/80">
            *Valor ilustrativo de portfólio. Fidelidade de 12 meses no impresso. Consulte área de entrega.
          </p>
        </div>
      </section>

      <footer className="border-t border-[#d9b8a2] px-4 py-6 text-xs text-[#6d5142] sm:px-8">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3">
          <span>Página conceitual de portfólio — sem vínculo oficial com o Valor Econômico / Globo.</span>
          <Link href="/valor/salmon/guide" className="underline underline-offset-2 hover:text-[#b8552a]">
            Como esta página foi feita →
          </Link>
        </div>
      </footer>
    </div>
  );
}
