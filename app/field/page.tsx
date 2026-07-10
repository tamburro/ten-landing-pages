"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";

// deterministic PRNG — the artwork IS the seed
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function makeNoise(rand: () => number) {
  const SIZE = 64;
  const grid = new Float32Array(SIZE * SIZE);
  for (let i = 0; i < grid.length; i++) grid[i] = rand();
  const at = (x: number, y: number) =>
    grid[((y & (SIZE - 1)) * SIZE + (x & (SIZE - 1))) | 0];
  const smooth = (t: number) => t * t * (3 - 2 * t);
  const noise2 = (x: number, y: number) => {
    const xi = Math.floor(x);
    const yi = Math.floor(y);
    const xf = smooth(x - xi);
    const yf = smooth(y - yi);
    return (
      at(xi, yi) * (1 - xf) * (1 - yf) +
      at(xi + 1, yi) * xf * (1 - yf) +
      at(xi, yi + 1) * (1 - xf) * yf +
      at(xi + 1, yi + 1) * xf * yf
    );
  };
  return (x: number, y: number) => {
    let v = 0;
    let amp = 0.5;
    let f = 1;
    for (let o = 0; o < 4; o++) {
      v += amp * noise2(x * f, y * f);
      f *= 2.1;
      amp *= 0.5;
    }
    return v;
  };
}

type FlowOptions = {
  seed: number;
  steps: number; // total simulation frames
  animate: boolean;
  scale?: number; // noise scale
  redRatio?: number;
};

function drawFlowField(
  canvas: HTMLCanvasElement,
  { seed, steps, animate, scale = 2.2, redRatio = 0.07 }: FlowOptions,
  onDone?: () => void
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return () => {};
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  ctx.scale(dpr, dpr);

  const rand = mulberry32(seed);
  const fbm = makeNoise(rand);

  ctx.fillStyle = "#f7f7f4";
  ctx.fillRect(0, 0, w, h);

  const N = 900;
  const px = new Float32Array(N);
  const py = new Float32Array(N);
  const life = new Float32Array(N);
  const red: boolean[] = [];
  for (let i = 0; i < N; i++) {
    px[i] = rand() * w;
    py[i] = rand() * h;
    life[i] = 150 + rand() * 450;
    red.push(rand() < redRatio);
  }

  const speed = 1.45;
  let frame = 0;
  let raf = 0;
  let cancelled = false;

  const step = () => {
    // batch all segments into two paths (carbon / red) — one stroke() each
    ctx.beginPath();
    const redSeg: number[] = [];
    for (let i = 0; i < N; i++) {
      const nx = (px[i] / w) * scale;
      const ny = (py[i] / h) * scale;
      const a = fbm(nx, ny) * Math.PI * 4;
      const x2 = px[i] + Math.cos(a) * speed;
      const y2 = py[i] + Math.sin(a) * speed;
      if (red[i]) {
        redSeg.push(px[i], py[i], x2, y2);
      } else {
        ctx.moveTo(px[i], py[i]);
        ctx.lineTo(x2, y2);
      }
      px[i] = x2;
      py[i] = y2;
      life[i] -= 1;
      if (life[i] <= 0 || x2 < -4 || x2 > w + 4 || y2 < -4 || y2 > h + 4) {
        px[i] = rand() * w;
        py[i] = rand() * h;
        life[i] = 150 + rand() * 450;
      }
    }
    ctx.strokeStyle = "rgba(17, 17, 17, 0.075)";
    ctx.lineWidth = 0.8;
    ctx.stroke();
    if (redSeg.length) {
      ctx.beginPath();
      for (let s = 0; s < redSeg.length; s += 4) {
        ctx.moveTo(redSeg[s], redSeg[s + 1]);
        ctx.lineTo(redSeg[s + 2], redSeg[s + 3]);
      }
      ctx.strokeStyle = "rgba(227, 6, 19, 0.14)";
      ctx.lineWidth = 1.1;
      ctx.stroke();
    }
    frame++;
  };

  if (!animate) {
    for (let f = 0; f < steps; f++) step();
    onDone?.();
    return () => {};
  }

  const loop = () => {
    if (cancelled) return;
    // several sim-steps per frame so the drawing grows at a satisfying rate
    for (let k = 0; k < 5 && frame < steps; k++) step();
    if (frame < steps) {
      raf = requestAnimationFrame(loop);
    } else {
      onDone?.();
    }
  };
  raf = requestAnimationFrame(loop);

  return () => {
    cancelled = true;
    cancelAnimationFrame(raf);
  };
}

function HeroField({ seed, onDone }: { seed: number; onDone: () => void }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    return drawFlowField(
      canvas,
      { seed, steps: reduced ? 1400 : 2400, animate: !reduced },
      onDone
    );
  }, [seed, onDone]);

  return <canvas ref={ref} className="h-full w-full" aria-label={`Generative flow field, edition ${seed}`} role="img" />;
}

function GalleryPiece({ seed, scale, redRatio }: { seed: number; scale: number; redRatio: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || drawn) return;
    let cleanup: (() => void) | undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        cleanup = drawFlowField(
          canvas,
          { seed, steps: reduced ? 700 : 1000, animate: !reduced, scale, redRatio },
          () => setDrawn(true)
        );
      },
      { threshold: 0.2 }
    );
    io.observe(canvas);
    return () => {
      io.disconnect();
      cleanup?.();
    };
  }, [seed, scale, redRatio, drawn]);

  return (
    <canvas
      ref={ref}
      className="aspect-[4/5] w-full"
      aria-label={`Generative flow field, edition ${seed}`}
      role="img"
    />
  );
}

const GALLERY = [
  { seed: 19, scale: 1.4, redRatio: 0.05 },
  { seed: 407, scale: 3.4, redRatio: 0.0 },
  { seed: 88, scale: 2.2, redRatio: 0.12 },
  { seed: 1963, scale: 5.0, redRatio: 0.04 },
  { seed: 240, scale: 1.0, redRatio: 0.0 },
  { seed: 777, scale: 2.8, redRatio: 0.2 },
];

export default function FieldPage() {
  const [seed, setSeed] = useState(101);
  const [fixing, setFixing] = useState(true);

  const regenerate = useCallback(() => {
    setFixing(true);
    setSeed(Math.floor(Math.random() * 9999) + 1);
  }, []);
  const onHeroDone = useCallback(() => setFixing(false), []);

  return (
    <div
      className="min-h-screen bg-[#f7f7f4] text-[#111111] selection:bg-[#e30613] selection:text-white"
      style={{ fontFamily: "var(--font-field-sans), sans-serif" }}
    >
      <style>{`.fd-mono { font-family: var(--font-field-mono), monospace; }`}</style>

      {/* Swiss top bar */}
      <header className="grid grid-cols-4 gap-4 border-b border-[#111] px-4 py-3 text-[11px] font-medium tracking-wide uppercase sm:grid-cols-12 sm:px-6">
        <span className="col-span-2 text-sm font-bold tracking-tight normal-case sm:col-span-3">
          Field<span className="text-[#e30613]">.</span>
        </span>
        <span className="hidden sm:col-span-3 sm:block">Generative studio</span>
        <span className="hidden sm:col-span-3 sm:block">Est. seed 0001</span>
        <nav className="col-span-2 flex justify-end gap-5 sm:col-span-3">
          <a href="#index" className="hover:text-[#e30613]">Index</a>
          <a href="#process" className="hover:text-[#e30613]">Process</a>
        </nav>
      </header>

      {/* hero */}
      <section className="relative border-b border-[#111]">
        <div className="h-[72svh] sm:h-[80svh]">
          <HeroField seed={seed} onDone={onHeroDone} />
        </div>
        <div className="pointer-events-none absolute inset-0 grid grid-cols-4 gap-4 p-4 sm:grid-cols-12 sm:p-6">
          <div className="col-span-4 self-end sm:col-span-7">
            <h1 className="text-[clamp(2.8rem,8vw,7rem)] leading-[0.95] font-bold tracking-tighter">
              Wind,
              <br />
              notated<span className="text-[#e30613]">.</span>
            </h1>
          </div>
          <div className="fd-mono col-span-4 flex items-end justify-between gap-4 text-[11px] sm:col-span-5 sm:justify-end sm:gap-8">
            <p className="pointer-events-auto">
              edition № {String(seed).padStart(4, "0")}
              <br />
              <span className="opacity-60">{fixing ? "drawing…" : "fixed. 900 particles at rest"}</span>
            </p>
            <button
              onClick={regenerate}
              className="pointer-events-auto border border-[#111] bg-[#f7f7f4]/80 px-4 py-2 uppercase backdrop-blur-sm transition-colors hover:bg-[#e30613] hover:text-white hover:border-[#e30613]"
            >
              regenerate ↻
            </button>
          </div>
        </div>
      </section>

      {/* statement */}
      <section className="grid grid-cols-4 gap-4 border-b border-[#111] px-4 py-16 sm:grid-cols-12 sm:px-6 sm:py-24">
        <p className="fd-mono col-span-1 text-[11px] text-[#e30613] sm:col-span-2">01 — statement</p>
        <div className="col-span-3 sm:col-span-7">
          <p className="text-2xl leading-snug font-medium tracking-tight sm:text-4xl">
            Every artwork on this page is a number. Feed the number back in and
            the wind blows exactly the same way twice — which real wind never
            managed.
          </p>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-[#111]/70">
            A seeded PRNG builds a noise field; nine hundred particles ride
            it, each leaving a hairline of ink; the drawing
            fixes itself when the particles run out of life. No two seeds
            agree, and none of them can disagree with themselves.
          </p>
        </div>
      </section>

      {/* gallery */}
      <section id="index" className="border-b border-[#111] px-4 py-16 sm:px-6 sm:py-24">
        <div className="mb-10 grid grid-cols-4 gap-4 sm:grid-cols-12">
          <p className="fd-mono col-span-1 text-[11px] text-[#e30613] sm:col-span-2">02 — index</p>
          <h2 className="col-span-3 text-2xl font-bold tracking-tight sm:col-span-6 sm:text-3xl">
            Six editions, fixed
          </h2>
        </div>
        <div className="grid gap-x-4 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {GALLERY.map((g) => (
            <figure key={g.seed} className="group">
              <div className="overflow-hidden border border-[#111]">
                <GalleryPiece {...g} />
              </div>
              <figcaption className="fd-mono mt-3 flex justify-between text-[11px]">
                <span>№ {String(g.seed).padStart(4, "0")}</span>
                <span className="opacity-60">
                  scale {g.scale.toFixed(1)} · red {(g.redRatio * 100).toFixed(0)}%
                </span>
                <span className="text-[#e30613] opacity-0 transition-opacity group-hover:opacity-100">
                  print available
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* process */}
      <section id="process" className="grid grid-cols-4 gap-4 border-b border-[#111] px-4 py-16 sm:grid-cols-12 sm:px-6 sm:py-24">
        <p className="fd-mono col-span-1 text-[11px] text-[#e30613] sm:col-span-2">03 — process</p>
        <div className="col-span-3 grid gap-10 sm:col-span-9 sm:grid-cols-3">
          {[
            { n: "1", t: "Field", b: "A 64×64 lattice of seeded random values, smoothed into four octaves of noise. This is the wind map — the whole artwork is already in it, unread." },
            { n: "2", t: "Advection", b: "Particles sample the field and turn: angle = noise × 4π. Speed is constant; only direction argues. Seven percent of them carry red ink, the rest carbon." },
            { n: "3", t: "Fixing", b: "Each particle has a lifespan. When the last one dies, the drawing stops changing — we call it fixed, like a photograph, and number it with its seed." },
          ].map((s) => (
            <div key={s.n}>
              <p className="text-5xl font-bold tracking-tighter text-[#e30613]">{s.n}</p>
              <h3 className="mt-3 text-lg font-bold">{s.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#111]/70">{s.b}</p>
            </div>
          ))}
        </div>
      </section>

      {/* footer */}
      <footer className="grid grid-cols-4 gap-4 px-4 py-8 text-[11px] sm:grid-cols-12 sm:px-6">
        <span className="fd-mono col-span-2 uppercase opacity-60 sm:col-span-4">
          Field — a fictional studio
        </span>
        <span className="fd-mono hidden uppercase opacity-60 sm:col-span-4 sm:block">
          All artworks reproducible from their number
        </span>
        <span className="col-span-2 text-right sm:col-span-4">
          <Link href="/field/guide" className="fd-mono uppercase underline underline-offset-4 hover:text-[#e30613]">
            How this page was built →
          </Link>
        </span>
      </footer>
    </div>
  );
}
