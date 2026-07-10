import type { Metadata } from "next";
import { Guide } from "@/components/Guide";

export const metadata: Metadata = {
  title: "bloom — build guide",
};

export default function BloomGuide() {
  return (
    <Guide
      slug="bloom"
      title="bloom"
      tagline="A page that is almost entirely a color system: animated canvas mesh gradients, glass surfaces, and a product bottle made of CSS."
    >
      <h2>The one idea</h2>
      <p>
        The craft being pushed here is <strong>color</strong>. Five pastels — blush{" "}
        <code>#f9a8d4</code>, periwinkle <code>#a5b4fc</code>, mint <code>#a7f3d0</code>, butter{" "}
        <code>#fde68a</code>, lavender <code>#c4b5fd</code> — plus one plum ink for text. Every
        surface, border, shadow and accent is drawn from that set, and the shadows themselves are
        tinted (<code>rgba(180,140,200,…)</code>) so nothing on the page casts a gray shadow.
      </p>

      <h2>The mesh gradient trick</h2>
      <p>
        The hero background is a canvas painted at <strong>160×100 pixels</strong> — deliberately
        tiny. Five radial-gradient blobs drift on lissajous curves (
        <code>sin(t·fx+phase)</code>, <code>cos(t·fy+phase)</code>) and are composited with{" "}
        <code>globalCompositeOperation: "lighter"</code>, which is what makes overlapping pastels
        go iridescent instead of muddy. The canvas is then stretched to full size with CSS and
        smoothed with <code>blur(24px) saturate(1.15)</code>. Cost per frame: five gradients on a
        16k-pixel buffer — effectively free, yet it reads as a living mesh gradient.
      </p>

      <h2>A bottle with no image</h2>
      <p>
        The product shot is a stack of divs: a frosted vessel (<code>bg-white/25</code> +{" "}
        <code>backdrop-blur-xl</code> + tinted drop shadow), an inner liquid gradient, a specular
        streak (a blurred white bar), and a translucent label. Because it&apos;s glass over the
        animated gradient, the "product photography" changes color continuously — the mesh does
        the lighting. It floats on a 3.2s sine yoyo tween.
      </p>

      <h2>Component patterns, customized</h2>
      <ul>
        <li>
          <strong>Ingredient marquee</strong> — the Magic UI marquee pattern (duplicate content,
          translate −50%), restyled as pharmacy pills where border and fill cycle through the five
          pastels in order.
        </li>
        <li>
          <strong>Animated gradient border</strong> — the hero bento card wraps itself in a
          rotating conic gradient of all five colors, animated via a registered CSS{" "}
          <code>@property --bl-angle</code> so the <em>angle itself</em> is tweened by the
          browser (no transform hacks).
        </li>
        <li>
          <strong>Bento grid</strong> — a 5-column grid with one 3×2 thesis card; every card is
          glass (<code>bg-white/70</code> + blur) so the page background stays part of every
          surface.
        </li>
        <li>
          <strong>pH ticker</strong> — a GSAP-tweened number that settles on 5.5 when the card
          scrolls in.
        </li>
      </ul>

      <h2>Restraint rules</h2>
      <ul>
        <li>Type is Outfit (light–semibold) with Instrument Serif italic as the "handwritten margin note" voice.</li>
        <li>Radii are large everywhere (<code>rounded-3xl</code>, full pills) — there is not one sharp corner on the page.</li>
        <li>Reduced motion: gradients render a single static frame; marquee and border rotation stop; reveals are skipped.</li>
      </ul>

      <h2>Libraries</h2>
      <p>GSAP + ScrollTrigger, 2D canvas, Tailwind. Marquee and animated-border patterns adapted from the Magic UI registry, rebuilt without dependencies.</p>
    </Guide>
  );
}
