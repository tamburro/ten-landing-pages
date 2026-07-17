"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const RUIDO = [
  "🚨 URGENTE!!! DÓLAR DISPARA (será?)",
  "üm fio 🧵 sobre pq o IBOV vai DOBRAR",
  "VAZOU: o que o BC vai fazer (fonte: confia)",
  "comprem AGORA antes que suba 😱😱",
  "ESPECIALISTA prevê C-R-A-S-H em 48h",
  "a planilha SECRETA dos gestores 👀",
  "IMPERDÍVEL: 7 ações pra ficar rico em 2026",
  "ALERTA MÁXIMO no câmbio!!! rt urgente",
];

export default function ValorSinalPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [sinal, setSinal] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (reduced) return;
      gsap.fromTo(
        ".vsg-hero-el",
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power2.out", delay: 0.2 }
      );
      gsap.utils.toArray<HTMLElement>(".vsg-up").forEach((el) => {
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
      className={`min-h-screen transition-colors duration-700 ${
        sinal ? "bg-[#f9f6f1] text-[#0e2b4c]" : "bg-[#0b0d10] text-[#e9eef5]"
      }`}
      style={{ fontFamily: "var(--font-valor-sans), sans-serif" }}
    >
      <style>{`
        .vsg-serif { font-family: var(--font-valor-serif), serif; }
        .vsg-marq { animation: vsg-roll 16s linear infinite; }
        .vsg-marq-2 { animation: vsg-roll 11s linear infinite reverse; }
        .vsg-marq-3 { animation: vsg-roll 21s linear infinite; }
        @keyframes vsg-roll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .vsg-shake { animation: vsg-tremor 0.35s linear infinite; }
        @keyframes vsg-tremor { 0%,100% { transform: translate(0,0); } 25% { transform: translate(0.6px,-0.6px); } 75% { transform: translate(-0.6px,0.6px); } }
        @media (prefers-reduced-motion: reduce) { .vsg-marq, .vsg-marq-2, .vsg-marq-3, .vsg-shake { animation: none; } }
      `}</style>

      <header className="mx-auto flex max-w-5xl items-center justify-between px-4 py-5 sm:px-8">
        <span className="vsg-serif text-2xl font-bold">
          Valor <span className="font-normal italic">Econômico</span>
        </span>
        <a
          href="#assinar"
          className={`rounded px-5 py-2.5 text-sm font-bold transition-all ${
            sinal ? "bg-[#0e2b4c] text-white" : "bg-[#e8590c] text-white"
          }`}
        >
          Assinar
        </a>
      </header>

      {/* hero com interruptor */}
      <section className="mx-auto max-w-5xl px-4 pt-10 pb-8 text-center sm:px-8">
        <h1 className="vsg-serif vsg-hero-el text-4xl leading-[1.06] font-bold sm:text-6xl">
          {sinal ? (
            <>
              O Valor fala <em className="text-[#e8590c]">baixo.</em>
            </>
          ) : (
            <span className="vsg-shake inline-block">O MERCADO GRITA.</span>
          )}
        </h1>
        <p className={`vsg-hero-el mx-auto mt-4 max-w-lg text-lg transition-colors ${sinal ? "text-[#52606d]" : "text-[#8b93a1]"}`}>
          {sinal
            ? "Uma análise assinada por dia vale mais que oitenta gritos por hora."
            : "Oitenta manchetes por hora, nenhuma responsabilidade por nenhuma."}
        </p>

        {/* interruptor */}
        <div className="vsg-hero-el mt-8 inline-flex items-center gap-4">
          <span className={`text-sm font-bold ${!sinal ? "" : "opacity-40"}`}>ruído</span>
          <button
            role="switch"
            aria-checked={sinal}
            aria-label="Alternar entre ruído e sinal"
            onClick={() => setSinal((s) => !s)}
            className={`relative h-9 w-[70px] rounded-full transition-colors ${sinal ? "bg-[#0e2b4c]" : "bg-[#495057]"}`}
          >
            <span
              className={`absolute top-1 h-7 w-7 rounded-full bg-white shadow transition-all ${
                sinal ? "left-[38px]" : "left-1"
              }`}
            />
          </button>
          <span className={`text-sm font-bold ${sinal ? "text-[#e8590c]" : "opacity-40"}`}>sinal</span>
        </div>
      </section>

      {/* palco: ruído ou sinal */}
      <section className="mx-auto max-w-5xl overflow-hidden px-0 pb-16 sm:px-8">
        {!sinal ? (
          <div className="space-y-3 py-6" aria-label="Simulação de feed ruidoso">
            {[
              { cls: "vsg-marq", tom: "text-[#ff8787]" },
              { cls: "vsg-marq-2", tom: "text-[#ffd43b]" },
              { cls: "vsg-marq-3", tom: "text-[#8b93a1]" },
            ].map((linha, li) => (
              <div key={li} className="overflow-hidden">
                <div className={`${linha.cls} flex w-max gap-6 whitespace-nowrap`}>
                  {Array.from({ length: 2 }).map((_, d) => (
                    <span key={d} className={`text-lg font-extrabold tracking-tight ${linha.tom}`} aria-hidden={d === 1}>
                      {RUIDO.slice(li * 2)
                        .concat(RUIDO.slice(0, li * 2))
                        .join("  ·  ")}
                      {"  ·  "}
                    </span>
                  ))}
                </div>
              </div>
            ))}
            <p className="pt-6 text-center text-sm text-[#8b93a1]">
              ↑ isto é uma amostra leve. O seu feed é pior. Acione o <strong>sinal</strong>.
            </p>
          </div>
        ) : (
          <article className="mx-auto max-w-2xl px-4 py-6 sm:px-0">
            <p className="text-xs font-bold tracking-[0.25em] text-[#e8590c] uppercase">análise · exemplo fictício</p>
            <h2 className="vsg-serif mt-3 text-2xl leading-snug font-bold sm:text-3xl">
              O dólar não &quot;disparou&quot;: ele voltou ao preço de outubro.
            </h2>
            <p className="mt-4 text-lg leading-[1.8] text-[#38506c]">
              A alta de 1,2% de ontem devolve o câmbio exatamente ao patamar em
              que passou três meses do ano passado — período em que ninguém
              gritou. O que mudou não foi o preço: foi o fluxo de manchetes.
              Para quem tem passivo em dólar, a pergunta útil não é &quot;vai
              subir mais?&quot;, e sim &quot;o meu hedge foi feito para este
              cenário ou para o do grito?&quot;.
            </p>
            <p className="mt-4 border-l-2 border-[#e8590c] pl-4 text-sm text-[#52606d]">
              Assinada, checada e com a série histórica linkada — como toda análise do diário.
            </p>
          </article>
        )}
      </section>

      {/* oferta */}
      <section id="assinar" className={`border-t px-4 py-16 transition-colors sm:px-8 ${sinal ? "border-[#ddd6ca]" : "border-white/10"}`}>
        <div
          className={`vsg-up mx-auto max-w-lg rounded-2xl p-8 text-center transition-colors ${
            sinal ? "bg-[#0e2b4c] text-white" : "border border-white/15 bg-[#12161b]"
          }`}
        >
          <p className={`text-xs font-bold tracking-[0.25em] uppercase ${sinal ? "text-[#f6b26b]" : "text-[#8b93a1]"}`}>
            o sinal, todos os dias
          </p>
          <p className="vsg-serif mt-3 text-6xl font-bold">R$ 34,90</p>
          <p className={`text-xs ${sinal ? "text-white/60" : "text-[#8b93a1]"}`}>/mês* nos 12 primeiros meses</p>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="mt-6 block rounded bg-[#e8590c] py-3.5 text-sm font-bold text-white transition-transform hover:scale-[1.02]"
          >
            Desligar o ruído
          </a>
          <p className={`mt-3 text-[11px] ${sinal ? "text-white/50" : "text-[#54739a]"}`}>
            *Valor ilustrativo de portfólio. Cancele quando quiser.
          </p>
        </div>
      </section>

      <footer className={`border-t px-4 py-6 text-xs transition-colors sm:px-8 ${sinal ? "border-[#ddd6ca] text-[#9aa5b1]" : "border-white/10 text-[#54739a]"}`}>
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3">
          <span>Página conceitual de portfólio — sem vínculo oficial com o Valor Econômico / Globo.</span>
          <Link href="/valor/sinal/guide" className="underline underline-offset-2 hover:text-[#e8590c]">
            Como esta página foi feita →
          </Link>
        </div>
      </footer>
    </div>
  );
}
