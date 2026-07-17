"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const EDICOES = [
  {
    ano: 1925,
    manchete: "Circula hoje o primeiro numero d'O GLOBO",
    sub: "Vespertino carioca chega ás bancas com oito paginas e o compromisso de informar sem partido.",
    nota: "Grafia da época, chumbo na rotativa.",
    preco: "200 réis",
  },
  {
    ano: 1945,
    manchete: "TERMINOU A GUERRA NA EUROPA",
    sub: "Rendição incondicional assinada em Reims; Rio sai às ruas e o Centro para em festa.",
    nota: "Edição extra, esgotada em duas horas.",
    preco: "Cr$ 0,40",
  },
  {
    ano: 1960,
    manchete: "Brasília é inaugurada e a capital muda de século",
    sub: "JK entrega a nova capital; reportagem especial acompanha a mudança dos ministérios.",
    nota: "Fotocomposição chega à redação.",
    preco: "Cr$ 5",
  },
  {
    ano: 1985,
    manchete: "A República volta às ruas: eleição indireta encerra o ciclo militar",
    sub: "Colégio eleitoral escolhe civil após 21 anos; cobertura de 14 páginas.",
    nota: "Offset colorido na primeira página.",
    preco: "Cr$ 500",
  },
  {
    ano: 1994,
    manchete: "O Real chega ao bolso do brasileiro",
    sub: "Nova moeda entra em circulação; economistas explicam a URV em linguagem de padaria.",
    nota: "Primeira edição também na internet, dois anos depois.",
    preco: "R$ 1,00",
  },
  {
    ano: 2016,
    manchete: "O Rio recebe o mundo: abrem-se os Jogos",
    sub: "Maracanã vê a cerimônia de abertura; caderno especial de 32 páginas circula com a edição.",
    nota: "Cobertura em tempo real, papel e push.",
    preco: "R$ 4,50",
  },
  {
    ano: 2026,
    manchete: "Cem anos depois, a manchete continua sendo checada",
    sub: "O acervo completo — 36.500 edições — aberto para assinantes, da primeira página de 1925 à de amanhã.",
    nota: "Você está aqui.",
    preco: "R$ 6,50",
  },
];

export default function GloboArquivoPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);
  const ed = EDICOES[idx];
  const idade = 1 - idx / (EDICOES.length - 1); // 1 = mais antigo

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (reduced) return;
      gsap.fromTo(
        ".ga2-hero-el",
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power2.out", delay: 0.15 }
      );
      gsap.utils.toArray<HTMLElement>(".ga2-up").forEach((el) => {
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
      className="min-h-screen bg-[#2b2620] text-[#f3ede1] selection:bg-[#ffd43b] selection:text-[#2b2620]"
      style={{ fontFamily: "var(--font-globo-sans), sans-serif" }}
    >
      <style>{`
        .ga2-serif { font-family: var(--font-globo-serif), serif; }
        .ga2-range { accent-color: #ffd43b; }
      `}</style>

      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-8">
        <span className="ga2-serif text-2xl font-black">O GLOBO</span>
        <span className="hidden text-xs font-semibold tracking-[0.25em] text-[#b3a68f] uppercase sm:block">
          acervo · 36.500 edições
        </span>
        <a href="#assinar" className="rounded-md bg-[#ffd43b] px-5 py-2.5 text-sm font-extrabold text-[#2b2620] transition-transform hover:scale-105">
          Assinar
        </a>
      </header>

      {/* hero + máquina do tempo */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 pt-8 pb-16 sm:grid-cols-2 sm:px-8">
        <div>
          <p className="ga2-hero-el text-xs font-bold tracking-[0.3em] text-[#ffd43b] uppercase">
            máquina do tempo · arraste o ano
          </p>
          <h1 className="ga2-serif ga2-hero-el mt-4 text-4xl leading-[1.08] font-black sm:text-6xl">
            Cem anos de
            <br />
            primeira página.
          </h1>
          <p className="ga2-hero-el mt-6 max-w-md text-lg leading-relaxed text-[#cfc4ad]">
            Toda manchete que o Rio leu desde 1925 está no acervo — digitalizada,
            pesquisável, citável. Arraste o controle e veja o papel envelhecer.
          </p>

          <div className="ga2-hero-el mt-10">
            <div className="flex items-baseline justify-between">
              <span className="ga2-serif text-6xl font-black text-[#ffd43b] tabular-nums">{ed.ano}</span>
              <span className="text-xs font-semibold text-[#b3a68f]">banca: {ed.preco}</span>
            </div>
            <input
              type="range"
              min={0}
              max={EDICOES.length - 1}
              step={1}
              value={idx}
              onChange={(e) => setIdx(parseInt(e.target.value, 10))}
              className="ga2-range mt-4 w-full"
              aria-label="Escolher o ano da edição"
              aria-valuetext={String(ed.ano)}
            />
            <div className="mt-1 flex justify-between text-[10px] font-semibold text-[#b3a68f]">
              {EDICOES.map((e) => (
                <span key={e.ano}>{String(e.ano).slice(2)}</span>
              ))}
            </div>
            <p className="mt-4 text-sm text-[#cfc4ad]">
              <strong className="text-[#f3ede1]">{ed.nota}</strong> Edições e manchetes resumidas para o conceito.
            </p>
          </div>
        </div>

        {/* primeira página que envelhece */}
        <div className="mx-auto w-full max-w-md" aria-live="polite">
          <div
            className="border border-black/20 p-6 shadow-[0_30px_60px_-25px_rgba(0,0,0,0.7)] transition-all duration-500 sm:p-8"
            style={{
              backgroundColor: `hsl(45, ${28 + idade * 30}%, ${92 - idade * 14}%)`,
              filter: `sepia(${idade * 0.5}) contrast(${1 - idade * 0.08})`,
              transform: `rotate(${idade * -0.8}deg)`,
              color: "#241f18",
            }}
          >
            <p className="text-center text-[9px] font-semibold tracking-[0.25em] uppercase opacity-70">
              Rio de Janeiro · {ed.ano}
            </p>
            <p className="ga2-serif mt-1 text-center text-4xl font-black tracking-tight">O GLOBO</p>
            <div className="mt-2 h-[2px] bg-current opacity-80" />
            <div className="mt-0.5 h-px bg-current opacity-80" />
            <p className="ga2-serif mt-5 text-2xl leading-tight font-black uppercase">{ed.manchete}</p>
            <p className="mt-3 text-[12px] leading-relaxed opacity-80">{ed.sub}</p>
            <div className="mt-5 grid grid-cols-3 gap-2 border-t border-current/40 pt-3" aria-hidden>
              {[0, 1, 2].map((c) => (
                <div key={c} className="space-y-1">
                  <div className="h-1.5 w-full bg-current opacity-30" />
                  <div className="h-1.5 w-full bg-current opacity-30" />
                  <div className="h-1.5 w-3/4 bg-current opacity-30" />
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-between border-t-2 border-current pt-2 text-[9px] font-semibold tracking-wider uppercase opacity-70">
              <span>Nº {(idx + 1) * 5216}</span>
              <span>{ed.preco}</span>
            </div>
          </div>
        </div>
      </section>

      {/* usos do acervo */}
      <section className="border-y border-white/10 bg-[#241f18] px-4 py-14 sm:px-8">
        <div className="mx-auto grid max-w-5xl gap-8 sm:grid-cols-3">
          {[
            { t: "Para pesquisar", d: "Busca por palavra em 36.500 edições. O TCC agradece; o advogado também." },
            { t: "Para provar", d: "O que foi dito, quando foi dito, com página e data. Print não é fonte; acervo é." },
            { t: "Para lembrar", d: "A capa do dia em que você nasceu, emoldurável em dois cliques." },
          ].map((u) => (
            <article key={u.t} className="ga2-up border-t-2 border-[#ffd43b] pt-4">
              <h3 className="ga2-serif text-xl font-black">{u.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#cfc4ad]">{u.d}</p>
            </article>
          ))}
        </div>
      </section>

      {/* oferta */}
      <section id="assinar" className="px-4 py-16 sm:px-8">
        <div className="ga2-up mx-auto max-w-lg border-2 border-[#f3ede1]/80 bg-[#241f18] p-8 text-center">
          <p className="text-xs font-bold tracking-[0.25em] text-[#ffd43b] uppercase">digital + acervo completo</p>
          <p className="ga2-serif mt-3 text-6xl font-black">R$ 9,90</p>
          <p className="text-xs text-[#b3a68f]">/mês* nos 12 primeiros meses · depois R$ 29,90</p>
          <ul className="mx-auto mt-5 max-w-xs space-y-1.5 text-left text-sm text-[#cfc4ad]">
            <li>✓ Acervo 1925–hoje, busca por palavra</li>
            <li>✓ Download de páginas em alta resolução</li>
            <li>✓ Jornal digital completo de hoje, junto</li>
          </ul>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="mt-7 block rounded-md bg-[#ffd43b] py-3.5 text-sm font-extrabold text-[#2b2620] transition-transform hover:scale-[1.02]"
          >
            Abrir os cem anos
          </a>
          <p className="mt-3 text-[11px] text-[#b3a68f]">*Valor ilustrativo de portfólio. Cancele quando quiser.</p>
        </div>
      </section>

      <footer className="border-t border-white/10 px-4 py-6 text-xs text-[#b3a68f] sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3">
          <span>Página conceitual de portfólio — sem vínculo oficial com O GLOBO / Editora Globo.</span>
          <Link href="/globo/arquivo/guide" className="underline underline-offset-2 hover:text-[#ffd43b]">
            Como esta página foi feita →
          </Link>
        </div>
      </footer>
    </div>
  );
}
