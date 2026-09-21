export function RotatingBadge({ text, size = 150 }: { text: string; size?: number }) {
  const id = "badge-path";
  return (
    <div className="relative grid place-items-center" style={{ width: size, height: size }} aria-hidden>
      <svg viewBox="0 0 100 100" className="spin-slow absolute inset-0 h-full w-full">
        <defs>
          <path id={id} d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
        </defs>
        <text className="fill-muted font-mono text-[8.3px] uppercase tracking-[0.28em]">
          <textPath href={`#${id}`}>{text}</textPath>
        </text>
      </svg>
      <span className="h-3 w-3 rounded-full bg-[linear-gradient(135deg,var(--g1),var(--g3))] shadow-[0_0_24px_var(--glow)]" />
    </div>
  );
}
