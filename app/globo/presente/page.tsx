"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const DURACOES = [
  { meses: 3, preco: 29.7, rotulo: "3 meses" },
  { meses: 6, preco: 53.4, rotulo: "6 meses" },
  { meses: 12, preco: 94.8, rotulo: "1 ano" },
];

const OCASIOES = [
  "aniversário", "formatura", "aposentadoria", "casa nova", "só porque sim",
];

const fmt = (v: number) =>
  v.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function GloboPresentePage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [duracao, setDuracao] = useState(DURACOES[2]);
  const [ocasiao, setOcasiao] = useState(OCASIOES[0]);
  const [mensagem, setMensagem] = useState("Para você ler o mundo com calma. Com carinho, eu.");

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (reduced) return;
      gsap.fromTo(
        ".gp-hero-el",
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power2.out", delay: 0.15 }
      );
      gsap.fromTo(
        ".gp-card",
        { rotateY: 12, y: 26, opacity: 0 },
        { rotateY: 0, y: 0, opacity: 1, duration: 1.1, ease: "power3.out", delay: 0.5 }
      );
      gsap.to(".gp-card", {
        y: -10,
        duration: 3,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        delay: 1.6,
      });
      gsap.utils.toArray<HTMLElement>(".gp-up").forEach((el) => {
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
      className="min-h-screen bg-[#eef2f9] text-[#1c2733] selection:bg-[#0a5cb8] selection:text-white"
      style={{ fontFamily: "var(--font-globo-sans), sans-serif" }}
    >
      <style>{`
        .gp-serif { font-family: var(--font-globo-serif), serif; }
        .gp-cena { perspective: 1200px; }
      `}</style>

      <header className="mx-auto flex max-w-5xl items-center justify-between px-4 py-5 sm:px-8">
        <span className="gp-serif text-2xl font-black">O GLOBO</span>
        <span className="rounded-full bg-white px-4 py-1.5 text-xs font-bold text-[#0a5cb8] shadow-sm">
          🎁 assinatura-presente
        </span>
      </header>

      {/* hero + cartão */}
      <section className="mx-auto grid max-w-5xl items-center gap-12 px-4 pt-10 pb-16 sm:grid-cols-2 sm:px-8">
        <div>
          <h1 className="gp-serif gp-hero-el text-4xl leading-[1.08] font-black sm:text-5xl">
            Flor murcha.
            <br />
            Vinho acaba.
            <br />
            <span className="text-[#0a5cb8]">Assinatura fica o ano inteiro.</span>
          </h1>
          <p className="gp-hero-el mt-6 max-w-md text-lg leading-relaxed text-[#44546a]">
            Presenteie alguém com um ano de mundo explicado: escolha a duração,
            escreva o cartão ao lado e a gente entrega por e-mail na data que
            você marcar.
          </p>
          <div className="gp-hero-el mt-8">
            <p className="text-xs font-bold tracking-[0.2em] text-[#8494a7] uppercase">a ocasião</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {OCASIOES.map((o) => (
                <button
                  key={o}
                  onClick={() => setOcasiao(o)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                    ocasiao === o
                      ? "bg-[#0a5cb8] text-white"
                      : "bg-white text-[#44546a] hover:bg-[#dbe6f5]"
                  }`}
                >
                  {o}
                </button>
              ))}
            </div>
            <p className="mt-6 text-xs font-bold tracking-[0.2em] text-[#8494a7] uppercase">a duração</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {DURACOES.map((d) => (
                <button
                  key={d.meses}
                  onClick={() => setDuracao(d)}
                  className={`rounded-full px-5 py-2 text-sm font-bold transition-colors ${
                    duracao.meses === d.meses
                      ? "bg-[#14181d] text-white"
                      : "bg-white text-[#44546a] hover:bg-[#dbe6f5]"
                  }`}
                >
                  {d.rotulo}
                </button>
              ))}
            </div>
            <label className="mt-6 block text-xs font-bold tracking-[0.2em] text-[#8494a7] uppercase" htmlFor="gp-msg">
              o cartão
            </label>
            <textarea
              id="gp-msg"
              maxLength={120}
              rows={2}
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
              className="mt-3 w-full max-w-md rounded-xl border border-[#c9d6e8] bg-white p-4 text-sm outline-none focus:border-[#0a5cb8]"
            />
          </div>
        </div>

        {/* cartão-presente */}
        <div className="gp-cena">
          <div className="gp-card relative mx-auto w-full max-w-sm rounded-2xl bg-[#0a5cb8] p-8 text-white shadow-[0_30px_60px_-24px_rgba(10,92,184,0.7)]">
            {/* fita */}
            <div className="pointer-events-none absolute inset-y-0 left-10 w-8 bg-white/20" aria-hidden />
            <div className="pointer-events-none absolute inset-x-0 top-16 h-8 bg-white/20" aria-hidden />
            <p className="gp-serif relative text-2xl font-black">O GLOBO</p>
            <p className="relative mt-1 text-[11px] font-bold tracking-[0.3em] uppercase opacity-80">
              vale-assinatura · {duracao.rotulo}
            </p>
            <p className="gp-serif relative mt-8 min-h-16 text-lg leading-snug italic">
              “{mensagem || "Escreva seu cartão…"}”
            </p>
            <p className="relative mt-6 text-[11px] font-bold tracking-[0.2em] uppercase opacity-80">
              feliz {ocasiao}!
            </p>
            <div className="relative mt-8 flex items-end justify-between border-t border-white/25 pt-4">
              <span className="text-xs opacity-80">digital completo</span>
              <span className="gp-serif text-3xl font-black">R$ {fmt(duracao.preco)}*</span>
            </div>
          </div>
        </div>
      </section>

      {/* como funciona */}
      <section className="border-y border-[#c9d6e8] bg-white px-4 py-14 sm:px-8">
        <div className="mx-auto grid max-w-5xl gap-8 text-center sm:grid-cols-3">
          {[
            { n: "1", t: "Você paga uma vez", d: "Sem renovação automática: presente não vira cobrança surpresa." },
            { n: "2", t: "A gente entrega na data", d: "E-mail com o cartão que você escreveu, no dia que você escolher." },
            { n: "3", t: "A pessoa só aproveita", d: "Ativação em dois cliques, sem cartão de crédito de quem recebe." },
          ].map((p) => (
            <div key={p.n} className="gp-up">
              <span className="gp-serif mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#eef2f9] text-xl font-black text-[#0a5cb8]">
                {p.n}
              </span>
              <h3 className="mt-4 text-lg font-bold">{p.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#44546a]">{p.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA final */}
      <section className="px-4 py-16 text-center sm:px-8">
        <h2 className="gp-serif gp-up mx-auto max-w-xl text-3xl leading-snug font-black sm:text-4xl">
          {duracao.rotulo} de jornal por R$ {fmt(duracao.preco)}*
        </h2>
        <a
          href="#"
          onClick={(e) => e.preventDefault()}
          className="gp-up mt-8 inline-block rounded-full bg-[#0a5cb8] px-10 py-4 text-base font-bold text-white shadow-[0_14px_30px_-12px_rgba(10,92,184,0.7)] transition-transform hover:scale-[1.03]"
        >
          Presentear agora
        </a>
        <p className="gp-up mt-3 text-xs text-[#8494a7]">
          *Valores ilustrativos de portfólio. Pagamento único, sem renovação.
        </p>
      </section>

      <footer className="border-t border-[#c9d6e8] px-4 py-6 text-xs text-[#8494a7] sm:px-8">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3">
          <span>Página conceitual de portfólio — sem vínculo oficial com O GLOBO / Editora Globo.</span>
          <Link href="/globo/presente/guide" className="underline underline-offset-2 hover:text-[#0a5cb8]">
            Como esta página foi feita →
          </Link>
        </div>
      </footer>
    </div>
  );
}
