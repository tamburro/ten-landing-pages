"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Rig = {
  x: number; y: number; z: number;
  tx: number; ty: number; tz: number;
  iri: number; spin: number; core: number;
};

function GlassScene({ rigRef }: { rigRef: React.MutableRefObject<Rig> }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0c0e12);

    const pmrem = new THREE.PMREMGenerator(renderer);
    const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTex;

    const camera = new THREE.PerspectiveCamera(42, mount.clientWidth / mount.clientHeight, 0.1, 50);
    camera.position.set(0, 0.4, 7.5);

    // lit backdrop so the transmission has something to refract
    const bgCanvas = document.createElement("canvas");
    bgCanvas.width = bgCanvas.height = 512;
    const bgCtx = bgCanvas.getContext("2d")!;
    const bgGrad = bgCtx.createRadialGradient(256, 236, 40, 256, 256, 360);
    bgGrad.addColorStop(0, "#3c4c66");
    bgGrad.addColorStop(0.45, "#181f2c");
    bgGrad.addColorStop(1, "#0c0e12");
    bgCtx.fillStyle = bgGrad;
    bgCtx.fillRect(0, 0, 512, 512);
    const bgTex = new THREE.CanvasTexture(bgCanvas);
    bgTex.colorSpace = THREE.SRGBColorSpace;
    const backdrop = new THREE.Mesh(
      new THREE.PlaneGeometry(46, 30),
      new THREE.MeshBasicMaterial({ map: bgTex })
    );
    backdrop.position.set(0, 0, -10);
    scene.add(backdrop);

    // the object: seamless cast-glass knot
    const geo = new THREE.TorusKnotGeometry(1, 0.34, 240, 40);
    const mat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0,
      roughness: 0.05,
      transmission: 1,
      thickness: 1.8,
      ior: 1.52,
      clearcoat: 1,
      clearcoatRoughness: 0.06,
      iridescence: 0,
      iridescenceIOR: 1.3,
      attenuationColor: new THREE.Color(0x9fc4ff),
      attenuationDistance: 4.5,
      envMapIntensity: 1.5,
    });
    const knot = new THREE.Mesh(geo, mat);
    scene.add(knot);

    // emissive core
    const coreGeo = new THREE.IcosahedronGeometry(0.34, 1);
    const coreMat = new THREE.MeshBasicMaterial({ color: 0x8ab4ff });
    const core = new THREE.Mesh(coreGeo, coreMat);
    scene.add(core);

    // accent lights so the glass carries color
    const keyLight = new THREE.PointLight(0x8ab4ff, 40, 30);
    keyLight.position.set(5, 4, 4);
    scene.add(keyLight);
    const rimLight = new THREE.PointLight(0xffe0b8, 18, 30);
    rimLight.position.set(-5, -2, -3);
    scene.add(rimLight);

    const mouse = { x: 0, y: 0, sx: 0, sy: 0 };
    const onPointer = (e: PointerEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    let raf = 0;
    let running = true;
    let t = 0;
    const target = new THREE.Vector3();

    const frame = () => {
      if (!running) return;
      t += 0.016;
      const rig = rigRef.current;
      mouse.sx += (mouse.x - mouse.sx) * 0.05;
      mouse.sy += (mouse.y - mouse.sy) * 0.05;

      knot.rotation.y = t * 0.12 * rig.spin;
      knot.rotation.x = Math.sin(t * 0.09) * 0.18;
      core.rotation.y = -t * 0.3;
      const pulse = 1 + Math.sin(t * 1.8) * 0.08;
      core.scale.setScalar(pulse * rig.core);
      mat.iridescence = rig.iri;

      camera.position.set(
        rig.x + mouse.sx * 0.45,
        rig.y - mouse.sy * 0.3,
        rig.z
      );
      target.set(rig.tx, rig.ty, rig.tz);
      camera.lookAt(target);
      renderer.render(scene, camera);
      raf = requestAnimationFrame(frame);
    };

    if (reduced) {
      camera.position.set(3.2, 1.2, 4.8);
      camera.lookAt(0, 0, 0);
      mat.iridescence = 0.6;
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
      coreGeo.dispose();
      coreMat.dispose();
      backdrop.geometry.dispose();
      (backdrop.material as THREE.MeshBasicMaterial).dispose();
      bgTex.dispose();
      envTex.dispose();
      pmrem.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, [rigRef]);

  return <div ref={mountRef} className="ob-canvas fixed inset-0" aria-hidden />;
}

const CHAPTERS = [
  {
    n: "01",
    title: "One surface. No beginning.",
    body: "The OS-1 is a single closed curve — a (3,2) knot cast in optical glass. Run your eye along it: you will never find the seam, because there isn't one.",
    side: "right",
  },
  {
    n: "02",
    title: "Glass that owes you nothing.",
    body: "Cast at 1,480°C, cooled for eleven days, polished for three. Refractive index 1.52 — the same as a lens, employed here to bend one specific thing: your attention.",
    side: "left",
  },
  {
    n: "03",
    title: "Light, taught manners.",
    body: "A sub-wavelength coating splits reflections into slow iridescence. From above, the knot files the room's light into bands and hands it back to you sorted.",
    side: "right",
  },
];

export default function OrbitalPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const rigRef = useRef<Rig>({
    x: 0, y: 0.4, z: 7.5,
    tx: 0, ty: 0, tz: 0,
    iri: 0, spin: 1, core: 1,
  });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (!reduced) {
        const rig = rigRef.current;
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".ob-journey",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
          },
        });
        tl.to(rig, { x: 3.4, y: 1.3, z: 4.6, duration: 1, ease: "none" })
          .to(rig, { x: 1.15, y: 0.35, z: 2.3, ty: 0.15, duration: 1, ease: "none" })
          .to(rig, { x: 0, y: 4.4, z: 2.6, ty: 0, iri: 1, duration: 1, ease: "none" });

        // pull back for the finale
        gsap.to(rig, {
          x: 0, y: 0.2, z: 6.4, iri: 0.7, spin: 1.6, core: 1.4,
          ease: "none",
          scrollTrigger: {
            trigger: ".ob-finale",
            start: "top bottom",
            end: "top center",
            scrub: 0.6,
          },
        });

        gsap.fromTo(
          ".ob-hero-el",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1.2, stagger: 0.15, ease: "power3.out", delay: 0.3 }
        );

        gsap.utils.toArray<HTMLElement>(".ob-chapter").forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 0, y: 44 },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: "power2.out",
              scrollTrigger: { trigger: el, start: "top 72%" },
            }
          );
          gsap.to(el, {
            opacity: 0,
            ease: "none",
            scrollTrigger: { trigger: el, start: "bottom 30%", end: "bottom 8%", scrub: true },
          });
        });

        gsap.utils.toArray<HTMLElement>(".ob-fade").forEach((el) => {
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
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      className="min-h-screen bg-[#0c0e12] text-[#e6e9ef] selection:bg-[#8ab4ff] selection:text-[#0c0e12]"
      style={{ fontFamily: "var(--font-orbital-sans), sans-serif" }}
    >
      <style>{`
        .ob-display { font-family: var(--font-orbital-display), sans-serif; }
        .ob-hair { border-color: rgba(230, 233, 239, 0.14); }
      `}</style>

      <GlassScene rigRef={rigRef} />

      {/* chrome */}
      <header className="fixed inset-x-0 top-0 z-30 flex items-center justify-between px-6 py-5 sm:px-10">
        <span className="ob-display text-sm font-bold tracking-[0.3em]">ORBITAL</span>
        <span className="hidden text-xs tracking-[0.25em] text-[#8ab4ff] uppercase sm:block">
          OS-1 · edition of 500
        </span>
        <a
          href="#reserve"
          className="rounded-full border border-[#e6e9ef]/25 px-5 py-2 text-xs tracking-[0.15em] uppercase backdrop-blur-sm transition-colors hover:border-[#8ab4ff] hover:text-[#8ab4ff]"
        >
          Reserve
        </a>
      </header>

      {/* hero */}
      <section className="relative z-10 flex min-h-[100svh] flex-col items-center justify-end px-6 pb-20 text-center">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-[#0c0e12]/90 via-[#0c0e12]/40 to-transparent" aria-hidden />
        <h1 className="ob-hero-el relative ob-display text-[clamp(2rem,5.5vw,4.6rem)] leading-[1.08] font-light tracking-tight">
          A machine for
          <br />
          <span className="font-medium text-[#8ab4ff]">looking at.</span>
        </h1>
        <p className="ob-hero-el relative mt-6 max-w-md text-sm leading-relaxed text-[#9aa3b5]">
          The OS-1 does nothing. No screen, no app, no notifications — one
          kilogram of cast optical glass that makes a room quieter by being in it.
        </p>
        <p className="ob-hero-el relative mt-14 text-[10px] tracking-[0.4em] text-[#9aa3b5]/60 uppercase">
          scroll to inspect
        </p>
      </section>

      {/* journey */}
      <div className="ob-journey relative z-10">
        {CHAPTERS.map((c) => (
          <section
            key={c.n}
            className={`flex min-h-[130vh] items-center px-6 sm:px-14 ${
              c.side === "right" ? "justify-end" : "justify-start"
            }`}
          >
            <div className="ob-chapter max-w-sm rounded-2xl border ob-hair bg-[#0c0e12]/55 p-8 backdrop-blur-md">
              <p className="ob-display text-xs tracking-[0.4em] text-[#8ab4ff]">{c.n}</p>
              <h2 className="ob-display mt-4 text-2xl leading-snug font-medium sm:text-3xl">
                {c.title}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-[#9aa3b5]">{c.body}</p>
            </div>
          </section>
        ))}
      </div>

      {/* finale */}
      <div className="ob-finale relative z-10">
        <section className="flex min-h-[110vh] flex-col items-center justify-center px-6 text-center">
          <h2 className="ob-fade ob-display max-w-3xl text-[clamp(1.8rem,4.5vw,3.6rem)] leading-[1.12] font-light">
            Five hundred exist.
            <br />
            <span className="font-medium text-[#8ab4ff]">None of them do anything.</span>
          </h2>
          <div className="ob-fade mt-14 grid w-full max-w-2xl grid-cols-2 gap-px overflow-hidden rounded-xl border ob-hair bg-[#e6e9ef]/10 text-left sm:grid-cols-4">
            {[
              ["Mass", "1.04 kg"],
              ["Glass", "BK7 optical"],
              ["Finish", "Iridescent MgF₂"],
              ["Edition", "500, numbered"],
            ].map(([k, v]) => (
              <div key={k} className="bg-[#0c0e12]/90 p-5 backdrop-blur-sm">
                <p className="text-[10px] tracking-[0.25em] text-[#9aa3b5] uppercase">{k}</p>
                <p className="ob-display mt-2 text-sm font-medium">{v}</p>
              </div>
            ))}
          </div>
          <a
            id="reserve"
            href="mailto:reserve@orbital.example"
            className="ob-fade mt-14 rounded-full bg-[#8ab4ff] px-10 py-4 text-sm font-bold tracking-[0.1em] text-[#0c0e12] uppercase transition-transform hover:scale-105"
          >
            Reserve № —/500
          </a>
          <p className="ob-fade mt-5 text-xs text-[#9aa3b5]/70">
            $1,800. Ships in a crate that is also quite nice.
          </p>
        </section>
        <footer className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-t ob-hair px-6 py-6 text-xs text-[#9aa3b5]/60 sm:px-10">
          <span>ORBITAL — a fictional object</span>
          <Link href="/orbital/guide" className="underline underline-offset-4 hover:text-[#8ab4ff]">
            How this page was built →
          </Link>
        </footer>
      </div>
    </div>
  );
}
