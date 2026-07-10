import type { Metadata } from "next";
import { Guide } from "@/components/Guide";

export const metadata: Metadata = {
  title: "Helios — build guide",
};

export default function HeliosGuide() {
  return (
    <Guide
      slug="helios"
      title="Helios"
      tagline="A procedural sun rendered as a single GLSL fragment shader, framed by a restrained solar-orange design system."
    >
      <h2>The one idea</h2>
      <p>
        The entire hero is <strong>one fullscreen quad and one fragment shader</strong>. No
        textures, no models, no post-processing stack — the sun, its corona, the granulated
        photosphere, sunspots, dust and film grain are all math evaluated per pixel. That keeps the
        page at zero image assets and makes the hero resolution-independent.
      </p>

      <h2>Shader construction</h2>
      <ul>
        <li>
          <strong>Value-noise fbm</strong> (5 octaves, rotated each octave with a fixed 2×2 matrix)
          is the only primitive. Everything else is composition.
        </li>
        <li>
          <strong>Corona:</strong> a radial glow <code>pow(r/d, 1.85)</code> modulated by two fbm
          layers sampled in <em>polar coordinates</em> — one low-frequency layer for big flares
          (angle × 2.5), one high-frequency shimmer (angle × 6). Animating the radial coordinate
          against time makes flares crawl outward.
        </li>
        <li>
          <strong>Photosphere:</strong> classic <em>domain warping</em> —{" "}
          <code>fbm(p + fbm(p)·1.25 + t)</code> — mapped between a deep orange and a pale amber.
          Limb darkening is a smoothstep on distance from center; sunspots are a thresholded second
          fbm sample multiplied in.
        </li>
        <li>
          <strong>Finish:</strong> exposure tonemap <code>1 − exp(−col·1.65)</code>, vignette, and
          a hash-based animated grain so flat areas never band.
        </li>
      </ul>

      <h2>Wiring it to the page</h2>
      <ul>
        <li>
          Three.js renders the quad with an <code>OrthographicCamera</code> and a passthrough
          vertex shader. Pixel ratio is clamped to 2.
        </li>
        <li>
          A GSAP <code>ScrollTrigger</code> on the hero writes its progress into a ref that the
          render loop reads as the <code>uScroll</code> uniform — the sun sinks below the horizon
          as you scroll, so the shader and the scroll are one system rather than a video playing
          behind text.
        </li>
        <li>
          Mouse position is lerped (×0.04 per frame) before it reaches <code>uMouse</code>, giving
          the parallax a heavy, inertial feel.
        </li>
        <li>
          The render loop pauses on <code>visibilitychange</code> and when an{" "}
          <code>IntersectionObserver</code> reports the canvas offscreen. With{" "}
          <code>prefers-reduced-motion</code>, a single frame is rendered and the loop never
          starts.
        </li>
      </ul>

      <h2>Design system</h2>
      <ul>
        <li>
          Palette: near-black <code>#050403</code>, signal orange <code>#ff6b1a</code>, amber{" "}
          <code>#ffc861</code>, warm gray <code>#c9b8a4</code>. Everything warm — even the borders
          are dark umber (<code>#2a1c10</code>), not gray.
        </li>
        <li>
          Type: Space Grotesk for display, IBM Plex Mono for the "telemetry" voice (nav, ticker,
          stat labels). The two voices — poetic display copy vs. dry market data — carry the
          concept.
        </li>
        <li>
          Motion: masked line reveals on the headline (<code>yPercent: 110 → 0</code> inside{" "}
          <code>overflow: hidden</code> spans), scroll-triggered fades, and GSAP-tweened number
          counters. The CSS ticker duplicates its content once and translates −50% for a seamless
          loop.
        </li>
      </ul>

      <h2>Libraries</h2>
      <p>
        Three.js (renderer + ShaderMaterial), GSAP + ScrollTrigger, Tailwind. The ticker pattern is
        adapted from Magic UI's marquee; everything else is hand-written.
      </p>
    </Guide>
  );
}
