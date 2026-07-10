"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const FRAG = /* glsl */ `
precision highp float;

uniform float uTime;
uniform vec2 uRes;
uniform vec2 uMouse;
uniform float uScroll;

float hash21(vec2 p) {
  p = fract(p * vec2(234.34, 435.345));
  p += dot(p, p + 34.23);
  return fract(p.x * p.y);
}

float vnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash21(i);
  float b = hash21(i + vec2(1.0, 0.0));
  float c = hash21(i + vec2(0.0, 1.0));
  float d = hash21(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 r = mat2(0.8, -0.6, 0.6, 0.8);
  for (int i = 0; i < 5; i++) {
    v += a * vnoise(p);
    p = r * p * 2.03;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
  float t = uTime * 0.05;

  vec2 c = vec2(0.0, -0.22) + uMouse * 0.035;
  c.y -= uScroll * 0.6;
  vec2 p = uv - c;
  float d = length(p);
  float r = 0.42;
  float ang = atan(p.y, p.x);

  // corona: radial glow shaped by two layers of angular noise flares
  float fl = fbm(vec2(ang * 2.5 + sin(t * 0.7), (d - t * 1.6) * 3.0));
  float fl2 = fbm(vec2(ang * 6.0 - t * 1.2, d * 9.0 + t * 2.4));
  float glow = pow(r / max(d, 1e-3), 1.85) * (0.5 + 0.55 * fl + 0.28 * fl2);
  glow *= smoothstep(r * 0.7, r * 1.04, d);
  vec3 col = vec3(1.0, 0.42, 0.10) * glow * 0.55
           + vec3(1.0, 0.78, 0.38) * glow * glow * 0.13;

  // photosphere: domain-warped fbm granulation
  float disk = smoothstep(r + 0.004, r - 0.007, d);
  vec2 sp = p * 4.5;
  float w = fbm(sp * 2.0 - t * 1.5);
  float turb = fbm(sp + w * 1.25 + t * 0.7);
  vec3 hot = vec3(1.0, 0.84, 0.47);
  vec3 cool = vec3(0.90, 0.30, 0.045);
  vec3 surf = mix(cool, hot, smoothstep(0.22, 0.88, turb));
  float limb = smoothstep(r, r * 0.18, d);
  surf *= 0.5 + 0.85 * limb;
  float spots = smoothstep(0.30, 0.18, fbm(sp * 1.35 - w + 17.0));
  surf *= 1.0 - spots * 0.6;
  col = mix(col, surf, disk);

  // drifting solar dust above the horizon
  col += vec3(0.4, 0.14, 0.03) * fbm(uv * 3.0 + vec2(t * 0.6, 0.0)) * 0.05 * (1.0 - disk);

  float vg = smoothstep(1.4, 0.42, length(uv));
  col *= vg;
  col += (hash21(gl_FragCoord.xy + fract(uTime) * 100.0) - 0.5) * 0.03;
  col = 1.0 - exp(-col * 1.65);
  col = pow(col, vec3(0.95));
  gl_FragColor = vec4(col, 1.0);
}
`;

const VERT = /* glsl */ `
void main() {
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

function SunCanvas({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const uniforms = {
      uTime: { value: 12.0 },
      uRes: { value: new THREE.Vector2(mount.clientWidth * renderer.getPixelRatio(), mount.clientHeight * renderer.getPixelRatio()) },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uScroll: { value: 0 },
    };
    const material = new THREE.ShaderMaterial({
      fragmentShader: FRAG,
      vertexShader: VERT,
      uniforms,
      depthTest: false,
      depthWrite: false,
    });
    const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(quad);

    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const onPointer = (e: PointerEvent) => {
      mouse.tx = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.ty = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    let raf = 0;
    let running = true;
    const clock = new THREE.Clock();

    const frame = () => {
      if (!running) return;
      uniforms.uTime.value += clock.getDelta();
      mouse.x += (mouse.tx - mouse.x) * 0.04;
      mouse.y += (mouse.ty - mouse.y) * 0.04;
      uniforms.uMouse.value.set(mouse.x, mouse.y);
      uniforms.uScroll.value = scrollRef.current;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(frame);
    };

    if (reduced) {
      renderer.render(scene, camera);
    } else {
      raf = requestAnimationFrame(frame);
    }

    const io = new IntersectionObserver(([entry]) => {
      const visible = entry.isIntersecting && !document.hidden;
      if (visible && !running) {
        running = true;
        clock.getDelta();
        if (!reduced) raf = requestAnimationFrame(frame);
      } else if (!visible) {
        running = false;
        cancelAnimationFrame(raf);
      }
    });
    io.observe(mount);

    const onVis = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        clock.getDelta();
        if (!reduced) raf = requestAnimationFrame(frame);
      }
    };
    document.addEventListener("visibilitychange", onVis);

    const ro = new ResizeObserver(() => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      renderer.setSize(w, h);
      uniforms.uRes.value.set(w * renderer.getPixelRatio(), h * renderer.getPixelRatio());
      if (reduced) renderer.render(scene, camera);
    });
    ro.observe(mount);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("pointermove", onPointer);
      quad.geometry.dispose();
      material.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, [scrollRef]);

  return <div ref={mountRef} className="absolute inset-0" aria-hidden />;
}

const STATS = [
  { value: 4.2, decimals: 1, suffix: " GW", label: "capacity deployed" },
  { value: 99.98, decimals: 2, suffix: "%", label: "dispatch availability" },
  { value: 14.8, decimals: 1, prefix: "$", suffix: "", label: "flat LCOE / MWh" },
  { value: 31, decimals: 0, suffix: "", label: "wholesale markets" },
];

const STEPS = [
  {
    n: "01",
    name: "Capture",
    body: "Bifacial arrays on single-axis trackers, laid out by a solver that trades land against irradiance an hour at a time. We buy panels the way airlines buy fuel — hedged, boring, cheap.",
  },
  {
    n: "02",
    name: "Store",
    body: "LFP blocks sit behind the same interconnect. Charge when the price curve sags, hold through the shoulder, and keep four hours of star in a box for the evening ramp.",
  },
  {
    n: "03",
    name: "Dispatch",
    body: "Software bids every node into day-ahead and real-time markets. No trading desk, no phone calls — a control loop that treats the sun as a payload and the grid as a schedule.",
  },
];

export default function HeliosPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (!reduced) {
        gsap.fromTo(
          ".hl-hero-line",
          { yPercent: 110 },
          { yPercent: 0, duration: 1.1, ease: "power4.out", stagger: 0.12, delay: 0.15 }
        );
        gsap.fromTo(
          ".hl-hero-meta",
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.9, ease: "power2.out", stagger: 0.08, delay: 0.7 }
        );
      }

      ScrollTrigger.create({
        trigger: ".hl-hero",
        start: "top top",
        end: "bottom top",
        onUpdate: (self) => {
          scrollRef.current = self.progress;
        },
      });

      if (!reduced) {
        gsap.utils.toArray<HTMLElement>(".hl-reveal").forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 0, y: 36 },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: { trigger: el, start: "top 85%" },
            }
          );
        });

        gsap.utils.toArray<HTMLElement>(".hl-count").forEach((el) => {
          const target = parseFloat(el.dataset.value ?? "0");
          const decimals = parseInt(el.dataset.decimals ?? "0", 10);
          const obj = { v: 0 };
          gsap.to(obj, {
            v: target,
            duration: 1.6,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 88%" },
            onUpdate: () => {
              el.textContent = obj.v.toFixed(decimals);
            },
          });
        });
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      className="hl-root min-h-screen bg-[#050403] text-[#f5ede2]"
      style={{ fontFamily: "var(--font-helios-display), sans-serif" }}
    >
      <style>{`
        .hl-mono { font-family: var(--font-helios-mono), monospace; }
        .hl-ticker { animation: hl-tick 36s linear infinite; }
        @keyframes hl-tick { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @media (prefers-reduced-motion: reduce) { .hl-ticker { animation: none; } }
        .hl-line-mask { overflow: hidden; }
      `}</style>

      {/* nav */}
      <header className="fixed inset-x-0 top-0 z-20 flex items-center justify-between bg-gradient-to-b from-[#050403]/95 via-[#050403]/60 to-transparent px-6 py-5 sm:px-10">
        <span className="text-sm font-bold tracking-[0.3em]">HELIOS</span>
        <nav className="hl-mono hidden gap-8 text-xs text-[#c9b8a4] sm:flex">
          <a href="#system" className="transition-colors hover:text-[#ff8a3d]">System</a>
          <a href="#numbers" className="transition-colors hover:text-[#ff8a3d]">Numbers</a>
          <a href="#contact" className="transition-colors hover:text-[#ff8a3d]">Contact</a>
        </nav>
        <a
          href="#contact"
          className="hl-mono rounded-full border border-[#ff6b1a]/50 px-4 py-1.5 text-xs text-[#ffc861] transition-colors hover:border-[#ff6b1a] hover:bg-[#ff6b1a]/10"
        >
          Interconnect →
        </a>
      </header>

      {/* hero */}
      <section className="hl-hero relative flex h-[100svh] flex-col justify-end overflow-hidden">
        <SunCanvas scrollRef={scrollRef} />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-[#050403]/80 via-[#050403]/25 to-transparent" aria-hidden />
        <div className="pointer-events-none relative z-10 px-6 pb-16 sm:px-10 sm:pb-20">
          <p className="hl-hero-meta hl-mono mb-5 text-xs tracking-[0.25em] text-[#ffc861]/80 uppercase">
            Utility-scale solar · est. 4.6 billion BC
          </p>
          <h1 className="max-w-4xl text-[clamp(2.6rem,7.5vw,6.2rem)] leading-[0.98] font-medium tracking-tight">
            <span className="hl-line-mask block"><span className="hl-hero-line block">The oldest power</span></span>
            <span className="hl-line-mask block"><span className="hl-hero-line block">plant in the sky,</span></span>
            <span className="hl-line-mask block"><span className="hl-hero-line block text-[#ff8a3d]">priced like software.</span></span>
          </h1>
          <div className="hl-hero-meta pointer-events-auto mt-8 flex flex-wrap items-center gap-6">
            <a
              href="#system"
              className="rounded-full bg-[#ff6b1a] px-6 py-3 text-sm font-medium text-[#050403] transition-transform hover:scale-[1.03]"
            >
              See the system
            </a>
            <span className="hl-mono text-xs text-[#c9b8a4]">
              93 million miles of transmission, zero right-of-way disputes.
            </span>
          </div>
        </div>
        <div className="hl-hero-meta hl-mono absolute right-6 bottom-16 z-10 hidden rotate-90 text-[10px] tracking-[0.3em] text-[#c9b8a4]/60 uppercase sm:block">
          scroll ↓
        </div>
      </section>

      {/* ticker */}
      <div className="hl-mono overflow-hidden border-y border-[#2a1c10] bg-[#0a0705] py-3 text-xs text-[#c9b8a4]">
        <div className="hl-ticker flex w-max gap-12 whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex gap-12" aria-hidden={i === 1}>
              <span>ERCOT node HB_WEST · $42.15/MWh ▲</span>
              <span>irradiance 991 W/m² · clear</span>
              <span>fleet output 3.86 GW</span>
              <span>storage SOC 71%</span>
              <span>CAISO SP15 · $38.02/MWh ▼</span>
              <span>next eclipse hedge · 2027-08-02</span>
              <span>PJM WESTERN HUB · $51.77/MWh ▲</span>
              <span>curtailment 0.4%</span>
            </div>
          ))}
        </div>
      </div>

      {/* system */}
      <section id="system" className="mx-auto max-w-6xl px-6 py-28 sm:px-10 sm:py-36">
        <p className="hl-reveal hl-mono mb-3 text-xs tracking-[0.25em] text-[#ff8a3d] uppercase">The system</p>
        <h2 className="hl-reveal max-w-2xl text-3xl leading-tight font-medium tracking-tight sm:text-5xl">
          A star, a battery, and a control loop.
        </h2>
        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-[#2a1c10] bg-[#2a1c10] sm:grid-cols-3">
          {STEPS.map((s) => (
            <article key={s.n} className="hl-reveal group bg-[#0a0705] p-8 transition-colors hover:bg-[#120b06] sm:p-10">
              <span className="hl-mono text-xs text-[#ff6b1a]">{s.n}</span>
              <h3 className="mt-4 text-2xl font-medium">{s.name}</h3>
              <p className="mt-4 text-sm leading-relaxed text-[#c9b8a4]">{s.body}</p>
              <div className="mt-8 h-px w-8 bg-[#ff6b1a]/40 transition-all duration-500 group-hover:w-full" />
            </article>
          ))}
        </div>
      </section>

      {/* numbers */}
      <section id="numbers" className="border-y border-[#2a1c10] bg-[#080503]">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 sm:grid-cols-4 sm:px-10">
          {STATS.map((s) => (
            <div key={s.label} className="hl-reveal">
              <p className="text-4xl font-medium tracking-tight text-[#ffc861] sm:text-5xl">
                {s.prefix}
                <span className="hl-count" data-value={s.value} data-decimals={s.decimals}>
                  {s.value.toFixed(s.decimals)}
                </span>
                {s.suffix}
              </p>
              <p className="hl-mono mt-3 text-xs tracking-wide text-[#c9b8a4] uppercase">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* manifesto */}
      <section className="mx-auto max-w-4xl px-6 py-28 sm:px-10 sm:py-36">
        <p className="hl-reveal text-2xl leading-snug font-light text-[#f5ede2]/90 sm:text-4xl">
          Every grid is already solar — coal is sunlight with a{" "}
          <span className="text-[#ff8a3d]">300-million-year settlement delay</span>. We just removed
          the middleman, the mine, and the wait.
        </p>
      </section>

      {/* contact */}
      <section id="contact" className="relative overflow-hidden border-t border-[#2a1c10]">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-10 px-6 py-28 sm:px-10">
          <h2 className="hl-reveal text-4xl leading-[1.02] font-medium tracking-tight sm:text-6xl">
            Put a star on
            <br />
            your balance sheet.
          </h2>
          <a
            href="mailto:grid@helios.example"
            className="hl-reveal rounded-full bg-[#ff6b1a] px-8 py-4 text-sm font-medium text-[#050403] transition-transform hover:scale-[1.03]"
          >
            grid@helios.example
          </a>
        </div>
        <footer className="hl-mono flex flex-wrap items-center justify-between gap-4 border-t border-[#2a1c10] px-6 py-6 text-xs text-[#c9b8a4]/70 sm:px-10">
          <span>© 4,600,001,970 Helios. Fictional.</span>
          <Link href="/helios/guide" className="underline underline-offset-4 hover:text-[#ffc861]">
            How this page was built →
          </Link>
        </footer>
      </section>
    </div>
  );
}
