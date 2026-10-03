"use client";

import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "./Icons";

/** İkon seçimi CSS ile (dark: variant) yapılır, böylece hydration uyuşmazlığı olmaz. */
export function ThemeToggle({ label }: { label: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  return (
    <button
      type="button"
      id="theme-toggle"
      aria-label={label}
      title={label}
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="icon-btn"
    >
      <MoonIcon className="dark:hidden" strokeWidth={2.2} />
      <SunIcon className="hidden dark:block" strokeWidth={2.2} />
    </button>
  );
}
