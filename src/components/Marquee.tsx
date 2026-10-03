type Props = {
  items: string[];
  className?: string;
  /** Saniye cinsinden bir tam tur. */
  speed?: number;
  reverse?: boolean;
  separator?: string;
};

/** Sonsuz kayan şerit. İçerik iki kez basılır, CSS tarafı globals.css'te. */
export function Marquee({ items, className = "", speed = 30, reverse = false, separator = "★" }: Props) {
  const row = (
    <>
      {items.map((it, i) => (
        <span key={`${it}-${i}`} className="flex items-center">
          <span className="px-5">{it}</span>
          <span aria-hidden className="text-hot">
            {separator}
          </span>
        </span>
      ))}
    </>
  );
  return (
    <div
      className={`marquee ${className}`}
      aria-hidden
      data-reverse={reverse ? "" : undefined}
      style={{ "--speed": `${speed}s` } as React.CSSProperties}
    >
      <div>{row}</div>
      <div>{row}</div>
    </div>
  );
}
