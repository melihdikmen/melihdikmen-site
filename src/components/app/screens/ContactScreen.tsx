"use client";

import { profile } from "@/data/profile";
import { ContactForm } from "../../ContactForm";
import { GitHubIcon, LinkedInIcon, MailIcon } from "../../Icons";
import { Screen } from "../Screen";
import type { ScreenProps } from "../App";

export function ContactScreen({ dict, on }: ScreenProps) {
  const links = [
    { href: `mailto:${profile.email}`, label: profile.email, Icon: MailIcon, ext: false, bg: "bg-accent" },
    { href: profile.social.linkedin, label: "LinkedIn", Icon: LinkedInIcon, ext: true, bg: "bg-[#0a66c2]" },
    { href: profile.social.github, label: "GitHub", Icon: GitHubIcon, ext: true, bg: "bg-ink" },
  ];
  return (
    <Screen title={dict.app.tabs.contact} on={on}>
      <p className="group-f pb-3 pt-0 text-[15px] text-ink-2">{dict.contact.subtitle}</p>
      <div className="mx-4 rounded-xl bg-paper-2 p-4">
        <ContactForm dict={dict} email={profile.email} />
      </div>

      <p className="group-h">{dict.app.elsewhere}</p>
      <div className="group">
        {links.map(({ href, label, Icon, ext, bg }) => (
          <a key={href} href={href} {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="cell cell-tap has-icon">
            <span className={`app-icon h-[30px] w-[30px] ${bg} text-paper`} aria-hidden>
              <Icon width={15} height={15} strokeWidth={2} />
            </span>
            <span className="truncate">{label}</span>
            <span className="chev">{ext ? "↗" : "›"}</span>
          </a>
        ))}
      </div>
      <div className="h-8" />
    </Screen>
  );
}
