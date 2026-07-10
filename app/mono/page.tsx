"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

const WORK = [
  { name: "KAPSEL", year: "2026", field: "Type system · packaging", seed: "mono-kapsel" },
  { name: "RUÍDO FM", year: "2025", field: "Broadcast identity", seed: "mono-ruido" },
  { name: "BETONWERK", year: "2025", field: "Wayfinding · signage", seed: "mono-beton" },
  { name: "ELBOW", year: "2024", field: "Editorial direction", seed: "mono-elbow" },
  { name: "TANTO", year: "2024", field: "Naming · verbal identity", seed: "mono-tanto" },
];

const SERVICES = [
  { n: "A", name: "IDENTITY", body: "Wordmarks that survive a fax machine. Systems that survive a rebrand committee." },
  { n: "B", name: "TYPE", body: "Custom cuts, licensed pairings, variable axes tuned like instruments." },
  { n: "C", name: "EDITORIAL", body: "Grids with opinions. Margins that mean something. No decorative pull quotes." },
  { n: "D", name: "MOTION", body: "Type that moves because it has somewhere to be, not because it can." },
];

const MANIFESTO =
  "Design is not decoration. A letterform is a machine for being read, and most brands whisper because they are afraid of their own voice. We remove the fear, the gradients, and the fourth typeface. What survives is the message, set very large, in black, and it turns out that was the brand all along.";

export default function MonoPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const previewImgRef = useRef<HTMLImageElement>(null);
  const [time, setTime] = useState("--:--:--");

  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString("en-GB"));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let ctx: gsap.Context | undefined;
    let cancelled = false;

    document.fonts.ready.then(() => {
      if (cancelled) return;
      ctx = gsap.context(() => {
        // hero: chars slam in from below, slight rotation, heavy stagger
        const heroSplit = new SplitText(".mn-hero-line", { type: "chars" });
        if (reduced) {
          gsap.set(heroSplit.chars, { opacity: 1 });
        } else {
          gsap.from(heroSplit.chars, {
            yPercent: 108,
            rotation: 6,
            duration: 0.7,
            ease: "power4.out",
            stagger: { each: 0.018, from: "start" },
            delay: 0.1,
          });
        }

        // manifesto: word-by-word ink-in, scrubbed
        const maniSplit = new SplitText(".mn-manifesto", { type: "words" });
        gsap.fromTo(
          maniSplit.words,
          { color: "#d4d4d4" },
          {
            color: "#0a0a0a",
            stagger: 0.06,
            ease: "none",
            scrollTrigger: {
              trigger: ".mn-manifesto",
              start: "top 78%",
              end: "bottom 45%",
              scrub: reduced ? false : 0.4,
            },
          }
        );

        if (!reduced) {
          // work rows wipe in
          gsap.utils.toArray<HTMLElement>(".mn-row").forEach((row, i) => {
            gsap.from(row, {
              xPercent: i % 2 ? 3 : -3,
              opacity: 0,
              duration: 0.7,
              ease: "power3.out",
              scrollTrigger: { trigger: row, start: "top 90%" },
            });
          });

          // section labels
          gsap.utils.toArray<HTMLElement>(".mn-label").forEach((el) => {
            const split = new SplitText(el, { type: "chars" });
            gsap.from(split.chars, {
              opacity: 0,
              duration: 0.02,
              stagger: 0.04,
              ease: "none",
              scrollTrigger: { trigger: el, start: "top 88%" },
            });
          });
        }
      }, rootRef);
    });

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  useEffect(() => {
    const preview = previewRef.current;
    if (!preview) return;
    const xTo = gsap.quickTo(preview, "x", { duration: 0.35, ease: "power3.out" });
    const yTo = gsap.quickTo(preview, "y", { duration: 0.35, ease: "power3.out" });
    const move = (e: MouseEvent) => {
      xTo(e.clientX + 24);
      yTo(e.clientY - 120);
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const showPreview = (seed: string) => {
    const img = previewImgRef.current;
    const box = previewRef.current;
    if (!img || !box) return;
    img.src = `https://picsum.photos/seed/${seed}/480/320?grayscale`;
    gsap.to(box, { opacity: 1, scale: 1, duration: 0.25, ease: "power2.out" });
  };
  const hidePreview = () => {
    if (!previewRef.current) return;
    gsap.to(previewRef.current, { opacity: 0, scale: 0.92, duration: 0.2, ease: "power2.in" });
  };

  return (
    <div
      ref={rootRef}
      className="min-h-screen bg-white text-[#0a0a0a] selection:bg-[#ff2b00] selection:text-white"
      style={{ fontFamily: "var(--font-mono-archivo), sans-serif" }}
    >
      <style>{`
        .mn-outline { -webkit-text-stroke: 2px #0a0a0a; color: transparent; }
        .mn-marquee { animation: mn-marq 14s linear infinite; }
        @keyframes mn-marq { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @media (prefers-reduced-motion: reduce) { .mn-marquee { animation: none; } }
        .mn-hero-line { overflow: hidden; }
      `}</style>

      {/* header */}
      <header className="flex items-stretch justify-between border-b-4 border-[#0a0a0a] text-xs font-bold tracking-wider uppercase">
        <span className="border-r-4 border-[#0a0a0a] px-4 py-3 text-base font-black">MONO®</span>
        <span className="hidden flex-1 items-center border-r-4 border-[#0a0a0a] px-4 sm:flex">
          Studio for type-first brands
        </span>
        <span className="hidden items-center border-r-4 border-[#0a0a0a] px-4 tabular-nums md:flex">
          ZRH / SP — {time}
        </span>
        <a
          href="#work"
          className="flex items-center bg-[#0a0a0a] px-6 text-white transition-colors hover:bg-[#ff2b00]"
        >
          Work ↓
        </a>
      </header>

      {/* hero */}
      <section className="border-b-4 border-[#0a0a0a] px-3 pt-10 pb-6 sm:px-5" aria-label="We make brands shout">
        <h1 className="text-[15.5vw] leading-[0.83] font-black tracking-[-0.03em] uppercase">
          <span className="mn-hero-line block">We make</span>
          <span className="mn-hero-line block">
            brands <span className="text-[#ff2b00]">—</span>
          </span>
          <span className="mn-hero-line mn-outline block">shout.</span>
        </h1>
        <div className="mt-8 flex flex-wrap items-end justify-between gap-4 text-xs font-bold tracking-wider uppercase">
          <p className="max-w-56">Black. White. One scream of red. Nothing else survives the brief.</p>
          <p aria-hidden className="text-right">
            ↓ 001 — scroll like you mean it
          </p>
        </div>
      </section>

      {/* manifesto */}
      <section className="border-b-4 border-[#0a0a0a] px-3 py-20 sm:px-5 sm:py-28">
        <p className="mn-label mb-8 text-xs font-black tracking-[0.3em] uppercase">
          [ 01 — Manifesto ]
        </p>
        <p className="mn-manifesto max-w-5xl text-[clamp(1.5rem,3.6vw,3rem)] leading-[1.15] font-bold tracking-tight">
          {MANIFESTO}
        </p>
      </section>

      {/* work */}
      <section id="work" className="border-b-4 border-[#0a0a0a]">
        <p className="mn-label px-3 pt-16 pb-8 text-xs font-black tracking-[0.3em] uppercase sm:px-5">
          [ 02 — Selected work ]
        </p>
        <ul>
          {WORK.map((w) => (
            <li key={w.name} className="mn-row group border-t-2 border-[#0a0a0a]">
              <a
                href="#contact"
                className="grid grid-cols-[1fr_auto] items-baseline gap-2 px-3 py-6 transition-colors group-hover:bg-[#0a0a0a] group-hover:text-white sm:grid-cols-[minmax(0,1fr)_auto_auto] sm:gap-10 sm:px-5"
                onMouseEnter={() => showPreview(w.seed)}
                onMouseLeave={hidePreview}
              >
                <span className="truncate text-[clamp(2rem,6vw,4.5rem)] leading-none font-black tracking-tight uppercase">
                  {w.name}
                </span>
                <span className="hidden text-sm font-bold uppercase sm:block">{w.field}</span>
                <span className="text-sm font-black tabular-nums">{w.year}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* services */}
      <section className="border-b-4 border-[#0a0a0a]">
        <p className="mn-label px-3 pt-16 pb-8 text-xs font-black tracking-[0.3em] uppercase sm:px-5">
          [ 03 — Services ]
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s, i) => (
            <article
              key={s.n}
              className={`group border-t-2 border-[#0a0a0a] p-5 pb-16 transition-colors hover:bg-[#ff2b00] hover:text-white sm:pb-24 ${
                i > 0 ? "sm:border-l-2" : ""
              }`}
            >
              <p className="text-xs font-black">{s.n}/</p>
              <h3 className="mt-10 text-3xl font-black uppercase">{s.name}</h3>
              <p className="mt-4 text-sm leading-snug font-medium">{s.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* footer marquee */}
      <footer id="contact">
        <a href="mailto:shout@mono.example" className="block overflow-hidden bg-[#0a0a0a] py-6 text-white transition-colors hover:bg-[#ff2b00]" aria-label="Email the studio: shout@mono.example">
          <div className="mn-marquee flex w-max whitespace-nowrap">
            {Array.from({ length: 2 }).map((_, i) => (
              <span key={i} aria-hidden className="text-[9vw] leading-none font-black tracking-tight uppercase">
                Let&apos;s work — shout@mono.example — Let&apos;s work — shout@mono.example —{" "}
              </span>
            ))}
          </div>
        </a>
        <div className="flex flex-wrap items-center justify-between gap-3 px-3 py-4 text-[11px] font-bold tracking-wider uppercase sm:px-5">
          <span>© 2026 MONO® — A fictional studio. All caps reserved.</span>
          <Link href="/mono/guide" className="underline underline-offset-4 hover:text-[#ff2b00]">
            How this page was built →
          </Link>
        </div>
      </footer>

      {/* cursor-following work preview */}
      <div
        ref={previewRef}
        className="pointer-events-none fixed top-0 left-0 z-30 hidden opacity-0 lg:block"
        style={{ scale: 0.92 }}
        aria-hidden
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={previewImgRef}
          alt=""
          width={240}
          height={160}
          className="h-40 w-60 border-4 border-[#0a0a0a] object-cover"
        />
      </div>
    </div>
  );
}
