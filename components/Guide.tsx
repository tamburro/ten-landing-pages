import Link from "next/link";

export function Guide({
  slug,
  title,
  tagline,
  children,
}: {
  slug: string;
  title: string;
  tagline: string;
  children: React.ReactNode;
}) {
  return (
    <main className="mx-auto max-w-2xl px-6 py-16 font-sans text-neutral-200">
      <nav className="mb-12 flex items-center justify-between text-sm text-neutral-500">
        <Link href={`/${slug}`} className="hover:text-neutral-200">
          ← /{slug}
        </Link>
        <Link href="/" className="hover:text-neutral-200">
          all pages
        </Link>
      </nav>
      <p className="mb-2 text-xs uppercase tracking-[0.2em] text-neutral-500">
        build guide
      </p>
      <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
      <p className="mt-2 text-neutral-400">{tagline}</p>
      <hr className="my-8 border-neutral-800" />
      <div className="guide-prose text-[0.95rem] text-neutral-300">
        {children}
      </div>
      <hr className="my-10 border-neutral-800" />
      <p className="text-sm text-neutral-500">
        Part of{" "}
        <Link href="/" className="underline underline-offset-2 hover:text-neutral-300">
          LPS
        </Link>
        , a set of ten landing pages each built to push a different craft.
      </p>
    </main>
  );
}
