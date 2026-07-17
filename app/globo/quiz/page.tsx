"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const PERGUNTAS = [
  {
    q: "O Banco Central se reuniu esta semana. O que decidiu sobre a Selic?",
    opcoes: ["Cortou 0,5 ponto", "Manteve a taxa", "Subiu 0,25 ponto"],
    certa: 1,
    contexto: "Manteve — e o comunicado sinalizou corte só no próximo trimestre. Quem leu a análise não fixou financiamento na véspera.",
  },
  {
    q: "A prefeitura mudou uma regra que afeta quem dirige no Centro do Rio. Qual?",
    opcoes: ["Rodízio de placas", "Nova área de pedestres", "Fim do estacionamento rotativo"],
    certa: 1,
    contexto: "A Rua da Carioca virou calçadão definitivo. Saiu no caderno Rio com mapa das rotas alternativas.",
  },
  {
    q: "Um alimento puxou a inflação do mês para cima. Qual?",
    opcoes: ["Café", "Arroz", "Tomate"],
    certa: 0,
    contexto: "O café subiu 11% com a quebra de safra. A matéria de economia explicou se vale estocar (spoiler: não).",
  },
];

const VEREDITOS = [
  { min: 0, titulo: "Zerou. E tudo bem — por enquanto.", texto: "Ontem passou batido. O problema é que ontem decide o preço do seu café, o seu trânsito e o seu financiamento de hoje." },
  { min: 1, titulo: "Pegou por alto.", texto: "Você viu as manchetes passarem, mas o contexto ficou pelo caminho — e é no contexto que mora a decisão certa." },
  { min: 2, titulo: "Quase lá.", texto: "Duas de três. O que faltou não foi atenção: foi uma fonte que organizasse o dia por você." },
  { min: 3, titulo: "Gabaritou. Você já lê jornal.", texto: "Só falta oficializar — e ter o arquivo, os colunistas e os alertas de quem confere na fonte." },
];

export default function GloboQuizPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [etapa, setEtapa] = useState(0);
  const [respostas, setRespostas] = useState<number[]>([]);
  const [escolha, setEscolha] = useState<number | null>(null);

  const acertos = respostas.filter((r, i) => r === PERGUNTAS[i].certa).length;
  const terminou = etapa >= PERGUNTAS.length;
  const veredito = [...VEREDITOS].reverse().find((v) => acertos >= v.min)!;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (reduced) return;
      gsap.fromTo(
        ".gq-hero-el",
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.09, ease: "power2.out", delay: 0.1 }
      );
      gsap.utils.toArray<HTMLElement>(".gq-up").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 26 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 87%" } }
        );
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const responder = (i: number) => {
    if (escolha !== null) return;
    setEscolha(i);
  };

  const proxima = () => {
    if (escolha === null) return;
    setRespostas((r) => [...r, escolha]);
    setEscolha(null);
    setEtapa((e) => e + 1);
  };

  const pergunta = PERGUNTAS[etapa];

  return (
    <div
      ref={rootRef}
      className="min-h-screen bg-[#0a5cb8] text-white selection:bg-[#ffd43b] selection:text-[#14181d]"
      style={{ fontFamily: "var(--font-globo-sans), sans-serif" }}
    >
      <style>{`.gq-serif { font-family: var(--font-globo-serif), serif; }`}</style>

      <header className="mx-auto flex max-w-4xl items-center justify-between px-4 py-5 sm:px-8">
        <span className="gq-serif text-2xl font-black">O GLOBO</span>
        <span className="rounded-full bg-white/15 px-4 py-1.5 text-xs font-bold tracking-wider uppercase backdrop-blur-sm">
          teste de ontem
        </span>
      </header>

      {/* hero */}
      <section className="mx-auto max-w-4xl px-4 pt-8 pb-10 text-center sm:px-8">
        <h1 className="gq-serif gq-hero-el text-4xl leading-[1.06] font-black sm:text-6xl">
          Você sabe o que
          <br />
          aconteceu <span className="text-[#ffd43b]">ontem?</span>
        </h1>
        <p className="gq-hero-el mx-auto mt-5 max-w-lg text-lg leading-relaxed text-white/85">
          Três perguntas sobre o noticiário desta semana. Sem julgamento — só um
          diagnóstico e, se precisar, o remédio.
        </p>
        <p className="gq-hero-el mt-2 text-xs text-white/60">Perguntas fictícias de demonstração.</p>
      </section>

      {/* quiz */}
      <section className="mx-auto max-w-2xl px-4 pb-16 sm:px-8">
        <div className="gq-hero-el rounded-3xl bg-white p-6 text-[#14181d] shadow-[0_30px_60px_-25px_rgba(0,0,0,0.45)] sm:p-8">
          {!terminou ? (
            <>
              {/* progresso */}
              <div className="flex items-center justify-between text-xs font-bold text-[#8494a7]">
                <span>
                  Pergunta {etapa + 1} de {PERGUNTAS.length}
                </span>
                <div className="flex gap-1.5" aria-hidden>
                  {PERGUNTAS.map((_, i) => (
                    <span
                      key={i}
                      className={`h-1.5 w-8 rounded-full ${i < etapa ? "bg-[#0a5cb8]" : i === etapa ? "bg-[#ffd43b]" : "bg-[#e3e9f1]"}`}
                    />
                  ))}
                </div>
              </div>

              <h2 className="gq-serif mt-5 text-xl leading-snug font-black sm:text-2xl">{pergunta.q}</h2>

              <div className="mt-6 space-y-3">
                {pergunta.opcoes.map((op, i) => {
                  const revelada = escolha !== null;
                  const certa = i === pergunta.certa;
                  const escolhida = i === escolha;
                  return (
                    <button
                      key={op}
                      onClick={() => responder(i)}
                      disabled={revelada}
                      className={`block w-full rounded-xl border-2 px-5 py-4 text-left text-sm font-bold transition-colors ${
                        revelada
                          ? certa
                            ? "border-[#2f9e44] bg-[#2f9e44]/10 text-[#2f9e44]"
                            : escolhida
                              ? "border-[#e03131] bg-[#e03131]/10 text-[#e03131]"
                              : "border-[#e3e9f1] text-[#8494a7]"
                          : "border-[#e3e9f1] hover:border-[#0a5cb8] hover:bg-[#0a5cb8]/5"
                      }`}
                    >
                      {revelada && certa ? "✓ " : revelada && escolhida ? "✗ " : ""}
                      {op}
                    </button>
                  );
                })}
              </div>

              {escolha !== null && (
                <div className="mt-5 rounded-xl bg-[#f2f6fb] p-4 text-sm leading-relaxed text-[#44546a]">
                  <strong className="text-[#0a5cb8]">Contexto de assinante:</strong> {pergunta.contexto}
                </div>
              )}

              <button
                onClick={proxima}
                disabled={escolha === null}
                className={`mt-6 w-full rounded-full py-3.5 text-sm font-extrabold transition-all ${
                  escolha === null
                    ? "cursor-not-allowed bg-[#e3e9f1] text-[#8494a7]"
                    : "bg-[#0a5cb8] text-white hover:scale-[1.01]"
                }`}
              >
                {etapa === PERGUNTAS.length - 1 ? "Ver meu diagnóstico" : "Próxima pergunta"}
              </button>
            </>
          ) : (
            <div className="text-center" role="status">
              <p className="text-xs font-bold tracking-[0.25em] text-[#8494a7] uppercase">seu diagnóstico</p>
              <p className="gq-serif mt-3 text-5xl font-black text-[#0a5cb8]">
                {acertos}/{PERGUNTAS.length}
              </p>
              <h2 className="gq-serif mt-4 text-2xl font-black">{veredito.titulo}</h2>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[#44546a]">{veredito.texto}</p>
              <div className="mx-auto mt-8 max-w-sm rounded-2xl border-2 border-[#0a5cb8] p-6">
                <p className="text-xs font-bold tracking-[0.2em] text-[#0a5cb8] uppercase">o remédio</p>
                <p className="gq-serif mt-2 text-4xl font-black">R$ 9,90<span className="text-base font-bold text-[#8494a7]">/mês*</span></p>
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="mt-4 block rounded-full bg-[#0a5cb8] py-3 text-sm font-extrabold text-white transition-transform hover:scale-[1.02]"
                >
                  {acertos === 3 ? "Oficializar minha assinatura" : "Nunca mais perder um ontem"}
                </a>
                <p className="mt-2 text-[10px] text-[#8494a7]">*Valor ilustrativo de portfólio. Cancele quando quiser.</p>
              </div>
              <button
                onClick={() => {
                  setEtapa(0);
                  setRespostas([]);
                  setEscolha(null);
                }}
                className="mt-4 text-xs font-bold text-[#8494a7] underline underline-offset-2 hover:text-[#0a5cb8]"
              >
                refazer o teste
              </button>
            </div>
          )}
        </div>
      </section>

      {/* por que funciona */}
      <section className="border-t border-white/15 px-4 py-14 sm:px-8">
        <div className="mx-auto grid max-w-4xl gap-8 text-center sm:grid-cols-3">
          {[
            { n: "8 min", d: "de resumo matinal substituem 2h de rolagem" },
            { n: "94%", d: "dos assinantes dizem chegar 'mais preparados' na conversa de trabalho" },
            { n: "1 fonte", d: "checada vale mais que 40 encaminhadas" },
          ].map((s) => (
            <div key={s.n} className="gq-up">
              <p className="gq-serif text-4xl font-black text-[#ffd43b]">{s.n}</p>
              <p className="mt-2 text-sm leading-relaxed text-white/80">{s.d}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-center text-[10px] text-white/50">Métricas ilustrativas de portfólio.</p>
      </section>

      <footer className="border-t border-white/15 px-4 py-6 text-xs text-white/60 sm:px-8">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-3">
          <span>Página conceitual de portfólio — sem vínculo oficial com O GLOBO / Editora Globo.</span>
          <Link href="/globo/quiz/guide" className="underline underline-offset-2 hover:text-[#ffd43b]">
            Como esta página foi feita →
          </Link>
        </div>
      </footer>
    </div>
  );
}
