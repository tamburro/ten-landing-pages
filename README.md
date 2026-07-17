# LPS — forty landing pages

Forty landing pages in one Next.js app, in two series:

- **Craft series (10)** — each page is a fictional brand pushing a different craft as hard as possible. No two pages share a template, palette, typeface, or motion language.
- **Conversion series (30)** — subscription landing pages (digital + print) for two Brazilian newspapers: 15 for **O GLOBO** and 15 for **Valor Econômico**. Each brand keeps a consistent identity (type + color) while every page attacks conversion from a different angle. Concept/portfolio work — no official affiliation, illustrative prices.

Everything is authored in code: no image assets, no AI-generated media. Photography placeholders come from [picsum.photos](https://picsum.photos); everything else is procedural (GLSL, canvas, SVG, CSS). The index at `/` is the menu for all forty.

## Craft series

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

## Conversion series — O GLOBO

| # | Route | Angle | Signature move |
|---|-------|-------|----------------|
| 11 | [/globo/heranca](app/globo/heranca/page.tsx) | Authority by archive | The landing as a front page: masthead, rules, justified columns, historic-headline ticker, sticky CTA bar |
| 12 | [/globo/agora](app/globo/agora/page.tsx) | Honest urgency | Live newsroom: breaking ticker, real clock, stories-today counter, countdown that actually expires at midnight |
| 13 | [/globo/familia](app/globo/familia/page.tsx) | Value reframing | 4 profiles / 1 price, comparison table with anchored middle column, native `<details>` FAQ |
| 14 | [/globo/rio](app/globo/rio/page.tsx) | Local belonging | Dawn gradient + hand-drawn SVG skyline (Dois Irmãos → Corcovado → Pão de Açúcar), neighborhood delivery cloud |
| 15 | [/globo/anual](app/globo/anual/page.tsx) | Single offer | A 17rem "40%" as the hero, savings counter translated into coffee, 2-column monthly vs annual |
| 16 | [/globo/colunistas](app/globo/colunistas/page.tsx) | Parasocial bond | "Assine pessoas, não páginas" — rotating pull quotes, 6-voice grid |
| 17 | [/globo/estudante](app/globo/estudante/page.tsx) | Student utility | Notebook UI (ruled lines + pink margin in CSS), self-painting highlighter, "already fell on the exam" proof |
| 18 | [/globo/fimdesemana](app/globo/fimdesemana/page.tsx) | Hybrid downsell | Screen on weekdays, paper on weekends — section cards scatter across the "Saturday table" |
| 19 | [/globo/verdade](app/globo/verdade/page.tsx) | Trust as product | The rumor gets struck through and stamped NÃO CHECADO; boato × fato pairs with checking time |
| 20 | [/globo/presente](app/globo/presente/page.tsx) | Gifting | Live gift-card configurator: occasion, duration and a message typed straight onto the card |
| 21 | [/globo/app](app/globo/app/page.tsx) | Product demo | A CSS-built iPhone running the app: auto-scrolling feed, push notification on demand, working dark-mode toggle |
| 22 | [/globo/amanha](app/globo/amanha/page.tsx) | Curiosity gap | Tomorrow's front page (with the visitor's real tomorrow date) rendered in HTML — blurred behind a padlock |
| 23 | [/globo/jogos](app/globo/jogos/page.tsx) | Habit-first | A fully playable word-of-the-day game (physical + on-screen keyboard); the CTA appears when the match ends |
| 24 | [/globo/arquivo](app/globo/arquivo/page.tsx) | Archive as toy | A 1925–2026 time machine: the slider swaps editions and the paper ages via parametric hsl/sepia/rotate |
| 25 | [/globo/quiz](app/globo/quiz/page.tsx) | Problem awareness | "Do you know what happened yesterday?" — 3 questions, subscriber context after each, verdict-matched CTA |

## Conversion series — Valor Econômico

| # | Route | Angle | Signature move |
|---|-------|-------|----------------|
| 26 | [/valor/pro](app/valor/pro/page.tsx) | Professional FOMO | "Quem decide lê antes" + SVG line chart drawing itself behind the headline |
| 27 | [/valor/dados](app/valor/dados/page.tsx) | Product-led demo | The hero is a working indicator panel: animated numbers, SVG sparklines, market up/down colors |
| 28 | [/valor/manha](app/valor/manha/page.tsx) | Ritual selling | A 5h50→9h00 timeline that draws with scroll; the page background dawns from navy to paper |
| 29 | [/valor/roi](app/valor/roi/page.tsx) | Interactive reanchoring | A coffee-price slider computes the subscription in cafés — the visitor does the math themselves |
| 30 | [/valor/salmon](app/valor/salmon/page.tsx) | Physical differentiation | Salmon paper texture (inline feTurbulence) and a newspaper that unfolds in CSS 3D |
| 31 | [/valor/equipes](app/valor/equipes/page.tsx) | B2B self-service | Seat slider with tiered pricing, live quote and savings vs individual subscriptions |
| 32 | [/valor/analise](app/valor/analise/page.tsx) | Content-led paywall | A real essay that fades out at the best paragraph — "what you just felt is the product" |
| 33 | [/valor/carreira](app/valor/carreira/page.tsx) | Career aspiration | Typographic ladder: five job titles in growing type sizes and indentation |
| 34 | [/valor/agro](app/valor/agro/page.tsx) | Sector vertical | Commodity board (soy, corn, cattle…) opens the page; navy system re-tuned to field greens |
| 35 | [/valor/global](app/valor/global/page.tsx) | Timezone asymmetry | Four market clocks with real local time and open/closed session status via Intl |
| 36 | [/valor/terminal](app/valor/terminal/page.tsx) | Premium-tier demo | A CSS laptop running Valor PRO: clickable watchlist, swapping chart, feed that receives new items every 4s |
| 37 | [/valor/simulador](app/valor/simulador/page.tsx) | Loss aversion | "You are the CFO": 3 decisions, the relevant headline always on the desk, running P&L scoreboard in reais |
| 38 | [/valor/newsletters](app/valor/newsletters/page.tsx) | Endowment | Check newsletters on the left and tomorrow's inbox assembles live on the right, sorted by delivery time |
| 39 | [/valor/sinal](app/valor/sinal/page.tsx) | Felt contrast | A switch flips the whole page between noise (dark, shaking, 3 desynced marquees) and signal (one calm essay) |
| 40 | [/valor/mesa](app/valor/mesa/page.tsx) | Guided tour | A top-down 7am desk flat-lay drawn in CSS — 4 hotspots tour the ecosystem; plans map to the pieces you touched |

Every page has a **build guide** at `/<slug>/guide` (e.g. [/helios/guide](app/helios/guide/page.tsx), [/globo/heranca/guide](app/globo/heranca/guide/page.tsx)) explaining the techniques, decisions, and conversion patterns behind it.

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

Open [http://localhost:3000](http://localhost:3000) for the index of all forty.

## Structure

```
app/
  page.tsx              ← index/menu listing all forty pages
  <slug>/               ← craft series
    layout.tsx          ← fonts (next/font) + metadata for that brand
    page.tsx            ← the landing page (client component)
    guide/page.tsx      ← write-up of how it was built
  globo/                ← conversion series, O GLOBO
    layout.tsx          ← brand fonts (Merriweather + Libre Franklin)
    <variant>/{layout,page,guide/page}.tsx
  valor/                ← conversion series, Valor Econômico
    layout.tsx          ← brand fonts (IBM Plex Serif + Sans)
    <variant>/{layout,page,guide/page}.tsx
components/Guide.tsx    ← shared shell for the guide pages only
```

## Deploy

All 84 routes are statically prerendered — the repo deploys to Vercel as-is (`vercel` or import the repo in the dashboard; no env vars needed). The `/` index works as the navigation menu.

---

Craft-series brands are fictional. The O GLOBO and Valor Econômico pages are unaffiliated portfolio concepts with illustrative prices. Built as a portfolio piece exploring how far web craft can go with zero assets.
