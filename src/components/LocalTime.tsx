"use client";

import { useEffect, useState } from "react";

export function LocalTime({ locale }: { locale: "tr" | "en" }) {
  const [now, setNow] = useState<string>("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat(locale === "tr" ? "tr-TR" : "en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "Europe/Istanbul",
    });
    const tick = () => setNow(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [locale]);
  return (
    <span className="font-mono tabular-nums" suppressHydrationWarning>
      {now || "--:--:--"}
    </span>
  );
}
