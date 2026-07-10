import type { Metadata } from "next";
import { Guide } from "@/components/Guide";

export const metadata: Metadata = {
  title: "ATELIER — build guide",
};

export default function AtelierGuide() {
  return (
    <Guide
      slug="atelier"
      title="ATELIER N°9"
      tagline="An editorial issue as a landing page — the craft here is art direction: asymmetric grid, type hierarchy, and restraint."
    >
      <h2>The one idea</h2>
      <p>
        Treat the landing page as a <strong>magazine issue</strong>, not a product pitch. There is
        a masthead, a cover story, figures with captions, a pull quote, an essay set in two
        columns with a drop cap, and a colophon. The visual power comes from layout decisions,
        not effects — this page deliberately has the quietest motion of the ten.
      </p>

      <h2>The grid (and how it&apos;s broken)</h2>
      <ul>
        <li>
          Everything sits on an explicit 12-column grid (<code>grid-cols-12</code>). Images land
          on odd placements — a cover image at columns 6–11, a supporting figure at 6–8 pushed
          down 10rem — so white space is always asymmetric but never accidental.
        </li>
        <li>
          The cover headline overlaps the photograph with a negative top margin
          (<code>mt-[-3.5em]</code>) and a higher z-index: type over image, the oldest editorial
          trick, doing the work a WebGL scene does elsewhere in this repo.
        </li>
        <li>
          Hairline rules (<code>1px</code> black borders) separate sections like a broadsheet;
          the burgundy <code>#6d1a2d</code> appears only in italics, figure numerals, and one
          12px underline — an accent used like a signature.
        </li>
      </ul>

      <h2>Image treatment without assets</h2>
      <p>
        All photography is picsum placeholders unified by one CSS filter chain:{" "}
        <code>grayscale(1) sepia(0.22) contrast(1.04)</code>. Any random image becomes part of
        the same warm-stone duotone world — art direction as a filter, reproducible with zero
        asset pipeline. Hovering a figure runs a 6-second ken-burns zoom on a{" "}
        <code>cubic-bezier(0.16,1,0.3,1)</code> curve: slow enough to feel archival.
      </p>

      <h2>Motion, sparingly</h2>
      <ul>
        <li>
          <strong>Masthead:</strong> the word ATELIER tightens from{" "}
          <code>letter-spacing: 0.4em → 0.06em</code> while fading in — type setting itself.
        </li>
        <li>
          <strong>Unveils:</strong> images reveal with a <code>clip-path: inset()</code> wipe
          from bottom, like cloth pulled off a statue. The element never moves, only its window
          does — so there&apos;s no layout shift.
        </li>
        <li>
          <strong>Pinned horizontal gallery:</strong> the section pins and GSAP scrubs the track
          by <code>−(scrollWidth − innerWidth)</code> with{" "}
          <code>invalidateOnRefresh</code> for resize safety. Under{" "}
          <code>prefers-reduced-motion</code> the pin is never created and the same track is a
          native <code>overflow-x</code> scroller — the fallback is the feature.
        </li>
      </ul>

      <h2>Typography</h2>
      <p>
        Cormorant Garamond carries all display and body text; italics are reserved for the
        "spoken" register (quotes, the last word of a sentence that wants a raised eyebrow).
        Karla, always uppercase, tracked +15–35%, handles captions, credits, and running heads —
        the "printed margins" voice. Two families, two jobs, no exceptions.
      </p>

      <h2>Libraries</h2>
      <p>GSAP + ScrollTrigger only. No canvas, no WebGL — the point of this page is that taste scales down.</p>
    </Guide>
  );
}
