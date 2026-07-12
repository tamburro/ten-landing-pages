"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function precoPorAssento(n: number) {
  if (n >= 50) return 19.9;
  if (n >= 20) return 23.9;
  if (n >= 10) return 27.9;
  return 31.9;
}

const fmt = (v: number, dec = 2) =>
  v.toLocaleString("pt-BR", { minimumFractionDigits: dec, maximumFractionDigits: dec });

const RECURSOS = [
  { t: "Painel do gestor", d: "Adicione e remova assentos na hora. Quem sai da empresa sai da conta no mesmo clique." },
  { t: "Nota fiscal única", d: "Um boleto, um CNPJ, um financeiro feliz. Nada de reembolso de assinatura pessoal." },
  { t: "Clipping da empresa", d: "Alertas quando o seu setor — ou o seu nome — aparece no jornal." },
  { t: "SSO opcional", d: "Login com o e-mail corporativo. Ninguém compartilha senha em planilha." },
];

export default function ValorEquipesPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [assentos, setAssentos] = useState(15);

  const unit = useMemo(() => precoPorAssento(assentos), [assentos]);
  const total = useMemo(() => unit * assentos, [unit, assentos]);
  const cheio = 34.9 * assentos;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (reduced) return;
      gsap.fromTo(
        ".ve-hero-el",
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power2.out", delay: 0.15 }
      );
      gsap.utils.toArray<HTMLElement>(".ve-up").forEach((el) => {
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
      className="min-h-screen bg-[#0e2b4c] text-[#e9eef5] selection:bg-[#e8590c] selection:text-white"
      style={{ fontFamily: "var(--font-valor-sans), sans-serif" }}
    >
      <style>{`
        .ve-serif { font-family: var(--font-valor-serif), serif; }
        .ve-range { accent-color: #e8590c; }
      `}</style>

      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-8">
        <span className="ve-serif text-2xl font-bold">
          Valor <span className="font-normal italic">Econômico</span>
          <span className="ml-2 rounded bg-[#e8590c] px-2 py-0.5 text-xs font-bold text-white uppercase">equipes</span>
        </span>
        <a href="#calculadora" className="rounded bg-[#e8590c] px-5 py-2.5 text-sm font-bold text-white transition-transform hover:scale-105">
          Cotar assentos
        </a>
      </header>

      {/* hero */}
      <section className="mx-auto max-w-6xl px-4 pt-14 pb-16 sm:px-8">
        <p className="ve-hero-el text-xs font-bold tracking-[0.3em] text-[#7fa3cc] uppercase">
          licenças corporativas
        </p>
        <h1 className="ve-serif ve-hero-el mt-4 max-w-3xl text-4xl leading-[1.06] font-bold sm:text-6xl">
          Informação estratégica
          <br />
          não escala <em className="text-[#f6b26b]">por CC de e-mail.</em>
        </h1>
        <p className="ve-hero-el mt-6 max-w-xl text-lg leading-relaxed text-[#b9c9dc]">
          O print da matéria chega torto, tarde e sem o gráfico. Dê à equipe
          inteira o acesso que hoje mora na conta pessoal de uma pessoa só —
          com gestão, nota única e preço por assento que cai com a escala.
        </p>
      </section>

      {/* calculadora */}
      <section id="calculadora" className="border-y border-[#2c4a70] bg-[#0a2038] px-4 py-16 sm:px-8">
        <div className="mx-auto grid max-w-5xl items-center gap-12 sm:grid-cols-2">
          <div className="ve-up">
            <h2 className="ve-serif text-3xl font-bold">Monte a sua banca</h2>
            <p className="mt-3 text-[#b9c9dc]">Quantas pessoas precisam ler?</p>
            <p className="ve-serif mt-6 text-6xl font-bold text-[#f6b26b] tabular-nums">{assentos}</p>
            <input
              type="range"
              min={5}
              max={100}
              step={1}
              value={assentos}
              onChange={(e) => setAssentos(parseInt(e.target.value, 10))}
              className="ve-range mt-4 w-full"
              aria-label="Número de assentos"
            />
            <div className="mt-1 flex justify-between text-xs text-[#54739a]">
              <span>5</span>
              <span>100 assentos</span>
            </div>
            <ul className="mt-6 space-y-1 text-xs text-[#7fa3cc]">
              <li>5–9 assentos · R$ 31,90/assento</li>
              <li>10–19 · R$ 27,90 · 20–49 · R$ 23,90 · 50+ · R$ 19,90</li>
            </ul>
          </div>
          <div className="ve-up rounded-xl border border-[#2c4a70] bg-[#0e2b4c] p-8">
            <p className="text-xs font-bold tracking-[0.2em] text-[#7fa3cc] uppercase">sua cotação</p>
            <p className="ve-serif mt-4 text-5xl font-bold tabular-nums">
              R$ {fmt(total)}
              <span className="text-lg font-normal text-[#7fa3cc]">/mês*</span>
            </p>
            <p className="mt-2 text-sm text-[#b9c9dc] tabular-nums">
              {assentos} assentos × R$ {fmt(unit)} — contra R$ {fmt(cheio)} em
              assinaturas individuais.
            </p>
            <p className="mt-1 text-sm font-bold text-[#37b24d] tabular-nums">
              Economia de R$ {fmt(cheio - total)}/mês
            </p>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="mt-7 block rounded bg-[#e8590c] py-3.5 text-center text-sm font-bold text-white transition-transform hover:scale-[1.02]"
            >
              Falar com o time comercial
            </a>
            <p className="mt-3 text-[11px] text-[#54739a]">
              *Valores ilustrativos de portfólio. Impresso para diretoria como adicional.
            </p>
          </div>
        </div>
      </section>

      {/* recursos */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-8">
        <h2 className="ve-serif ve-up text-3xl font-bold sm:text-4xl">Feito para o financeiro aprovar</h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {RECURSOS.map((r) => (
            <article key={r.t} className="ve-up rounded-lg border border-[#2c4a70] bg-[#0a2038] p-6">
              <h3 className="ve-serif text-lg font-bold text-[#f6b26b]">{r.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#b9c9dc]">{r.d}</p>
            </article>
          ))}
        </div>
        <figure className="ve-up mx-auto mt-14 max-w-2xl border-l-2 border-[#e8590c] pl-6">
          <blockquote className="ve-serif text-xl leading-snug font-medium italic">
            “Cancelei onze reembolsos de assinatura pessoal e assinei um contrato.
            O jurídico me mandou chocolate.”
          </blockquote>
          <figcaption className="mt-3 text-xs font-bold tracking-wide text-[#7fa3cc] uppercase">
            Head de operações, gestora de recursos — depoimento fictício
          </figcaption>
        </figure>
      </section>

      <footer className="border-t border-[#2c4a70] px-4 py-6 text-xs text-[#54739a] sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3">
          <span>Página conceitual de portfólio — sem vínculo oficial com o Valor Econômico / Globo.</span>
          <Link href="/valor/equipes/guide" className="underline underline-offset-2 hover:text-[#f6b26b]">
            Como esta página foi feita →
          </Link>
        </div>
      </footer>
    </div>
  );
}
