import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/tr";
import { profile } from "@/data/profile";
import { t } from "@/lib/i18n";
import { container } from "@/lib/ui";

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const site = profile.siteUrl.replace(/^https?:\/\//, "");
  return (
    <footer className="border-t border-rule bg-paper-2">
      <div className={`${container} flex flex-wrap items-center justify-between gap-x-8 gap-y-2 py-6 text-[12px] text-ink-3`}>
        <span>
          © {new Date().getFullYear()} {profile.name} · {dict.footer.rights} · {site}
        </span>
        <span className="hidden md:inline">{dict.footer.built}</span>
        <span className="flex items-center gap-5">
          <span>{t(profile.location, locale)}</span>
          <a href="#top" className="text-accent hover:underline">
            {dict.nav.top} ↑
          </a>
        </span>
      </div>
    </footer>
  );
}
