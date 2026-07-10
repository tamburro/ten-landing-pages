"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const MAX_DEPTH = 10911;

function zoneAt(depth: number) {
  if (depth < 200) return "SUNLIGHT";
  if (depth < 1000) return "TWILIGHT";
  if (depth < 4000) return "MIDNIGHT";
  if (depth < 6000) return "ABYSS";
  return "HADAL";
}

function MarineSnow({ depthRef }: { depthRef: React.MutableRefObject<number> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    // pre-rendered glow sprite: cheaper and more capture-friendly than shadowBlur
    const sprite = document.createElement("canvas");
    sprite.width = sprite.height = 32;
    const sctx = sprite.getContext("2d")!;
    const grad = sctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, "rgba(165, 243, 252, 1)");
    grad.addColorStop(0.35, "rgba(103, 232, 249, 0.55)");
    grad.addColorStop(1, "rgba(103, 232, 249, 0)");
    sctx.fillStyle = grad;
    sctx.fillRect(0, 0, 32, 32);

    type Flake = {
      x: number; y: number; r: number; vy: number; sway: number; phase: number; glow: boolean; pulse: number;
    };
    const flakes: Flake[] = Array.from({ length: 150 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 0.6 + Math.random() * 1.8,
      vy: 0.15 + Math.random() * 0.45,
      sway: 0.2 + Math.random() * 0.5,
      phase: Math.random() * Math.PI * 2,
      glow: Math.random() < 0.18,
      pulse: Math.random() * Math.PI * 2,
    }));

    let raf = 0;
    let running = true;
    let t = 0;

    const frame = () => {
      if (!running) return;
      t += 0.016;
      const p = depthRef.current;
      ctx.clearRect(0, 0, w, h);
      // snow density ramps up as you sink; bioluminescence only in the dark
      const density = Math.min(1, 0.15 + p * 1.4);
      const bio = gsap.utils.clamp(0, 1, (p - 0.42) * 3);
      for (const f of flakes) {
        f.y += f.vy * (0.4 + p * 1.2);
        f.x += Math.sin(t * f.sway + f.phase) * 0.3;
        if (f.y > h + 4) { f.y = -4; f.x = Math.random() * w; }
        if (f.glow && bio > 0) {
          const pulse = 0.5 + 0.5 * Math.sin(t * 1.4 + f.pulse);
          const size = f.r * 6 * (0.6 + 0.4 * pulse);
          ctx.globalAlpha = bio * pulse;
          ctx.drawImage(sprite, f.x - size / 2, f.y - size / 2, size, size);
          ctx.globalAlpha = 1;
        } else {
          ctx.beginPath();
          ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(226, 240, 248, ${0.35 * density})`;
          ctx.fill();
        }
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    const onVis = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        raf = requestAnimationFrame(frame);
      }
    };
    document.addEventListener("visibilitychange", onVis);

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("resize", onResize);
    };
  }, [depthRef]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[1]"
      aria-hidden
    />
  );
}

const TWILIGHT_FACTS = [
  {
    depth: "200 m",
    text: "Last usable sunlight. Photosynthesis gives up here; everything below either hunts, scavenges, or glows.",
  },
  {
    depth: "650 m",
    text: "The largest animal migration on Earth happens nightly through this band — a billion tonnes of life commuting to dinner.",
  },
  {
    depth: "1,000 m",
    text: "Light is now a rumor. Ninety percent of the creatures here manufacture their own.",
  },
];

export default function DriftPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const depthRef = useRef(0);
  const depthNumRef = useRef<HTMLSpanElement>(null);
  const zoneRef = useRef<HTMLSpanElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const raysRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const root = rootRef.current!;

      // master dive profile: color is depth
      const stops: [number, string, string][] = [
        [0.0, "#cfe9f4", "#0a3345"],
        [0.12, "#9fd0e6", "#0a3345"],
        [0.24, "#4a94bd", "#eaf6fc"],
        [0.4, "#155a86", "#dceef8"],
        [0.58, "#0a3355", "#cfe3f2"],
        [0.74, "#041c33", "#b9d4e8"],
        [0.88, "#020f1e", "#a9c6dc"],
        [1.0, "#01060d", "#9fbcd2"],
      ];
      // depth anchors: the gauge tracks the depths the copy actually names
      let anchors: { y: number; d: number }[] = [];
      const computeAnchors = () => {
        anchors = gsap.utils
          .toArray<HTMLElement>("[data-depth]")
          .map((el) => ({
            y: el.getBoundingClientRect().top + window.scrollY + el.offsetHeight / 2,
            d: parseFloat(el.dataset.depth!),
          }))
          .sort((a, b) => a.y - b.y);
      };
      const depthAt = (center: number) => {
        if (!anchors.length) return 0;
        if (center <= anchors[0].y) return anchors[0].d;
        for (let i = 1; i < anchors.length; i++) {
          if (center <= anchors[i].y) {
            const t =
              (center - anchors[i - 1].y) / (anchors[i].y - anchors[i - 1].y);
            return anchors[i - 1].d + t * (anchors[i].d - anchors[i - 1].d);
          }
        }
        return anchors[anchors.length - 1].d;
      };

      const bgTl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.3,
          onRefresh: computeAnchors,
          onUpdate: (self) => {
            depthRef.current = self.progress;
            const meters = Math.round(
              depthAt(window.scrollY + window.innerHeight / 2)
            );
            if (depthNumRef.current) {
              depthNumRef.current.textContent = meters.toLocaleString("en-US");
            }
            if (zoneRef.current) zoneRef.current.textContent = zoneAt(meters);
            if (thumbRef.current) {
              thumbRef.current.style.top = `${(meters / MAX_DEPTH) * 100}%`;
            }
            if (raysRef.current) {
              raysRef.current.style.opacity = String(
                Math.max(0, 1 - self.progress * 4.5)
              );
            }
          },
        },
      });
      for (let i = 1; i < stops.length; i++) {
        bgTl.to(root, {
          backgroundColor: stops[i][1],
          "--ink": stops[i][2],
          duration: stops[i][0] - stops[i - 1][0],
          ease: "none",
        } as gsap.TweenVars, i === 1 ? 0 : ">");
      }

      if (!reduced) {
        // zone headers surface gently
        gsap.utils.toArray<HTMLElement>(".dr-rise").forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 0, y: 48 },
            {
              opacity: 1,
              y: 0,
              duration: 1.1,
              ease: "power2.out",
              scrollTrigger: { trigger: el, start: "top 82%" },
            }
          );
        });
      }

      // twilight: pinned fact sequence
      const facts = gsap.utils.toArray<HTMLElement>(".dr-fact");
      const factTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".dr-twilight",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.4,
        },
      });
      facts.forEach((f, i) => {
        if (i > 0) factTl.fromTo(f, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.6 });
        else factTl.set(f, { opacity: 1 });
        factTl.to({}, { duration: 0.9 });
        if (i < facts.length - 1) factTl.to(f, { opacity: 0, y: -40, duration: 0.6 });
      });

      // submersible crossing
      gsap.fromTo(
        ".dr-sub",
        { xPercent: -120 },
        {
          xPercent: 120,
          ease: "none",
          scrollTrigger: {
            trigger: ".dr-sub-track",
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
          },
        }
      );

      // bioluminescent words flicker on
      gsap.utils.toArray<HTMLElement>(".dr-glow-word").forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0.15, textShadow: "0 0 0px rgba(103,232,249,0)" },
          {
            opacity: 1,
            textShadow: "0 0 24px rgba(103,232,249,0.55)",
            duration: 0.5,
            delay: i * 0.12,
            ease: "power2.inOut",
            scrollTrigger: { trigger: el, start: "top 75%" },
          }
        );
      });

      // abyss pressure counter
      const pressure = { v: 1 };
      gsap.to(pressure, {
        v: 1086,
        ease: "none",
        scrollTrigger: {
          trigger: ".dr-pressure",
          start: "top 85%",
          end: "top 30%",
          scrub: 0.4,
        },
        onUpdate: () => {
          const el = document.querySelector(".dr-pressure-num");
          if (el) el.textContent = Math.round(pressure.v).toLocaleString("en-US");
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      className="dr-root relative"
      style={{
        backgroundColor: "#cfe9f4",
        color: "var(--ink)",
        // @ts-expect-error CSS var
        "--ink": "#0a3345",
        fontFamily: "var(--font-drift-display), serif",
      }}
    >
      <style>{`
        .dr-mono { font-family: var(--font-drift-mono), monospace; }
        .dr-rays span {
          position: absolute; top: -10%; width: 18vw; height: 90vh;
          background: linear-gradient(to bottom, rgba(255,255,255,0.5), rgba(255,255,255,0));
          filter: blur(18px); transform-origin: top center;
        }
      `}</style>

      <MarineSnow depthRef={depthRef} />

      {/* surface light rays */}
      <div ref={raysRef} className="dr-rays pointer-events-none fixed inset-0 z-[1]" aria-hidden>
        <span style={{ left: "8%", transform: "rotate(9deg)" }} />
        <span style={{ left: "34%", transform: "rotate(-4deg)", opacity: 0.7 }} />
        <span style={{ left: "58%", transform: "rotate(6deg)", opacity: 0.5 }} />
        <span style={{ left: "80%", transform: "rotate(-8deg)", opacity: 0.65 }} />
      </div>

      {/* fixed chrome */}
      <header className="dr-mono fixed inset-x-0 top-0 z-20 flex items-center justify-between px-5 py-4 text-xs tracking-[0.2em] uppercase sm:px-8">
        <span className="font-medium">DRIFT</span>
        <span className="hidden opacity-70 sm:block">Expedition 07 — the water column</span>
        <a href="#join" className="underline underline-offset-4 opacity-80 hover:opacity-100">
          Join
        </a>
      </header>

      {/* depth gauge */}
      <aside
        className="dr-mono fixed top-1/2 right-5 z-20 hidden -translate-y-1/2 flex-col items-end gap-3 text-right sm:flex"
        aria-hidden
      >
        <div className="text-[11px] tracking-[0.2em] uppercase opacity-70">
          <span ref={zoneRef}>SUNLIGHT</span> zone
        </div>
        <div className="text-2xl tabular-nums">
          −<span ref={depthNumRef}>0</span> m
        </div>
        <div className="relative h-[38vh] w-px bg-current opacity-40">
          <div
            ref={thumbRef}
            className="absolute -left-[3px] h-[7px] w-[7px] rounded-full bg-current"
            style={{ top: "0%" }}
          />
        </div>
        <div className="text-[10px] opacity-50">−10,911 m</div>
      </aside>

      <main className="relative z-10">
        {/* surface */}
        <section data-depth="0" className="flex min-h-[100svh] flex-col justify-center px-5 sm:px-8">
          <p className="dr-mono mb-6 text-xs tracking-[0.3em] uppercase opacity-70">
            0 m — sea level · 14:02 local · swell 1.2 m
          </p>
          <h1 className="max-w-3xl text-[clamp(2.6rem,7vw,5.8rem)] leading-[1.02] font-light">
            The ocean is a{" "}
            <em className="font-normal">vertical country.</em>
          </h1>
          <p className="mt-8 max-w-md text-lg leading-relaxed opacity-80">
            Scroll to dive. Every pixel of color below this line is a depth we
            have to earn back in decompression.
          </p>
          <p className="dr-mono mt-14 animate-bounce text-xs tracking-[0.3em] uppercase opacity-60">
            ↓ begin descent
          </p>
        </section>

        {/* sunlight zone outro */}
        <section data-depth="40" className="flex min-h-[80vh] items-center px-5 sm:px-8">
          <div className="dr-rise mx-auto max-w-2xl text-center">
            <p className="dr-mono mb-4 text-xs tracking-[0.3em] uppercase opacity-70">
              −40 m · sunlight zone
            </p>
            <p className="text-2xl leading-snug font-light sm:text-3xl">
              Red light is already gone. Cut yourself down here and you bleed{" "}
              <em>green</em>.
            </p>
          </div>
        </section>

        {/* twilight pinned facts */}
        <section data-depth="650" className="dr-twilight relative h-[320vh]">
          <div className="sticky top-0 flex h-screen items-center px-5 sm:px-8">
            <div className="relative mx-auto h-48 w-full max-w-2xl">
              {TWILIGHT_FACTS.map((f) => (
                <div key={f.depth} className="dr-fact absolute inset-0 opacity-0">
                  <p className="dr-mono mb-4 text-xs tracking-[0.3em] uppercase opacity-70">
                    −{f.depth} · twilight zone
                  </p>
                  <p className="text-2xl leading-snug font-light sm:text-3xl">{f.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* submersible crossing */}
        <section data-depth="1600" className="dr-sub-track relative flex h-[140vh] items-center overflow-hidden">
          <div className="dr-sub w-full" aria-hidden>
            <svg viewBox="0 0 520 200" className="mx-auto w-[min(80vw,540px)]" fill="none">
              {/* light cone */}
              <path d="M 372 96 L 520 40 L 520 160 Z" fill="url(#dr-beam)" />
              <defs>
                <linearGradient id="dr-beam" x1="372" y1="100" x2="520" y2="100" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#fdf6c9" stopOpacity="0.5" />
                  <stop offset="1" stopColor="#fdf6c9" stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* hull */}
              <ellipse cx="240" cy="100" rx="140" ry="52" fill="#e8b64c" />
              <ellipse cx="240" cy="100" rx="140" ry="52" fill="url(#dr-shade)" />
              <defs>
                <linearGradient id="dr-shade" x1="240" y1="48" x2="240" y2="152" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#ffffff" stopOpacity="0.25" />
                  <stop offset="1" stopColor="#4a3208" stopOpacity="0.45" />
                </linearGradient>
              </defs>
              {/* viewport */}
              <circle cx="330" cy="92" r="22" fill="#0b2233" stroke="#c99a2e" strokeWidth="6" />
              <circle cx="324" cy="86" r="6" fill="#9fd0e6" opacity="0.7" />
              {/* sail + prop */}
              <rect x="196" y="34" width="52" height="30" rx="10" fill="#c99a2e" />
              <rect x="88" y="88" width="18" height="24" rx="6" fill="#c99a2e" />
              <path d="M 88 78 Q 66 100 88 122 L 96 112 Q 84 100 96 88 Z" fill="#8a6a1d" />
              {/* rivets */}
              {[150, 190, 230, 270].map((x) => (
                <circle key={x} cx={x} cy="132" r="3" fill="#8a6a1d" />
              ))}
            </svg>
          </div>
          <p className="dr-mono absolute bottom-[18%] left-1/2 w-full max-w-md -translate-x-1/2 px-5 text-center text-xs leading-relaxed tracking-[0.15em] uppercase opacity-60">
            DSV-2 “Lanternfish” — crew of 3, titanium sphere, 96 hours of oxygen and one cassette of Bowie
          </p>
        </section>

        {/* midnight zone */}
        <section data-depth="2400" className="flex min-h-[110vh] items-center px-5 sm:px-8">
          <div className="dr-rise mx-auto max-w-3xl text-center">
            <p className="dr-mono mb-6 text-xs tracking-[0.3em] uppercase opacity-70">
              −2,400 m · midnight zone
            </p>
            <h2 className="text-[clamp(2rem,5.5vw,4.2rem)] leading-[1.08] font-light">
              Down here, light is not weather —{" "}
              {"it is language.".split(" ").map((w) => (
                <em key={w} className="dr-glow-word font-normal text-[#a5f3fc]">
                  {w}{" "}
                </em>
              ))}
            </h2>
            <p className="mx-auto mt-8 max-w-lg text-lg leading-relaxed opacity-75">
              Courtship, ambush, alarm — all of it spelled in cold photons.
              The glowing specks around you now are saying something.
            </p>
          </div>
        </section>

        {/* abyss pressure */}
        <section data-depth="10911" className="dr-pressure flex min-h-[100vh] items-center px-5 sm:px-8">
          <div className="dr-rise mx-auto max-w-2xl text-center">
            <p className="dr-mono mb-4 text-xs tracking-[0.3em] uppercase opacity-70">
              −10,911 m · challenger deep
            </p>
            <p className="dr-mono text-[clamp(3rem,10vw,7rem)] leading-none tabular-nums">
              <span className="dr-pressure-num">1</span>
              <span className="text-[0.35em] opacity-70"> atm</span>
            </p>
            <p className="mt-6 text-xl leading-relaxed font-light opacity-80">
              The weight of a small car on every square centimeter of hull.
              The sphere doesn&apos;t creak. You do.
            </p>
          </div>
        </section>

        {/* hadal finale */}
        <section id="join" data-depth="10911" className="relative flex min-h-[110svh] flex-col justify-center px-5 sm:px-8">
          <div className="dr-rise mx-auto max-w-3xl text-center">
            <p className="dr-mono mb-6 text-xs tracking-[0.3em] uppercase opacity-70">
              hadal zone · bottom of the page, bottom of the world
            </p>
            <h2 className="text-[clamp(2.4rem,6vw,4.8rem)] leading-[1.05] font-light">
              More people have stood on the moon than <em>here.</em>
            </h2>
            <a
              href="mailto:dive@drift.example"
              className="dr-mono mt-12 inline-block border border-current px-8 py-4 text-xs tracking-[0.3em] uppercase transition-colors hover:bg-[#a5f3fc] hover:text-[#02070f] hover:border-[#a5f3fc]"
            >
              Join expedition 07
            </a>
          </div>
          <footer className="dr-mono absolute inset-x-0 bottom-0 flex flex-wrap items-center justify-between gap-3 px-5 py-5 text-[11px] tracking-[0.15em] uppercase opacity-60 sm:px-8">
            <span>DRIFT — a fictional institute</span>
            <Link href="/drift/guide" className="underline underline-offset-4 hover:opacity-100">
              How this page was built →
            </Link>
          </footer>
        </section>
      </main>
    </div>
  );
}
