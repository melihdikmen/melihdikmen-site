/** Hafif söz dizimi renklendirme: satırlar token dizisi olarak elle kurulur. */
export type Tok = { v: string; c?: string; href?: string };
export type Line = Tok[];

export const pl = (v: string): Tok => ({ v });
export const kw = (v: string): Tok => ({ v, c: "tk-kw" });
export const str = (v: string, href?: string): Tok => ({ v: `"${v}"`, c: "tk-str", href });
export const key = (v: string): Tok => ({ v, c: "tk-key" });
export const num = (v: string | number): Tok => ({ v: String(v), c: "tk-num" });
export const cm = (v: string): Tok => ({ v, c: "tk-cm" });
export const ty = (v: string): Tok => ({ v, c: "tk-ty" });
export const fn = (v: string): Tok => ({ v, c: "tk-fn" });
export const tag = (v: string): Tok => ({ v, c: "tk-tag" });
export const attr = (v: string): Tok => ({ v, c: "tk-attr" });
export const ind = (n: number): Tok => ({ v: "  ".repeat(n) });

export function CodeBlock({ lines }: { lines: Line[] }) {
  return (
    <ol className="code">
      {lines.map((line, i) => (
        <li key={i}>
          <span className="ln">{i + 1}</span>
          <span className="lc">
            {line.map((t, j) =>
              t.href ? (
                <a key={j} href={t.href} target={t.href.startsWith("mailto:") ? undefined : "_blank"} rel="noopener noreferrer" className={t.c}>
                  {t.v}
                </a>
              ) : (
                <span key={j} className={t.c}>
                  {t.v}
                </span>
              ),
            )}
          </span>
        </li>
      ))}
    </ol>
  );
}
