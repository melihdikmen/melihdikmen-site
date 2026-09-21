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
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-accent hover:text-ink"
    >
      <MoonIcon className="dark:hidden" />
      <SunIcon className="hidden dark:block" />
    </button>
  );
}
