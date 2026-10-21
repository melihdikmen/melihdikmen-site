import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid flex-1 place-items-center px-5 py-24 text-center">
      <div className="max-w-xl">
        <p className="pill pill-accent">
          404
        </p>
        <h1 className="mt-6 text-[clamp(2.4rem,8vw,4.5rem)] font-bold leading-[1.05] tracking-[-0.03em]">
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
