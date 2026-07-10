import Link from "next/link";

const pages = [
  {
    slug: "helios",
    name: "Helios",
    craft: "Raymarched GLSL sun — custom fragment shader",
    palette: ["#050403", "#ff6b1a", "#ffc861"],
  },
  {
    slug: "mono",
    name: "Mono",
    craft: "Brutalist typography — GSAP SplitText choreography",
    palette: ["#ffffff", "#0a0a0a", "#ff2b00"],
  },
  {
    slug: "drift",
    name: "Drift",
    craft: "Scroll-driven descent — pinned scenes, color as depth",
    palette: ["#cfe9f4", "#12557a", "#020a14"],
  },
  {
    slug: "morph",
    name: "Morph",
    craft: "30k GPU particles morphing between forms",
    palette: ["#0b0613", "#7c3aed", "#22d3ee"],
  },
  {
    slug: "atelier",
    name: "Atelier",
    craft: "Editorial art direction — asymmetric grid, serif display",
    palette: ["#f4efe6", "#1c1a17", "#6d1a2d"],
  },
  {
    slug: "bloom",
    name: "Bloom",
    craft: "Iridescent color system — animated mesh gradients",
    palette: ["#fdf6f9", "#f9a8d4", "#a5b4fc"],
  },
  {
    slug: "wire",
    name: "Wire",
    craft: "CRT phosphor terminal — scanlines, scramble text",
    palette: ["#020503", "#33ff66", "#0d331a"],
  },
  {
    slug: "kinetic",
    name: "Kinetic",
    craft: "Velocity-reactive type — acid palette, blend modes",
    palette: ["#d8ff00", "#0a0a0a", "#ff00c8"],
  },
  {
    slug: "orbital",
    name: "Orbital",
    craft: "Physical 3D glass — scroll-linked camera rig",
    palette: ["#0c0e12", "#8ab4ff", "#e6e9ef"],
  },
  {
    slug: "field",
    name: "Field",
    craft: "Generative flow fields — seeded canvas art, Swiss grid",
    palette: ["#f7f7f4", "#111111", "#e30613"],
  },
];

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-20 font-mono">
      <header className="mb-14">
        <h1 className="text-2xl font-bold tracking-tight">LPS</h1>
        <p className="mt-3 max-w-lg text-sm leading-relaxed text-neutral-400">
          Ten landing pages, ten different crafts. No shared template, no
          shared palette, no shared motion language. Each page has a{" "}
          <code className="text-neutral-300">/guide</code> explaining how it
          was built.
        </p>
      </header>
      <ol className="divide-y divide-neutral-800/80 border-y border-neutral-800/80">
        {pages.map((p, i) => (
          <li key={p.slug} className="group relative">
            <Link
              href={`/${p.slug}`}
              className="flex items-baseline gap-4 py-5 transition-colors hover:bg-neutral-900/60 sm:gap-6 sm:px-3"
            >
              <span className="w-6 shrink-0 text-xs text-neutral-600">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="w-24 shrink-0 text-base font-bold sm:w-28">
                {p.name}
              </span>
              <span className="min-w-0 flex-1 truncate text-xs text-neutral-500 sm:text-sm">
                {p.craft}
              </span>
              <span className="hidden shrink-0 gap-1 sm:flex" aria-hidden>
                {p.palette.map((c) => (
                  <span
                    key={c}
                    className="h-3 w-3 rounded-full border border-neutral-700"
                    style={{ backgroundColor: c }}
                  />
                ))}
              </span>
            </Link>
            <Link
              href={`/${p.slug}/guide`}
              className="absolute top-1/2 right-3 hidden -translate-y-1/2 text-[10px] text-neutral-600 uppercase tracking-widest hover:text-neutral-300 group-hover:block"
            >
              guide →
            </Link>
          </li>
        ))}
      </ol>
      <footer className="mt-14 text-xs text-neutral-600">
        Built with Next.js, GSAP, Three.js, Tailwind. Everything procedural —
        no image assets, no AI-generated media.
      </footer>
    </main>
  );
}
