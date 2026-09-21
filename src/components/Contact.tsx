import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/tr";
import { profile } from "@/data/profile";
import { Reveal } from "./Reveal";
import { ContactForm } from "./ContactForm";
import { ParticleField } from "./ParticleField";
import { GitHubIcon, LinkedInIcon, MailIcon } from "./Icons";

export function Contact({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  void locale;
  return (
    <section id="contact" className="stage noise relative scroll-mt-24 overflow-hidden py-24 md:py-32">
      <ParticleField className="opacity-70" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_15%_30%,color-mix(in_srgb,var(--g1)_26%,transparent),transparent_70%),radial-gradient(50%_50%_at_90%_80%,color-mix(in_srgb,var(--g2)_24%,transparent),transparent_70%)]"
      />
      <div className="relative mx-auto grid w-full max-w-6xl gap-12 px-5 md:grid-cols-[1fr_1fr]">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">{dict.contact.title}</p>
          <h2 className="mt-4 font-display text-[clamp(3rem,9vw,7rem)] font-extrabold leading-[0.9] tracking-[-0.04em]">
            <span className="text-gradient">{dict.contact.big}</span>
          </h2>
          <p className="mt-6 max-w-md text-lg text-muted">{dict.contact.subtitle}</p>
          <ul className="mt-10 space-y-3 text-[15px]">
            <li>
              <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2.5 hover:text-g1">
                <MailIcon /> {profile.email}
              </a>
            </li>
            <li>
              <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 hover:text-g1">
                <LinkedInIcon /> LinkedIn
              </a>
            </li>
            <li>
              <a href={profile.social.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 hover:text-g1">
                <GitHubIcon /> GitHub
              </a>
            </li>
          </ul>
        </Reveal>
        <Reveal delay={80} className="gradient-border rounded-3xl bg-surface/70 p-6 backdrop-blur md:p-8">
          <ContactForm dict={dict} email={profile.email} />
        </Reveal>
      </div>
    </section>
  );
}
