"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const NEWSLETTERS = [
  { id: "manha", nome: "Valor Manhã", hora: "6h15", desc: "Os 5 assuntos do dia antes do pregão.", assunto: "☀️ Copom, safra e o teto do dólar — sua terça em 8 min", padrao: true },
  { id: "fechamento", nome: "Fechamento", hora: "18h40", desc: "O pregão explicado depois do sino.", assunto: "🔔 Ibov +0,8%: quem puxou e por quê", padrao: true },
  { id: "juros", nome: "Curva & Juros", hora: "7h30", desc: "DI, Treasuries e o que o Copom lê.", assunto: "📈 A curva já precifica dois cortes — cedo demais?", padrao: false },
  { id: "agro", nome: "Agro em Pauta", hora: "6h50", desc: "Commodities, clima e crédito rural.", assunto: "🌾 Veranico no MT: o que muda na soja", padrao: false },
  { id: "tech", nome: "Tech & Capital", hora: "12h00", desc: "Startups, dados e as big techs no Brasil.", assunto: "💾 A rodada que reprecificou as fintechs", padrao: false },
  { id: "carreira", nome: "Executivo", hora: "19h30", desc: "Carreira e gestão para quem lidera.", assunto: "🧭 O 1:1 que seu time queria que você fizesse", padrao: false },
];

export default function ValorNewslettersPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [ativas, setAtivas] = useState<Set<string>>(
    () => new Set(NEWSLETTERS.filter((n) => n.padrao).map((n) => n.id))
  );

  const alternar = (id: string) => {
    setAtivas((s) => {
      const novo = new Set(s);
      if (novo.has(id)) novo.delete(id);
      else novo.add(id);
      return novo;
    });
  };

  const selecionadas = NEWSLETTERS.filter((n) => ativas.has(n.id)).sort((a, b) =>
    a.hora.localeCompare(b.hora)
  );

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (reduced) return;
      gsap.fromTo(
        ".vn-hero-el",
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power2.out", delay: 0.15 }
      );
      gsap.utils.toArray<HTMLElement>(".vn-up").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 26 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 87%" } }
        );
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      className="min-h-screen bg-[#f4f1ec] text-[#1f2933] selection:bg-[#0e2b4c] selection:text-white"
      style={{ fontFamily: "var(--font-valor-sans), sans-serif" }}
    >
      <style>{`.vn-serif { font-family: var(--font-valor-serif), serif; }`}</style>

      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-8">
        <span className="vn-serif text-2xl font-bold text-[#0e2b4c]">
          Valor <span className="font-normal italic">Econômico</span>
        </span>
        <a href="#assinar" className="rounded bg-[#e8590c] px-5 py-2.5 text-sm font-bold text-white transition-transform hover:scale-105">
          Assinar
        </a>
      </header>

      {/* hero */}
      <section className="mx-auto max-w-6xl px-4 pt-8 pb-4 sm:px-8">
        <p className="vn-hero-el text-xs font-bold tracking-[0.3em] text-[#e8590c] uppercase">
          nove newsletters, uma caixa de entrada com juízo
        </p>
        <h1 className="vn-serif vn-hero-el mt-4 max-w-3xl text-4xl leading-[1.06] font-bold text-[#0e2b4c] sm:text-6xl">
          Monte a sua manhã.
        </h1>
        <p className="vn-hero-el mt-4 max-w-xl text-lg text-[#52606d]">
          Marque as newsletters à esquerda e veja a sua caixa de entrada de
          amanhã se montar ao lado — na ordem em que chegam.
        </p>
      </section>

      {/* montador */}
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-10 sm:grid-cols-2 sm:px-8">
        {/* seletor */}
        <div className="vn-hero-el space-y-3">
          {NEWSLETTERS.map((n) => {
            const on = ativas.has(n.id);
            return (
              <label
                key={n.id}
                className={`flex cursor-pointer items-start gap-4 rounded-xl border-2 bg-white p-4 transition-colors ${
                  on ? "border-[#e8590c]" : "border-transparent hover:border-[#0e2b4c]/20"
                }`}
              >
                <input
                  type="checkbox"
                  checked={on}
                  onChange={() => alternar(n.id)}
                  className="mt-1 h-4 w-4 accent-[#e8590c]"
                />
                <span className="flex-1">
                  <span className="flex items-baseline justify-between">
                    <strong className="vn-serif text-lg text-[#0e2b4c]">{n.nome}</strong>
                    <span className="text-xs font-bold text-[#e8590c] tabular-nums">{n.hora}</span>
                  </span>
                  <span className="mt-0.5 block text-sm text-[#52606d]">{n.desc}</span>
                </span>
              </label>
            );
          })}
        </div>

        {/* inbox preview */}
        <div className="vn-hero-el">
          <div className="sticky top-6 overflow-hidden rounded-2xl border border-[#ddd6ca] bg-white shadow-[0_24px_50px_-24px_rgba(31,41,51,0.35)]">
            <div className="flex items-center gap-2 border-b border-[#eee9df] bg-[#faf8f4] px-4 py-3">
              <span className="flex gap-1.5" aria-hidden>
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff8787]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#ffd43b]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#69db7c]" />
              </span>
              <span className="text-xs font-bold text-[#9aa5b1]">Sua caixa de entrada — amanhã</span>
            </div>
            <div aria-live="polite">
              {selecionadas.length === 0 ? (
                <p className="p-8 text-center text-sm text-[#9aa5b1]">
                  Caixa vazia — como o resto da internet quer que ela fique.
                  Marque ao menos uma.
                </p>
              ) : (
                <ul className="divide-y divide-[#eee9df]">
                  {selecionadas.map((n) => (
                    <li key={n.id} className="flex items-start gap-3 px-4 py-3.5">
                      <span className="vn-serif mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0e2b4c] text-xs font-bold text-white">
                        V
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-baseline justify-between gap-3">
                          <p className="text-sm font-bold text-[#0e2b4c]">{n.nome}</p>
                          <span className="shrink-0 text-[11px] font-semibold text-[#9aa5b1] tabular-nums">{n.hora}</span>
                        </div>
                        <p className="truncate text-[13px] text-[#52606d]">{n.assunto}</p>
                      </div>
                      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#e8590c]" aria-hidden />
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="border-t border-[#eee9df] bg-[#faf8f4] px-4 py-3 text-center text-xs font-semibold text-[#52606d]">
              {selecionadas.length} newsletter{selecionadas.length === 1 ? "" : "s"} · ~
              {selecionadas.length * 4} min de leitura/dia · zero spam
            </div>
          </div>
        </div>
      </section>

      {/* oferta */}
      <section id="assinar" className="border-t border-[#ddd6ca] bg-white px-4 py-16 sm:px-8">
        <div className="mx-auto grid max-w-4xl items-center gap-10 sm:grid-cols-2">
          <div className="vn-up">
            <h2 className="vn-serif text-3xl leading-tight font-bold text-[#0e2b4c] sm:text-4xl">
              As nove vêm juntas.
              <br />
              <em className="text-[#e8590c]">Você escolhe o volume.</em>
            </h2>
            <p className="mt-4 leading-relaxed text-[#52606d]">
              Toda assinatura digital inclui as newsletters — as que você marcou
              e as que ainda vai descobrir. Gerencie tudo em um clique, sem
              culpa de deixar de abrir.
            </p>
          </div>
          <div className="vn-up rounded-2xl bg-[#0e2b4c] p-8 text-center text-white">
            <p className="text-xs font-bold tracking-[0.25em] text-[#f6b26b] uppercase">digital completo</p>
            <p className="vn-serif mt-3 text-6xl font-bold">R$ 34,90</p>
            <p className="text-xs text-white/60">/mês* nos 12 primeiros meses</p>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="mt-6 block rounded bg-[#e8590c] py-3.5 text-sm font-bold transition-transform hover:scale-[1.02]"
            >
              Assinar com a minha seleção
            </a>
            <p className="mt-3 text-[11px] text-white/50">*Valor ilustrativo de portfólio. Cancele quando quiser.</p>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#ddd6ca] px-4 py-6 text-xs text-[#9aa5b1] sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3">
          <span>Página conceitual de portfólio — sem vínculo oficial com o Valor Econômico / Globo.</span>
          <Link href="/valor/newsletters/guide" className="underline underline-offset-2 hover:text-[#e8590c]">
            Como esta página foi feita →
          </Link>
        </div>
      </footer>
    </div>
  );
}
