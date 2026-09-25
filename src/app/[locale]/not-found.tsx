import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid flex-1 place-items-center px-5 py-24 text-center">
      <div>
        <p className="smallcaps">404</p>
        <h1 className="font-display mt-4 text-[clamp(3rem,10vw,7rem)] font-light italic leading-none tracking-[-0.03em]">
          Sayfa yok<span className="text-accent not-italic">.</span>
        </h1>
        <p className="mt-4 text-ink-2">Page not found.</p>
        <Link href="/" className="u mt-8 inline-block font-mono text-[12px] uppercase tracking-[0.14em]">
          melihdikmen.com →
        </Link>
      </div>
    </main>
  );
}
