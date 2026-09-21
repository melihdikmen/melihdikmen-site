export function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return (
    <div className="marquee relative overflow-hidden border-y border-line/70 py-3 [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]" aria-hidden>
      <ul className="marquee-track flex w-max gap-10 whitespace-nowrap font-mono text-[13px] uppercase tracking-[0.14em] text-muted">
        {row.map((item, i) => (
          <li key={`${item}-${i}`} className="flex items-center gap-10">
            <span>{item}</span>
            <span className="h-1 w-1 rounded-full bg-g2" />
          </li>
        ))}
      </ul>
    </div>
  );
}
