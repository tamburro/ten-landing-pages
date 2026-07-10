"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const LOOKS = [
  { n: "I", name: "Marble Drape", note: "silk jersey, bias-cut", seed: "atelier-look1" },
  { n: "II", name: "Caryatid", note: "structured wool, no seams on the shoulder", seed: "atelier-look2" },
  { n: "III", name: "Contrapposto", note: "asymmetric hem, one sleeve", seed: "atelier-look3" },
  { n: "IV", name: "Kore", note: "pleated column, raw edge", seed: "atelier-look4" },
  { n: "V", name: "Torso of Belvedere", note: "deconstructed tailoring", seed: "atelier-look5" },
  { n: "VI", name: "Winged Victory", note: "organza, wind machine optional", seed: "atelier-look6" },
];

export default function AtelierPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (!reduced) {
        // masthead letters drift together
        gsap.fromTo(
          ".at-mast span",
          { opacity: 0, letterSpacing: "0.4em" },
          { opacity: 1, letterSpacing: "0.06em", duration: 1.6, ease: "power3.out", delay: 0.1 }
        );

        // images unveil with a clip wipe
        gsap.utils.toArray<HTMLElement>(".at-unveil").forEach((el) => {
          gsap.fromTo(
            el,
            { clipPath: "inset(100% 0 0 0)" },
            {
              clipPath: "inset(0% 0 0 0)",
              duration: 1.2,
              ease: "power4.inOut",
              scrollTrigger: { trigger: el, start: "top 82%" },
            }
          );
        });

        gsap.utils.toArray<HTMLElement>(".at-rise").forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 0, y: 34 },
            {
              opacity: 1,
              y: 0,
              duration: 1.0,
              ease: "power2.out",
              scrollTrigger: { trigger: el, start: "top 86%" },
            }
          );
        });

        // pinned horizontal gallery
        const track = trackRef.current;
        const gallery = galleryRef.current;
        if (track && gallery) {
          gallery.style.overflowX = "hidden";
          const getDistance = () => track.scrollWidth - window.innerWidth;
          gsap.to(track, {
            x: () => -getDistance(),
            ease: "none",
            scrollTrigger: {
              trigger: gallery,
              start: "top top",
              end: () => `+=${getDistance()}`,
              pin: true,
              scrub: 0.5,
              invalidateOnRefresh: true,
            },
          });
        }
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      className="min-h-screen bg-[#f4efe6] text-[#1c1a17] selection:bg-[#6d1a2d] selection:text-[#f4efe6]"
      style={{ fontFamily: "var(--font-atelier-serif), serif" }}
    >
      <style>{`
        .at-sans { font-family: var(--font-atelier-sans), sans-serif; }
        .at-img { filter: grayscale(1) sepia(0.22) contrast(1.04) brightness(1.02); }
        .at-kenburns { transition: transform 6s cubic-bezier(0.16, 1, 0.3, 1); }
        .at-figure:hover .at-kenburns { transform: scale(1.07); }
        .at-dropcap::first-letter {
          font-size: 4.2em; float: left; line-height: 0.8;
          padding: 0.08em 0.12em 0 0; color: #6d1a2d; font-style: italic;
        }
        .at-rule { background: #1c1a17; height: 1px; }
      `}</style>

      {/* top bar */}
      <div className="at-sans flex items-center justify-between border-b border-[#1c1a17] px-4 py-2.5 text-[11px] font-medium tracking-[0.18em] uppercase sm:px-8">
        <span>Issue N°9 — Statuary</span>
        <span className="hidden sm:block">Spring / Summer 2027</span>
        <a href="#colophon" className="underline underline-offset-2 hover:text-[#6d1a2d]">Colophon</a>
      </div>

      {/* masthead */}
      <header className="border-b border-[#1c1a17] px-2 pt-6 pb-4 text-center">
        <h1 className="at-mast text-[13.5vw] leading-none font-medium tracking-[0.06em]">
          <span>ATELIER</span>
        </h1>
        <p className="at-sans mt-2 text-[10px] tracking-[0.35em] uppercase opacity-70">
          A journal of dress, drape & marble — published occasionally
        </p>
      </header>

      {/* cover story */}
      <section className="grid grid-cols-12 gap-x-4 px-4 pt-16 pb-24 sm:px-8">
        <p className="at-sans col-span-12 mb-8 text-[11px] font-medium tracking-[0.25em] uppercase sm:col-span-3">
          Cover story
          <span className="mt-2 block h-px w-12 bg-[#6d1a2d]" />
        </p>
        <div className="relative col-span-12 sm:col-span-6 sm:col-start-6">
          <figure className="at-figure at-unveil relative overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://picsum.photos/seed/atelier-cover/900/1200"
              alt="Cover look — draped fabric against stone"
              width={900}
              height={1200}
              className="at-img at-kenburns block h-auto w-full"
              loading="eager"
            />
          </figure>
          <figcaption className="at-sans mt-3 flex justify-between text-[10px] tracking-[0.2em] uppercase opacity-70">
            <span>Fig. 01 — the marble drape</span>
            <span>silk, quarried</span>
          </figcaption>
        </div>
        <h2 className="at-rise relative z-10 col-span-11 mt-10 text-[clamp(2.6rem,7vw,6rem)] leading-[1.02] font-medium sm:col-span-7 sm:col-start-1 sm:mt-[-3.5em]">
          The body is the
          <br />
          <em className="text-[#6d1a2d]">last plinth</em> we
          <br />
          dress for.
        </h2>
        <div className="at-rise col-span-12 mt-16 sm:col-span-4 sm:col-start-2">
          <p className="text-xl leading-relaxed">
            Six looks cut against the memory of stone: what the Greeks fixed in
            marble, we let move again. Every seam in this issue argues with a
            statue.
          </p>
          <p className="at-sans mt-6 text-[11px] tracking-[0.25em] uppercase opacity-70">
            Photography — R. Voss · Words — L. Almada
          </p>
        </div>
      </section>

      {/* spread */}
      <section className="grid grid-cols-12 items-start gap-x-4 gap-y-12 border-t border-[#1c1a17] px-4 py-24 sm:px-8">
        <div className="col-span-7 sm:col-span-4 sm:col-start-1">
          <figure className="at-figure at-unveil overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://picsum.photos/seed/atelier-fold/700/950"
              alt="Detail of folded fabric"
              width={700}
              height={950}
              className="at-img at-kenburns block h-auto w-full"
              loading="lazy"
            />
          </figure>
          <figcaption className="at-sans mt-3 text-[10px] tracking-[0.2em] uppercase opacity-70">
            Fig. 02 — the fold, insisting
          </figcaption>
        </div>
        <div className="col-span-8 col-start-5 mt-24 sm:col-span-3 sm:col-start-6 sm:mt-40">
          <figure className="at-figure at-unveil overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://picsum.photos/seed/atelier-stone/600/760"
              alt="Stone texture close-up"
              width={600}
              height={760}
              className="at-img at-kenburns block h-auto w-full"
              loading="lazy"
            />
          </figure>
          <figcaption className="at-sans mt-3 text-[10px] tracking-[0.2em] uppercase opacity-70">
            Fig. 03 — quarry, pre-couture
          </figcaption>
        </div>
        <blockquote className="at-rise col-span-12 sm:col-span-3 sm:col-start-10 sm:mt-16">
          <p className="text-[clamp(1.6rem,2.6vw,2.2rem)] leading-snug font-medium italic">
            “Drapery is gravity, edited.”
          </p>
          <cite className="at-sans mt-4 block text-[11px] font-medium tracking-[0.25em] uppercase not-italic opacity-70">
            — The cutting room
          </cite>
        </blockquote>
      </section>

      {/* horizontal gallery */}
      <section ref={galleryRef} className="overflow-x-auto border-t border-[#1c1a17]">
        <div className="flex h-screen flex-col justify-center">
          <div className="at-sans flex items-baseline justify-between px-4 pb-6 text-[11px] font-medium tracking-[0.25em] uppercase sm:px-8">
            <span>The collection — six looks</span>
            <span className="opacity-60">drag your scroll sideways</span>
          </div>
          <div ref={trackRef} className="flex w-max items-end gap-8 px-4 sm:gap-16 sm:px-8">
            {LOOKS.map((look, i) => (
              <figure key={look.n} className={`at-figure w-[68vw] shrink-0 sm:w-[26rem] ${i % 2 ? "mb-16" : ""}`}>
                <div className="overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://picsum.photos/seed/${look.seed}/700/900`}
                    alt={`Look ${look.n} — ${look.name}`}
                    width={700}
                    height={900}
                    className="at-img at-kenburns block h-auto w-full"
                    loading="lazy"
                  />
                </div>
                <figcaption className="mt-4 flex items-baseline justify-between gap-4">
                  <span className="text-3xl font-medium italic text-[#6d1a2d]">{look.n}</span>
                  <span className="text-xl font-medium">{look.name}</span>
                  <span className="at-sans flex-1 text-right text-[10px] tracking-[0.15em] uppercase opacity-60">
                    {look.note}
                  </span>
                </figcaption>
              </figure>
            ))}
            <div className="flex w-[40vw] shrink-0 items-center justify-center sm:w-96">
              <p className="max-w-[16rem] text-center text-2xl leading-snug italic">
                — and the wind machine, <span className="text-[#6d1a2d]">always.</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* essay */}
      <section className="border-t border-[#1c1a17] px-4 py-24 sm:px-8">
        <div className="mx-auto max-w-4xl">
          <p className="at-sans mb-10 text-[11px] font-medium tracking-[0.25em] uppercase">
            Essay — on standing still
            <span className="mt-2 block h-px w-12 bg-[#6d1a2d]" />
          </p>
          <div className="at-rise at-dropcap gap-10 text-lg leading-relaxed sm:columns-2">
            <p>
              Statues are the only audience that never fidgets. For two thousand
              years they have stood in contrapposto — weight on one hip, cloth
              arrested mid-slide — while fashion sprinted past them in every
              direction and came back, breathless, to copy the pose.
            </p>
            <p className="mt-6">
              This issue began in a museum queue. A security guard told us to
              stop touching the plinth, and she was right: we wanted to know
              what the stone hem felt like. The answer, after four months in
              the cutting room, is that it feels like organza held by three
              stitches and a prayer — permanence is just tension, distributed.
            </p>
            <p className="mt-6">
              So the collection does not imitate marble. It negotiates with it.
              Wool where the Greeks lied about weight, bias silk where they told
              the truth about skin, one raw edge left arguing — because a statue
              is finished, and a garment, mercifully, never is.
            </p>
          </div>
        </div>
      </section>

      {/* colophon */}
      <footer id="colophon" className="border-t border-[#1c1a17] bg-[#1c1a17] text-[#f4efe6]">
        <div className="grid grid-cols-12 gap-y-8 px-4 py-16 sm:px-8">
          <p className="col-span-12 text-4xl font-medium italic sm:col-span-5">
            Atelier, <span className="text-[#c98a9b]">occasionally.</span>
          </p>
          <div className="at-sans col-span-6 text-[11px] leading-loose tracking-[0.15em] uppercase opacity-80 sm:col-span-3 sm:col-start-7">
            <p>Editor — V. Duarte</p>
            <p>Cutting — Maison floor 3</p>
            <p>Type — Cormorant & Karla</p>
          </div>
          <div className="at-sans col-span-6 text-right text-[11px] leading-loose tracking-[0.15em] uppercase opacity-80 sm:col-span-3">
            <p>A fictional publication</p>
            <p>№ 9 — Statuary</p>
            <Link href="/atelier/guide" className="underline underline-offset-2 hover:text-[#c98a9b]">
              How this page was built →
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
