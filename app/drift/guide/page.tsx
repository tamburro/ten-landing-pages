import type { Metadata } from "next";
import { Guide } from "@/components/Guide";

export const metadata: Metadata = {
  title: "DRIFT — build guide",
};

export default function DriftGuide() {
  return (
    <Guide
      slug="drift"
      title="DRIFT"
      tagline="A scroll-driven descent where color is depth: one master ScrollTrigger turns the page into a dive profile."
    >
      <h2>The one idea</h2>
      <p>
        The scrollbar is a depth gauge. One <strong>master ScrollTrigger</strong> spans the whole
        document (<code>start: "top top", end: "bottom bottom"</code>) and drives everything
        global: an 8-stop background-color timeline from surface glare (<code>#cfe9f4</code>) to
        hadal black (<code>#01060d</code>), the ink color (a CSS variable tweened alongside it),
        the fixed depth readout (0 → −10,911 m), the gauge thumb, and the fade-out of the
        surface light rays. Scene-level effects then hang off their own local triggers.
      </p>

      <h2>Scroll choreography</h2>
      <ul>
        <li>
          <strong>Color timeline:</strong> sequential <code>backgroundColor</code> +{" "}
          <code>--ink</code> tweens with <code>ease: "none"</code>, each with a duration equal to
          its share of the dive, scrubbed at 0.3s of lag so it feels like water resistance rather
          than a scroll listener.
        </li>
        <li>
          <strong>Pinned fact sequence (twilight zone):</strong> a 320vh section with a{" "}
          <code>position: sticky</code> viewport. A scrubbed timeline fades three facts through the
          same 12rem box — in from below, hold, out through the top — so the reader "sinks past"
          each one.
        </li>
        <li>
          <strong>Submersible fly-through:</strong> a hand-drawn SVG submarine (ellipse hull,
          riveted, one Bowie cassette) tweened from <code>xPercent −120 → 120</code> against its
          section's own bottom→top progress, so it crosses exactly while visible.
        </li>
        <li>
          <strong>Pressure counter:</strong> a scrubbed tween of a plain object (
          <code>1 → 1,086 atm</code>) written into the DOM on update — pressure rises only if you
          keep pushing down.
        </li>
      </ul>

      <h2>Ambient systems</h2>
      <ul>
        <li>
          <strong>Marine snow:</strong> a fixed 150-particle canvas. Particles read the master
          progress each frame: density and fall speed ramp with depth, and 18% of them switch to
          pulsing cyan <em>bioluminescence</em> — but only after 42% depth, where the palette has
          gone dark enough to sell the glow.
        </li>
        <li>
          <strong>Light rays:</strong> four blurred white gradient blades, opacity{" "}
          <code>1 − 4.5·progress</code>, gone by 200&nbsp;m like real sunlight.
        </li>
        <li>
          <strong>Glowing words:</strong> "it is language." flickers on word by word with a
          tweened cyan <code>text-shadow</code> when the midnight section enters.
        </li>
      </ul>

      <h2>Type & voice</h2>
      <p>
        Fraunces (light, with italics as the "poetic" register) against Azeret Mono for
        instrument readouts. The mono voice always reports coordinates and telemetry; the serif
        voice does the wondering. Copy stays factual — everything stated about the ocean is true,
        which is what makes the fictional expedition feel real.
      </p>

      <h2>Performance & accessibility</h2>
      <ul>
        <li>DOM writes in <code>onUpdate</code> go straight to refs — no React re-renders during scroll.</li>
        <li>The snow canvas pauses on <code>visibilitychange</code> and never starts under <code>prefers-reduced-motion</code>; reveals collapse to simple fades.</li>
        <li>The depth gauge and rays are <code>aria-hidden</code>; the narrative reads top-to-bottom as plain text.</li>
      </ul>

      <h2>Libraries</h2>
      <p>GSAP + ScrollTrigger, one hand-authored SVG, a 2D canvas. No Three.js — the depth here is theatrical, not geometric.</p>
    </Guide>
  );
}
