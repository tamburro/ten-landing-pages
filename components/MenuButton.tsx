"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function MenuButton() {
  const pathname = usePathname();
  // não aparece no próprio índice
  if (pathname === "/") return null;

  return (
    <Link
      href="/"
      aria-label="Ver todas as landing pages"
      className="group fixed right-4 bottom-4 z-[2147483000] flex items-center gap-2 rounded-full border border-white/15 bg-black/85 px-3 py-2.5 text-white shadow-[0_8px_24px_-6px_rgba(0,0,0,0.5)] backdrop-blur-md transition-colors hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
        <rect x="1.5" y="1.5" width="5" height="5" rx="1.2" />
        <rect x="9.5" y="1.5" width="5" height="5" rx="1.2" />
        <rect x="1.5" y="9.5" width="5" height="5" rx="1.2" />
        <rect x="9.5" y="9.5" width="5" height="5" rx="1.2" />
      </svg>
      <span className="max-w-0 overflow-hidden text-xs font-semibold whitespace-nowrap opacity-0 transition-all duration-300 group-hover:max-w-[140px] group-hover:opacity-100">
        Todas as landing pages
      </span>
    </Link>
  );
}
