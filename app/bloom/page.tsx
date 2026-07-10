"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// iridescent blobs drifting on lissajous paths, rendered tiny and upscaled
function MeshGradient({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const W = 160;
    const H = 100;
    canvas.width = W;
    canvas.height = H;

    const blobs = [
      { c: [244, 114, 182], r: 62, ax: 0.9, ay: 0.55, fx: 0.11, fy: 0.17, px: 0 },
      { c: [129, 140, 248], r: 70, ax: 0.8, ay: 0.6, fx: 0.13, fy: 0.09, px: 2.1 },
      { c: [110, 231, 183], r: 55, ax: 0.85, ay: 0.5, fx: 0.07, fy: 0.15, px: 4.2 },
      { c: [252, 211, 77], r: 48, ax: 0.7, ay: 0.65, fx: 0.15, fy: 0.11, px: 1.3 },
      { c: [167, 139, 250], r: 58, ax: 0.75, ay: 0.55, fx: 0.09, fy: 0.13, px: 5.0 },
    ];

    let raf = 0;
    let running = true;
    let t = Math.random() * 100;

    const paint = () => {
      ctx.fillStyle = "#fdf6f9";
      ctx.fillRect(0, 0, W, H);
      for (const b of blobs) {
        const x = W / 2 + Math.sin(t * b.fx + b.px) * b.ax * (W / 2);
        const y = H / 2 + Math.cos(t * b.fy + b.px * 1.7) * b.ay * (H / 2);
        const g = ctx.createRadialGradient(x, y, 0, x, y, b.r);
        g.addColorStop(0, `rgba(${b.c[0]}, ${b.c[1]}, ${b.c[2]}, 0.55)`);
        g.addColorStop(1, `rgba(${b.c[0]}, ${b.c[1]}, ${b.c[2]}, 0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, b.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const frame = () => {
      if (!running) return;
      t += 0.016;
      paint();
      raf = requestAnimationFrame(frame);
    };

    if (reduced) {
      paint();
    } else {
      raf = requestAnimationFrame(frame);
    }

    const onVis = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running && !reduced) {
        running = true;
        raf = requestAnimationFrame(frame);
      }
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`h-full w-full ${className ?? ""}`}
      style={{ filter: "blur(24px) saturate(1.15)", transform: "scale(1.15)" }}
      aria-hidden
    />
  );
}

// the product is pure CSS: a frosted vessel over the gradient
function Bottle() {
  return (
    <div className="bl-bottle relative mx-auto w-40 sm:w-48" aria-hidden>
      {/* cap */}
      <div className="mx-auto h-10 w-16 rounded-t-xl bg-white/50 shadow-inner backdrop-blur-md" />
      <div className="mx-auto h-2 w-24 rounded-sm bg-white/60 backdrop-blur-md" />
      {/* body */}
      <div className="relative h-64 overflow-hidden rounded-[2rem] border border-white/60 bg-white/25 shadow-[0_24px_60px_-20px_rgba(180,140,200,0.45)] backdrop-blur-xl sm:h-72">
        {/* inner liquid shimmer */}
        <div className="absolute inset-x-4 bottom-4 top-24 rounded-[1.4rem] bg-gradient-to-b from-white/10 to-white/40" />
        {/* specular streak */}
        <div className="absolute top-6 bottom-6 left-5 w-3 rounded-full bg-white/50 blur-[2px]" />
        {/* label */}
        <div className="absolute inset-x-6 top-8 rounded-xl bg-white/55 px-4 py-5 text-center backdrop-blur-sm">
          <p className="text-lg font-medium tracking-[0.25em] text-[#5b4a63] uppercase">bloom</p>
          <p className="bl-serif mt-1 text-sm italic text-[#8a7391]">barrier serum № 02</p>
          <p className="mt-3 text-[9px] tracking-[0.2em] text-[#8a7391] uppercase">30 ml · ph 5.5</p>
        </div>
      </div>
    </div>
  );
}

const INGREDIENTS = [
  "ceramide NP", "squalane", "panthenol B5", "ectoin", "oat beta-glucan",
  "madecassoside", "glycerin", "allantoin", "niacinamide 2%", "trehalose",
];

const BENTO = [
  {
    span: "sm:col-span-3 sm:row-span-2",
    title: "The barrier comes first.",
    body: "Your skin already knows how to be skin. Ninety percent of \"sensitive\" is a barrier asking for backup — lipids in the right ratio, water held where it works, and nothing shouting.",
    accent: true,
  },
  {
    span: "sm:col-span-2",
    title: "pH 5.5, always",
    body: "Every formula sits where your acid mantle lives. No exceptions, no exfoliant roulette.",
    ticker: true,
  },
  {
    span: "sm:col-span-2",
    title: "Texture: weather, not weight",
    body: "A serum should feel like humidity remembered fondly. If you can feel it at noon, we reformulate.",
  },
  {
    span: "sm:col-span-2",
    title: "Refill, don't rebuy",
    body: "The vessel is glass and stays on your shelf. The refill arrives in paper and disappears.",
  },
  {
    span: "sm:col-span-3",
    title: "Ten ingredients, zero suspense",
    body: "The full formula is on the label, in order, with percentages. Mystery is for perfume.",
  },
];

export default function BloomPage() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (reduced) return;

      gsap.fromTo(
        ".bl-hero-el",
        { opacity: 0, y: 26 },
        { opacity: 1, y: 0, duration: 1.1, stagger: 0.12, ease: "power3.out", delay: 0.15 }
      );

      // bottle floats
      gsap.to(".bl-bottle", {
        y: -14,
        rotation: 1.5,
        duration: 3.2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      gsap.utils.toArray<HTMLElement>(".bl-up").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 85%" },
          }
        );
      });

      // pH ticker
      const ph = { v: 0 };
      gsap.to(ph, {
        v: 5.5,
        duration: 1.4,
        ease: "power2.out",
        scrollTrigger: { trigger: ".bl-ph", start: "top 85%" },
        onUpdate: () => {
          const el = document.querySelector(".bl-ph");
          if (el) el.textContent = ph.v.toFixed(1);
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      className="min-h-screen bg-[#fdf6f9] text-[#3f3547] selection:bg-[#c4b5fd] selection:text-[#3f3547]"
      style={{ fontFamily: "var(--font-bloom-sans), sans-serif" }}
    >
      <style>{`
        .bl-serif { font-family: var(--font-bloom-serif), serif; }
        .bl-marquee { animation: bl-marq 32s linear infinite; }
        @keyframes bl-marq { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @media (prefers-reduced-motion: reduce) { .bl-marquee { animation: none; } }
        .bl-border-spin {
          background: conic-gradient(from var(--bl-angle, 0deg), #f9a8d4, #a5b4fc, #a7f3d0, #fde68a, #c4b5fd, #f9a8d4);
          animation: bl-spin 6s linear infinite;
        }
        @property --bl-angle { syntax: "<angle>"; initial-value: 0deg; inherits: false; }
        @keyframes bl-spin { to { --bl-angle: 360deg; } }
        @media (prefers-reduced-motion: reduce) { .bl-border-spin { animation: none; } }
      `}</style>

      {/* nav */}
      <header className="fixed inset-x-0 top-0 z-30 px-4 pt-4 sm:px-6">
        <div className="mx-auto flex max-w-5xl items-center justify-between rounded-full border border-white/70 bg-white/50 px-6 py-3 shadow-[0_8px_30px_-12px_rgba(180,140,200,0.35)] backdrop-blur-xl">
          <span className="text-lg font-semibold tracking-[0.2em] uppercase">bloom</span>
          <nav className="hidden gap-8 text-sm font-medium text-[#6d5c77] sm:flex">
            <a href="#science" className="transition-colors hover:text-[#3f3547]">Science</a>
            <a href="#ritual" className="transition-colors hover:text-[#3f3547]">Ritual</a>
          </nav>
          <a
            href="#waitlist"
            className="rounded-full bg-[#3f3547] px-5 py-2 text-sm font-medium text-[#fdf6f9] transition-transform hover:scale-105"
          >
            Join waitlist
          </a>
        </div>
      </header>

      {/* hero */}
      <section className="relative flex min-h-[100svh] items-center overflow-hidden">
        <div className="absolute inset-0">
          <MeshGradient />
        </div>
        <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-14 px-6 pt-28 pb-16 sm:grid-cols-2 sm:pt-20">
          <div>
            <p className="bl-hero-el bl-serif text-xl italic text-[#8a7391]">
              barrier-first skincare
            </p>
            <h1 className="bl-hero-el mt-4 text-[clamp(2.6rem,6vw,4.8rem)] leading-[1.04] font-light tracking-tight">
              Skin remembers
              <br />
              <span className="font-medium">gentleness.</span>
            </h1>
            <p className="bl-hero-el mt-6 max-w-md text-lg leading-relaxed text-[#6d5c77]">
              One serum, ten ingredients, and the radical idea that your face
              is not a construction site.
            </p>
            <div className="bl-hero-el mt-10 flex flex-wrap items-center gap-5">
              <a
                href="#waitlist"
                className="rounded-full bg-[#3f3547] px-8 py-4 text-sm font-medium text-[#fdf6f9] shadow-[0_16px_40px_-12px_rgba(63,53,71,0.4)] transition-transform hover:scale-105"
              >
                Join the waitlist
              </a>
              <span className="bl-serif text-base italic text-[#8a7391]">
                № 02 ships this spring
              </span>
            </div>
          </div>
          <div className="bl-hero-el">
            <Bottle />
          </div>
        </div>
      </section>

      {/* ingredient marquee */}
      <div className="overflow-hidden border-y border-[#efdfe9] bg-white/60 py-4 backdrop-blur-sm">
        <div className="bl-marquee flex w-max gap-3">
          {Array.from({ length: 2 }).map((_, dup) => (
            <div key={dup} className="flex gap-3 pr-3" aria-hidden={dup === 1}>
              {INGREDIENTS.map((ing, i) => (
                <span
                  key={ing}
                  className="rounded-full border px-4 py-1.5 text-sm font-medium whitespace-nowrap text-[#5b4a63]"
                  style={{
                    borderColor: ["#f9a8d4", "#a5b4fc", "#a7f3d0", "#fde68a", "#c4b5fd"][i % 5],
                    backgroundColor: ["#fdf2f8", "#eef2ff", "#ecfdf5", "#fefce8", "#f5f3ff"][i % 5],
                  }}
                >
                  {ing}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* bento */}
      <section id="science" className="mx-auto max-w-6xl px-6 py-28">
        <p className="bl-up bl-serif text-xl italic text-[#8a7391]">the argument</p>
        <h2 className="bl-up mt-3 max-w-xl text-4xl leading-tight font-light tracking-tight sm:text-5xl">
          Less, but <span className="font-medium">measured.</span>
        </h2>
        <div className="mt-14 grid gap-4 sm:grid-cols-5" style={{ gridAutoRows: "minmax(11rem, auto)" }}>
          {BENTO.map((b) => (
            <article
              key={b.title}
              className={`bl-up group relative overflow-hidden rounded-3xl ${b.span} ${
                b.accent ? "p-[2px]" : ""
              }`}
            >
              {b.accent && <div className="bl-border-spin absolute inset-0 rounded-3xl" aria-hidden />}
              <div
                className={`relative flex h-full flex-col justify-between rounded-3xl border border-white/80 bg-white/70 p-7 backdrop-blur-md transition-shadow group-hover:shadow-[0_20px_50px_-20px_rgba(180,140,200,0.4)] ${
                  b.accent ? "rounded-[calc(1.5rem-2px)]" : ""
                }`}
              >
                <div>
                  <h3 className="text-xl font-medium">{b.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-[#6d5c77]">{b.body}</p>
                </div>
                {b.ticker && (
                  <p className="mt-4 text-5xl font-light text-[#8a7391]">
                    <span className="bl-ph">0.0</span>
                    <span className="bl-serif text-2xl italic"> ph</span>
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ritual */}
      <section id="ritual" className="border-t border-[#efdfe9] bg-white/40 py-28">
        <div className="mx-auto max-w-5xl px-6">
          <p className="bl-up bl-serif text-xl italic text-[#8a7391]">the ritual</p>
          <h2 className="bl-up mt-3 text-4xl leading-tight font-light tracking-tight sm:text-5xl">
            Three steps. <span className="font-medium">Ninety seconds.</span>
          </h2>
          <ol className="mt-14 grid gap-10 sm:grid-cols-3">
            {[
              { n: "1", c: "#f9a8d4", t: "Cleanse, barely", b: "Lukewarm water and a cleanser that doesn't squeak. Squeaky is a cry for help." },
              { n: "2", c: "#a5b4fc", t: "Two drops of № 02", b: "Pressed in, not rubbed. Your hands are tools, not sandpaper." },
              { n: "3", c: "#a7f3d0", t: "Seal and leave", b: "Moisturizer, SPF in daylight, and then — this is the hard part — stop." },
            ].map((s) => (
              <li key={s.n} className="bl-up">
                <span
                  className="flex h-14 w-14 items-center justify-center rounded-full text-xl font-medium text-[#3f3547]"
                  style={{ backgroundColor: s.c }}
                >
                  {s.n}
                </span>
                <h3 className="mt-5 text-xl font-medium">{s.t}</h3>
                <p className="mt-2 leading-relaxed text-[#6d5c77]">{s.b}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* waitlist */}
      <section id="waitlist" className="relative overflow-hidden py-32">
        <div className="absolute inset-0 opacity-80">
          <MeshGradient />
        </div>
        <div className="relative z-10 mx-auto max-w-xl px-6 text-center">
          <h2 className="bl-up text-4xl leading-tight font-light tracking-tight sm:text-5xl">
            Your barrier called.
            <br />
            <span className="font-medium">It wants backup.</span>
          </h2>
          <form
            className="bl-up mx-auto mt-10 flex max-w-md gap-2 rounded-full border border-white/80 bg-white/60 p-2 shadow-[0_16px_50px_-16px_rgba(180,140,200,0.5)] backdrop-blur-xl"
            onSubmit={(e) => e.preventDefault()}
          >
            <label htmlFor="bl-email" className="sr-only">Email address</label>
            <input
              id="bl-email"
              type="email"
              required
              placeholder="you@softlanding.com"
              className="w-full rounded-full bg-transparent px-5 text-sm outline-none placeholder:text-[#8a7391]"
            />
            <button
              type="submit"
              className="shrink-0 rounded-full bg-[#3f3547] px-6 py-3 text-sm font-medium text-[#fdf6f9] transition-transform hover:scale-105"
            >
              Join
            </button>
          </form>
          <p className="bl-up bl-serif mt-6 text-base italic text-[#6d5c77]">
            no launches, no drops, no drama — one email when it exists
          </p>
        </div>
      </section>

      <footer className="border-t border-[#efdfe9] px-6 py-6">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 text-sm text-[#8a7391]">
          <span>© 2026 bloom — a fictional brand</span>
          <Link href="/bloom/guide" className="underline underline-offset-4 hover:text-[#3f3547]">
            How this page was built →
          </Link>
        </div>
      </footer>
    </div>
  );
}
