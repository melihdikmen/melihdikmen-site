import type { ReactNode } from "react";

/** App Store bölüm başlığı: kalın başlık, sağda isteğe bağlı mavi eylem. */
export function SectionHead({ title, action }: { title: string; action?: ReactNode }) {
  return (
    <div className="st-head">
      <h2>{title}</h2>
      {action && <div className="text-[15px] font-medium text-accent">{action}</div>}
    </div>
  );
}
