import type { Metadata } from "next";
import { Guide } from "@/components/Guide";

export const metadata: Metadata = {
  title: "RUPTURA — build guide",
};

export default function KineticGuide() {
  return (
    <Guide
      slug="kinetic"
      title="RUPTURA FEST"
      tagline="Kinetic typography that answers the scroll: marquees accelerate with your momentum and the display type skews with it."
    >
      <h2>The one idea</h2>
      <p>
        The page has a nervous system. A single global ScrollTrigger reads{" "}
        <code>self.getVelocity()</code> on every scroll event and feeds two systems: the marquee
        bands&apos; <strong>timeScale</strong> (cruise speed 1, clamped up to 9× when you flick)
        and a <strong>skewX</strong> on the big type (±10°, via <code>gsap.quickTo</code> so it
        springs back). A ticker lerps everything toward rest — momentum with decay, not a switch.
      </p>

      <h2>Velocity marquees</h2>
      <ul>
        <li>
          Each band is the classic duplicated-content loop (content ×2, tween{" "}
          <code>xPercent 0 → −50</code>, <code>repeat: -1</code>, linear), alternating direction
          per row.
        </li>
        <li>
          Speed changes never jump: the scroll handler only writes a <em>target</em>; a{" "}
          <code>gsap.ticker</code> callback eases each tween&apos;s <code>timeScale</code> toward
          it (×0.1 per frame) while the target itself decays toward 1 (×0.04). Two nested lerps
          give the "heavy flywheel" feel.
        </li>
        <li>
          The middle band says <em>SCROLL RÁPIDO = TIPO RÁPIDO — TESTA</em> ("scroll fast = fast
          type — try it"): the page documents its own mechanic.
        </li>
      </ul>

      <h2>Acid design system</h2>
      <ul>
        <li>
          Palette: black, acid <code>#d8ff00</code>, magenta <code>#ff00c8</code>, white — nothing
          else. The hero stacks three copies of RUPTURA at 19vw in Anton: acid outline, acid fill,
          magenta outline, each slamming in from below with rotation.
        </li>
        <li>
          A fixed <strong>SVG noise overlay</strong> (inline <code>feTurbulence</code> data-URI at
          7% opacity) grunges every flat color — the cheapest possible "print" texture, zero
          assets.
        </li>
        <li>
          The starburst badge is a generated 16-spike polygon rotating on a CSS animation; the
          barcode on each ticket is an array of hardcoded widths (deterministic — no hydration
          mismatch), heights varied by <code>(i·13) % 40</code>.
        </li>
        <li>
          Lineup rows enter with <code>back.out</code> overshoot and alternating tilt; the
          manifesto strip is a section rotated −2° — the layout itself misbehaves, on purpose,
          in exactly one place.
        </li>
      </ul>

      <h2>PT-BR as a design choice</h2>
      <p>
        The copy is in Brazilian Portuguese — a São Paulo warehouse festival shouldn&apos;t speak
        landing-page English. Voice is part of the identity system, same as the palette.
      </p>

      <h2>Accessibility</h2>
      <ul>
        <li>Marquee bands and the starburst are <code>aria-hidden</code>; duplicate hero layers too — only one RUPTURA is read.</li>
        <li>Reduced motion: no marquee tweens, no skew, no spin; rows appear without entrance animations.</li>
      </ul>

      <h2>Libraries</h2>
      <p>GSAP (ScrollTrigger, quickTo, ticker), Tailwind, one inline SVG filter.</p>
    </Guide>
  );
}
