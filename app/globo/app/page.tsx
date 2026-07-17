"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const FEED = [
  { chip: "URGENTE", cor: "#e03131", t: "Banco Central anuncia decisão de juros às 18h30" },
  { chip: "RIO", cor: "#0a5cb8", t: "Orla terá esquema especial de trânsito no fim de semana" },
  { chip: "ECONOMIA", cor: "#0a5cb8", t: "Dólar fecha em queda pelo terceiro dia seguido" },
  { chip: "CULTURA", cor: "#0a5cb8", t: "Municipal anuncia temporada com ingressos a R$ 10" },
  { chip: "ESPORTES", cor: "#0a5cb8", t: "Clássico de domingo muda de horário; veja o esquema" },
  { chip: "ANÁLISE", cor: "#5f3dc4", t: "O que a safra recorde muda na inflação do segundo semestre" },
];

const RECURSOS = [
  { t: "Alertas do seu jeito", d: "Urgente de verdade, não notificação de tudo. Você escolhe editorias, bairros e colunistas." },
  { t: "Leitura offline", d: "Baixe a edição no wi-fi, leia no metrô. O túnel deixou de ser desculpa." },
  { t: "Edição digital do impresso", d: "O jornal de papel, página a página, no tablet — com zoom que não borra." },
  { t: "Modo noturno", d: "Preto de verdade para ler às 23h sem acordar ninguém. Teste aí no aparelho ao lado." },
];

export default function GloboAppPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const feedRef = useRef<HTMLDivElement>(null);
  const [escuro, setEscuro] = useState(false);
  const [notif, setNotif] = useState(false);
  const [hora, setHora] = useState("09:41");

  useEffect(() => {
    const id = setInterval(() => {
      setHora(new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }));
    }, 30_000);
    setHora(new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }));
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (!reduced && feedRef.current) {
        // feed rola sozinho dentro do aparelho, em loop
        gsap.to(feedRef.current, {
          yPercent: -50,
          duration: 22,
          ease: "none",
          repeat: -1,
        });
      }
      if (reduced) return;
      gsap.fromTo(
        ".gap-hero-el",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power2.out", delay: 0.15 }
      );
      gsap.fromTo(
        ".gap-phone",
        { y: 60, rotate: 6, opacity: 0 },
        { y: 0, rotate: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 0.4 }
      );
      gsap.utils.toArray<HTMLElement>(".gap-up").forEach((el) => {
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

  const dispararNotif = () => {
    setNotif(true);
    setTimeout(() => setNotif(false), 3200);
  };

  return (
    <div
      ref={rootRef}
      className="min-h-screen bg-[#f2f6fb] text-[#14181d] selection:bg-[#0a5cb8] selection:text-white"
      style={{ fontFamily: "var(--font-globo-sans), sans-serif" }}
    >
      <style>{`
        .gap-serif { font-family: var(--font-globo-serif), serif; }
        .gap-notif { transition: transform 0.45s cubic-bezier(0.34, 1.4, 0.64, 1), opacity 0.3s; }
      `}</style>

      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-8">
        <span className="gap-serif text-2xl font-black">O GLOBO</span>
        <a href="#plano" className="rounded-full bg-[#0a5cb8] px-5 py-2.5 text-sm font-bold text-white transition-transform hover:scale-105">
          Assinar
        </a>
      </header>

      {/* hero com iPhone */}
      <section className="mx-auto grid max-w-6xl items-center gap-14 px-4 pt-8 pb-20 sm:grid-cols-2 sm:px-8">
        <div>
          <p className="gap-hero-el text-xs font-bold tracking-[0.3em] text-[#0a5cb8] uppercase">
            o app dos assinantes
          </p>
          <h1 className="gap-serif gap-hero-el mt-4 text-4xl leading-[1.08] font-black sm:text-6xl">
            Cem anos de jornal.
            <br />
            <span className="text-[#0a5cb8]">188 gramas de bolso.</span>
          </h1>
          <p className="gap-hero-el mt-6 max-w-md text-lg leading-relaxed text-[#44546a]">
            O aparelho aqui do lado está funcionando: o feed rola, o urgente
            chega, o modo noturno apaga a luz. É assim que 2 milhões de
            assinantes leem O GLOBO todo dia.
          </p>
          <div className="gap-hero-el mt-8 flex flex-wrap gap-3">
            <button
              onClick={dispararNotif}
              className="rounded-full border-2 border-[#0a5cb8] px-5 py-3 text-sm font-bold text-[#0a5cb8] transition-colors hover:bg-[#0a5cb8] hover:text-white"
            >
              📳 Testar alerta de urgente
            </button>
            <button
              onClick={() => setEscuro((e) => !e)}
              className="rounded-full border-2 border-[#44546a]/40 px-5 py-3 text-sm font-bold text-[#44546a] transition-colors hover:border-[#14181d] hover:text-[#14181d]"
            >
              {escuro ? "☀️ Modo claro" : "🌙 Modo noturno"}
            </button>
          </div>
          <p className="gap-hero-el mt-8 text-sm font-semibold text-[#44546a]">
            ★ 4,8 na App Store · digital a partir de <strong className="text-[#14181d]">R$ 9,90/mês*</strong>
          </p>
        </div>

        {/* iPhone em CSS */}
        <div className="gap-phone mx-auto w-full max-w-[300px]" aria-hidden>
          <div className="relative rounded-[3rem] border-[10px] border-[#14181d] bg-[#14181d] shadow-[0_40px_80px_-30px_rgba(20,24,29,0.55)]">
            {/* botões laterais */}
            <span className="absolute top-24 -left-[13px] h-10 w-[3px] rounded-full bg-[#14181d]" />
            <span className="absolute top-40 -left-[13px] h-14 w-[3px] rounded-full bg-[#14181d]" />
            <span className="absolute top-32 -right-[13px] h-16 w-[3px] rounded-full bg-[#14181d]" />
            <div
              className={`relative h-[560px] overflow-hidden rounded-[2.4rem] transition-colors duration-500 ${
                escuro ? "bg-[#101418] text-[#e8ecf1]" : "bg-white text-[#14181d]"
              }`}
            >
              {/* dynamic island */}
              <div className="absolute top-2.5 left-1/2 z-30 h-7 w-24 -translate-x-1/2 rounded-full bg-[#14181d]" />

              {/* notificação push */}
              <div
                className={`gap-notif absolute inset-x-3 top-3 z-20 rounded-2xl border p-3 shadow-lg backdrop-blur ${
                  escuro ? "border-white/10 bg-[#1c232b]/95" : "border-black/5 bg-white/95"
                } ${notif ? "translate-y-9 opacity-100" : "-translate-y-24 opacity-0"}`}
              >
                <div className="flex items-center gap-2">
                  <span className="gap-serif flex h-7 w-7 items-center justify-center rounded-md bg-[#0a5cb8] text-xs font-black text-white">G</span>
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold tracking-wide text-[#e03131] uppercase">urgente · agora</p>
                    <p className="truncate text-[11px] leading-tight font-semibold">
                      Decisão de juros sai às 18h30; siga ao vivo
                    </p>
                  </div>
                </div>
              </div>

              {/* status bar */}
              <div className="flex items-center justify-between px-6 pt-3 text-[11px] font-semibold">
                <span className="tabular-nums">{hora}</span>
                <span className="tracking-tight">●●●● ▲ ▮</span>
              </div>

              {/* app header */}
              <div className={`mt-2 border-b px-4 pb-2 ${escuro ? "border-white/10" : "border-black/10"}`}>
                <div className="flex items-center justify-between">
                  <span className="gap-serif text-lg font-black">O GLOBO</span>
                  <span className="flex items-center gap-1 rounded-full bg-[#e03131] px-2 py-0.5 text-[9px] font-extrabold tracking-wider text-white uppercase">
                    <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-white" /> ao vivo
                  </span>
                </div>
              </div>

              {/* feed em loop */}
              <div className="h-full overflow-hidden px-3 pt-2">
                <div ref={feedRef}>
                  {[0, 1].map((dup) => (
                    <div key={dup}>
                      {FEED.map((n) => (
                        <article
                          key={`${dup}-${n.t}`}
                          className={`mb-2 rounded-xl border p-3 ${
                            escuro ? "border-white/10 bg-[#161c22]" : "border-black/5 bg-[#f6f8fb]"
                          }`}
                        >
                          <span
                            className="rounded px-1.5 py-0.5 text-[9px] font-extrabold tracking-wider text-white uppercase"
                            style={{ backgroundColor: n.cor }}
                          >
                            {n.chip}
                          </span>
                          <p className="gap-serif mt-1.5 text-[13px] leading-snug font-bold">{n.t}</p>
                          <p className={`mt-1 text-[10px] ${escuro ? "text-white/50" : "text-black/45"}`}>
                            há {3 + (n.t.length % 40)} min · 3 min de leitura
                          </p>
                        </article>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* tab bar */}
              <div
                className={`absolute inset-x-0 bottom-0 flex items-center justify-around border-t px-2 pt-2 pb-5 text-[9px] font-bold backdrop-blur ${
                  escuro ? "border-white/10 bg-[#101418]/90" : "border-black/10 bg-white/90"
                }`}
              >
                <span className="text-[#0a5cb8]">● Agora</span>
                <span className="opacity-50">Editorias</span>
                <span className="opacity-50">Edição</span>
                <span className="opacity-50">Salvos</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* recursos */}
      <section className="border-y border-[#d7e2ef] bg-white px-4 py-16 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="gap-serif gap-up text-3xl font-black sm:text-4xl">
            Feito para o seu dia, não para o seu tempo de tela
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {RECURSOS.map((r) => (
              <article key={r.t} className="gap-up rounded-2xl bg-[#f2f6fb] p-6">
                <h3 className="text-lg font-bold">{r.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#44546a]">{r.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* plano */}
      <section id="plano" className="px-4 py-16 sm:px-8">
        <div className="gap-up mx-auto max-w-lg rounded-3xl bg-white p-8 text-center shadow-[0_24px_60px_-30px_rgba(10,92,184,0.4)]">
          <p className="text-xs font-bold tracking-[0.25em] text-[#0a5cb8] uppercase">digital completo</p>
          <p className="gap-serif mt-3 text-6xl font-black">R$ 9,90</p>
          <p className="text-xs text-[#8494a7]">/mês* nos 12 primeiros meses · depois R$ 29,90</p>
          <ul className="mx-auto mt-5 max-w-xs space-y-1.5 text-left text-sm text-[#44546a]">
            <li>✓ App, site e edição digital do impresso</li>
            <li>✓ Alertas personalizados e leitura offline</li>
            <li>✓ Até 5 aparelhos conectados</li>
          </ul>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="mt-7 block rounded-full bg-[#0a5cb8] py-3.5 text-sm font-bold text-white transition-transform hover:scale-[1.02]"
          >
            Assinar e baixar o app
          </a>
          <p className="mt-3 text-[11px] text-[#8494a7]">
            *Valor ilustrativo de portfólio. Cancele quando quiser, direto no app.
          </p>
        </div>
      </section>

      <footer className="border-t border-[#d7e2ef] px-4 py-6 text-xs text-[#8494a7] sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3">
          <span>Página conceitual de portfólio — sem vínculo oficial com O GLOBO / Editora Globo.</span>
          <Link href="/globo/app/guide" className="underline underline-offset-2 hover:text-[#0a5cb8]">
            Como esta página foi feita →
          </Link>
        </div>
      </footer>
    </div>
  );
}
