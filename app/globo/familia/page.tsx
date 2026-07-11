"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const PERFIS = [
  { emoji: "📈", quem: "Para quem decide", oque: "Economia e política com análise, não gritaria." },
  { emoji: "🎓", quem: "Para quem estuda", oque: "Atualidades para vestibular e concurso, com acervo." },
  { emoji: "🍳", quem: "Para quem cozinha", oque: "Receitas testadas e a crítica de restaurantes." },
  { emoji: "⚽", quem: "Para quem torce", oque: "O time do coração coberto sem clubismo." },
];

const COMPARATIVO: { linha: string; digital: string; familia: string; completo: string }[] = [
  { linha: "Perfis simultâneos", digital: "1", familia: "4", completo: "4" },
  { linha: "Site e app ilimitados", digital: "✓", familia: "✓", completo: "✓" },
  { linha: "Newsletters exclusivas", digital: "✓", familia: "✓", completo: "✓" },
  { linha: "Jogos e receitas", digital: "—", familia: "✓", completo: "✓" },
  { linha: "Acervo desde 1925", digital: "—", familia: "✓", completo: "✓" },
  { linha: "Jornal impresso na porta", digital: "—", familia: "—", completo: "✓" },
];

const FAQ = [
  {
    q: "Como funcionam os 4 perfis?",
    a: "Cada pessoa tem login, newsletters e alertas próprios. O pagamento é um só e ninguém briga pelo horóscopo.",
  },
  {
    q: "Posso trocar de plano depois?",
    a: "Sim, o upgrade para o plano com impresso é feito em um clique e vale a partir da edição seguinte.",
  },
  {
    q: "Tem fidelidade?",
    a: "No digital, nenhuma — cancele quando quiser. No impresso, 12 meses por causa da logística de entrega.",
  },
  {
    q: "O impresso chega em qualquer endereço?",
    a: "Grande Rio, São Paulo capital e principais capitais. No checkout você confere o CEP antes de pagar.",
  },
];

export default function GloboFamiliaPage() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (reduced) return;
      gsap.fromTo(
        ".gf-hero-el",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power2.out", delay: 0.15 }
      );
      gsap.to(".gf-blob-a", { y: -18, x: 10, duration: 6, yoyo: true, repeat: -1, ease: "sine.inOut" });
      gsap.to(".gf-blob-b", { y: 14, x: -12, duration: 7, yoyo: true, repeat: -1, ease: "sine.inOut" });
      gsap.utils.toArray<HTMLElement>(".gf-up").forEach((el) => {
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

  return (
    <div
      ref={rootRef}
      className="min-h-screen bg-[#eef5fd] text-[#17324e] selection:bg-[#0a5cb8] selection:text-white"
      style={{ fontFamily: "var(--font-globo-sans), sans-serif" }}
    >
      <style>{`
        .gf-serif { font-family: var(--font-globo-serif), serif; }
        .gf-blob { position: absolute; border-radius: 58% 42% 55% 45% / 48% 55% 45% 52%; filter: blur(2px); }
        details.gf-faq summary::-webkit-details-marker { display: none; }
        details.gf-faq[open] .gf-plus { transform: rotate(45deg); }
      `}</style>

      {/* header */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-8">
        <span className="gf-serif text-2xl font-black">O GLOBO</span>
        <span className="rounded-full bg-[#0a5cb8]/10 px-4 py-1.5 text-xs font-bold text-[#0a5cb8]">
          Plano Família
        </span>
      </header>

      {/* hero */}
      <section className="relative mx-auto max-w-6xl overflow-hidden px-4 pt-10 pb-20 sm:px-8">
        <div className="gf-blob gf-blob-a top-6 -right-16 h-64 w-64 bg-[#ffd8a8]/70" aria-hidden />
        <div className="gf-blob gf-blob-b top-56 -right-2 h-40 w-40 bg-[#a5d8ff]/80" aria-hidden />
        <div className="relative max-w-2xl">
          <h1 className="gf-serif gf-hero-el text-4xl leading-[1.08] font-black sm:text-6xl">
            Um jornal.
            <br />
            <span className="text-[#0a5cb8]">Quatro leitores.</span>
            <br />
            Uma assinatura.
          </h1>
          <p className="gf-hero-el mt-6 max-w-lg text-lg leading-relaxed text-[#44607c]">
            O plano Família d&apos;O GLOBO dá a cada pessoa da casa o seu próprio
            jornal — perfis, alertas e newsletters separados — por menos do que
            duas assinaturas individuais.
          </p>
          <div className="gf-hero-el mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#planos"
              className="rounded-full bg-[#0a5cb8] px-8 py-4 text-base font-bold text-white shadow-[0_14px_30px_-12px_rgba(10,92,184,0.6)] transition-transform hover:scale-[1.03]"
            >
              Montar o plano da casa
            </a>
            <span className="text-sm font-semibold text-[#44607c]">
              R$ 19,90/mês* para todo mundo
            </span>
          </div>
        </div>
      </section>

      {/* perfis */}
      <section className="bg-white px-4 py-16 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="gf-serif gf-up text-3xl font-black sm:text-4xl">
            Cada um lê o seu.
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PERFIS.map((p) => (
              <article key={p.quem} className="gf-up rounded-2xl bg-[#eef5fd] p-6">
                <span className="text-3xl" aria-hidden>{p.emoji}</span>
                <h3 className="mt-3 text-lg font-bold">{p.quem}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#44607c]">{p.oque}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* comparativo */}
      <section id="planos" className="px-4 py-16 sm:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="gf-serif gf-up text-center text-3xl font-black sm:text-4xl">
            Compare e escolha
          </h2>
          <p className="gf-up mt-2 text-center text-sm text-[#44607c]">
            *Valores ilustrativos de portfólio, promocionais por 12 meses.
          </p>
          <div className="gf-up mt-10 overflow-x-auto rounded-2xl bg-white shadow-[0_20px_50px_-25px_rgba(23,50,78,0.35)]">
            <table className="w-full min-w-[560px] text-sm">
              <thead>
                <tr className="border-b border-[#e3edf8] text-left">
                  <th className="p-5" />
                  <th className="p-5 font-bold">Digital</th>
                  <th className="bg-[#0a5cb8] p-5 text-white">
                    <span className="block text-xs font-semibold uppercase opacity-80">mais escolhido</span>
                    Família
                  </th>
                  <th className="p-5 font-bold">Família + Impresso</th>
                </tr>
              </thead>
              <tbody>
                {COMPARATIVO.map((r) => (
                  <tr key={r.linha} className="border-b border-[#e3edf8] last:border-0">
                    <td className="p-5 font-semibold">{r.linha}</td>
                    <td className="p-5 text-[#44607c]">{r.digital}</td>
                    <td className="bg-[#0a5cb8]/5 p-5 font-bold text-[#0a5cb8]">{r.familia}</td>
                    <td className="p-5 text-[#44607c]">{r.completo}</td>
                  </tr>
                ))}
                <tr>
                  <td className="p-5" />
                  <td className="p-5">
                    <p className="gf-serif text-3xl font-black">R$ 9,90</p>
                    <p className="text-xs text-[#44607c]">/mês*</p>
                  </td>
                  <td className="bg-[#0a5cb8]/5 p-5">
                    <p className="gf-serif text-3xl font-black text-[#0a5cb8]">R$ 19,90</p>
                    <p className="text-xs text-[#44607c]">/mês* · 4 perfis</p>
                  </td>
                  <td className="p-5">
                    <p className="gf-serif text-3xl font-black">R$ 59,90</p>
                    <p className="text-xs text-[#44607c]">/mês* · com entrega</p>
                  </td>
                </tr>
                <tr>
                  <td className="p-5" />
                  {["Assinar", "Assinar Família", "Assinar completo"].map((cta, i) => (
                    <td key={cta} className={`p-5 ${i === 1 ? "bg-[#0a5cb8]/5" : ""}`}>
                      <a
                        href="#faq"
                        className={`block rounded-full py-2.5 text-center text-xs font-bold ${
                          i === 1
                            ? "bg-[#0a5cb8] text-white"
                            : "border border-[#17324e]/30 text-[#17324e] hover:border-[#0a5cb8] hover:text-[#0a5cb8]"
                        }`}
                      >
                        {cta}
                      </a>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* depoimento */}
      <section className="px-4 pb-4 sm:px-8">
        <figure className="gf-up mx-auto max-w-2xl rounded-2xl bg-[#ffd8a8]/40 p-8 text-center">
          <blockquote className="gf-serif text-xl leading-snug font-bold italic sm:text-2xl">
            “Acabou a disputa pelo login. Minha filha lê atualidades pro vestibular
            e eu finalmente abro os alertas sem culpa.”
          </blockquote>
          <figcaption className="mt-4 text-sm font-semibold text-[#44607c]">
            Mariana C. · assinante Família há 2 anos
          </figcaption>
        </figure>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-2xl px-4 py-16 sm:px-8">
        <h2 className="gf-serif gf-up text-3xl font-black">Perguntas de família</h2>
        <div className="mt-8 space-y-3">
          {FAQ.map((f) => (
            <details key={f.q} className="gf-faq gf-up group rounded-xl bg-white p-5 shadow-sm">
              <summary className="flex cursor-pointer items-center justify-between gap-4 text-base font-bold">
                {f.q}
                <span className="gf-plus text-2xl font-light text-[#0a5cb8] transition-transform" aria-hidden>
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-[#44607c]">{f.a}</p>
            </details>
          ))}
        </div>
        <a
          href="#planos"
          className="gf-up mt-10 block rounded-full bg-[#0a5cb8] py-4 text-center text-base font-bold text-white transition-transform hover:scale-[1.02]"
        >
          Assinar o plano Família — R$ 19,90/mês*
        </a>
      </section>

      <footer className="border-t border-[#d5e3f2] px-4 py-6 text-xs text-[#44607c] sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3">
          <span>Página conceitual de portfólio — sem vínculo oficial com O GLOBO / Editora Globo.</span>
          <Link href="/globo/familia/guide" className="underline underline-offset-2 hover:text-[#0a5cb8]">
            Como esta página foi feita →
          </Link>
        </div>
      </footer>
    </div>
  );
}
