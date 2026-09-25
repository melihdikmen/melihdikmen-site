/** Dönen yuvarlak yazı; ortada sabit monogram. */
export function Stamp({ text, className = "" }: { text: string; className?: string }) {
  const r = 78;
  const c = 2 * Math.PI * r;
  return (
    <div className={className} aria-hidden>
      <div className="relative h-full w-full overflow-hidden">
        <svg viewBox="0 0 200 200" className="spin h-full w-full">
          <defs>
            <path id="stamp-ring" d={`M100,100 m-${r},0 a${r},${r} 0 1,1 ${2 * r},0 a${r},${r} 0 1,1 -${2 * r},0`} />
          </defs>
          <text className="fill-ink font-mono text-[11.5px] uppercase" style={{ letterSpacing: "0.22em" }}>
            <textPath href="#stamp-ring" textLength={c} lengthAdjust="spacing">
              {text}
            </textPath>
          </text>
          <circle cx="100" cy="100" r="58" fill="none" stroke="currentColor" strokeWidth="1" className="text-ink" />
          <circle cx="100" cy="100" r="96" fill="none" stroke="currentColor" strokeWidth="1" className="text-rule" />
        </svg>
        <span className="font-display absolute inset-0 flex items-center justify-center text-[26px] md:text-[42px] lg:text-[54px] font-light italic leading-none tracking-[-0.04em]">
          M<span className="text-accent not-italic">.</span>
        </span>
      </div>
    </div>
  );
}
