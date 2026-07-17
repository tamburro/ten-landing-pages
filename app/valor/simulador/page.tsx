"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const RODADAS = [
  {
    cenario: "Sua empresa importa insumos e o contrato de câmbio vence sexta.",
    manchete: "“BC sinaliza intervenção se dólar romper teto da banda informal” — Valor, terça-feira",
    a: { txt: "Travar o câmbio hoje", certa: true, delta: 380_000, exp: "Quem leu a sinalização travou antes do ruído; o dólar abriu 2,3% mais caro na sexta." },
    b: { txt: "Esperar até sexta", certa: false, delta: -380_000, exp: "A espera custou 2,3% sobre US$ 3,2 milhões. A manchete estava lá desde terça." },
  },
  {
    cenario: "O conselho quer aprovar a captação de R$ 50 mi este mês.",
    manchete: "“Ata do Copom indica corte de juros já na próxima reunião” — Valor, quarta-feira",
    a: { txt: "Captar agora e garantir", certa: false, delta: -412_000, exp: "Um mês de pressa custou 0,8 pp ao ano. A ata já dizia o contrário — em português claro, na página A2." },
    b: { txt: "Segurar 30 dias", certa: true, delta: 412_000, exp: "O corte veio. Captação fechada 0,8 pp mais barata — R$ 412 mil de juros a menos." },
  },
  {
    cenario: "Um concorrente vai anunciar fusão. Sua equipe comercial pede reação.",
    manchete: "“Cade deve impor restrições severas a fusões no setor” — Valor, segunda-feira",
    a: { txt: "Cortar preços preventivamente", certa: false, delta: -290_000, exp: "A fusão travou no Cade, como a análise antecipava. O corte de preços foi margem jogada fora." },
    b: { txt: "Manter preço e observar", certa: true, delta: 290_000, exp: "A fusão não passou. Quem leu a análise do Cade manteve margem e ganhou o trimestre." },
  },
];

const fmt = (v: number) =>
  (v < 0 ? "−" : "+") + "R$ " + Math.abs(v).toLocaleString("pt-BR");

export default function ValorSimuladorPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [rodada, setRodada] = useState(0);
  const [saldo, setSaldo] = useState(0);
  const [escolha, setEscolha] = useState<"a" | "b" | null>(null);
  const [historico, setHistorico] = useState<number[]>([]);

  const terminou = rodada >= RODADAS.length;
  const r = RODADAS[Math.min(rodada, RODADAS.length - 1)];
  const maxSaldo = RODADAS.reduce((s, x) => s + Math.max(x.a.delta, x.b.delta), 0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (reduced) return;
      gsap.fromTo(
        ".vs2-hero-el",
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.09, ease: "power2.out", delay: 0.1 }
      );
      gsap.utils.toArray<HTMLElement>(".vs2-up").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 26 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 87%" } }
        );
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const decidir = (lado: "a" | "b") => {
    if (escolha) return;
    setEscolha(lado);
    const delta = r[lado].delta;
    setSaldo((s) => s + delta);
    setHistorico((h) => [...h, delta]);
  };

  const avancar = () => {
    setEscolha(null);
    setRodada((x) => x + 1);
  };

  const reiniciar = () => {
    setRodada(0);
    setSaldo(0);
    setEscolha(null);
    setHistorico([]);
  };

  return (
    <div
      ref={rootRef}
      className="min-h-screen bg-[#0e2b4c] text-[#e9eef5] selection:bg-[#f6b26b] selection:text-[#0e2b4c]"
      style={{ fontFamily: "var(--font-valor-sans), sans-serif" }}
    >
      <style>{`.vs2-serif { font-family: var(--font-valor-serif), serif; }`}</style>

      <header className="mx-auto flex max-w-4xl items-center justify-between px-4 py-5 sm:px-8">
        <span className="vs2-serif text-2xl font-bold">
          Valor <span className="font-normal italic">Econômico</span>
        </span>
        <div className="rounded-lg border border-white/20 px-4 py-2 text-right">
          <p className="text-[9px] font-bold tracking-[0.2em] text-[#7fa3cc] uppercase">seu resultado</p>
          <p className={`vs2-serif text-lg leading-none font-bold tabular-nums ${saldo >= 0 ? "text-[#69db7c]" : "text-[#ff8787]"}`}>
            {saldo === 0 ? "R$ 0" : fmt(saldo)}
          </p>
        </div>
      </header>

      {/* hero */}
      <section className="mx-auto max-w-4xl px-4 pt-6 pb-8 text-center sm:px-8">
        <h1 className="vs2-serif vs2-hero-el text-4xl leading-[1.06] font-bold sm:text-6xl">
          Você é o CFO.
          <br />
          <em className="text-[#f6b26b]">Três decisões. Um placar.</em>
        </h1>
        <p className="vs2-hero-el mx-auto mt-4 max-w-lg text-lg text-[#b9c9dc]">
          Em cada rodada, uma manchete do Valor foi publicada <strong>antes</strong> da
          sua decisão. Ler ou não ler — o caixa mostra a diferença.
        </p>
        <p className="vs2-hero-el mt-2 text-xs text-[#54739a]">Cenários e valores fictícios de demonstração.</p>
      </section>

      {/* jogo */}
      <section className="mx-auto max-w-2xl px-4 pb-16 sm:px-8">
        <div className="vs2-hero-el rounded-2xl bg-[#f9e7dc] p-6 text-[#0e2b4c] shadow-[0_30px_60px_-25px_rgba(0,0,0,0.5)] sm:p-8">
          {!terminou ? (
            <>
              <div className="flex items-center justify-between text-xs font-bold text-[#8a7080]">
                <span>Rodada {rodada + 1} de {RODADAS.length}</span>
                <div className="flex gap-1.5" aria-hidden>
                  {RODADAS.map((_, i) => (
                    <span key={i} className={`h-1.5 w-8 rounded-full ${i < rodada ? "bg-[#0e2b4c]" : i === rodada ? "bg-[#e8590c]" : "bg-[#0e2b4c]/15"}`} />
                  ))}
                </div>
              </div>

              <h2 className="vs2-serif mt-4 text-xl leading-snug font-bold sm:text-2xl">{r.cenario}</h2>

              <div className="mt-4 rounded-lg border-l-4 border-[#e8590c] bg-white/70 p-3 text-[13px] leading-snug">
                <span className="text-[10px] font-bold tracking-[0.15em] text-[#e8590c] uppercase">na sua mesa desde ontem</span>
                <p className="vs2-serif mt-1 font-bold italic">{r.manchete}</p>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {(["a", "b"] as const).map((lado) => {
                  const op = r[lado];
                  const revelada = escolha !== null;
                  const foiEscolhida = escolha === lado;
                  return (
                    <button
                      key={lado}
                      onClick={() => decidir(lado)}
                      disabled={revelada}
                      className={`rounded-xl border-2 p-4 text-left text-sm font-bold transition-colors ${
                        revelada
                          ? op.certa
                            ? "border-[#2f9e44] bg-[#2f9e44]/10"
                            : foiEscolhida
                              ? "border-[#e03131] bg-[#e03131]/10"
                              : "border-[#0e2b4c]/15 opacity-50"
                          : "border-[#0e2b4c]/25 bg-white/60 hover:border-[#e8590c]"
                      }`}
                    >
                      {op.txt}
                      {revelada && (
                        <span className={`mt-1 block text-xs tabular-nums ${op.certa ? "text-[#2f9e44]" : "text-[#e03131]"}`}>
                          {fmt(op.delta)}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {escolha && (
                <>
                  <div className="mt-4 rounded-xl bg-white/70 p-4 text-sm leading-relaxed text-[#38506c]" role="status">
                    {r[escolha].exp}
                  </div>
                  <button
                    onClick={avancar}
                    className="mt-5 w-full rounded-full bg-[#0e2b4c] py-3.5 text-sm font-bold text-white transition-transform hover:scale-[1.01]"
                  >
                    {rodada === RODADAS.length - 1 ? "Fechar o trimestre" : "Próxima decisão"}
                  </button>
                </>
              )}
            </>
          ) : (
            <div className="text-center" role="status">
              <p className="text-xs font-bold tracking-[0.25em] text-[#8a7080] uppercase">fechamento do trimestre</p>
              <p className={`vs2-serif mt-3 text-5xl font-black tabular-nums ${saldo >= 0 ? "text-[#2f9e44]" : "text-[#e03131]"}`}>
                {fmt(saldo)}
              </p>
              <p className="mt-2 text-sm text-[#38506c]">
                {saldo >= maxSaldo
                  ? "Placar perfeito — você decidiu como quem lê."
                  : saldo > 0
                    ? "No azul, mas deixou dinheiro na mesa em alguma rodada."
                    : "O trimestre fechou no vermelho — e todas as manchetes estavam na sua mesa."}
              </p>
              <ul className="mx-auto mt-4 flex max-w-xs justify-center gap-3 text-xs font-bold tabular-nums">
                {historico.map((h, i) => (
                  <li key={i} className={h > 0 ? "text-[#2f9e44]" : "text-[#e03131]"}>
                    R{i + 1}: {h > 0 ? "✓" : "✗"}
                  </li>
                ))}
              </ul>
              <div className="mx-auto mt-7 max-w-sm rounded-2xl border-2 border-[#0e2b4c] p-6">
                <p className="text-[10px] font-bold tracking-[0.2em] text-[#e8590c] uppercase">
                  a assinatura custa 0,03% disso
                </p>
                <p className="vs2-serif mt-2 text-4xl font-bold">
                  R$ 34,90<span className="text-base text-[#8a7080]">/mês*</span>
                </p>
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="mt-4 block rounded-full bg-[#e8590c] py-3 text-sm font-bold text-white transition-transform hover:scale-[1.02]"
                >
                  Ler antes da próxima decisão
                </a>
                <p className="mt-2 text-[10px] text-[#8a7080]">*Valor ilustrativo de portfólio. Cancele quando quiser.</p>
              </div>
              <button onClick={reiniciar} className="mt-4 text-xs font-bold text-[#8a7080] underline underline-offset-2 hover:text-[#0e2b4c]">
                jogar de novo
              </button>
            </div>
          )}
        </div>
      </section>

      <footer className="border-t border-white/10 px-4 py-6 text-xs text-[#54739a] sm:px-8">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-3">
          <span>Página conceitual de portfólio — sem vínculo oficial com o Valor Econômico / Globo.</span>
          <Link href="/valor/simulador/guide" className="underline underline-offset-2 hover:text-[#f6b26b]">
            Como esta página foi feita →
          </Link>
        </div>
      </footer>
    </div>
  );
}
