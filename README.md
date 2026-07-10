# LPS — ten landing pages

Ten portfolio-grade landing pages in one Next.js app. Each page is a different fictional brand, built to push a different craft as hard as possible — and **no two pages share a template, palette, typeface, or motion language**.

Everything is authored in code: no image assets, no AI-generated media. Photography placeholders come from [picsum.photos](https://picsum.photos); everything else is procedural (GLSL, canvas, SVG, CSS).

## The ten

| # | Route | Brand | Craft it pushes | Signature technique |
|---|-------|-------|-----------------|---------------------|
| 01 | [/helios](app/helios/page.tsx) | Helios — utility-scale solar | Custom GLSL | A procedural sun: fbm corona flares in polar coordinates, domain-warped photosphere, all in one fragment shader on a fullscreen quad |
| 02 | [/mono](app/mono/page.tsx) | MONO® — design studio | Brutalist typography | GSAP SplitText choreography: char-slam hero, scroll-scrubbed word-by-word manifesto, cursor-trailing work previews |
| 03 | [/drift](app/drift/page.tsx) | DRIFT — deep-sea institute | Scroll narrative | One master ScrollTrigger turns the scrollbar into a dive profile: 8-stop color timeline, anchored depth gauge, bioluminescent marine snow |
| 04 | [/morph](app/morph/page.tsx) | morph* — AI infrastructure | GPU particles | 30k particles morphing chaos → sphere → torus knot → galaxy, interpolated entirely in the vertex shader with per-particle stagger |
| 05 | [/atelier](app/atelier/page.tsx) | ATELIER N°9 — fashion journal | Editorial art direction | Asymmetric 12-col grid, clip-path unveils, pinned horizontal gallery, one CSS filter chain unifying all photography |
| 06 | [/bloom](app/bloom/page.tsx) | bloom — skincare | Color systems | Animated mesh gradients (160×100 canvas, lissajous blobs, CSS-blurred), glass surfaces, a product bottle made of pure CSS |
| 07 | [/wire](app/wire/page.tsx) | wire — dev tool | Retro CRT effects | A terminal that boots itself: typed command, streaming logs, scramble-decode headings, phosphor flicker grid — zero animation libraries |
| 08 | [/kinetic](app/kinetic/page.tsx) | RUPTURA — music festival | Kinetic type | Velocity-reactive marquees (scroll speed drives timeScale) and momentum skew on display type, in acid yellow/magenta |
| 09 | [/orbital](app/orbital/page.tsx) | ORBITAL OS-1 — glass object | Physical 3D | MeshPhysicalMaterial glass (transmission, IOR 1.52, iridescence) with a scroll-scrubbed camera rig doing a product shoot |
| 10 | [/field](app/field/page.tsx) | FIELD — generative studio | Procedural canvas art | Seeded flow fields: mulberry32 + fbm advection, 900 particles of accumulating ink — every artwork reproducible from its number |

Every page has a **build guide** at `/<slug>/guide` (e.g. [/helios/guide](app/helios/guide/page.tsx)) explaining the techniques, decisions, and code behind it.

## Stack

- **Next.js 16** (App Router, all routes statically prerendered)
- **GSAP 3.15** — ScrollTrigger, SplitText, quickTo, ticker (all plugins now free)
- **Three.js** — raw WebGL, no react-three-fiber; used on 3 of 10 pages
- **Tailwind CSS 4**
- Component/motion primitives adapted from the [Magic UI](https://magicui.design) registry (marquee, flickering grid, hyper-text, animated borders), rebuilt dependency-free and heavily customized

## Shared rules

Every page independently follows the same constraints:

- `prefers-reduced-motion` collapses every continuous/scroll-driven animation to a sensible static state
- Render loops pause on `visibilitychange` and offscreen (IntersectionObserver); Three.js scenes fully dispose on unmount
- Decorative layers are `aria-hidden`; content reads top-to-bottom as plain text
- No binary assets in the repo

## Run it

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the index of all ten.

## Structure

```
app/
  page.tsx            ← index listing the ten pages
  <slug>/
    layout.tsx        ← fonts (next/font) + metadata for that brand
    page.tsx          ← the landing page (client component)
    guide/page.tsx    ← write-up of how it was built
components/Guide.tsx  ← shared shell for the guide pages only
```

---

All brands are fictional. Built as a portfolio piece exploring how far web craft can go with zero assets.
