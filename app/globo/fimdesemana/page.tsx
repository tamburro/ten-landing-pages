"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const CADERNOS = [
  { nome: "Primeiro Caderno", desc: "O país e o mundo, com a calma que a semana não teve.", cor: "#14181d" },
  { nome: "Ela", desc: "Moda, comportamento e gente — para ler de pés para cima.", cor: "#a61e4d" },
  { nome: "Rio Show", desc: "O roteiro do fim de semana: palco, tela e mesa.", cor: "#e07a2f" },
  { nome: "Economia", desc: "O seu dinheiro explicado sem pressa de pregão.", cor: "#0a5cb8" },
  { nome: "Esportes", desc: "A rodada inteira, o tático e o passional.", cor: "#2f9e44" },
];

const RITUAL = [
  { h: "8h", t: "O baque na porta", d: "O exemplar de sábado chega gordo. É o som oficial do fim de semana começando." },
  { h: "9h", t: "Café e Primeiro Caderno", d: "Quarenta minutos de mundo, sem notificação puxando a manga." },
  { h: "11h", t: "A divisão dos cadernos", d: "Cada um da casa pega o seu. O Rio Show decide o sábado à noite." },
];

export default function GloboFimDeSemanaPage() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (reduced) return;
      gsap.fromTo(
        ".gw-hero-el",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 1.0, stagger: 0.14, ease: "power2.out", delay: 0.2 }
      );
      // cadernos se espalham como sobre a mesa
      gsap.fromTo(
        ".gw-caderno",
        { y: 40, rotation: 0, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          rotation: (i) => [-3, 2, -1.5, 2.5, -2][i % 5],
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: ".gw-mesa", start: "top 75%" },
        }
      );
      gsap.utils.toArray<HTMLElement>(".gw-up").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
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
      className="min-h-screen bg-[#f7f1e5] text-[#2b2620] selection:bg-[#14181d] selection:text-[#f7f1e5]"
      style={{ fontFamily: "var(--font-globo-sans), sans-serif" }}
    >
      <style>{`.gw-serif { font-family: var(--font-globo-serif), serif; }`}</style>

      <header className="mx-auto flex max-w-5xl items-center justify-between px-4 py-5 sm:px-8">
        <span className="gw-serif text-2xl font-black">O GLOBO</span>
        <span className="text-xs font-bold tracking-[0.25em] text-[#8a7f6d] uppercase">
          assinatura fim de semana
        </span>
      </header>

      {/* hero */}
      <section className="mx-auto max-w-5xl px-4 pt-14 pb-16 sm:px-8">
        <p className="gw-hero-el text-xs font-bold tracking-[0.3em] text-[#a61e4d] uppercase">
          impresso sáb + dom · digital a semana inteira
        </p>
        <h1 className="gw-serif gw-hero-el mt-4 max-w-3xl text-4xl leading-[1.08] font-black sm:text-6xl">
          A semana pode ser tela.
          <br />
          <em className="text-[#a61e4d]">O domingo pede papel.</em>
        </h1>
        <p className="gw-hero-el mt-6 max-w-xl text-lg leading-relaxed text-[#5f564a]">
          Segunda a sexta, você lê no app como todo mundo. Sábado e domingo, o
          jornal chega em casa do jeito que fim de semana merece: grande,
          dobrável e sem bateria.
        </p>
        <div className="gw-hero-el mt-8 flex flex-wrap items-center gap-4">
          <a
            href="#plano"
            className="rounded-md bg-[#14181d] px-8 py-4 text-base font-bold text-[#f7f1e5] transition-transform hover:scale-[1.03]"
          >
            Assinar o fim de semana
          </a>
          <span className="text-sm font-semibold text-[#5f564a]">R$ 29,90/mês* · metade do impresso diário</span>
        </div>
      </section>

      {/* mesa de cadernos */}
      <section className="gw-mesa border-y-2 border-[#2b2620]/15 bg-[#efe6d4] px-4 py-16 sm:px-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="gw-serif gw-up text-3xl font-black sm:text-4xl">
            A mesa de sábado
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {CADERNOS.map((c) => (
              <article
                key={c.nome}
                className="gw-caderno bg-[#fbf7ee] p-5 shadow-[0_14px_30px_-14px_rgba(43,38,32,0.4)]"
                style={{ borderTop: `6px solid ${c.cor}` }}
              >
                <h3 className="gw-serif text-lg leading-tight font-black" style={{ color: c.cor }}>
                  {c.nome}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#5f564a]">{c.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ritual */}
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-8">
        <h2 className="gw-serif gw-up text-3xl font-black">O sábado, em três atos</h2>
        <ol className="mt-8 space-y-8">
          {RITUAL.map((r) => (
            <li key={r.h} className="gw-up flex gap-6">
              <span className="gw-serif w-14 shrink-0 text-2xl font-black text-[#a61e4d]">{r.h}</span>
              <div>
                <h3 className="text-lg font-bold">{r.t}</h3>
                <p className="mt-1 leading-relaxed text-[#5f564a]">{r.d}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* plano */}
      <section id="plano" className="border-t-2 border-[#2b2620]/15 px-4 py-16 sm:px-8">
        <div className="gw-up mx-auto max-w-lg border-2 border-[#2b2620] bg-[#fbf7ee] p-8 text-center shadow-[8px_8px_0_#a61e4d]">
          <p className="text-xs font-bold tracking-[0.25em] text-[#a61e4d] uppercase">
            fim de semana + digital
          </p>
          <p className="gw-serif mt-3 text-6xl font-black">R$ 29,90</p>
          <p className="text-xs text-[#8a7f6d]">/mês* · impresso sáb e dom + digital 7 dias</p>
          <ul className="mx-auto mt-5 max-w-xs space-y-1.5 text-left text-sm text-[#5f564a]">
            <li>✓ Edições de sábado e domingo na porta</li>
            <li>✓ Todos os cadernos e revistas de fim de semana</li>
            <li>✓ Digital ilimitado de segunda a sexta</li>
          </ul>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="mt-7 block rounded-md bg-[#14181d] py-3.5 text-sm font-bold text-[#f7f1e5] transition-transform hover:scale-[1.02]"
          >
            Quero meu sábado de papel
          </a>
          <p className="mt-3 text-[11px] text-[#8a7f6d]">
            *Valor ilustrativo de portfólio. Fidelidade de 12 meses no impresso. Consulte área de entrega.
          </p>
        </div>
      </section>

      <footer className="border-t border-[#2b2620]/15 px-4 py-6 text-xs text-[#8a7f6d] sm:px-8">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3">
          <span>Página conceitual de portfólio — sem vínculo oficial com O GLOBO / Editora Globo.</span>
          <Link href="/globo/fimdesemana/guide" className="underline underline-offset-2 hover:text-[#a61e4d]">
            Como esta página foi feita →
          </Link>
        </div>
      </footer>
    </div>
  );
}
