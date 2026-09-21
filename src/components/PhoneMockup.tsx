import type { Dictionary } from "@/i18n/tr";

/** Hero'daki süzülen cüzdan mockup'ı. Tamamen CSS, gerçek veri içermez. */
export function PhoneMockup({ dict }: { dict: Dictionary }) {
  const p = dict.phone;
  return (
    <div className="relative mx-auto w-[260px] sm:w-[290px]" aria-hidden>
      <div className="absolute -inset-10 rounded-full bg-[radial-gradient(closest-side,var(--glow),transparent)] blur-2xl" />
      <div className="phone-float relative rounded-[44px] border border-white/20 bg-[#0b0e14] p-[10px] shadow-[0_50px_120px_-30px_rgba(0,0,0,.7)] ring-1 ring-black/40">
        <div className="absolute left-1/2 top-[14px] h-[22px] w-[92px] -translate-x-1/2 rounded-full bg-black" />
        <div className="relative h-[560px] overflow-hidden rounded-[36px] bg-[#0f1318] text-white">
          <div className="absolute inset-x-0 top-0 h-[260px] bg-[radial-gradient(120%_80%_at_20%_0%,var(--g1),transparent_60%),radial-gradient(90%_70%_at_100%_10%,var(--g2),transparent_60%)] opacity-90" />
          <div className="relative flex items-center justify-between px-6 pt-4 font-mono text-[10px] text-white/70">
            <span>9:41</span>
            <span className="flex items-center gap-1">
              <span className="h-[6px] w-[6px] rounded-full bg-white/60" />
              <span className="h-[6px] w-[6px] rounded-full bg-white/60" />
              <span className="ml-1 h-[8px] w-[16px] rounded-[2px] border border-white/60" />
            </span>
          </div>
          <div className="relative px-6 pt-8">
            <p className="text-[11px] text-white/60">{p.balance}</p>
            <p className="mt-1 font-display text-[34px] font-extrabold tracking-tight tabular-nums">₺48.250,00</p>
            <div className="mt-5 flex gap-2">
              <span className="rounded-full bg-white px-4 py-1.5 text-[11px] font-semibold text-[#0f1318]">{p.send}</span>
              <span className="rounded-full border border-white/40 px-4 py-1.5 text-[11px] font-semibold">{p.request}</span>
            </div>
            <div className="relative mt-6 overflow-hidden rounded-2xl bg-[linear-gradient(135deg,var(--g2),var(--g1))] p-4 shadow-lg">
              <span className="absolute inset-y-0 w-1/3 bg-white/25 blur-md [animation:shine_5s_ease-in-out_infinite]" />
              <div className="flex items-center justify-between text-[10px] text-white/80">
                <span>{p.card}</span>
                <span className="font-mono">•••• 4821</span>
              </div>
              <div className="mt-6 h-[6px] w-10 rounded bg-white/70" />
              <div className="mt-2 font-mono text-[12px] tracking-[0.2em] text-white/90">5432 •••• •••• 4821</div>
            </div>
            <p className="mt-6 text-[11px] text-white/60">{p.recent}</p>
            <ul className="mt-2 space-y-2.5">
              {[
                [p.t1, "-₺342,90", "bg-g3"],
                [p.t2, "-₺1.280,00", "bg-g2"],
                [p.t3, "+₺6.500,00", "bg-g1"],
              ].map(([label, amount, tone]) => (
                <li key={label} className="flex items-center gap-3 text-[12px]">
                  <span className={`h-7 w-7 rounded-full ${tone} opacity-90`} />
                  <span className="flex-1 text-white/85">{label}</span>
                  <span className="font-mono tabular-nums text-white/90">{amount}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-around border-t border-white/10 bg-[#0f1318]/90 px-6 py-3 text-[9px] text-white/50 backdrop-blur">
            <span className="text-white">{p.wallet}</span>
            <span className="h-2 w-8 rounded bg-white/15" />
            <span className="h-2 w-8 rounded bg-white/15" />
            <span className="h-2 w-8 rounded bg-white/15" />
          </div>
        </div>
      </div>
    </div>
  );
}
