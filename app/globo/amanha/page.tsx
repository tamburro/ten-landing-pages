"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function Capa({ data, borrada }: { data: string; borrada: boolean }) {
  return (
    <div className="relative overflow-hidden border border-[#d8d2c4] bg-[#fbf9f4] shadow-[0_30px_60px_-30px_rgba(20,24,29,0.5)]">
      <div className={`p-5 transition-[filter] duration-700 sm:p-7 ${borrada ? "blur-[7px] select-none" : ""}`} aria-hidden={borrada}>
        {/* cabeçalho da capa */}
        <p className="text-center text-[9px] font-semibold tracking-[0.25em] text-[#5c6570] uppercase">{data}</p>
        <p className="gam-serif mt-1 text-center text-4xl font-black tracking-tight sm:text-5xl">O GLOBO</p>
        <div className="mt-2 h-[2px] bg-[#14181d]" />
        <div className="mt-0.5 h-px bg-[#14181d]" />

        {/* manchete */}
        <p className="gam-serif mt-4 text-xl leading-tight font-black sm:text-2xl">
          Congresso costura acordo e vota marco do setor elétrico na quinta
        </p>
        <p className="mt-2 text-[11px] leading-relaxed text-[#3d454f]">
          Relator aceita escalonar a transição; distribuidoras terão três anos
          para se adaptar. Analistas veem alívio de até 7% na conta de luz a
          partir do ano que vem.
        </p>

        {/* colunas */}
        <div className="mt-4 grid grid-cols-3 gap-3 border-t border-[#d8d2c4] pt-3">
          <div>
            <p className="text-[9px] font-extrabold tracking-wider text-[#0a5cb8] uppercase">Rio</p>
            <p className="gam-serif mt-1 text-[12px] leading-snug font-bold">
              Metrô anuncia expansão da linha 4 até a Gávea
            </p>
          </div>
          <div>
            <p className="text-[9px] font-extrabold tracking-wider text-[#0a5cb8] uppercase">Economia</p>
            <p className="gam-serif mt-1 text-[12px] leading-snug font-bold">
              Safra recorde segura inflação de alimentos
            </p>
          </div>
          <div>
            <p className="text-[9px] font-extrabold tracking-wider text-[#0a5cb8] uppercase">Cultura</p>
            <p className="gam-serif mt-1 text-[12px] leading-snug font-bold">
              Bienal do Rio bate recorde de expositores
            </p>
          </div>
        </div>

        {/* rodapé da capa */}
        <div className="mt-4 flex items-center justify-between border-t-2 border-[#14181d] pt-2 text-[9px] font-semibold tracking-wider text-[#5c6570] uppercase">
          <span>Ano CI · Nº 33.412</span>
          <span>R$ 6,50</span>
        </div>
      </div>

      {/* vidro / cadeado */}
      {borrada && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/25 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#14181d] text-2xl text-white shadow-xl">🔒</span>
          <p className="gam-serif mt-4 max-w-[220px] text-lg leading-snug font-black text-[#14181d]">
            A capa de amanhã é dos assinantes.
          </p>
          <a
            href="#assinar"
            className="mt-4 rounded-full bg-[#0a5cb8] px-6 py-2.5 text-xs font-bold text-white shadow-lg transition-transform hover:scale-105"
          >
            Desbloquear por R$ 9,90/mês*
          </a>
        </div>
      )}
    </div>
  );
}

export default function GloboAmanhaPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [aba, setAba] = useState<"hoje" | "amanha">("amanha");

  const datas = useMemo(() => {
    const fmt = (d: Date) =>
      d
        .toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })
        .replace(/^./, (c) => c.toUpperCase());
    const hoje = new Date();
    const amanha = new Date(hoje);
    amanha.setDate(hoje.getDate() + 1);
    return { hoje: fmt(hoje), amanha: fmt(amanha) };
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (reduced) return;
      gsap.fromTo(
        ".gam-hero-el",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power2.out", delay: 0.15 }
      );
      gsap.utils.toArray<HTMLElement>(".gam-up").forEach((el) => {
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
      className="min-h-screen bg-[#101418] text-[#e8ecf1] selection:bg-[#0a5cb8] selection:text-white"
      style={{ fontFamily: "var(--font-globo-sans), sans-serif" }}
    >
      <style>{`.gam-serif { font-family: var(--font-globo-serif), serif; }`}</style>

      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-8">
        <span className="gam-serif text-2xl font-black">O GLOBO</span>
        <span className="hidden text-xs font-semibold tracking-[0.25em] text-[#8b93a1] uppercase sm:block">
          edição de amanhã · fecha às 22h
        </span>
        <a href="#assinar" className="rounded-md bg-[#0a5cb8] px-5 py-2.5 text-sm font-bold text-white transition-transform hover:scale-105">
          Assinar
        </a>
      </header>

      {/* hero */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 pt-10 pb-20 sm:grid-cols-2 sm:px-8">
        <div>
          <p className="gam-hero-el text-xs font-bold tracking-[0.3em] text-[#ffd43b] uppercase">
            privilégio de assinante nº 1
          </p>
          <h1 className="gam-serif gam-hero-el mt-4 text-4xl leading-[1.08] font-black sm:text-6xl">
            Leia a capa de
            <br />
            <span className="text-[#ffd43b]">amanhã</span> hoje
            <br />à noite.
          </h1>
          <p className="gam-hero-el mt-6 max-w-md text-lg leading-relaxed text-[#aeb8c4]">
            Todo dia às 22h, o assinante recebe a primeira página da edição
            seguinte — antes da banca, antes das redes, antes de todo mundo.
            Ao lado, a de amanhã. Ainda embaçada para você.
          </p>
          <div className="gam-hero-el mt-8 flex gap-2 rounded-full bg-white/10 p-1.5 backdrop-blur-sm" role="tablist" aria-label="Escolher edição">
            <button
              role="tab"
              aria-selected={aba === "hoje"}
              onClick={() => setAba("hoje")}
              className={`flex-1 rounded-full px-5 py-2.5 text-sm font-bold transition-colors ${
                aba === "hoje" ? "bg-white text-[#14181d]" : "text-white/70 hover:text-white"
              }`}
            >
              Capa de hoje
            </button>
            <button
              role="tab"
              aria-selected={aba === "amanha"}
              onClick={() => setAba("amanha")}
              className={`flex-1 rounded-full px-5 py-2.5 text-sm font-bold transition-colors ${
                aba === "amanha" ? "bg-[#ffd43b] text-[#14181d]" : "text-white/70 hover:text-white"
              }`}
            >
              Capa de amanhã 🔒
            </button>
          </div>
          <p className="gam-hero-el mt-3 text-xs text-[#8b93a1]">
            Capas fictícias de demonstração — o mecanismo é o produto real.
          </p>
        </div>

        <div className="text-[#14181d]">
          <Capa data={aba === "hoje" ? datas.hoje : datas.amanha} borrada={aba === "amanha"} />
        </div>
      </section>

      {/* como funciona */}
      <section className="border-y border-white/10 bg-[#161c22] px-4 py-14 sm:px-8">
        <div className="mx-auto grid max-w-5xl gap-8 text-center sm:grid-cols-3">
          {[
            { h: "22h04", t: "A edição fecha", d: "A redação bate o martelo e a primeira página está pronta." },
            { h: "22h10", t: "Chega no seu e-mail", d: "A capa em alta resolução + os destaques comentados pelo editor." },
            { h: "6h30", t: "O resto do mundo descobre", d: "Você já sabia. Há oito horas." },
          ].map((p) => (
            <div key={p.h} className="gam-up">
              <p className="gam-serif text-3xl font-black text-[#ffd43b]">{p.h}</p>
              <h3 className="mt-2 text-lg font-bold">{p.t}</h3>
              <p className="mt-1 text-sm leading-relaxed text-[#aeb8c4]">{p.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* oferta */}
      <section id="assinar" className="px-4 py-16 sm:px-8">
        <div className="gam-up mx-auto max-w-lg rounded-2xl border border-white/15 bg-[#161c22] p-8 text-center">
          <p className="text-xs font-bold tracking-[0.25em] text-[#ffd43b] uppercase">digital completo</p>
          <p className="gam-serif mt-3 text-6xl font-black">R$ 9,90</p>
          <p className="text-xs text-[#8b93a1]">/mês* nos 12 primeiros meses · depois R$ 29,90</p>
          <ul className="mx-auto mt-5 max-w-xs space-y-1.5 text-left text-sm text-[#aeb8c4]">
            <li>✓ Capa de amanhã às 22h, todo dia</li>
            <li>✓ Site, app e edição digital completos</li>
            <li>✓ Impresso opcional por R$ 49,90/mês</li>
          </ul>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="mt-7 block rounded-md bg-[#ffd43b] py-3.5 text-sm font-extrabold text-[#14181d] transition-transform hover:scale-[1.02]"
          >
            Desbloquear a capa de amanhã
          </a>
          <p className="mt-3 text-[11px] text-[#8b93a1]">*Valor ilustrativo de portfólio. Cancele quando quiser.</p>
        </div>
      </section>

      <footer className="border-t border-white/10 px-4 py-6 text-xs text-[#8b93a1] sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3">
          <span>Página conceitual de portfólio — sem vínculo oficial com O GLOBO / Editora Globo.</span>
          <Link href="/globo/amanha/guide" className="underline underline-offset-2 hover:text-[#ffd43b]">
            Como esta página foi feita →
          </Link>
        </div>
      </footer>
    </div>
  );
}
