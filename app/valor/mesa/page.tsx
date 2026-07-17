"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const PECAS = [
  {
    id: "jornal",
    nome: "O impresso salmão",
    peca: "1",
    desc: "Chega até 7h30, de segunda a sábado. O formato que obriga a pensar devagar — e o único que o WhatsApp não interrompe.",
    inclui: "no plano Impresso + Digital",
  },
  {
    id: "celular",
    nome: "O app com alertas",
    peca: "2",
    desc: "O urgente que importa para o seu setor, não para o algoritmo. Push configurável por indicador, empresa e assunto.",
    inclui: "em todos os planos",
  },
  {
    id: "laptop",
    nome: "A newsletter das 6h15",
    peca: "3",
    desc: "Valor Manhã aberta no e-mail antes da primeira reunião: os cinco assuntos do dia em oito minutos.",
    inclui: "em todos os planos",
  },
  {
    id: "cafe",
    nome: "O café",
    peca: "4",
    desc: "Este é por sua conta. Mas a régua é dele: a assinatura custa menos que um por dia.",
    inclui: "R$ 1,16/dia, para comparar",
  },
];

export default function ValorMesaPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [sel, setSel] = useState("jornal");
  const peca = PECAS.find((p) => p.id === sel)!;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (reduced) return;
      gsap.fromTo(
        ".vm2-hero-el",
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power2.out", delay: 0.15 }
      );
      gsap.fromTo(
        ".vm2-item",
        { opacity: 0, scale: 0.92 },
        { opacity: 1, scale: 1, duration: 0.7, stagger: 0.12, ease: "back.out(1.5)", delay: 0.5 }
      );
      gsap.utils.toArray<HTMLElement>(".vm2-up").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 26 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 87%" } }
        );
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const hotspot = (id: string) =>
    `vm2-item absolute z-10 flex h-8 w-8 items-center justify-center rounded-full text-sm font-extrabold shadow-lg transition-transform hover:scale-110 ${
      sel === id ? "bg-[#e8590c] text-white ring-4 ring-[#e8590c]/30" : "bg-white text-[#0e2b4c]"
    }`;

  return (
    <div
      ref={rootRef}
      className="min-h-screen bg-[#12100d] text-[#f3ede4] selection:bg-[#e8590c] selection:text-white"
      style={{ fontFamily: "var(--font-valor-sans), sans-serif" }}
    >
      <style>{`.vm2-serif { font-family: var(--font-valor-serif), serif; }`}</style>

      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-8">
        <span className="vm2-serif text-2xl font-bold">
          Valor <span className="font-normal italic">Econômico</span>
        </span>
        <a href="#assinar" className="rounded bg-[#e8590c] px-5 py-2.5 text-sm font-bold text-white transition-transform hover:scale-105">
          Assinar
        </a>
      </header>

      {/* hero */}
      <section className="mx-auto max-w-6xl px-4 pt-8 pb-6 text-center sm:px-8">
        <p className="vm2-hero-el text-xs font-bold tracking-[0.3em] text-[#c8a273] uppercase">
          7h02 · vista de cima
        </p>
        <h1 className="vm2-serif vm2-hero-el mt-4 text-4xl leading-[1.06] font-bold sm:text-6xl">
          A mesa de quem decide
          <br />
          <em className="text-[#c8a273]">tem quatro peças.</em>
        </h1>
        <p className="vm2-hero-el mx-auto mt-4 max-w-lg text-lg text-[#bfb4a4]">
          Toque nos números para conhecer cada uma. Três vêm com a assinatura;
          a quarta é a régua do preço.
        </p>
      </section>

      {/* mesa */}
      <section className="mx-auto grid max-w-6xl items-start gap-10 px-4 pb-16 sm:grid-cols-[1.2fr_1fr] sm:px-8">
        <div
          className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)]"
          style={{ background: "linear-gradient(135deg, #6b4a2e 0%, #55381f 55%, #46301c 100%)" }}
          role="group"
          aria-label="Mesa com as peças do ecossistema"
        >
          {/* veios da madeira */}
          <div className="absolute inset-0 opacity-25" aria-hidden style={{ backgroundImage: "repeating-linear-gradient(98deg, transparent 0 26px, rgba(0,0,0,0.28) 26px 28px)" }} />

          {/* jornal salmão */}
          <div className="vm2-item absolute top-[8%] left-[6%] w-[46%] rotate-[-4deg] bg-[#f6dccb] p-3 shadow-[0_16px_30px_-12px_rgba(0,0,0,0.6)]" aria-hidden>
            <p className="vm2-serif border-b-2 border-[#0e2b4c] pb-0.5 text-sm font-bold text-[#0e2b4c]">Valor</p>
            <div className="mt-1.5 space-y-1">
              <div className="h-1.5 w-full bg-[#0e2b4c]/75" />
              <div className="h-1.5 w-3/4 bg-[#0e2b4c]/75" />
              <div className="mt-1.5 h-1 w-full bg-[#3d2b22]/25" />
              <div className="h-1 w-full bg-[#3d2b22]/25" />
              <div className="h-8 w-full bg-[#b8552a]/30" />
              <div className="h-1 w-2/3 bg-[#3d2b22]/25" />
            </div>
          </div>
          <button onClick={() => setSel("jornal")} className={hotspot("jornal")} style={{ top: "12%", left: "44%" }} aria-label="Peça 1: o impresso salmão">1</button>

          {/* celular */}
          <div className="vm2-item absolute top-[16%] right-[10%] w-[15%] rotate-[7deg] rounded-xl bg-[#0b0d10] p-1 shadow-[0_16px_30px_-12px_rgba(0,0,0,0.7)]" aria-hidden>
            <div className="rounded-lg bg-[#1a2432] px-1.5 pt-3 pb-6">
              <div className="mx-auto mb-2 h-1 w-6 rounded-full bg-white/25" />
              <div className="rounded-md bg-[#243447] p-1.5">
                <p className="text-[6px] font-bold text-[#f6b26b]">VALOR · agora</p>
                <div className="mt-0.5 h-1 w-full bg-white/50" />
                <div className="mt-0.5 h-1 w-2/3 bg-white/50" />
              </div>
            </div>
          </div>
          <button onClick={() => setSel("celular")} className={hotspot("celular")} style={{ top: "14%", right: "24%" }} aria-label="Peça 2: o app com alertas">2</button>

          {/* laptop */}
          <div className="vm2-item absolute bottom-[8%] left-[14%] w-[42%] rotate-[2deg]" aria-hidden>
            <div className="rounded-t-lg border-4 border-b-0 border-[#2a2f36] bg-[#f4f1ec] p-2">
              <p className="text-[7px] font-bold text-[#e8590c]">✉ Valor Manhã — 6h15</p>
              <div className="mt-1 space-y-0.5">
                <div className="h-1 w-full bg-[#0e2b4c]/40" />
                <div className="h-1 w-5/6 bg-[#0e2b4c]/40" />
                <div className="h-1 w-4/6 bg-[#0e2b4c]/40" />
              </div>
            </div>
            <div className="h-2 rounded-b-lg bg-[#2a2f36]" />
          </div>
          <button onClick={() => setSel("laptop")} className={hotspot("laptop")} style={{ bottom: "26%", left: "48%" }} aria-label="Peça 3: a newsletter das 6h15">3</button>

          {/* café */}
          <div className="vm2-item absolute right-[14%] bottom-[14%] h-[18%] w-[13.5%]" aria-hidden>
            <div className="relative h-full w-full rounded-full bg-[#e8e2d6] shadow-[0_12px_24px_-8px_rgba(0,0,0,0.6)]">
              <div className="absolute inset-[12%] rounded-full bg-[#3a2417]" />
              <div className="absolute inset-[12%] rounded-full bg-gradient-to-br from-white/15 to-transparent" />
              <div className="absolute top-1/2 -right-[22%] h-[36%] w-[26%] -translate-y-1/2 rounded-full border-4 border-[#e8e2d6]" />
            </div>
          </div>
          <button onClick={() => setSel("cafe")} className={hotspot("cafe")} style={{ bottom: "34%", right: "26%" }} aria-label="Peça 4: o café">4</button>
        </div>

        {/* painel da peça */}
        <div className="vm2-hero-el sm:sticky sm:top-6" aria-live="polite">
          <div className="rounded-2xl border border-white/10 bg-[#1c1813] p-7">
            <p className="text-xs font-bold tracking-[0.25em] text-[#e8590c] uppercase">peça {peca.peca} de 4</p>
            <h2 className="vm2-serif mt-2 text-3xl font-bold">{peca.nome}</h2>
            <p className="mt-4 leading-relaxed text-[#bfb4a4]">{peca.desc}</p>
            <p className="mt-5 inline-block rounded-full bg-[#c8a273]/15 px-4 py-1.5 text-xs font-bold text-[#c8a273]">
              {peca.inclui}
            </p>
            <div className="mt-6 flex gap-2">
              {PECAS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSel(p.id)}
                  aria-label={`Ver ${p.nome}`}
                  className={`h-2 flex-1 rounded-full transition-colors ${p.id === sel ? "bg-[#e8590c]" : "bg-white/15 hover:bg-white/30"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* oferta */}
      <section id="assinar" className="border-t border-white/10 bg-[#0e2b4c] px-4 py-16 sm:px-8">
        <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
          <div className="vm2-up rounded-2xl border border-white/15 p-8 text-center">
            <p className="text-xs font-bold tracking-[0.25em] text-[#7fa3cc] uppercase">mesa digital</p>
            <p className="vm2-serif mt-3 text-5xl font-bold">R$ 34,90</p>
            <p className="text-xs text-white/60">/mês* · peças 2 e 3</p>
            <a href="#" onClick={(e) => e.preventDefault()} className="mt-6 block rounded border border-white/40 py-3 text-sm font-bold transition-colors hover:bg-white hover:text-[#0e2b4c]">
              Assinar digital
            </a>
          </div>
          <div className="vm2-up rounded-2xl bg-[#f6dccb] p-8 text-center text-[#0e2b4c]">
            <p className="text-xs font-bold tracking-[0.25em] text-[#b8552a] uppercase">mesa completa</p>
            <p className="vm2-serif mt-3 text-5xl font-bold">R$ 89,90</p>
            <p className="text-xs text-[#6d5142]">/mês* · peças 1, 2 e 3 — o café é com você</p>
            <a href="#" onClick={(e) => e.preventDefault()} className="mt-6 block rounded bg-[#e8590c] py-3 text-sm font-bold text-white transition-transform hover:scale-[1.02]">
              Montar a mesa completa
            </a>
          </div>
        </div>
        <p className="vm2-up mt-6 text-center text-xs text-white/50">
          *Valores ilustrativos de portfólio. Impresso com fidelidade de 12 meses; digital, cancele quando quiser.
        </p>
      </section>

      <footer className="border-t border-white/10 px-4 py-6 text-xs text-[#8a7f6d] sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3">
          <span>Página conceitual de portfólio — sem vínculo oficial com o Valor Econômico / Globo.</span>
          <Link href="/valor/mesa/guide" className="underline underline-offset-2 hover:text-[#c8a273]">
            Como esta página foi feita →
          </Link>
        </div>
      </footer>
    </div>
  );
}
