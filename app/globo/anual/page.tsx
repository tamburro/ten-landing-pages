"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const MENSAL = 29.9;
const ANUAL_MES = 17.9;

export default function GloboAnualPage() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (reduced) return;

      gsap.fromTo(
        ".gn-40",
        { scale: 0.6, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.9, ease: "back.out(1.6)", delay: 0.15 }
      );
      gsap.fromTo(
        ".gn-hero-el",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power2.out", delay: 0.4 }
      );

      const eco = { v: 0 };
      gsap.to(eco, {
        v: (MENSAL - ANUAL_MES) * 12,
        duration: 1.6,
        ease: "power2.out",
        scrollTrigger: { trigger: ".gn-eco", start: "top 85%" },
        onUpdate: () => {
          const el = document.querySelector(".gn-eco-num");
          if (el)
            el.textContent = eco.v.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            });
        },
      });

      gsap.utils.toArray<HTMLElement>(".gn-up").forEach((el) => {
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
      className="min-h-screen bg-[#0b0b0c] text-white selection:bg-[#ffd43b] selection:text-black"
      style={{ fontFamily: "var(--font-globo-sans), sans-serif" }}
    >
      <style>{`.gn-serif { font-family: var(--font-globo-serif), serif; }`}</style>

      <header className="flex items-center justify-between px-4 py-5 sm:px-8">
        <span className="gn-serif text-2xl font-black">O GLOBO</span>
        <span className="rounded-full border border-[#ffd43b] px-4 py-1.5 text-xs font-extrabold tracking-widest text-[#ffd43b] uppercase">
          Oferta anual
        </span>
      </header>

      {/* hero */}
      <section className="mx-auto max-w-4xl px-4 pt-10 pb-20 text-center sm:px-8">
        <p className="gn-hero-el text-sm font-bold tracking-[0.25em] text-[#8b93a1] uppercase">
          Assinatura digital anual
        </p>
        <p className="gn-40 gn-serif mt-2 text-[clamp(7rem,28vw,17rem)] leading-none font-black text-[#ffd43b]">
          40<span className="text-[0.45em] align-top">%</span>
        </p>
        <h1 className="gn-hero-el gn-serif -mt-2 text-3xl font-black sm:text-5xl">
          off no ano inteiro.
        </h1>
        <p className="gn-hero-el mx-auto mt-5 max-w-md text-lg text-[#c3c9d3]">
          De <span className="line-through">R$ {MENSAL.toFixed(2).replace(".", ",")}</span> por{" "}
          <strong className="text-white">R$ {ANUAL_MES.toFixed(2).replace(".", ",")}/mês*</strong>{" "}
          no plano anual. Uma decisão, 365 dias resolvidos.
        </p>
        <a
          href="#comparar"
          className="gn-hero-el mt-9 inline-block rounded-md bg-[#ffd43b] px-10 py-4 text-base font-extrabold text-black transition-transform hover:scale-[1.03]"
        >
          Assinar o ano — R$ 214,80*
        </a>
        <p className="gn-hero-el mt-3 text-xs text-[#8b93a1]">
          *Valores ilustrativos de portfólio. 12x sem juros no cartão.
        </p>
      </section>

      {/* economia */}
      <section className="gn-eco border-y border-[#22242a] bg-[#101114] px-4 py-16 text-center sm:px-8">
        <p className="gn-up text-sm font-bold tracking-[0.25em] text-[#8b93a1] uppercase">
          Sua economia no ano
        </p>
        <p className="gn-up gn-serif mt-3 text-6xl font-black text-[#4d9fff] sm:text-7xl">
          R$ <span className="gn-eco-num tabular-nums">0,00</span>
        </p>
        <p className="gn-up mt-3 text-sm text-[#c3c9d3]">
          — o suficiente para o café que acompanha o jornal por dois meses.
        </p>
      </section>

      {/* comparação */}
      <section id="comparar" className="mx-auto max-w-3xl px-4 py-16 sm:px-8">
        <h2 className="gn-serif gn-up text-center text-3xl font-black sm:text-4xl">
          Mensal ou anual?
        </h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <article className="gn-up rounded-xl border border-[#22242a] p-8">
            <h3 className="text-lg font-bold text-[#8b93a1]">Mensal</h3>
            <p className="gn-serif mt-3 text-4xl font-black text-[#c3c9d3]">
              R$ {MENSAL.toFixed(2).replace(".", ",")}
              <span className="text-base font-normal">/mês</span>
            </p>
            <ul className="mt-5 space-y-2 text-sm text-[#8b93a1]">
              <li>✓ Digital completo</li>
              <li>✓ Sem compromisso</li>
              <li>· Preço cheio, sempre</li>
            </ul>
          </article>
          <article className="gn-up relative rounded-xl border-2 border-[#ffd43b] bg-[#15130a] p-8">
            <span className="absolute -top-3 left-6 bg-[#ffd43b] px-3 py-0.5 text-[11px] font-extrabold tracking-widest text-black uppercase">
              melhor por mês
            </span>
            <h3 className="text-lg font-bold text-[#ffd43b]">Anual</h3>
            <p className="gn-serif mt-3 text-4xl font-black">
              R$ {ANUAL_MES.toFixed(2).replace(".", ",")}
              <span className="text-base font-normal text-[#c3c9d3]">/mês*</span>
            </p>
            <ul className="mt-5 space-y-2 text-sm text-[#c3c9d3]">
              <li>✓ Digital completo</li>
              <li>✓ 40% off garantido por 12 meses</li>
              <li>✓ Preço congelado o ano todo</li>
            </ul>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="mt-7 block rounded-md bg-[#ffd43b] py-3.5 text-center text-sm font-extrabold text-black transition-transform hover:scale-[1.02]"
            >
              Fechar o ano agora
            </a>
          </article>
        </div>
        <p className="gn-up mt-8 text-center text-sm text-[#8b93a1]">
          🛡 Arrependeu em 7 dias? Devolvemos tudo. Depois disso, reembolso proporcional.
        </p>
      </section>

      <footer className="border-t border-[#22242a] px-4 py-6 text-xs text-[#8b93a1] sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3">
          <span>Página conceitual de portfólio — sem vínculo oficial com O GLOBO / Editora Globo.</span>
          <Link href="/globo/anual/guide" className="underline underline-offset-2 hover:text-[#ffd43b]">
            Como esta página foi feita →
          </Link>
        </div>
      </footer>
    </div>
  );
}
