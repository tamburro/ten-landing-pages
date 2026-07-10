"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const BOOT_LINES: { text: string; cls: string; delay: number }[] = [
  { text: "$ wire tail --all --env prod", cls: "wr-cmd", delay: 0 },
  { text: "wire v3.2.0 — attaching to 47 services…", cls: "wr-dim", delay: 400 },
  { text: "[api-gw]     200 GET /v2/orders 12ms", cls: "wr-ok", delay: 160 },
  { text: "[checkout]   200 POST /pay 84ms", cls: "wr-ok", delay: 90 },
  { text: "[search]     WARN cache miss ratio 0.42 climbing", cls: "wr-warn", delay: 140 },
  { text: "[billing]    200 POST /invoice 31ms", cls: "wr-ok", delay: 80 },
  { text: "[worker-7]   ERROR job stalled: refund_batch_2231", cls: "wr-err", delay: 200 },
  { text: "[worker-7]   └─ trace: wire trace refund_batch_2231", cls: "wr-dim", delay: 120 },
  { text: "[api-gw]     200 GET /v2/orders 9ms", cls: "wr-ok", delay: 70 },
  { text: "47 services · 12,409 lines/s · 1 anomaly flagged", cls: "wr-sum", delay: 300 },
];

const ASCII_LOGO = String.raw`██     ██ ██ ██████  ███████
██     ██ ██ ██   ██ ██
██  █  ██ ██ ██████  █████
██ ███ ██ ██ ██   ██ ██
 ███ ███  ██ ██   ██ ███████`;

function useTypedBoot(enabled: boolean) {
  const [lines, setLines] = useState<number>(0);
  const [typed, setTyped] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!enabled) {
      setLines(BOOT_LINES.length);
      setTyped(BOOT_LINES[0].text);
      setDone(true);
      return;
    }
    let cancelled = false;
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    // type the command char by char, then stream the log lines
    const cmd = BOOT_LINES[0].text;
    let i = 0;
    const typeChar = () => {
      if (cancelled) return;
      i++;
      setTyped(cmd.slice(0, i));
      if (i < cmd.length) {
        timeouts.push(setTimeout(typeChar, 28 + Math.random() * 46));
      } else {
        setLines(1);
        let li = 1;
        const nextLine = () => {
          if (cancelled) return;
          li++;
          setLines(li);
          if (li < BOOT_LINES.length) {
            timeouts.push(setTimeout(nextLine, BOOT_LINES[li].delay));
          } else {
            setDone(true);
          }
        };
        timeouts.push(setTimeout(nextLine, 500));
      }
    };
    timeouts.push(setTimeout(typeChar, 600));

    return () => {
      cancelled = true;
      timeouts.forEach(clearTimeout);
    };
  }, [enabled]);

  return { lines, typed, done };
}

// decode effect: scrambles then resolves, vanilla rAF (adapted from Magic UI hyper-text)
function Scramble({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const CHARS = "▓▒░<>/\\|=+*#@$%&01";
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const dur = 900;
        const step = (now: number) => {
          const p = Math.min((now - start) / dur, 1);
          const solved = Math.floor(p * text.length);
          el.textContent =
            text.slice(0, solved) +
            text
              .slice(solved)
              .split("")
              .map((c) => (c === " " ? " " : CHARS[(Math.random() * CHARS.length) | 0]))
              .join("");
          if (p < 1) raf = requestAnimationFrame(step);
          else el.textContent = text;
        };
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [text]);

  return (
    <h2 ref={ref} className={className} aria-label={text}>
      {text}
    </h2>
  );
}

// green phosphor flickering grid (adapted from Magic UI flickering-grid)
function PhosphorGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const SQ = 3;
    const GAP = 9;
    let cols = 0, rows = 0;
    let cells: Float32Array = new Float32Array(0);

    const setup = () => {
      const parent = canvas.parentElement!;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
      cols = Math.ceil(canvas.width / (SQ + GAP));
      rows = Math.ceil(canvas.height / (SQ + GAP));
      cells = new Float32Array(cols * rows);
      for (let i = 0; i < cells.length; i++) cells[i] = Math.random() * 0.28;
    };
    setup();

    let raf = 0;
    let running = true;
    let last = 0;
    const frame = (now: number) => {
      if (!running) return;
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;
      for (let i = 0; i < cells.length; i++) {
        if (Math.random() < 0.22 * dt * 60 * 0.016) cells[i] = Math.random() * 0.28;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          ctx.fillStyle = `rgba(51, 255, 102, ${cells[i * rows + j]})`;
          ctx.fillRect(i * (SQ + GAP), j * (SQ + GAP), SQ, SQ);
        }
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !running) {
        running = true;
        last = performance.now();
        raf = requestAnimationFrame(frame);
      } else if (!e.isIntersecting) {
        running = false;
        cancelAnimationFrame(raf);
      }
    });
    io.observe(canvas);

    const ro = new ResizeObserver(setup);
    ro.observe(canvas.parentElement!);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0" aria-hidden />;
}

const COMMANDS = [
  {
    cmd: "wire tail",
    desc: "One stream for every service. Grep across your whole stack like it's a single file.",
    example: "$ wire tail --grep 'status>=500' --since 5m",
  },
  {
    cmd: "wire trace",
    desc: "Follow one request through every hop it touched. The waterfall renders in your terminal.",
    example: "$ wire trace req_8fk2 --waterfall",
  },
  {
    cmd: "wire diff",
    desc: "Compare the log signature of two deploys. Know what changed before your users do.",
    example: "$ wire diff deploy/1041 deploy/1042",
  },
];

export default function WirePage() {
  const [booted, setBooted] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    setBooted(true);
  }, []);

  const { lines, typed, done } = useTypedBoot(booted && !reduced);

  const copyInstall = () => {
    navigator.clipboard?.writeText("curl -fsSL https://wire.example/install.sh | sh");
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div
      className="wr-screen relative min-h-screen overflow-x-hidden bg-[#020503] text-[#33ff66] selection:bg-[#33ff66] selection:text-[#020503]"
      style={{ fontFamily: "var(--font-wire-mono), monospace" }}
    >
      <style>{`
        .wr-display { font-family: var(--font-wire-display), monospace; }
        .wr-glow { text-shadow: 0 0 6px rgba(51,255,102,0.6), 0 0 24px rgba(51,255,102,0.25); }
        .wr-dim { color: #2a7a44; }
        .wr-ok { color: #33ff66; }
        .wr-warn { color: #ffb000; }
        .wr-err { color: #ff5544; }
        .wr-sum { color: #a7ffbf; }
        .wr-cmd { color: #e8ffe8; }
        .wr-cursor { animation: wr-blink 1.06s steps(1) infinite; }
        @keyframes wr-blink { 50% { opacity: 0; } }
        /* scanlines + slow phosphor breathing */
        .wr-scan::before {
          content: ""; position: fixed; inset: 0; z-index: 40; pointer-events: none;
          background: repeating-linear-gradient(to bottom, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 2px, rgba(0,0,0,0.22) 3px);
        }
        .wr-scan::after {
          content: ""; position: fixed; inset: 0; z-index: 41; pointer-events: none;
          background: radial-gradient(ellipse at center, rgba(0,0,0,0) 55%, rgba(0,0,0,0.5) 100%);
          animation: wr-breathe 5s ease-in-out infinite;
        }
        @keyframes wr-breathe { 0%,100% { opacity: 0.9; } 50% { opacity: 1; } }
        @media (prefers-reduced-motion: reduce) {
          .wr-cursor { animation: none; }
          .wr-scan::after { animation: none; }
        }
        .wr-box { border: 1px solid #0d331a; background: rgba(3, 12, 6, 0.85); }
      `}</style>
      <div className="wr-scan" aria-hidden />

      {/* header */}
      <header className="relative z-10 flex items-center justify-between border-b border-[#0d331a] px-4 py-3 text-sm sm:px-8">
        <span className="wr-glow font-bold">wire_</span>
        <nav className="hidden gap-6 text-[#2a7a44] sm:flex">
          <a href="#commands" className="hover:text-[#33ff66]">/commands</a>
          <a href="#status" className="hover:text-[#33ff66]">/status</a>
          <a href="#install" className="hover:text-[#33ff66]">/install</a>
        </nav>
        <span className="wr-dim hidden text-xs sm:block">tty1 · 80×24 · 9600 baud</span>
      </header>

      {/* boot hero */}
      <section className="relative z-10 mx-auto max-w-4xl px-4 pt-14 pb-20 sm:px-8" ref={heroRef}>
        <div className="wr-box rounded-md p-4 text-[13px] leading-relaxed sm:p-6 sm:text-sm">
          <div className="mb-4 flex gap-2" aria-hidden>
            <span className="h-3 w-3 rounded-full border border-[#0d331a]" />
            <span className="h-3 w-3 rounded-full border border-[#0d331a]" />
            <span className="h-3 w-3 rounded-full border border-[#0d331a]" />
          </div>
          <p className="wr-cmd">
            {typed}
            {!done && <span className="wr-cursor">█</span>}
          </p>
          {BOOT_LINES.slice(1, Math.max(lines, 1)).map((l) => (
            <p key={l.text} className={l.cls}>{l.text}</p>
          ))}
          {done && (
            <p className="wr-cmd mt-2">
              $ <span className="wr-cursor">█</span>
            </p>
          )}
        </div>

        <pre
          className="wr-glow mt-14 text-[clamp(8px,2.4vw,20px)] leading-[1.05] font-bold whitespace-pre"
          aria-label="WIRE"
        >
          {ASCII_LOGO}
        </pre>
        <h1 className="wr-display wr-glow mt-6 text-4xl leading-none sm:text-6xl">
          tail your whole stack.
        </h1>
        <p className="wr-dim mt-5 max-w-xl text-base leading-relaxed">
          Every log, every service, one terminal. wire streams 12,000 lines a
          second into a single greppable feed — and flags the line you were
          about to miss.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="#install"
            className="border border-[#33ff66] px-6 py-3 text-sm font-bold transition-colors hover:bg-[#33ff66] hover:text-[#020503]"
          >
            [ install ]
          </a>
          <a
            href="#commands"
            className="border border-[#0d331a] px-6 py-3 text-sm text-[#2a7a44] transition-colors hover:border-[#33ff66] hover:text-[#33ff66]"
          >
            [ man wire ]
          </a>
        </div>
      </section>

      {/* commands */}
      <section id="commands" className="relative z-10 border-t border-[#0d331a] px-4 py-20 sm:px-8">
        <div className="mx-auto max-w-4xl">
          <Scramble
            text="THREE COMMANDS. THAT'S THE MANUAL."
            className="wr-display wr-glow text-3xl sm:text-5xl"
          />
          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {COMMANDS.map((c) => (
              <article key={c.cmd} className="wr-box group rounded-md p-6 transition-colors hover:border-[#33ff66]/60">
                <h3 className="wr-display text-2xl text-[#a7ffbf]">{c.cmd}</h3>
                <p className="wr-dim mt-3 text-sm leading-relaxed">{c.desc}</p>
                <p className="mt-5 border-t border-[#0d331a] pt-4 text-xs text-[#e8ffe8]/80">
                  {c.example}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* status wall */}
      <section id="status" className="relative z-10 border-t border-[#0d331a]">
        <div className="relative overflow-hidden">
          <PhosphorGrid />
          <div className="relative mx-auto grid max-w-4xl gap-10 px-4 py-24 sm:grid-cols-3 sm:px-8">
            {[
              { v: "12,409", l: "lines/second, sustained" },
              { v: "38ms", l: "grep across 47 services" },
              { v: "0", l: "dashboards required" },
            ].map((s) => (
              <div key={s.l} className="wr-box rounded-md p-6 text-center backdrop-blur-[2px]">
                <p className="wr-display wr-glow text-5xl">{s.v}</p>
                <p className="wr-dim mt-2 text-xs tracking-widest uppercase">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* install */}
      <section id="install" className="relative z-10 border-t border-[#0d331a] px-4 py-24 sm:px-8">
        <div className="mx-auto max-w-4xl">
          <Scramble text="INSTALL IN ONE LINE" className="wr-display wr-glow text-3xl sm:text-5xl" />
          <div className="wr-box mt-10 flex flex-wrap items-center justify-between gap-4 rounded-md p-5">
            <code className="text-sm text-[#e8ffe8] sm:text-base">
              <span className="wr-dim">$ </span>curl -fsSL https://wire.example/install.sh | sh
            </code>
            <button
              onClick={copyInstall}
              className="border border-[#33ff66] px-4 py-2 text-xs font-bold transition-colors hover:bg-[#33ff66] hover:text-[#020503]"
            >
              {copied ? "[ copied ✓ ]" : "[ copy ]"}
            </button>
          </div>
          <p className="wr-dim mt-4 text-xs">
            macOS, Linux, and that one Raspberry Pi in the office closet. 4.1 MB, no runtime.
          </p>
        </div>
      </section>

      <footer className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-t border-[#0d331a] px-4 py-5 text-xs text-[#2a7a44] sm:px-8">
        <span>wire — a fictional tool · no telemetry, obviously</span>
        <Link href="/wire/guide" className="underline underline-offset-4 hover:text-[#33ff66]">
          How this page was built →
        </Link>
      </footer>
    </div>
  );
}
