import Image from "next/image";
import type { Project } from "@/data/projects";

/** Görsel varsa onu, yoksa projenin renginde stilize bir telefon ekranı çizer. */
export function ProjectCover({ project }: { project: Project }) {
  if (project.image) {
    return (
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-t-2xl bg-line">
        <Image src={project.image} alt={project.name} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
      </div>
    );
  }
  return (
    <div
      aria-hidden
      className="relative aspect-[16/10] w-full overflow-hidden rounded-t-2xl"
      style={{ background: `linear-gradient(135deg, ${project.accent} 0%, color-mix(in srgb, ${project.accent} 55%, #0f1318) 100%)` }}
    >
      <span className="pointer-events-none absolute inset-y-0 w-1/3 bg-white/15 blur-md [animation:shine_7s_ease-in-out_infinite]" />
      <div className="absolute left-1/2 top-[18%] w-[38%] -translate-x-1/2 rounded-[18px] border border-white/25 bg-white/10 p-[6px] shadow-[0_20px_50px_-20px_rgba(0,0,0,.6)] backdrop-blur-[2px]">
        <div className="rounded-[13px] bg-[#0f1318]/85 px-3 pb-8 pt-3">
          <div className="mb-3 flex items-center justify-between font-mono text-[8px] text-white/60">
            <span>9:41</span>
            <span className="h-[3px] w-6 rounded-full bg-white/40" />
          </div>
          <div className="font-display text-[15px] font-extrabold leading-tight text-white">{project.name}</div>
          <div className="mt-3 space-y-1.5">
            <div className="h-[6px] w-4/5 rounded bg-white/25" />
            <div className="h-[6px] w-3/5 rounded bg-white/15" />
            <div className="mt-3 h-6 w-full rounded-md" style={{ background: project.accent }} />
          </div>
        </div>
      </div>
    </div>
  );
}
