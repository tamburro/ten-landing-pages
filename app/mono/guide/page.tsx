import type { Metadata } from "next";
import { Guide } from "@/components/Guide";

export const metadata: Metadata = {
  title: "MONO® — build guide",
};

export default function MonoGuide() {
  return (
    <Guide
      slug="mono"
      title="MONO®"
      tagline="Brutalist typography where the type is the layout, driven by GSAP SplitText choreography."
    >
      <h2>The one idea</h2>
      <p>
        No imagery, no gradients, no rounded corners. The page is set in a single family
        (Archivo, weights 400–900), sized in viewport units so the headline <em>is</em> the
        hero — <code>15.5vw</code> with <code>0.83</code> line-height and −3% tracking. Color
        budget: black, white, and one red (<code>#ff2b00</code>) used only where it hurts.
      </p>

      <h2>SplitText choreography</h2>
      <ul>
        <li>
          <strong>Hero slam:</strong> <code>SplitText</code> splits each line into chars, which
          rise from <code>yPercent: 108</code> with 6° of rotation inside{" "}
          <code>overflow: hidden</code> lines. An 18&nbsp;ms linear stagger reads as a typewriter
          burst rather than a fade.
        </li>
        <li>
          <strong>Manifesto ink-in:</strong> split into words, then a scrubbed{" "}
          <code>ScrollTrigger</code> tweens each word from light gray to black. Reading speed is
          controlled by scroll speed — the paragraph literally prints as you move.
        </li>
        <li>
          <strong>Section labels</strong> use a zero-duration opacity stagger — characters appear
          one at a time with no easing, a deliberately mechanical, teletype feel.
        </li>
        <li>
          Splitting waits for <code>document.fonts.ready</code> so line boxes are measured against
          the real font, not the fallback.
        </li>
      </ul>

      <h2>Details that carry the style</h2>
      <ul>
        <li>
          <strong>Outlined display type</strong> via <code>-webkit-text-stroke</code> on the last
          hero line ("shout.") — the loudest word is the only hollow one.
        </li>
        <li>
          <strong>Cursor-following work previews:</strong> a fixed 240×160 frame driven by{" "}
          <code>gsap.quickTo</code> (x/y with <code>power3.out</code>), so it trails the pointer
          with inertia. Images are picsum seeds forced to grayscale — even the photography obeys
          the palette.
        </li>
        <li>
          <strong>Structural borders:</strong> 4px black rules divide every section; the header is
          a row of hard-bordered cells, like a letterpress lockup. Hover states invert cells to
          solid black or red — no soft transitions of anything except background-color.
        </li>
        <li>
          <strong>Footer marquee:</strong> a 9vw email address looping via a CSS transform
          animation (content duplicated once, translated −50%), pattern borrowed from Magic UI's
          marquee and stripped of everything gentle.
        </li>
      </ul>

      <h2>Accessibility</h2>
      <ul>
        <li>
          <code>prefers-reduced-motion</code> disables the char slam, converts the manifesto scrub
          into a non-scrubbed reveal, and stops the marquee.
        </li>
        <li>
          The marquee text is <code>aria-hidden</code>; the link carries an{" "}
          <code>aria-label</code> with the actual email address.
        </li>
      </ul>

      <h2>Libraries</h2>
      <p>GSAP (SplitText, ScrollTrigger, quickTo), Tailwind, Archivo via next/font.</p>
    </Guide>
  );
}
