import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid flex-1 place-items-center px-5 py-24 text-center">
      <div className="box hud shadow-hard-lg max-w-xl p-8 md:p-12">
        <p className="sticker block-hot">
          404
        </p>
        <h1 className="font-display glitch mt-6 text-[clamp(2rem,8vw,5rem)] font-extrabold uppercase leading-[1]" data-text="Sayfa yok">
          Sayfa yok<span className="neon-hot">_</span>
        </h1>
        <p className="mt-4 font-medium text-ink-2">Page not found.</p>
        <Link href="/" className="btn mt-8">
          melihdikmen.com →
        </Link>
      </div>
    </main>
  );
}
