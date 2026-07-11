"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const MANCHETES = [
  "1945 — FIM DA GUERRA NA EUROPA",
  "1950 — MARACANÃ ABRE AS PORTAS",
  "1960 — BRASÍLIA É INAUGURADA",
  "1985 — DIRETAS: A REPÚBLICA VOLTA ÀS RUAS",
  "1994 — O REAL CHEGA AO BOLSO",
  "2016 — O RIO RECEBE O MUNDO",
];

const MARCOS = [
  { ano: "1925", fato: "Primeira edição circula no Rio de Janeiro." },
  { ano: "1962", fato: "Primeira redação integrada de rádio e jornal do país." },
  { ano: "1996", fato: "O jornal chega à internet antes da maioria do mundo." },
  { ano: "2012", fato: "Acervo centenário digitalizado, aberto a assinantes." },
  { ano: "hoje", fato: "Uma redação, todas as telas — e o papel de sempre." },
];

const PLANOS = [
  {
    nome: "Digital",
    preco: "9,90",
    depois: "depois R$ 29,90/mês",
    itens: [
      "Site e app sem limites",
      "Acervo desde 1925",
      "Newsletters exclusivas",
      "Jogos e vertical de receitas",
    ],
    destaque: false,
    cta: "Assinar o Digital",
  },
  {
    nome: "Digital + Impresso",
    preco: "49,90",
    depois: "fidelidade de 12 meses",
    itens: [
      "Tudo do Digital",
      "Jornal na sua porta todos os dias",
      "Edição de sábado ampliada",
      "Revistas e cadernos especiais",
    ],
    destaque: true,
    cta: "Quero o jornal em casa",
  },
];

export default function GloboHerancaPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [stickyVisible, setStickyVisible] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: ".gh-hero",
        start: "bottom top",
        onEnter: () => setStickyVisible(true),
        onLeaveBack: () => setStickyVisible(false),
      });

      if (reduced) return;

      gsap.fromTo(
        ".gh-rule",
        { scaleX: 0 },
        { scaleX: 1, duration: 1.1, ease: "power3.inOut", stagger: 0.12, transformOrigin: "left center" }
      );
      gsap.fromTo(
        ".gh-hero-el",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.1, ease: "power2.out", delay: 0.2 }
      );
      gsap.utils.toArray<HTMLElement>(".gh-up").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 85%" },
          }
        );
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      className="min-h-screen bg-[#f8f5ee] text-[#14181d] selection:bg-[#0a5cb8] selection:text-white"
      style={{ fontFamily: "var(--font-globo-sans), sans-serif" }}
    >
      <style>{`
        .gh-serif { font-family: var(--font-globo-serif), serif; }
        .gh-ticker { animation: gh-tick 42s linear infinite; }
        @keyframes gh-tick { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @media (prefers-reduced-motion: reduce) { .gh-ticker { animation: none; } }
        .gh-cols { column-count: 1; column-gap: 2rem; column-rule: 1px solid #d8d2c4; }
        @media (min-width: 640px) { .gh-cols { column-count: 3; } }
      `}</style>

      {/* cabeçalho de capa */}
      <header className="border-b-2 border-[#14181d] px-4 pt-8 pb-4 text-center sm:px-8">
        <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#5c6570]">
          Rio de Janeiro · edição do futuro assinante
        </p>
        <h1 className="gh-serif mt-2 text-[clamp(3rem,10vw,7rem)] leading-none font-black tracking-tight">
          O GLOBO
        </h1>
        <div className="gh-rule mx-auto mt-4 h-[3px] max-w-3xl bg-[#14181d]" />
        <div className="gh-rule mx-auto mt-1 h-px max-w-3xl bg-[#14181d]" />
      </header>

      {/* manchete-hero */}
      <section className="gh-hero mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-12 sm:px-8">
        <div className="sm:col-span-7">
          <p className="gh-hero-el text-xs font-bold tracking-[0.2em] text-[#0a5cb8] uppercase">
            Manchete de hoje — e de todo dia
          </p>
          <h2 className="gh-serif gh-hero-el mt-3 text-4xl leading-[1.08] font-black sm:text-6xl">
            Há um século, o Rio acorda com a gente na mesa.
          </h2>
          <p className="gh-hero-el mt-5 max-w-xl text-lg leading-relaxed text-[#3d454f]">
            Assine e leve o jornal inteiro — no papel, no celular e no acervo
            que guarda cada manchete desde 1925. A partir de{" "}
            <strong className="text-[#14181d]">R$ 9,90/mês*</strong> nos 12
            primeiros meses.
          </p>
          <div className="gh-hero-el mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#planos"
              className="rounded-md bg-[#0a5cb8] px-8 py-4 text-base font-bold text-white shadow-[0_10px_24px_-10px_rgba(10,92,184,0.7)] transition-transform hover:scale-[1.03]"
            >
              Ver planos de assinatura
            </a>
            <span className="text-sm text-[#5c6570]">
              Cancele quando quiser. Sem multa no digital.
            </span>
          </div>
          <ul className="gh-hero-el mt-8 flex flex-wrap gap-x-8 gap-y-2 text-sm font-semibold text-[#3d454f]">
            <li>✓ 5,7 milhões de leitores/mês</li>
            <li>✓ Acervo completo desde 1925</li>
            <li>✓ 74 prêmios Esso</li>
          </ul>
        </div>

        {/* coluna de jornal decorativa */}
        <div className="gh-up hidden sm:col-span-5 sm:block" aria-hidden>
          <div className="border border-[#d8d2c4] bg-[#fbf9f4] p-6 shadow-[6px_6px_0_#e7e1d3]">
            <p className="gh-serif border-b border-[#d8d2c4] pb-2 text-sm font-bold italic">
              Primeira página, todos os dias
            </p>
            <div className="gh-cols mt-4 text-justify text-[11px] leading-relaxed text-[#5c6570]">
              <p>
                A cidade amanhece e a redação já fechou três edições. Entre o
                cais do porto e o alto da serra, oitenta repórteres verificam o
                que a madrugada tentou esconder. O leitor abre a porta, apanha
                o exemplar, e a tinta ainda parece fresca — porque é.
              </p>
              <p className="mt-3">
                No aplicativo, a mesma apuração chega antes do café passar.
                Fotografia, dado, contexto: o pacote inteiro, sem atalho. Quem
                assina não recebe só notícia; recebe o método que a produz.
              </p>
              <p className="mt-3">
                E aos sábados, o papel engorda: cadernos de cultura, imóveis,
                bairro a bairro. Um ritual carioca com um século de prática.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ticker de manchetes históricas */}
      <div className="overflow-hidden border-y border-[#14181d] bg-[#14181d] py-2.5 text-[#f8f5ee]" aria-hidden>
        <div className="gh-ticker flex w-max gap-10 whitespace-nowrap text-xs font-bold tracking-[0.15em]">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex gap-10">
              {MANCHETES.map((m) => (
                <span key={m}>★ {m}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* marcos */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-8">
        <h3 className="gh-serif gh-up text-2xl font-black sm:text-4xl">
          Você não assina um jornal. <em className="text-[#0a5cb8]">Assina um século.</em>
        </h3>
        <ol className="mt-10 grid gap-6 sm:grid-cols-5">
          {MARCOS.map((m) => (
            <li key={m.ano} className="gh-up border-t-2 border-[#14181d] pt-3">
              <p className="gh-serif text-2xl font-black text-[#0a5cb8]">{m.ano}</p>
              <p className="mt-2 text-sm leading-relaxed text-[#3d454f]">{m.fato}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* planos */}
      <section id="planos" className="border-t-2 border-[#14181d] bg-[#f1ecdf] px-4 py-16 sm:px-8">
        <div className="mx-auto max-w-4xl">
          <h3 className="gh-serif gh-up text-center text-3xl font-black sm:text-4xl">
            Escolha como quer acordar
          </h3>
          <p className="gh-up mt-2 text-center text-sm text-[#5c6570]">
            *Valores ilustrativos de portfólio. Promoção nos 12 primeiros meses.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {PLANOS.map((p) => (
              <article
                key={p.nome}
                className={`gh-up relative flex flex-col border-2 bg-[#fbf9f4] p-8 ${
                  p.destaque
                    ? "border-[#0a5cb8] shadow-[8px_8px_0_#0a5cb8]"
                    : "border-[#14181d]"
                }`}
              >
                {p.destaque && (
                  <span className="absolute -top-3 left-6 bg-[#0a5cb8] px-3 py-1 text-[11px] font-bold tracking-wider text-white uppercase">
                    O clássico completo
                  </span>
                )}
                <h4 className="gh-serif text-2xl font-black">{p.nome}</h4>
                <p className="mt-4">
                  <span className="align-top text-lg font-bold">R$</span>
                  <span className="gh-serif text-6xl font-black">{p.preco}</span>
                  <span className="text-sm text-[#5c6570]">/mês*</span>
                </p>
                <p className="text-xs text-[#5c6570]">{p.depois}</p>
                <ul className="mt-6 flex-1 space-y-2 text-sm text-[#3d454f]">
                  {p.itens.map((i) => (
                    <li key={i}>✓ {i}</li>
                  ))}
                </ul>
                <a
                  href="#assinar"
                  className={`mt-8 block rounded-md py-3.5 text-center text-sm font-bold transition-transform hover:scale-[1.02] ${
                    p.destaque
                      ? "bg-[#0a5cb8] text-white"
                      : "border-2 border-[#14181d] text-[#14181d] hover:bg-[#14181d] hover:text-white"
                  }`}
                >
                  {p.cta}
                </a>
              </article>
            ))}
          </div>
          <p className="gh-up mt-8 text-center text-sm font-semibold text-[#3d454f]">
            🛡 7 dias grátis no digital · cancele em dois cliques · atendimento no Rio, de gente
          </p>
        </div>
      </section>

      {/* fecho */}
      <section id="assinar" className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-8">
        <p className="gh-serif gh-up text-2xl leading-snug font-bold italic sm:text-3xl">
          “Jornal bom é o que envelhece em um dia — e vale por cem anos.”
        </p>
        <a
          href="#planos"
          className="gh-up mt-8 inline-block rounded-md bg-[#14181d] px-10 py-4 text-base font-bold text-[#f8f5ee] transition-transform hover:scale-[1.03]"
        >
          Assinar O GLOBO
        </a>
      </section>

      {/* sticky CTA */}
      <div
        className={`fixed inset-x-0 bottom-0 z-40 border-t-2 border-[#14181d] bg-[#fbf9f4]/95 backdrop-blur-sm transition-transform duration-300 ${
          stickyVisible ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-8">
          <p className="text-sm font-semibold">
            <span className="gh-serif font-black">O GLOBO</span> · digital a partir de{" "}
            <span className="text-[#0a5cb8]">R$ 9,90/mês*</span>
          </p>
          <a
            href="#planos"
            className="shrink-0 rounded-md bg-[#0a5cb8] px-6 py-2.5 text-sm font-bold text-white"
          >
            Assinar
          </a>
        </div>
      </div>

      <footer className="border-t border-[#d8d2c4] px-4 py-6 pb-24 text-xs text-[#5c6570] sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3">
          <span>
            Página conceitual de portfólio — sem vínculo oficial com O GLOBO / Editora Globo.
          </span>
          <Link href="/globo/heranca/guide" className="underline underline-offset-2 hover:text-[#0a5cb8]">
            Como esta página foi feita →
          </Link>
        </div>
      </footer>
    </div>
  );
}
