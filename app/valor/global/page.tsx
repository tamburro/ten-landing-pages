"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const PRACAS = [
  { cidade: "Tóquio", tz: "Asia/Tokyo", abre: 9, fecha: 15 },
  { cidade: "Londres", tz: "Europe/London", abre: 8, fecha: 16.5 },
  { cidade: "Nova York", tz: "America/New_York", abre: 9.5, fecha: 16 },
  { cidade: "São Paulo", tz: "America/Sao_Paulo", abre: 10, fecha: 17 },
];

const FIOS = [
  { t: "Antes de Tóquio fechar", d: "O resumo da Ásia chega às 6h: iene, chips e o que a China sinalizou enquanto você dormia." },
  { t: "Enquanto Londres opera", d: "Commodities e câmbio com leitura própria — não tradução de agência." },
  { t: "Quando NY dita o tom", d: "Fed, treasuries e techs: o que muda para o juro — e para o seu financiamento — aqui." },
];

function horaEm(tz: string, agora: Date | null): { hhmm: string; dec?: number } {
  if (!agora) return { hhmm: "--:--" };
  const fmt = new Intl.DateTimeFormat("pt-BR", {
    timeZone: tz,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const hhmm = fmt.format(agora);
  const [h, m] = hhmm.split(":").map(Number);
  return { hhmm, dec: h + m / 60 };
}

export default function ValorGlobalPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [agora, setAgora] = useState<Date | null>(null);

  useEffect(() => {
    const tick = () => setAgora(new Date());
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (reduced) return;
      gsap.fromTo(
        ".vgl-hero-el",
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power2.out", delay: 0.15 }
      );
      gsap.utils.toArray<HTMLElement>(".vgl-up").forEach((el) => {
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
      className="min-h-screen bg-[#0b1f38] text-[#e9eef5] selection:bg-[#d4a418] selection:text-[#0b1f38]"
      style={{ fontFamily: "var(--font-valor-sans), sans-serif" }}
    >
      <style>{`.vgl-serif { font-family: var(--font-valor-serif), serif; }`}</style>

      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-8">
        <span className="vgl-serif text-2xl font-bold">
          Valor <span className="font-normal italic">Econômico</span>
        </span>
        <a href="#assinar" className="rounded bg-[#d4a418] px-5 py-2.5 text-sm font-bold text-[#0b1f38] transition-transform hover:scale-105">
          Assinar
        </a>
      </header>

      {/* relógios */}
      <div className="border-y border-[#24466e] bg-[#081729]">
        <div className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-[#24466e] sm:grid-cols-4">
          {PRACAS.map((p) => {
            const { hhmm, dec } = horaEm(p.tz, agora);
            const aberto = dec !== undefined && dec >= p.abre && dec < p.fecha;
            return (
              <div key={p.cidade} className="px-4 py-4 text-center">
                <p className="text-[11px] font-bold tracking-[0.2em] text-[#7fa3cc] uppercase">{p.cidade}</p>
                <p className="vgl-serif mt-1 text-2xl font-bold tabular-nums">{hhmm}</p>
                <p className={`mt-1 text-[10px] font-bold tracking-widest uppercase ${aberto ? "text-[#69db7c]" : "text-[#54739a]"}`}>
                  {agora ? (aberto ? "● pregão aberto" : "○ fechado") : "…"}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* hero */}
      <section className="mx-auto max-w-6xl px-4 pt-14 pb-16 sm:px-8">
        <p className="vgl-hero-el text-xs font-bold tracking-[0.3em] text-[#d4a418] uppercase">
          cobertura internacional
        </p>
        <h1 className="vgl-serif vgl-hero-el mt-4 max-w-3xl text-4xl leading-[1.06] font-bold sm:text-6xl">
          O mundo fecha.
          <br />
          <em className="text-[#d4a418]">O Brasil abre sabendo.</em>
        </h1>
        <p className="vgl-hero-el mt-6 max-w-xl text-lg leading-relaxed text-[#b9c9dc]">
          Entre o fechamento de Tóquio e a abertura da B3 existem oito horas em
          que o seu preço muda de dono. A cobertura internacional do Valor
          costura os quatro fusos numa leitura só — em português, com juízo.
        </p>
        <a
          href="#assinar"
          className="vgl-hero-el mt-9 inline-block rounded bg-[#d4a418] px-9 py-4 text-base font-bold text-[#0b1f38] shadow-[0_14px_30px_-12px_rgba(212,164,24,0.5)] transition-transform hover:scale-[1.03]"
        >
          Assinar a leitura global
        </a>
      </section>

      {/* fios */}
      <section className="border-y border-[#24466e] bg-[#0e2b4c] px-4 py-16 sm:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-3">
          {FIOS.map((f) => (
            <article key={f.t} className="vgl-up border-l-2 border-[#d4a418] pl-5">
              <h3 className="vgl-serif text-xl font-bold">{f.t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#b9c9dc]">{f.d}</p>
            </article>
          ))}
        </div>
      </section>

      {/* oferta */}
      <section id="assinar" className="mx-auto max-w-3xl px-4 py-16 sm:px-8">
        <div className="vgl-up rounded-xl border border-[#24466e] bg-[#081729] p-8 text-center">
          <p className="text-xs font-bold tracking-[0.25em] text-[#7fa3cc] uppercase">digital completo</p>
          <p className="vgl-serif mt-3 text-6xl font-bold">R$ 34,90</p>
          <p className="text-xs text-[#7fa3cc]">/mês* nos 12 primeiros meses</p>
          <ul className="mx-auto mt-5 max-w-sm space-y-1.5 text-left text-sm text-[#b9c9dc]">
            <li>✓ Resumo da Ásia às 6h, todos os dias úteis</li>
            <li>✓ Correspondentes e análise própria, não agência traduzida</li>
            <li>✓ Impresso opcional com o caderno internacional — R$ 89,90/mês</li>
          </ul>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="mt-7 block rounded bg-[#d4a418] py-3.5 text-sm font-bold text-[#0b1f38] transition-transform hover:scale-[1.02]"
          >
            Assinar o Valor
          </a>
          <p className="mt-3 text-[11px] text-[#54739a]">
            *Valores ilustrativos de portfólio. Cancele quando quiser.
          </p>
        </div>
      </section>

      <footer className="border-t border-[#24466e] px-4 py-6 text-xs text-[#54739a] sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3">
          <span>Página conceitual de portfólio — sem vínculo oficial com o Valor Econômico / Globo.</span>
          <Link href="/valor/global/guide" className="underline underline-offset-2 hover:text-[#d4a418]">
            Como esta página foi feita →
          </Link>
        </div>
      </footer>
    </div>
  );
}
