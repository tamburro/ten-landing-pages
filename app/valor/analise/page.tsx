"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ValorAnalisePage() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (reduced) return;
      gsap.fromTo(
        ".va-hero-el",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power2.out", delay: 0.15 }
      );
      gsap.utils.toArray<HTMLElement>(".va-nota").forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, x: 18 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            delay: i * 0.05,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 82%" },
          }
        );
      });
      gsap.utils.toArray<HTMLElement>(".va-up").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 24 },
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
      className="min-h-screen bg-[#fbf6f0] text-[#2a2620] selection:bg-[#0e2b4c] selection:text-white"
      style={{ fontFamily: "var(--font-valor-sans), sans-serif" }}
    >
      <style>{`
        .va-serif { font-family: var(--font-valor-serif), serif; }
        .va-artigo p { margin-top: 1.1rem; }
        .va-grifo { background: linear-gradient(transparent 55%, rgba(232,89,12,0.28) 55%); }
      `}</style>

      <header className="mx-auto flex max-w-4xl items-center justify-between px-4 py-5 sm:px-8">
        <span className="va-serif text-2xl font-bold text-[#0e2b4c]">
          Valor <span className="font-normal italic">Econômico</span>
        </span>
        <a href="#paywall" className="rounded bg-[#0e2b4c] px-5 py-2.5 text-sm font-bold text-white transition-transform hover:scale-105">
          Assinar
        </a>
      </header>

      {/* manchete do ensaio */}
      <section className="mx-auto max-w-3xl px-4 pt-12 pb-8 sm:px-8">
        <p className="va-hero-el text-xs font-bold tracking-[0.3em] text-[#b8552a] uppercase">
          análise · demonstração de leitura
        </p>
        <h1 className="va-serif va-hero-el mt-4 text-3xl leading-[1.15] font-bold text-[#0e2b4c] sm:text-5xl">
          O real está caro ou o dólar está nervoso? A pergunta errada custa uma
          safra.
        </h1>
        <p className="va-hero-el mt-4 text-sm text-[#7d7264]">
          Ensaio fictício de demonstração · 14 min de leitura · para assinantes
        </p>
      </section>

      {/* artigo com margem de notas */}
      <section className="mx-auto grid max-w-4xl gap-10 px-4 pb-4 sm:grid-cols-[1fr_220px] sm:px-8">
        <article className="va-artigo va-serif text-lg leading-[1.8] text-[#3d362d]">
          <p>
            <span className="va-grifo">Todo mundo tem uma opinião sobre o câmbio; pouca gente
            tem uma tese.</span> A diferença entre as duas é o que separa o
            hedge barato do prejuízo elegante — e ela raramente aparece no
            preço da tela, que é onde todo mundo olha.
          </p>
          <p>
            Comece pelo que o número não diz. O dólar a cinco e vinte não é
            “alto” nem “baixo”: é a soma de três apostas — juro americano,
            risco doméstico e fluxo de commodities — que quase nunca puxam na
            mesma direção. Quando duas delas se alinham, o movimento parece
            tendência. Quando se desalinham, os analistas chamam de ruído. O
            mercado cobra caro de quem confunde os dois.
          </p>
          <p>
            A safra entra nessa conversa por uma porta discreta: o produtor que
            fixa preço olhando a cotação de hoje está, sem saber, vendendo a
            volatilidade dos próximos seis meses por zero. Foi assim em 2020,
            quando o hedge que ninguém quis fazer em março teria pago o ano
            inteiro em setembro.
          </p>
          <p>
            É aqui que a pergunta do título se decide — e é exatamente aqui
            que a maioria das análises gratuitas para. As três variáveis que
            respondem, com os dados desta semana, são…
          </p>
        </article>
        <aside className="hidden space-y-6 border-l border-[#e0d4c3] pl-5 pt-2 text-[13px] leading-snug text-[#7d7264] sm:block" aria-label="Notas de margem">
          <p className="va-nota">
            <strong className="text-[#b8552a]">nota do editor —</strong> tese ≠ palpite: tese tem
            condição de invalidação.
          </p>
          <p className="va-nota">
            <strong className="text-[#b8552a]">dado citado —</strong> série cambial completa no
            Valor Data, com as três decomposições.
          </p>
          <p className="va-nota">
            <strong className="text-[#b8552a]">contexto —</strong> a matéria de 2020 sobre o hedge
            da safra está no acervo, linkada aqui para assinantes.
          </p>
        </aside>
      </section>

      {/* paywall */}
      <section id="paywall" className="relative mx-auto max-w-4xl px-4 sm:px-8">
        <div
          className="pointer-events-none absolute -top-40 inset-x-0 h-40 bg-gradient-to-b from-transparent to-[#fbf6f0]"
          aria-hidden
        />
        <div className="va-up rounded-2xl border-2 border-[#0e2b4c] bg-[#f9e7dc] p-8 text-center sm:p-10">
          <p className="text-xs font-bold tracking-[0.25em] text-[#b8552a] uppercase">
            você chegou no melhor parágrafo
          </p>
          <h2 className="va-serif mt-3 text-2xl leading-snug font-bold text-[#0e2b4c] sm:text-3xl">
            A resposta — e as outras 40 análises desta semana — são para
            assinantes.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-[#6d5142]">
            Isso que você acabou de sentir é o produto: a diferença entre saber
            do assunto e ter uma tese sobre ele.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="rounded bg-[#0e2b4c] px-8 py-4 text-sm font-bold text-white transition-transform hover:scale-[1.03]"
            >
              Assinar digital — R$ 34,90/mês*
            </a>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="rounded border-2 border-[#0e2b4c] px-8 py-4 text-sm font-bold text-[#0e2b4c] transition-colors hover:bg-[#0e2b4c] hover:text-white"
            >
              Com impresso — R$ 89,90/mês*
            </a>
          </div>
          <p className="mt-4 text-[11px] text-[#6d5142]/80">
            *Valores ilustrativos de portfólio. 7 dias grátis, cancele quando quiser.
          </p>
        </div>
      </section>

      {/* o que vem junto */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-8">
        <div className="grid gap-6 sm:grid-cols-3">
          {[
            { n: "40+", d: "análises assinadas por semana, deste calibre" },
            { n: "100%", d: "com dado citado linkado no Valor Data" },
            { n: "0", d: "textos pagos por quem aparece neles" },
          ].map((s) => (
            <div key={s.d} className="va-up text-center">
              <p className="va-serif text-5xl font-bold text-[#b8552a]">{s.n}</p>
              <p className="mt-2 text-sm text-[#6d5142]">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-[#e0d4c3] px-4 py-6 text-xs text-[#7d7264] sm:px-8">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-3">
          <span>Página conceitual de portfólio — ensaio fictício, sem vínculo oficial com o Valor Econômico / Globo.</span>
          <Link href="/valor/analise/guide" className="underline underline-offset-2 hover:text-[#b8552a]">
            Como esta página foi feita →
          </Link>
        </div>
      </footer>
    </div>
  );
}
