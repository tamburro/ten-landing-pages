"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const RESPOSTA = "PAUTA";
const MAX_TENTATIVAS = 6;
const TECLADO = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];

type Avaliacao = "certa" | "lugar" | "fora";

function avaliar(palpite: string): Avaliacao[] {
  const resposta = RESPOSTA.split("");
  const resultado: Avaliacao[] = Array(5).fill("fora");
  const restantes = [...resposta];
  palpite.split("").forEach((l, i) => {
    if (resposta[i] === l) {
      resultado[i] = "certa";
      restantes[restantes.indexOf(l)] = "";
    }
  });
  palpite.split("").forEach((l, i) => {
    if (resultado[i] === "certa") return;
    const idx = restantes.indexOf(l);
    if (idx >= 0) {
      resultado[i] = "lugar";
      restantes[idx] = "";
    }
  });
  return resultado;
}

const COR: Record<Avaliacao, string> = {
  certa: "bg-[#2f9e44] border-[#2f9e44] text-white",
  lugar: "bg-[#ffd43b] border-[#ffd43b] text-[#14181d]",
  fora: "bg-[#495057] border-[#495057] text-white",
};

const OUTROS_JOGOS = [
  { nome: "Cruzadas", desc: "A clássica de domingo, todo dia. Arquivo com 2.400 grades.", grade: "▦" },
  { nome: "Cerco", desc: "Sudoku com tema carioca: números, praias e paciência.", grade: "▤" },
  { nome: "Ligeirinha", desc: "Cinco perguntas de atualidades em 60 segundos.", grade: "⚡" },
];

export default function GloboJogosPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [linhas, setLinhas] = useState<string[]>([]);
  const [atual, setAtual] = useState("");
  const [status, setStatus] = useState<"jogando" | "venceu" | "perdeu">("jogando");
  const [aviso, setAviso] = useState("");

  const digitar = useCallback(
    (tecla: string) => {
      if (status !== "jogando") return;
      setAviso("");
      if (tecla === "ENTER") {
        if (atual.length < 5) {
          setAviso("A palavra tem 5 letras.");
          return;
        }
        const novas = [...linhas, atual];
        setLinhas(novas);
        if (atual === RESPOSTA) setStatus("venceu");
        else if (novas.length >= MAX_TENTATIVAS) setStatus("perdeu");
        setAtual("");
        return;
      }
      if (tecla === "⌫") {
        setAtual((a) => a.slice(0, -1));
        return;
      }
      if (/^[A-Z]$/.test(tecla)) {
        setAtual((a) => (a.length < 5 ? a + tecla : a));
      }
    },
    [atual, linhas, status]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === "Enter") digitar("ENTER");
      else if (e.key === "Backspace") digitar("⌫");
      else digitar(e.key.toUpperCase());
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [digitar]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (reduced) return;
      gsap.fromTo(
        ".gj-hero-el",
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.09, ease: "power2.out", delay: 0.1 }
      );
      gsap.utils.toArray<HTMLElement>(".gj-up").forEach((el) => {
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

  const letrasUsadas = new Map<string, Avaliacao>();
  linhas.forEach((linha) => {
    avaliar(linha).forEach((av, i) => {
      const l = linha[i];
      const anterior = letrasUsadas.get(l);
      if (anterior === "certa") return;
      if (anterior === "lugar" && av === "fora") return;
      letrasUsadas.set(l, av);
    });
  });

  return (
    <div
      ref={rootRef}
      className="min-h-screen bg-[#fffdf6] text-[#14181d] selection:bg-[#ffd43b] selection:text-[#14181d]"
      style={{ fontFamily: "var(--font-globo-sans), sans-serif" }}
    >
      <style>{`
        .gj-serif { font-family: var(--font-globo-serif), serif; }
        @keyframes gj-pop { 0% { transform: scale(0.85); } 55% { transform: scale(1.08); } 100% { transform: scale(1); } }
        .gj-pop { animation: gj-pop 0.18s ease-out; }
        @media (prefers-reduced-motion: reduce) { .gj-pop { animation: none; } }
      `}</style>

      <header className="mx-auto flex max-w-5xl items-center justify-between px-4 py-5 sm:px-8">
        <span className="gj-serif text-2xl font-black">
          O GLOBO <span className="rounded bg-[#ffd43b] px-2 py-0.5 text-sm font-extrabold">Jogos</span>
        </span>
        <a href="#assinar" className="rounded-full bg-[#14181d] px-5 py-2.5 text-sm font-bold text-white transition-transform hover:scale-105">
          Assinar
        </a>
      </header>

      {/* hero + jogo */}
      <section className="mx-auto grid max-w-5xl items-start gap-12 px-4 pt-8 pb-16 sm:grid-cols-2 sm:px-8">
        <div>
          <p className="gj-hero-el text-xs font-bold tracking-[0.3em] text-[#0a5cb8] uppercase">
            a palavra do dia · jogável agora
          </p>
          <h1 className="gj-serif gj-hero-el mt-4 text-4xl leading-[1.08] font-black sm:text-5xl">
            Cinco letras entre
            <br />
            você e o café.
          </h1>
          <p className="gj-hero-el mt-5 max-w-md text-lg leading-relaxed text-[#44546a]">
            Todo dia, uma palavra saída do noticiário. Seis tentativas, uma
            obsessão nacional. Jogue a de hoje aqui mesmo — o arquivo com 1.200
            palavras e os outros jogos são dos assinantes.
          </p>
          <div className="gj-hero-el mt-6 flex gap-6 text-sm font-semibold text-[#44546a]">
            <span>🔥 streak médio: 34 dias</span>
            <span>🎮 4 jogos diários</span>
          </div>
          <p className="gj-hero-el mt-4 text-xs text-[#8494a7]">
            Dica de hoje: toda redação de jornal briga por ela às 9h da manhã.
          </p>
        </div>

        {/* tabuleiro */}
        <div className="gj-hero-el mx-auto w-full max-w-xs" role="group" aria-label="Jogo da palavra do dia">
          <div className="grid gap-1.5">
            {Array.from({ length: MAX_TENTATIVAS }).map((_, li) => {
              const enviada = linhas[li];
              const ativa = li === linhas.length && status === "jogando";
              return (
                <div key={li} className="grid grid-cols-5 gap-1.5">
                  {Array.from({ length: 5 }).map((_, ci) => {
                    const letra = enviada ? enviada[ci] : ativa ? atual[ci] ?? "" : "";
                    const av = enviada ? avaliar(enviada)[ci] : null;
                    return (
                      <div
                        key={ci}
                        className={`flex aspect-square items-center justify-center rounded-md border-2 text-2xl font-extrabold uppercase ${
                          av
                            ? COR[av]
                            : letra
                              ? "gj-pop border-[#14181d] bg-white"
                              : "border-[#d5cfc0] bg-white"
                        }`}
                      >
                        {letra}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>

          <p className="mt-3 min-h-6 text-center text-sm font-bold text-[#e03131]" role="status">
            {aviso}
            {status === "venceu" && <span className="text-[#2f9e44]">Boa! A pauta era sua. 🔥</span>}
            {status === "perdeu" && (
              <span className="text-[#14181d]">
                Era <strong>{RESPOSTA}</strong> — amanhã tem outra.
              </span>
            )}
          </p>

          {/* teclado */}
          <div className="mt-2 space-y-1.5" aria-hidden={status !== "jogando"}>
            {TECLADO.map((fila, fi) => (
              <div key={fila} className="flex justify-center gap-1">
                {fi === 2 && (
                  <button
                    onClick={() => digitar("ENTER")}
                    className="rounded-md bg-[#0a5cb8] px-2.5 text-[11px] font-extrabold text-white"
                  >
                    ENTER
                  </button>
                )}
                {fila.split("").map((t) => {
                  const uso = letrasUsadas.get(t);
                  return (
                    <button
                      key={t}
                      onClick={() => digitar(t)}
                      className={`h-11 w-7 rounded-md text-sm font-extrabold sm:w-8 ${
                        uso ? COR[uso] : "bg-[#e9e4d8] hover:bg-[#ddd6c6]"
                      }`}
                    >
                      {t}
                    </button>
                  );
                })}
                {fi === 2 && (
                  <button onClick={() => digitar("⌫")} className="rounded-md bg-[#e9e4d8] px-3 font-extrabold">
                    ⌫
                  </button>
                )}
              </div>
            ))}
          </div>

          {status !== "jogando" && (
            <a
              href="#assinar"
              className="mt-4 block rounded-full bg-[#14181d] py-3 text-center text-sm font-bold text-white transition-transform hover:scale-[1.02]"
            >
              {status === "venceu" ? "Quero jogar o arquivo inteiro" : "Assinar e treinar no arquivo"}
            </a>
          )}
        </div>
      </section>

      {/* outros jogos */}
      <section className="border-y border-[#e9e4d8] bg-white px-4 py-14 sm:px-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="gj-serif gj-up text-3xl font-black">O resto da banca de jogos</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {OUTROS_JOGOS.map((j) => (
              <article key={j.nome} className="gj-up relative overflow-hidden rounded-2xl border border-[#e9e4d8] bg-[#fffdf6] p-6">
                <span className="text-3xl" aria-hidden>{j.grade}</span>
                <h3 className="gj-serif mt-3 text-xl font-black">{j.nome}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#44546a]">{j.desc}</p>
                <span className="mt-4 inline-block rounded-full bg-[#ffd43b] px-3 py-1 text-[10px] font-extrabold tracking-wider uppercase">
                  só para assinantes
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* oferta */}
      <section id="assinar" className="px-4 py-16 sm:px-8">
        <div className="gj-up mx-auto max-w-lg rounded-3xl border-2 border-[#14181d] bg-white p-8 text-center shadow-[8px_8px_0_#ffd43b]">
          <p className="text-xs font-bold tracking-[0.25em] text-[#0a5cb8] uppercase">digital + jogos</p>
          <p className="gj-serif mt-3 text-6xl font-black">R$ 9,90</p>
          <p className="text-xs text-[#8494a7]">/mês* nos 12 primeiros meses · depois R$ 29,90</p>
          <ul className="mx-auto mt-5 max-w-xs space-y-1.5 text-left text-sm text-[#44546a]">
            <li>✓ 4 jogos por dia + arquivo completo</li>
            <li>✓ Streak sincronizado entre aparelhos</li>
            <li>✓ E o jornal inteiro junto, claro</li>
          </ul>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="mt-7 block rounded-full bg-[#14181d] py-3.5 text-sm font-bold text-white transition-transform hover:scale-[1.02]"
          >
            Assinar e continuar jogando
          </a>
          <p className="mt-3 text-[11px] text-[#8494a7]">*Valor ilustrativo de portfólio. Cancele quando quiser.</p>
        </div>
      </section>

      <footer className="border-t border-[#e9e4d8] px-4 py-6 text-xs text-[#8494a7] sm:px-8">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3">
          <span>Página conceitual de portfólio — sem vínculo oficial com O GLOBO / Editora Globo.</span>
          <Link href="/globo/jogos/guide" className="underline underline-offset-2 hover:text-[#0a5cb8]">
            Como esta página foi feita →
          </Link>
        </div>
      </footer>
    </div>
  );
}
