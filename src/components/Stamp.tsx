/** Dönen yuvarlak rozet: siyah daire, çevresinde asit yeşili yazı, ortada monogram. */
export function Stamp({ text, className = "" }: { text: string; className?: string }) {
  const r = 74;
  const c = 2 * Math.PI * r;
  return (
    <div className={className} aria-hidden>
      <div className="relative h-full w-full">
        <svg viewBox="0 0 200 200" className="spin h-full w-full">
          <defs>
            <path id="stamp-ring" d={`M100,100 m-${r},0 a${r},${r} 0 1,1 ${2 * r},0 a${r},${r} 0 1,1 -${2 * r},0`} />
          </defs>
          <circle cx="100" cy="100" r="98" fill="#0b0b0b" />
          <circle cx="100" cy="100" r="58" fill="none" stroke="var(--acid)" strokeWidth="2" strokeDasharray="6 6" />
          <text fill="var(--acid)" className="font-mono text-[12.5px] font-bold uppercase" style={{ letterSpacing: "0.2em" }}>
            <textPath href="#stamp-ring" textLength={c} lengthAdjust="spacing">
              {text}
            </textPath>
          </text>
        </svg>
        <span className="font-display absolute inset-0 flex items-center justify-center text-[44px] font-extrabold uppercase leading-none tracking-[-0.04em] text-[#f1efe8] md:text-[52px] lg:text-[60px]">
          M<span className="text-hot">.</span>
        </span>
      </div>
    </div>
  );
}
