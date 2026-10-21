import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/tr";
import { profile } from "@/data/profile";
import { container } from "@/lib/ui";
import { Reveal } from "./Reveal";
import { ContactForm } from "./ContactForm";
import { Marquee } from "./Marquee";
import { GitHubIcon, LinkedInIcon, MailIcon } from "./Icons";

export function Contact({ locale, dict, number }: { locale: Locale; dict: Dictionary; number: string }) {
  void locale;
  const big = dict.contact.big;
  const trailing = big.endsWith(".") ? big.slice(0, -1) : big;
  return (
    <section id="contact" className="block-hot rule-t rule-thick scroll-mt-16 border-t border-hot/50">
      <Marquee
        items={Array(6).fill(dict.contact.big.toUpperCase())}
        className="border-b border-hot/40 bg-void/70 py-2.5 font-mono text-[12px] font-bold uppercase tracking-[0.2em] text-hot"
        speed={26}
        separator="✦"
      />
      <div className={`${container} py-14 md:py-20`}>
        <Reveal>
          <p className="label text-hot">
            {"// "}{dict.section} {number} — {dict.contact.title}
          </p>
          <h2
            className="font-display glitch mt-3 text-[clamp(2.4rem,9vw,8rem)] font-black uppercase leading-[1] text-ink"
            data-text={trailing}
          >
            {trailing}
            <span className="neon-hot">_</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-4">
            <p className="max-w-sm text-[17px] leading-relaxed text-ink-2">{dict.contact.subtitle}</p>
            <h3 className="label mt-10 border-b border-hot/40 pb-3">{dict.contact.elsewhere}</h3>
            <ul className="mt-4 flex flex-col gap-3">
              {[
                { href: `mailto:${profile.email}`, label: profile.email, Icon: MailIcon, ext: false },
                { href: profile.social.linkedin, label: "LinkedIn", Icon: LinkedInIcon, ext: true },
                { href: profile.social.github, label: "GitHub", Icon: GitHubIcon, ext: true },
              ].map(({ href, label, Icon, ext }) => (
                <li key={href}>
                  <a
                    href={href}
                    {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="box lift group flex items-center gap-3 px-4 py-3 text-[15px] font-semibold shadow-hard-sm hover:text-acid"
                  >
                    <Icon width={16} height={16} strokeWidth={2.2} />
                    <span className="truncate">{label}</span>
                    <span className="ml-auto transition-transform group-hover:translate-x-1">→</span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={80} className="lg:col-span-7 lg:col-start-6">
            <div className="box hud hud-hot shadow-hard-lg p-5 md:p-8">
              <ContactForm dict={dict} email={profile.email} />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
