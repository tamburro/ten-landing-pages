import Link from "next/link";

type Page = {
  slug: string;
  name: string;
  craft: string;
  palette: string[];
};

const craftPages: Page[] = [
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

const globoPages: Page[] = [
  {
    slug: "globo/heranca",
    name: "Herança",
    craft: "A capa centenária — autoridade por arquivo",
    palette: ["#f8f5ee", "#14181d", "#0a5cb8"],
  },
  {
    slug: "globo/agora",
    name: "Agora",
    craft: "Redação ao vivo — urgência com countdown real",
    palette: ["#0b0e12", "#e03131", "#4d9fff"],
  },
  {
    slug: "globo/familia",
    name: "Família",
    craft: "4 perfis, 1 preço — comparativo e FAQ",
    palette: ["#eef5fd", "#0a5cb8", "#ffd8a8"],
  },
  {
    slug: "globo/rio",
    name: "Rio",
    craft: "Amanhecer carioca — pertencimento e CEP",
    palette: ["#1d3557", "#e07a2f", "#ffd8a8"],
  },
  {
    slug: "globo/anual",
    name: "Anual",
    craft: "40% off — uma página, um número, uma decisão",
    palette: ["#0b0b0c", "#ffd43b", "#4d9fff"],
  },
  {
    slug: "globo/colunistas",
    name: "Colunistas",
    craft: "Assine pessoas — citações que se revezam",
    palette: ["#ffffff", "#0a5cb8", "#14181d"],
  },
  {
    slug: "globo/estudante",
    name: "Estudante",
    craft: "Caderno pautado — 50% off que cai na prova",
    palette: ["#fbfcfe", "#ffe066", "#0a5cb8"],
  },
  {
    slug: "globo/fimdesemana",
    name: "Fim de semana",
    craft: "O domingo pede papel — cadernos na mesa",
    palette: ["#f7f1e5", "#a61e4d", "#14181d"],
  },
  {
    slug: "globo/verdade",
    name: "Verdade",
    craft: "Boato riscado, fato carimbado — assinar é financiar",
    palette: ["#ffffff", "#e03131", "#0a5cb8"],
  },
  {
    slug: "globo/presente",
    name: "Presente",
    craft: "Configurador de presente — cartão ao vivo",
    palette: ["#eef2f9", "#0a5cb8", "#ffffff"],
  },
  {
    slug: "globo/app",
    name: "App",
    craft: "iPhone em CSS com o app vivo — push e modo noturno",
    palette: ["#f2f6fb", "#0a5cb8", "#14181d"],
  },
  {
    slug: "globo/amanha",
    name: "Amanhã",
    craft: "A capa de amanhã, embaçada atrás do cadeado",
    palette: ["#101418", "#ffd43b", "#fbf9f4"],
  },
  {
    slug: "globo/jogos",
    name: "Jogos",
    craft: "Palavra do dia jogável — CTA no fim da partida",
    palette: ["#fffdf6", "#ffd43b", "#2f9e44"],
  },
  {
    slug: "globo/arquivo",
    name: "Arquivo",
    craft: "Máquina do tempo 1925–2026 — o papel envelhece",
    palette: ["#2b2620", "#ffd43b", "#f3ede1"],
  },
  {
    slug: "globo/quiz",
    name: "Quiz",
    craft: "Você sabe o que aconteceu ontem? — CTA por nota",
    palette: ["#0a5cb8", "#ffffff", "#ffd43b"],
  },
];

const valorPages: Page[] = [
  {
    slug: "valor/pro",
    name: "Pro",
    craft: "Quem decide lê antes — gráfico que desenha",
    palette: ["#0e2b4c", "#e8590c", "#f9e7dc"],
  },
  {
    slug: "valor/dados",
    name: "Dados",
    craft: "Painel de indicadores — a demo é o hero",
    palette: ["#081a2e", "#37b24d", "#e8590c"],
  },
  {
    slug: "valor/manha",
    name: "Manhã",
    craft: "Rotina 5h50–9h00 — timeline que amanhece",
    palette: ["#14273f", "#8c5a3b", "#fdf6ef"],
  },
  {
    slug: "valor/roi",
    name: "ROI",
    craft: "Calculadora do cafezinho — preço reancorado",
    palette: ["#f4f1ec", "#0e2b4c", "#e8590c"],
  },
  {
    slug: "valor/salmon",
    name: "Salmon",
    craft: "Ode ao papel — jornal que desdobra em CSS 3D",
    palette: ["#f6dccb", "#0e2b4c", "#b8552a"],
  },
  {
    slug: "valor/equipes",
    name: "Equipes",
    craft: "B2B — calculadora de assentos com cotação viva",
    palette: ["#0e2b4c", "#e8590c", "#37b24d"],
  },
  {
    slug: "valor/analise",
    name: "Análise",
    craft: "O paywall como demo — corta no melhor parágrafo",
    palette: ["#fbf6f0", "#0e2b4c", "#b8552a"],
  },
  {
    slug: "valor/carreira",
    name: "Carreira",
    craft: "Escada tipográfica — do estágio ao conselho",
    palette: ["#f4f1ec", "#0e2b4c", "#e8590c"],
  },
  {
    slug: "valor/agro",
    name: "Agro",
    craft: "Do talhão ao pregão — board de commodities",
    palette: ["#0f2417", "#69db7c", "#e8590c"],
  },
  {
    slug: "valor/global",
    name: "Global",
    craft: "Quatro fusos com hora real e status de pregão",
    palette: ["#0b1f38", "#d4a418", "#69db7c"],
  },
  {
    slug: "valor/terminal",
    name: "Terminal",
    craft: "Laptop CSS com watchlist clicável e feed vivo",
    palette: ["#0a1626", "#e8590c", "#37b24d"],
  },
  {
    slug: "valor/simulador",
    name: "Simulador",
    craft: "Você é o CFO — 3 decisões, placar em reais",
    palette: ["#0e2b4c", "#f9e7dc", "#2f9e44"],
  },
  {
    slug: "valor/newsletters",
    name: "Newsletters",
    craft: "Monte sua manhã — o inbox se monta ao vivo",
    palette: ["#f4f1ec", "#0e2b4c", "#e8590c"],
  },
  {
    slug: "valor/sinal",
    name: "Sinal",
    craft: "Ruído vs sinal — um interruptor muda a página",
    palette: ["#0b0d10", "#f9f6f1", "#e8590c"],
  },
  {
    slug: "valor/mesa",
    name: "Mesa",
    craft: "Flat-lay das 7h em CSS — hotspots do ecossistema",
    palette: ["#55381f", "#f6dccb", "#e8590c"],
  },
];

function Section({
  title,
  subtitle,
  pages,
  offset,
}: {
  title: string;
  subtitle: string;
  pages: Page[];
  offset: number;
}) {
  return (
    <section className="mb-14">
      <div className="mb-4 flex items-baseline justify-between">
        <h2 className="text-sm font-bold tracking-widest uppercase">{title}</h2>
        <span className="text-xs text-neutral-600">{subtitle}</span>
      </div>
      <ol className="divide-y divide-neutral-800/80 border-y border-neutral-800/80">
        {pages.map((p, i) => (
          <li key={p.slug} className="group relative">
            <Link
              href={`/${p.slug}`}
              className="flex items-baseline gap-4 py-4 transition-colors hover:bg-neutral-900/60 sm:gap-6 sm:px-3"
            >
              <span className="w-6 shrink-0 text-xs text-neutral-600">
                {String(offset + i + 1).padStart(2, "0")}
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
    </section>
  );
}

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-20 font-mono">
      <header className="mb-14">
        <h1 className="text-2xl font-bold tracking-tight">LPS</h1>
        <p className="mt-3 max-w-lg text-sm leading-relaxed text-neutral-400">
          Forty landing pages. Ten push a craft as far as it goes; thirty sell
          newspaper subscriptions with conversion-first design. Every page has
          a <code className="text-neutral-300">/guide</code> explaining how it
          was built.
        </p>
      </header>

      <Section
        title="Craft series"
        subtitle="10 páginas · 10 técnicas"
        pages={craftPages}
        offset={0}
      />
      <Section
        title="O GLOBO — assinaturas"
        subtitle="15 ângulos de conversão · conceito"
        pages={globoPages}
        offset={10}
      />
      <Section
        title="Valor Econômico — assinaturas"
        subtitle="15 ângulos de conversão · conceito"
        pages={valorPages}
        offset={25}
      />

      <footer className="mt-4 space-y-2 text-xs text-neutral-600">
        <p>
          Built with Next.js, GSAP, Three.js, Tailwind. Everything procedural —
          no image assets, no AI-generated media.
        </p>
        <p>
          As páginas de O GLOBO e Valor Econômico são conceitos de portfólio,
          sem vínculo oficial com as marcas. Preços ilustrativos.
        </p>
      </footer>
    </main>
  );
}
