import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid flex-1 place-items-center px-5 py-24 text-center">
      <div className="box shadow-hard-lg max-w-xl p-8 md:p-12">
        <p className="sticker block-hot" style={{ "--r": "-3deg" } as React.CSSProperties}>
          404
        </p>
        <h1 className="font-display mt-6 text-[clamp(3.5rem,14vw,9rem)] font-extrabold uppercase leading-[0.85] tracking-[-0.04em]">
          Sayfa yok<span className="text-hot">.</span>
        </h1>
        <p className="mt-4 font-medium text-ink-2">Page not found.</p>
        <Link href="/" className="btn mt-8">
          melihdikmen.com →
        </Link>
      </div>
    </main>
  );
}
