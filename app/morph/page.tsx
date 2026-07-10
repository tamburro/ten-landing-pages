"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const COUNT = 30000;

function makeTargets() {
  const p0 = new Float32Array(COUNT * 3); // noise cloud
  const p1 = new Float32Array(COUNT * 3); // sphere
  const p2 = new Float32Array(COUNT * 3); // torus knot
  const p3 = new Float32Array(COUNT * 3); // galaxy
  const rnd = new Float32Array(COUNT);

  const GOLDEN = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < COUNT; i++) {
    rnd[i] = Math.random();

    // 0 — gaussian-ish chaos cloud
    {
      const r = 2.4 * Math.cbrt(Math.random());
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      p0[i * 3] = r * Math.sin(ph) * Math.cos(th) * (0.6 + Math.random());
      p0[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th) * (0.6 + Math.random());
      p0[i * 3 + 2] = r * Math.cos(ph) * (0.6 + Math.random());
    }

    // 1 — fibonacci sphere shell
    {
      const y = 1 - (i / (COUNT - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = GOLDEN * i;
      const R = 1.7;
      p1[i * 3] = Math.cos(theta) * radius * R;
      p1[i * 3 + 1] = y * R;
      p1[i * 3 + 2] = Math.sin(theta) * radius * R;
    }

    // 2 — torus knot (p=2, q=3) with fuzzy tube
    {
      const t = (i / COUNT) * Math.PI * 2;
      const p = 2, q = 3;
      const r = Math.cos(q * t) + 2;
      const cx = r * Math.cos(p * t);
      const cy = r * Math.sin(p * t);
      const cz = -Math.sin(q * t);
      const tubeR = 0.28 * Math.sqrt(Math.random());
      const ang = Math.random() * Math.PI * 2;
      // rough normal offset: jitter in a disc around the curve
      const s = 0.62;
      p2[i * 3] = (cx + tubeR * Math.cos(ang)) * s;
      p2[i * 3 + 1] = (cy + tubeR * Math.sin(ang)) * s;
      p2[i * 3 + 2] = (cz + tubeR * Math.sin(ang * 1.7)) * s * 1.6;
    }

    // 3 — spiral galaxy: 3 arms, flat disc, dense core
    {
      const arm = i % 3;
      const rr = Math.pow(Math.random(), 1.6) * 2.6;
      const spin = rr * 2.2;
      const armAngle = (arm / 3) * Math.PI * 2;
      const spread = (Math.random() - 0.5) * (0.5 - rr * 0.12);
      const a = armAngle + spin + spread;
      p3[i * 3] = Math.cos(a) * rr;
      p3[i * 3 + 1] = (Math.random() - 0.5) * 0.16 * (2.8 - rr);
      p3[i * 3 + 2] = Math.sin(a) * rr;
    }
  }
  return { p0, p1, p2, p3, rnd };
}

const VERT = /* glsl */ `
attribute vec3 aP1;
attribute vec3 aP2;
attribute vec3 aP3;
attribute float aRnd;
uniform float uMorph;
uniform float uTime;
uniform float uSize;
varying float vMix;
varying float vRnd;

void main() {
  // per-particle stagger so transitions ripple through the cloud
  float m = clamp(uMorph + (aRnd - 0.5) * 0.5, 0.0, 3.0);
  vec3 p01 = mix(position, aP1, smoothstep(0.0, 1.0, m));
  vec3 p12 = mix(p01, aP2, smoothstep(1.0, 2.0, m));
  vec3 p = mix(p12, aP3, smoothstep(2.0, 3.0, m));

  // breathing drift
  p += 0.035 * vec3(
    sin(uTime * 0.7 + aRnd * 43.0),
    cos(uTime * 0.8 + aRnd * 29.0),
    sin(uTime * 0.6 + aRnd * 17.0)
  );

  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_PointSize = uSize * (0.7 + aRnd) * (26.0 / -mv.z);
  gl_Position = projectionMatrix * mv;
  vMix = m / 3.0;
  vRnd = aRnd;
}
`;

const FRAG = /* glsl */ `
precision mediump float;
varying float vMix;
varying float vRnd;

void main() {
  float d = length(gl_PointCoord - 0.5);
  float a = smoothstep(0.5, 0.12, d);
  vec3 violet = vec3(0.486, 0.227, 0.929);
  vec3 cyan = vec3(0.133, 0.827, 0.933);
  vec3 magenta = vec3(0.925, 0.282, 0.600);
  vec3 col = mix(violet, cyan, clamp(vMix * 1.15, 0.0, 1.0));
  col = mix(col, magenta, vRnd * 0.22);
  gl_FragColor = vec4(col, a * 0.5);
}
`;

function ParticleField({ morphRef }: { morphRef: React.MutableRefObject<number> }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, mount.clientWidth / mount.clientHeight, 0.1, 60);
    camera.position.set(0, 0, 6);

    const { p0, p1, p2, p3, rnd } = makeTargets();
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(p0, 3));
    geo.setAttribute("aP1", new THREE.BufferAttribute(p1, 3));
    geo.setAttribute("aP2", new THREE.BufferAttribute(p2, 3));
    geo.setAttribute("aP3", new THREE.BufferAttribute(p3, 3));
    geo.setAttribute("aRnd", new THREE.BufferAttribute(rnd, 1));

    const uniforms = {
      uMorph: { value: 0 },
      uTime: { value: 0 },
      uSize: { value: 0.85 },
    };
    const mat = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      uniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const points = new THREE.Points(geo, mat);
    scene.add(points);

    const mouse = { x: 0, y: 0 };
    const onPointer = (e: PointerEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    let raf = 0;
    let running = true;
    let t = 0;
    let morph = 0;

    const frame = () => {
      if (!running) return;
      t += 0.016;
      uniforms.uTime.value = t;
      // ease toward the scroll-driven target for silkier transitions
      morph += (morphRef.current - morph) * 0.06;
      uniforms.uMorph.value = morph;
      points.rotation.y = t * 0.06 + mouse.x * 0.18;
      points.rotation.x = Math.sin(t * 0.05) * 0.12 + mouse.y * 0.12;
      // galaxy tilts toward the viewer at the end
      points.rotation.z = (morph / 3) * 0.35;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(frame);
    };

    if (reduced) {
      uniforms.uMorph.value = 1; // hold on the sphere, a calm still
      renderer.render(scene, camera);
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

    const ro = new ResizeObserver(() => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      if (reduced) renderer.render(scene, camera);
    });
    ro.observe(mount);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("pointermove", onPointer);
      ro.disconnect();
      geo.dispose();
      mat.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, [morphRef]);

  return <div ref={mountRef} className="mo-canvas fixed inset-0" aria-hidden />;
}

const STAGES = [
  {
    n: "00",
    key: "noise",
    title: "Ingest the chaos.",
    body: "Logs, tickets, transcripts, telemetry — a corpus with no shape. Thirty thousand points of it are floating behind this sentence.",
    readout: "state: RAW · entropy: 1.00",
  },
  {
    n: "01",
    key: "sphere",
    title: "Give everything a coordinate.",
    body: "Embeddings press the chaos onto a manifold. Nothing is lost; everything is suddenly *somewhere*, and distance starts to mean something.",
    readout: "state: EMBEDDED · entropy: 0.42",
  },
  {
    n: "02",
    key: "knot",
    title: "Let structure tie itself.",
    body: "Training pulls the manifold through itself until the relations hold the shape. The knot is the model: nothing supports it but its own geometry.",
    readout: "state: TRAINED · loss: 0.017",
  },
  {
    n: "03",
    key: "galaxy",
    title: "Deploy at orbital scale.",
    body: "Inference fans the structure out into a system — queries fall in, answers spiral out, and the whole thing turns without you touching it.",
    readout: "state: SERVING · p99: 41ms",
  },
];

export default function MorphPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const morphRef = useRef(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: ".mo-journey",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          morphRef.current = self.progress * 3;
        },
      });

      // the field dims once the journey ends so the outro is readable
      gsap.fromTo(
        ".mo-canvas",
        { opacity: 1 },
        {
          opacity: 0.22,
          ease: "none",
          scrollTrigger: {
            trigger: ".mo-outro",
            start: "top 90%",
            end: "top 40%",
            scrub: true,
          },
        }
      );

      if (!reduced) {
        gsap.fromTo(
          ".mo-hero-el",
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 1.0, stagger: 0.12, ease: "power3.out", delay: 0.2 }
        );

        gsap.utils.toArray<HTMLElement>(".mo-stage").forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: { trigger: el, start: "top 70%" },
            }
          );
          gsap.to(el, {
            opacity: 0,
            y: -30,
            ease: "none",
            scrollTrigger: { trigger: el, start: "bottom 38%", end: "bottom 12%", scrub: true },
          });
        });

        gsap.utils.toArray<HTMLElement>(".mo-reveal").forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: { trigger: el, start: "top 85%" },
            }
          );
        });
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      className="min-h-screen bg-[#0b0613] text-[#ece7f6] selection:bg-[#7c3aed] selection:text-white"
      style={{ fontFamily: "var(--font-morph-display), sans-serif" }}
    >
      <style>{`
        .mo-mono { font-family: var(--font-morph-mono), monospace; }
        .mo-grad { background: linear-gradient(100deg, #7c3aed, #22d3ee 70%); -webkit-background-clip: text; background-clip: text; color: transparent; }
        .mo-ring { border: 1px solid rgba(124, 58, 237, 0.35); }
      `}</style>

      <ParticleField morphRef={morphRef} />

      {/* chrome */}
      <header className="fixed inset-x-0 top-0 z-30 flex items-center justify-between px-6 py-5 sm:px-10">
        <span className="text-lg font-extrabold tracking-tight">morph*</span>
        <nav className="mo-mono hidden gap-7 text-xs text-[#b7a8d8] sm:flex">
          <a className="transition-colors hover:text-[#22d3ee]" href="#journey">Pipeline</a>
          <a className="transition-colors hover:text-[#22d3ee]" href="#stack">Stack</a>
          <a className="transition-colors hover:text-[#22d3ee]" href="#cta">Access</a>
        </nav>
        <a
          href="#cta"
          className="mo-ring mo-mono rounded-md px-4 py-2 text-xs text-[#d6c9f2] transition-colors hover:border-[#22d3ee] hover:text-[#22d3ee]"
        >
          get access
        </a>
      </header>

      {/* hero */}
      <section className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center px-6 text-center">
        <p className="mo-hero-el mo-mono mb-6 text-xs tracking-[0.3em] text-[#22d3ee] uppercase">
          inference infrastructure
        </p>
        <h1 className="mo-hero-el max-w-4xl text-[clamp(2.8rem,8vw,6.5rem)] leading-[1.0] font-extrabold tracking-tight">
          Structure <span className="mo-grad">from noise.</span>
        </h1>
        <p className="mo-hero-el mt-8 max-w-xl text-base leading-relaxed text-[#b7a8d8] sm:text-lg">
          The particles behind this headline are your data. Scroll, and watch
          them learn.
        </p>
        <p className="mo-hero-el mo-mono mt-16 text-xs tracking-[0.3em] text-[#b7a8d8]/60 uppercase">
          ↓ scroll to train
        </p>
      </section>

      {/* journey — one viewport-tall panel per morph stage */}
      <div id="journey" className="mo-journey relative z-10">
        {STAGES.map((s, i) => (
          <section key={s.key} className="flex min-h-[120vh] items-center px-6 sm:px-10">
            <div
              className={`mo-stage max-w-md ${i % 2 ? "ml-auto text-right" : ""}`}
            >
              <p className="mo-mono text-xs tracking-[0.3em] text-[#22d3ee] uppercase">
                stage {s.n}
              </p>
              <h2 className="mt-4 text-3xl leading-tight font-bold tracking-tight sm:text-5xl">
                {s.title}
              </h2>
              <p className="mt-5 text-base leading-relaxed text-[#b7a8d8]">
                {s.body.replace(/\*(.*?)\*/g, "$1")}
              </p>
              <p className="mo-mono mo-ring mt-6 inline-block rounded-md px-3 py-2 text-[11px] text-[#d6c9f2]/80">
                {s.readout}
              </p>
            </div>
          </section>
        ))}
      </div>

      {/* outro */}
      <div className="mo-outro relative z-10">
        <section id="stack" className="mx-auto max-w-6xl px-6 py-32 sm:px-10">
          <p className="mo-reveal mo-mono mb-3 text-xs tracking-[0.3em] text-[#22d3ee] uppercase">
            the stack
          </p>
          <h2 className="mo-reveal max-w-2xl text-3xl leading-tight font-bold tracking-tight sm:text-5xl">
            Everything between the raw and the served.
          </h2>
          <div className="mt-14 grid gap-4 sm:grid-cols-3">
            {[
              { name: "morph/embed", body: "Multimodal embeddings with a stable geometry contract — versions never shear your space." },
              { name: "morph/train", body: "Continual fine-tuning that treats your feedback queue as a gradient, not a backlog." },
              { name: "morph/serve", body: "Speculative, batched, quantized — the boring miracles that make p99 a marketing number." },
            ].map((c) => (
              <article
                key={c.name}
                className="mo-reveal rounded-xl border border-[#7c3aed]/25 bg-[#150c26]/70 p-6 backdrop-blur-sm transition-colors hover:border-[#22d3ee]/50"
              >
                <h3 className="mo-mono text-sm font-bold text-[#22d3ee]">{c.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#b7a8d8]">{c.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="cta" className="border-t border-[#7c3aed]/20 px-6 py-32 text-center sm:px-10">
          <h2 className="mo-reveal text-[clamp(2.2rem,6vw,4.5rem)] leading-[1.02] font-extrabold tracking-tight">
            Your data already
            <br />
            <span className="mo-grad">knows its shape.</span>
          </h2>
          <a
            href="mailto:access@morph.example"
            className="mo-reveal mt-12 inline-block rounded-lg bg-gradient-to-r from-[#7c3aed] to-[#22d3ee] px-8 py-4 text-sm font-bold text-[#0b0613] transition-transform hover:scale-105"
          >
            Request early access
          </a>
          <footer className="mo-mono mt-24 flex flex-wrap items-center justify-between gap-3 text-xs text-[#b7a8d8]/50">
            <span>morph* — a fictional company</span>
            <Link href="/morph/guide" className="underline underline-offset-4 hover:text-[#22d3ee]">
              How this page was built →
            </Link>
          </footer>
        </section>
      </div>
    </div>
  );
}
