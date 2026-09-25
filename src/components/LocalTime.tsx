"use client";

import { useEffect, useState } from "react";

export function LocalTime({ locale, seconds = true }: { locale: "tr" | "en"; seconds?: boolean }) {
  const [now, setNow] = useState<string>("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat(locale === "tr" ? "tr-TR" : "en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      ...(seconds ? { second: "2-digit" as const } : {}),
      timeZone: "Europe/Istanbul",
    });
    const tick = () => setNow(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, seconds ? 1000 : 15000);
    return () => clearInterval(id);
  }, [locale, seconds]);
  return (
    <span className="tabular-nums" suppressHydrationWarning>
      {now || (seconds ? "--:--:--" : "--:--")}
    </span>
  );
}
