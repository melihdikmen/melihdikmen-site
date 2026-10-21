import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid flex-1 place-items-center px-5 py-24 text-center">
      <div className="max-w-xl">
        <p className="sticker block-acid">
          404
        </p>
        <h1 className="font-display mt-6 text-[clamp(2.6rem,8vw,5.5rem)] font-semibold leading-[1.02] tracking-[-0.04em]">
          Sayfa yok<span className="text-accent">.</span>
        </h1>
        <p className="mt-4 font-medium text-ink-2">Page not found.</p>
        <Link href="/" className="btn mt-8">
          melihdikmen.com ›
        </Link>
      </div>
    </main>
  );
}
