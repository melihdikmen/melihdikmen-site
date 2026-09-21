import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex-1 grid place-items-center px-5 py-24 text-center">
      <div>
        <p className="font-mono text-sm text-muted">404</p>
        <h1 className="font-display text-3xl font-bold mt-2">Sayfa bulunamadı · Page not found</h1>
        <Link href="/" className="inline-block mt-6 text-accent underline underline-offset-4">
          melihdikmen.com
        </Link>
      </div>
    </main>
  );
}
