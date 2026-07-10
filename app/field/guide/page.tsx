import type { Metadata } from "next";
import { Guide } from "@/components/Guide";

export const metadata: Metadata = {
  title: "FIELD — build guide",
};

export default function FieldGuide() {
  return (
    <Guide
      slug="field"
      title="FIELD"
      tagline="Seeded generative flow fields on a strict Swiss grid — the artwork is a number, and the number is the product."
    >
      <h2>The one idea</h2>
      <p>
        Determinism as a brand. Every canvas is drawn by the same algorithm from a single integer
        seed, so "edition № 0088" isn&apos;t a metaphor — type 88 back in and the identical
        drawing re-happens. The page sells reproducible wind.
      </p>

      <h2>The generative system</h2>
      <ul>
        <li>
          <strong>PRNG:</strong> <code>mulberry32</code> — 5 lines, fast, and fully deterministic
          per seed. Every random decision (noise lattice, particle spawns, lifespans, which
          particles carry red) draws from it in a fixed order; that ordering discipline is what
          makes editions reproducible.
        </li>
        <li>
          <strong>Field:</strong> a 64×64 lattice of seeded values, bilinearly interpolated with
          smoothstep and stacked into 4 fbm octaves. Steering: <code>angle = fbm · 4π</code> — the
          ×4π (two full turns) is what produces loops and eddies instead of gentle drift.
        </li>
        <li>
          <strong>Advection:</strong> 900 particles at constant speed, variable heading. Each
          leaves a 0.75px stroke at 5.5% alpha — darkness accumulates where paths agree, which is
          why dense currents emerge without ever being drawn.
        </li>
        <li>
          <strong>Fixing:</strong> particles have lifespans; the simulation stops at a fixed step
          count. The hero draws itself live over ~8 seconds (5 sim-steps per rAF); gallery pieces
          start when scrolled into view and then freeze. Under{" "}
          <code>prefers-reduced-motion</code> everything renders synchronously to its final
          state.
        </li>
        <li>
          The six gallery editions vary only <code>scale</code> (noise zoom) and{" "}
          <code>redRatio</code> — same algorithm, radically different weather.
        </li>
      </ul>

      <h2>Swiss system</h2>
      <ul>
        <li>
          Paper <code>#f7f7f4</code>, carbon <code>#111</code>, and Swiss poster red{" "}
          <code>#e30613</code> used three ways only: section numerals, the full stop in the
          wordmark, and the red particles inside the art itself — the accent color literally
          participates in the artwork.
        </li>
        <li>
          Everything, including the footer, sits on the same 12-column grid with 1px rules.
          Inter does the headlines (tight tracking, bold); Fragment Mono does the catalog voice
          (edition numbers, parameters).
        </li>
        <li>
          The only "interaction design" is one button: <em>regenerate ↻</em> reseeds the hero and
          the caption switches from "drawing…" to "fixed. 900 particles at rest".
        </li>
      </ul>

      <h2>Performance notes</h2>
      <ul>
        <li>Canvases render at <code>devicePixelRatio</code> (capped 2) for print-crisp hairlines.</li>
        <li>Gallery pieces draw once via IntersectionObserver and never re-render; there is no persistent animation loop anywhere on the page after the drawings fix.</li>
        <li>No GSAP, no Three.js — the entire page is one 2D canvas algorithm and CSS.</li>
      </ul>

      <h2>Libraries</h2>
      <p>None beyond React and Tailwind. The flow-field renderer is ~90 lines of hand-written canvas code.</p>
    </Guide>
  );
}
