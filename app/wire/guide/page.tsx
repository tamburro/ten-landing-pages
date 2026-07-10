import type { Metadata } from "next";
import { Guide } from "@/components/Guide";

export const metadata: Metadata = {
  title: "wire — build guide",
};

export default function WireGuide() {
  return (
    <Guide
      slug="wire"
      title="wire_"
      tagline="A CRT terminal as a landing page: the entire aesthetic is three CSS layers, a typed boot sequence, and restraint about when to glow."
    >
      <h2>The one idea</h2>
      <p>
        The page pretends to be the product. A dev tool that lives in your terminal gets a landing
        page that <em>is</em> a terminal — the hero literally boots: the command types itself,
        logs stream in with real severity colors, an anomaly gets flagged, and the prompt returns.
        The pitch is a demo you watch in the first four seconds.
      </p>

      <h2>The CRT, decomposed</h2>
      <ul>
        <li>
          <strong>Scanlines:</strong> one fixed <code>::before</code> with a 3px{" "}
          <code>repeating-linear-gradient</code> — two transparent pixels, one 22%-black pixel.
        </li>
        <li>
          <strong>Tube vignette:</strong> a fixed <code>::after</code> with a radial gradient
          darkening the corners, plus a 5s "phosphor breathing" opacity loop.
        </li>
        <li>
          <strong>Glow:</strong> a two-layer <code>text-shadow</code> (6px tight + 24px wide at
          low alpha), applied <em>only</em> to display-size text. Body text never glows — that&apos;s
          what keeps it legible and stops the page from reading as a Halloween costume.
        </li>
        <li>
          <strong>Type:</strong> VT323 (a genuine bitmap-terminal face) for display, JetBrains
          Mono for body. The logo is hand-drawn ASCII in a <code>&lt;pre&gt;</code>.
        </li>
      </ul>

      <h2>The boot sequence</h2>
      <p>
        A ~30-line hook types the command character by character (randomized 28–74ms per
        keystroke — uniform delays read as fake), then releases the log lines on per-line delays
        tuned like real log bursts: fast 200s, a pause before the WARN, a longer beat before the
        summary. Everything is React state driven by <code>setTimeout</code> chains with full
        cleanup; under <code>prefers-reduced-motion</code> the terminal renders fully booted.
      </p>

      <h2>Other systems</h2>
      <ul>
        <li>
          <strong>Scramble headings</strong> — adapted from Magic UI&apos;s hyper-text, rebuilt as
          a dependency-free rAF loop: characters resolve left-to-right over 900ms from a pool of
          block/box glyphs (<code>▓▒░&lt;&gt;/…</code>), triggered once by IntersectionObserver.
          The real text sits in <code>aria-label</code> the whole time.
        </li>
        <li>
          <strong>Phosphor grid</strong> — Magic UI&apos;s flickering-grid pattern, re-implemented
          with a <code>Float32Array</code> of cell opacities, 3px cells, green only, paused
          offscreen via IntersectionObserver.
        </li>
        <li>
          <strong>Severity palette</strong> — the only non-green pixels on the page are the WARN
          amber and ERROR red inside the terminal, which makes the fake logs scan like real ones.
        </li>
      </ul>

      <h2>Libraries</h2>
      <p>
        None beyond React and Tailwind — no GSAP, no Three.js. The constraint is the concept:
        everything a 1978 terminal could do, and nothing it couldn&apos;t.
      </p>
    </Guide>
  );
}
