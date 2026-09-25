import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/tr";
import { profile } from "@/data/profile";
import { t } from "@/lib/i18n";
import { container } from "@/lib/ui";

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <footer className="rule-t border-ink">
      <div className={`${container} flex flex-wrap items-center justify-between gap-x-8 gap-y-2 py-6 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-3`}>
        <span>
          © {new Date().getFullYear()} {profile.name} · {dict.footer.rights}
        </span>
        <span className="hidden md:inline">
          {dict.footer.typeset} {dict.footer.built}
        </span>
        <span className="flex items-center gap-6">
          <span>{t(profile.location, locale)}</span>
          <a href="#top" className="u">
            {dict.nav.top} ↑
          </a>
        </span>
      </div>
    </footer>
  );
}
