<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# lps — 10 landing pages de portfólio

## Convenções
- Cada LP vive em `app/<slug>/` com: `layout.tsx` (server; carrega fontes via next/font e metadata), `page.tsx` (`"use client"`; a página inteira), `guide/page.tsx` (write-up de como foi construída).
- **Série craft** (10 originais): nenhuma LP compartilha template, hero, paleta ou fonte com outra. Antes de mexer em uma página, não importar padrões visuais de outra.
- **Série de conversão** (`app/globo/*`, `app/valor/*`): as 5 páginas de cada marca compartilham identidade (fontes e cores da marca, carregadas no layout do grupo — `app/globo/layout.tsx`, `app/valor/layout.tsx`), mas cada página tem conceito, layout e ângulo de conversão próprios; nada de template compartilhado entre elas. Copy em PT-BR. Preços ilustrativos com asterisco e disclaimer de página conceitual de portfólio no footer.
- Animações assinatura: GSAP (registrar plugins dentro de `useEffect`, sempre com cleanup via `gsap.context()` / `ctx.revert()`). 3D: Three.js puro (sem react-three-fiber), sempre com dispose de geometrias/materiais/renderer no cleanup.
- Imagens placeholder: somente `https://picsum.photos/seed/<slug>-<n>/<w>/<h>`. Nada de asset binário no repo.
- Respeitar `prefers-reduced-motion` em toda animação contínua/scroll-driven.
- Estilos específicos de página ficam em `<style>` dentro da própria página ou classes Tailwind arbitrárias; `app/globals.css` só guarda o reset e o guia (`.guide-prose`).
