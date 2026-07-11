"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const TICKER = [
  "URGENTE · Banco Central anuncia decisão às 18h",
  "AO VIVO · Votação no plenário entra na madrugada",
  "RIO · Chuva forte muda esquema de trânsito na Zona Sul",
  "ECONOMIA · Dólar fecha em queda pelo 3º dia",
  "CULTURA · Estreia no Municipal esgota em 2 horas",
];

const EDITORIAS = [
  { nome: "Política", desc: "Bastidor apurado antes do plenário votar.", n: "412 matérias/semana" },
  { nome: "Economia", desc: "O número e o que ele muda no seu bolso.", n: "365 matérias/semana" },
  { nome: "Rio", desc: "A cidade, bairro a bairro, sem atalho.", n: "298 matérias/semana" },
  { nome: "Cultura", desc: "Crítica de verdade, agenda completa.", n: "187 matérias/semana" },
];

function useClock() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

function useMidnightCountdown() {
  const [left, setLeft] = useState("--:--:--");
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const end = new Date(now);
      end.setHours(23, 59, 59, 999);
      const ms = end.getTime() - now.getTime();
      const h = Math.floor(ms / 3600000);
      const m = Math.floor((ms % 3600000) / 60000);
      const s = Math.floor((ms % 60000) / 1000);
      setLeft(
        `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return left;
}

export default function GloboAgoraPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const now = useClock();
  const countdown = useMidnightCountdown();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (reduced) return;

      gsap.fromTo(
        ".ga-hero-el",
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.09, ease: "power2.out", delay: 0.15 }
      );

      // contador de matérias publicadas hoje
      const obj = { v: 0 };
      gsap.to(obj, {
        v: 1284,
        duration: 2.2,
        ease: "power2.out",
        delay: 0.4,
        onUpdate: () => {
          const el = document.querySelector(".ga-count");
          if (el) el.textContent = Math.round(obj.v).toLocaleString("pt-BR");
        },
      });

      gsap.utils.toArray<HTMLElement>(".ga-up").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 26 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 86%" },
          }
        );
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const hora = now
    ? now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
    : "--:--:--";

  return (
    <div
      ref={rootRef}
      className="min-h-screen bg-[#0b0e12] text-[#e8ecf1] selection:bg-[#e03131] selection:text-white"
      style={{ fontFamily: "var(--font-globo-sans), sans-serif" }}
    >
      <style>{`
        .ga-serif { font-family: var(--font-globo-serif), serif; }
        .ga-ticker { animation: ga-tick 30s linear infinite; }
        @keyframes ga-tick { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .ga-pulse { animation: ga-blink 1.2s ease-in-out infinite; }
        @keyframes ga-blink { 50% { opacity: 0.25; } }
        @media (prefers-reduced-motion: reduce) { .ga-ticker { animation: none; } .ga-pulse { animation: none; } }
      `}</style>

      {/* breaking ticker */}
      <div className="flex items-stretch border-b border-[#232a33] bg-[#11151b]">
        <span className="flex shrink-0 items-center gap-2 bg-[#e03131] px-3 py-2 text-[11px] font-extrabold tracking-widest text-white uppercase">
          <span className="ga-pulse inline-block h-2 w-2 rounded-full bg-white" /> Ao vivo
        </span>
        <div className="overflow-hidden" aria-hidden>
          <div className="ga-ticker flex w-max gap-10 py-2 text-xs font-semibold whitespace-nowrap text-[#aeb8c4]">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="flex gap-10">
                {TICKER.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* header */}
      <header className="flex items-center justify-between px-4 py-4 sm:px-8">
        <span className="ga-serif text-2xl font-black tracking-tight">O GLOBO</span>
        <span className="hidden text-xs font-semibold tracking-[0.2em] text-[#aeb8c4] uppercase sm:block">
          Redação · Rio de Janeiro · <span className="tabular-nums">{hora}</span>
        </span>
        <a
          href="#oferta"
          className="rounded bg-[#e03131] px-4 py-2 text-xs font-extrabold tracking-wider text-white uppercase transition-transform hover:scale-105"
        >
          Oferta do dia
        </a>
      </header>

      {/* hero */}
      <section className="mx-auto max-w-6xl px-4 pt-12 pb-16 sm:px-8">
        <p className="ga-hero-el text-xs font-extrabold tracking-[0.25em] text-[#e03131] uppercase">
          Enquanto você lê isto, a redação apura
        </p>
        <h1 className="ga-serif ga-hero-el mt-4 max-w-3xl text-4xl leading-[1.05] font-black sm:text-6xl">
          A notícia não espera.
          <br />
          <span className="text-[#4d9fff]">Você também não precisa.</span>
        </h1>
        <div className="ga-hero-el mt-8 flex flex-wrap items-center gap-x-10 gap-y-4">
          <p className="text-sm text-[#aeb8c4]">
            <span className="ga-count ga-serif block text-5xl font-black text-white tabular-nums">0</span>
            matérias publicadas hoje
          </p>
          <p className="text-sm text-[#aeb8c4]">
            <span className="ga-serif block text-5xl font-black text-white">80+</span>
            repórteres em turno agora
          </p>
          <p className="text-sm text-[#aeb8c4]">
            <span className="ga-serif block text-5xl font-black text-white">24/7</span>
            cobertura sem pausa
          </p>
        </div>
        <div className="ga-hero-el mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#oferta"
            className="rounded-md bg-[#e03131] px-8 py-4 text-base font-extrabold text-white shadow-[0_12px_30px_-10px_rgba(224,49,49,0.6)] transition-transform hover:scale-[1.03]"
          >
            Assinar com 50% off
          </a>
          <span className="text-sm text-[#aeb8c4]">
            Acesso imediato. Leia a próxima urgente por dentro.
          </span>
        </div>
      </section>

      {/* editorias */}
      <section className="border-y border-[#232a33] bg-[#0e1218] px-4 py-14 sm:px-8">
        <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-4">
          {EDITORIAS.map((e) => (
            <article
              key={e.nome}
              className="ga-up group rounded-lg border border-[#232a33] bg-[#11151b] p-6 transition-colors hover:border-[#4d9fff]"
            >
              <h3 className="ga-serif text-xl font-black">{e.nome}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#aeb8c4]">{e.desc}</p>
              <p className="mt-4 text-[11px] font-bold tracking-widest text-[#4d9fff] uppercase">{e.n}</p>
            </article>
          ))}
        </div>
      </section>

      {/* oferta relâmpago */}
      <section id="oferta" className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-8">
        <p className="ga-up text-xs font-extrabold tracking-[0.25em] text-[#e03131] uppercase">
          Oferta do dia · expira à meia-noite
        </p>
        <p className="ga-up ga-serif mt-3 text-6xl font-black tabular-nums sm:text-7xl">{countdown}</p>
        <div className="ga-up mt-10 rounded-xl border border-[#232a33] bg-[#11151b] p-8">
          <h2 className="ga-serif text-3xl font-black">Digital completo</h2>
          <p className="mt-4 text-[#aeb8c4]">
            <span className="text-lg line-through">R$ 29,90</span>{" "}
            <span className="ga-serif text-6xl font-black text-white">R$ 14,90</span>
            <span className="text-sm">/mês* por 12 meses</span>
          </p>
          <ul className="mx-auto mt-6 max-w-sm space-y-2 text-left text-sm text-[#aeb8c4]">
            <li>✓ Site, app e edição digital do impresso</li>
            <li>✓ Alertas de urgente personalizados</li>
            <li>✓ Newsletters dos colunistas</li>
            <li>✓ Acervo completo desde 1925</li>
          </ul>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="mt-8 block rounded-md bg-[#e03131] py-4 text-base font-extrabold text-white transition-transform hover:scale-[1.02]"
          >
            Garantir 50% off agora
          </a>
          <p className="mt-3 text-xs text-[#5c6570]">
            *Valores ilustrativos de portfólio. Renovação a R$ 29,90/mês. Cancele quando quiser.
          </p>
        </div>
      </section>

      <footer className="border-t border-[#232a33] px-4 py-6 text-xs text-[#5c6570] sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3">
          <span>Página conceitual de portfólio — sem vínculo oficial com O GLOBO / Editora Globo.</span>
          <Link href="/globo/agora/guide" className="underline underline-offset-2 hover:text-[#4d9fff]">
            Como esta página foi feita →
          </Link>
        </div>
      </footer>
    </div>
  );
}
