"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const LINEUP = [
  { name: "MÁQUINA MORTA", tag: "noise-cumbia · BR" },
  { name: "GLITCHA", tag: "hyperfunk · SP" },
  { name: "AS FERAS DE VIDRO", tag: "post-baile · RJ" },
  { name: "DONA TENSÃO", tag: "industrial forró · PE" },
  { name: "CÓRTEX", tag: "techno rasgado · POA" },
  { name: "VELUDO ÁCIDO", tag: "psicodelia de garagem · MG" },
  { name: "BREU", tag: "drone dançante · BA" },
];

const NOISE_BG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 240 240' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`;

const BARCODE = [3, 1, 4, 1, 5, 2, 6, 1, 3, 2, 7, 1, 2, 4, 1, 6, 2, 3, 1, 5, 2, 1, 4, 3];

function Starburst() {
  const spikes = 16;
  const outer = 60;
  const inner = 44;
  const pts: string[] = [];
  for (let i = 0; i < spikes * 2; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const a = (i / (spikes * 2)) * Math.PI * 2 - Math.PI / 2;
    pts.push(`${60 + r * Math.cos(a)},${60 + r * Math.sin(a)}`);
  }
  return (
    <div className="relative h-36 w-36 sm:h-44 sm:w-44" aria-hidden>
      <svg viewBox="0 0 120 120" className="kn-spin h-full w-full">
        <polygon points={pts.join(" ")} fill="#ff00c8" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center leading-none text-white"
        style={{ fontFamily: "var(--font-kinetic-display)" }}>
        <span className="text-sm">21—23</span>
        <span className="text-sm">NOV 2027</span>
      </div>
    </div>
  );
}

export default function KineticPage() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (reduced) return;

      // hero title layers slam in
      gsap.fromTo(
        ".kn-title-layer",
        { yPercent: 120, rotation: 4 },
        { yPercent: 0, rotation: 0, duration: 0.9, stagger: 0.07, ease: "power4.out", delay: 0.1 }
      );

      // velocity-reactive marquees
      const tweens: gsap.core.Tween[] = [];
      gsap.utils.toArray<HTMLElement>(".kn-marq-inner").forEach((row, i) => {
        const dir = i % 2 === 0 ? -50 : 0;
        const from = i % 2 === 0 ? 0 : -50;
        tweens.push(
          gsap.fromTo(
            row,
            { xPercent: from },
            { xPercent: dir === 0 ? 0 : -50, duration: 24, ease: "none", repeat: -1 }
          )
        );
      });

      let speedTarget = 1;
      const skewSetters = gsap.utils
        .toArray<HTMLElement>(".kn-skewable")
        .map((el) => gsap.quickTo(el, "skewX", { duration: 0.5, ease: "power2.out" }));

      ScrollTrigger.create({
        onUpdate: (self) => {
          const v = self.getVelocity();
          speedTarget = gsap.utils.clamp(1, 9, 1 + Math.abs(v) / 350);
          const skew = gsap.utils.clamp(-10, 10, v / 220);
          skewSetters.forEach((set) => set(skew));
        },
      });

      const tick = () => {
        // decay toward cruise speed, marquees ease toward the target
        speedTarget += (1 - speedTarget) * 0.04;
        tweens.forEach((t) => {
          t.timeScale(t.timeScale() + (speedTarget - t.timeScale()) * 0.1);
        });
      };
      gsap.ticker.add(tick);

      // lineup rows tilt as they pass
      gsap.utils.toArray<HTMLElement>(".kn-act").forEach((el, i) => {
        gsap.fromTo(
          el,
          { rotation: i % 2 ? 2.5 : -2.5, opacity: 0, y: 60 },
          {
            rotation: 0,
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "back.out(1.4)",
            scrollTrigger: { trigger: el, start: "top 90%" },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>(".kn-pop").forEach((el) => {
        gsap.fromTo(
          el,
          { scale: 0.9, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            ease: "back.out(2)",
            scrollTrigger: { trigger: el, start: "top 88%" },
          }
        );
      });

      return () => gsap.ticker.remove(tick);
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      className="min-h-screen overflow-x-hidden bg-[#0a0a0a] text-white selection:bg-[#d8ff00] selection:text-black"
      style={{ fontFamily: "var(--font-kinetic-sans), sans-serif" }}
    >
      <style>{`
        .kn-display { font-family: var(--font-kinetic-display), sans-serif; }
        .kn-noise::after {
          content: ""; position: fixed; inset: 0; z-index: 50; pointer-events: none;
          background-image: ${NOISE_BG}; opacity: 0.07;
        }
        .kn-outline { -webkit-text-stroke: 2px #d8ff00; color: transparent; }
        .kn-outline-pink { -webkit-text-stroke: 2px #ff00c8; color: transparent; }
        .kn-spin { animation: kn-rot 14s linear infinite; }
        @keyframes kn-rot { to { transform: rotate(360deg); } }
        @media (prefers-reduced-motion: reduce) { .kn-spin { animation: none; } }
        .kn-mask { overflow: hidden; }
      `}</style>
      <div className="kn-noise" aria-hidden />

      {/* header */}
      <header className="flex items-center justify-between px-5 py-4 text-sm font-extrabold tracking-tight uppercase sm:px-8">
        <span className="kn-display text-xl tracking-wide text-[#d8ff00]">RUPTURA</span>
        <span className="hidden text-white/60 sm:block">Galpão da Mooca — São Paulo</span>
        <a
          href="#ingressos"
          className="bg-[#ff00c8] px-4 py-2 text-black transition-colors hover:bg-[#d8ff00]"
        >
          Ingressos
        </a>
      </header>

      {/* hero */}
      <section className="relative px-3 pt-10 pb-8 sm:px-6">
        <div className="kn-skewable">
          <div className="kn-mask">
            <h1 className="kn-title-layer kn-display kn-outline text-[19vw] leading-[0.82] uppercase">
              Ruptura
            </h1>
          </div>
          <div className="kn-mask">
            <h1 className="kn-title-layer kn-display text-[19vw] leading-[0.82] text-[#d8ff00] uppercase" aria-hidden>
              Ruptura
            </h1>
          </div>
          <div className="kn-mask">
            <h1 className="kn-title-layer kn-display kn-outline-pink text-[19vw] leading-[0.82] uppercase" aria-hidden>
              Ruptura
            </h1>
          </div>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-6">
          <p className="max-w-xs text-sm leading-snug font-semibold text-white/80">
            Três noites de ruído bonito num galpão que já foi fábrica de
            parafuso. O chão treme, a gente também.
          </p>
          <Starburst />
        </div>
      </section>

      {/* velocity marquees */}
      <section className="border-y-4 border-[#d8ff00] py-2" aria-hidden>
        {["3 NOITES ✺ 42 ARTISTAS ✺ 1 GALPÃO ✺ ", "SCROLL RÁPIDO = TIPO RÁPIDO ✺ TESTA ✺ ", "SEM HEADLINER ✺ TODO MUNDO É ✺ "].map(
          (txt, i) => (
            <div key={i} className="overflow-hidden">
              <div className="kn-marq-inner flex w-max">
                {Array.from({ length: 2 }).map((_, d) => (
                  <span
                    key={d}
                    className={`kn-display text-[9vw] leading-[1.05] whitespace-nowrap uppercase sm:text-[5vw] ${
                      i === 1 ? "text-[#ff00c8]" : i === 2 ? "kn-outline" : "text-[#d8ff00]"
                    }`}
                  >
                    {txt.repeat(3)}
                  </span>
                ))}
              </div>
            </div>
          )
        )}
      </section>

      {/* lineup */}
      <section className="px-3 py-20 sm:px-6">
        <h2 className="kn-display kn-pop mb-10 text-4xl text-[#ff00c8] uppercase sm:text-6xl">
          Line-up<span className="text-[#d8ff00]">*</span>
        </h2>
        <ul className="kn-skewable">
          {LINEUP.map((act) => (
            <li key={act.name} className="kn-act group border-t-2 border-white/20 last:border-b-2">
              <a href="#ingressos" className="flex flex-wrap items-baseline justify-between gap-2 py-4 transition-colors group-hover:bg-[#d8ff00] group-hover:text-black sm:py-5">
                <span className="kn-display px-1 text-[clamp(2.2rem,7vw,5rem)] leading-none uppercase">
                  {act.name}
                </span>
                <span className="px-1 text-xs font-bold tracking-[0.2em] uppercase opacity-60">
                  {act.tag}
                </span>
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-xs font-semibold text-white/50 uppercase">
          *ordem alfabética de propósito. briga de ego é no estacionamento.
        </p>
      </section>

      {/* manifesto strip */}
      <section className="-rotate-2 bg-[#d8ff00] px-6 py-14 text-black">
        <p className="kn-display mx-auto max-w-4xl text-center text-3xl leading-tight uppercase sm:text-5xl">
          Não é festival de marca. É <span className="bg-[#ff00c8] px-2 text-white">barulho</span> com
          alvará.
        </p>
      </section>

      {/* tickets */}
      <section id="ingressos" className="px-3 py-24 sm:px-6">
        <h2 className="kn-display kn-pop mb-14 text-4xl text-[#d8ff00] uppercase sm:text-6xl">
          Ingressos
        </h2>
        <div className="mx-auto grid max-w-5xl gap-10 sm:grid-cols-3">
          {[
            { name: "1 NOITE", price: "R$ 90", rot: "-rotate-3", note: "escolhe a noite, aguenta a fila" },
            { name: "3 NOITES", price: "R$ 210", rot: "rotate-2", note: "o combo do juízo duvidoso", hot: true },
            { name: "PISTA + LAJE", price: "R$ 340", rot: "-rotate-1", note: "vista de cima do caos" },
          ].map((t) => (
            <div key={t.name} className="kn-pop">
            <article
              className={`${t.rot} border-4 border-dashed p-6 transition-transform hover:rotate-0 hover:scale-105 ${
                t.hot ? "border-[#ff00c8] bg-[#ff00c8]/10" : "border-white/50"
              }`}
            >
              <p className="kn-display text-3xl uppercase">{t.name}</p>
              <p className="kn-display mt-2 text-5xl text-[#d8ff00]">{t.price}</p>
              <p className="mt-3 text-xs font-semibold tracking-wide text-white/60 uppercase">{t.note}</p>
              <div className="mt-6 flex h-10 items-end gap-[2px]" aria-hidden>
                {BARCODE.map((wd, i) => (
                  <span key={i} className="inline-block bg-white" style={{ width: wd, height: `${60 + ((i * 13) % 40)}%` }} />
                ))}
              </div>
              <button className="kn-display mt-6 w-full bg-white py-3 text-xl text-black uppercase transition-colors hover:bg-[#d8ff00]">
                Comprar
              </button>
            </article>
            </div>
          ))}
        </div>
      </section>

      {/* footer */}
      <footer className="border-t-4 border-[#ff00c8]">
        <div className="overflow-hidden py-6" aria-hidden>
          <div className="kn-marq-inner flex w-max">
            {Array.from({ length: 2 }).map((_, d) => (
              <span key={d} className="kn-display text-[7vw] leading-none whitespace-nowrap text-white/20 uppercase">
                RUPTURA 2027 ✺ GALPÃO DA MOOCA ✺ SÃO PAULO ✺ RUPTURA 2027 ✺ GALPÃO DA MOOCA ✺ SÃO PAULO ✺{" "}
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-5 text-xs font-bold tracking-widest text-white/50 uppercase sm:px-8">
          <span>Festival fictício — o barulho é real</span>
          <Link href="/kinetic/guide" className="underline underline-offset-4 hover:text-[#d8ff00]">
            Como esta página foi feita →
          </Link>
        </div>
      </footer>
    </div>
  );
}
