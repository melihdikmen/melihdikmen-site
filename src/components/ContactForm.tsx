"use client";

import { useState, type FormEvent } from "react";
import type { Dictionary } from "@/i18n/tr";

type State = "idle" | "sending" | "sent" | "error";

export function ContactForm({ dict, email }: { dict: Dictionary; email: string }) {
  const [state, setState] = useState<State>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setState("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(String(res.status));
      setState("sent");
      form.reset();
    } catch {
      setState("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-7">
      <div className="grid gap-7 sm:grid-cols-2">
        <label className="grid gap-1">
          <span className="smallcaps">{dict.contact.name}</span>
          <input id="contact-name" name="name" required autoComplete="name" className="field" />
        </label>
        <label className="grid gap-1">
          <span className="smallcaps">{dict.contact.email}</span>
          <input id="contact-email" name="email" type="email" required autoComplete="email" className="field" />
        </label>
      </div>
      <label className="grid gap-1">
        <span className="smallcaps">{dict.contact.message}</span>
        <textarea id="contact-message" name="message" required minLength={10} rows={4} className="field resize-y" />
      </label>
      {/* Honeypot */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />

      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <button type="submit" id="contact-submit" disabled={state === "sending"} className="btn">
          {state === "sending" ? dict.contact.sending : dict.contact.send}
          <span aria-hidden>→</span>
        </button>
        <span className="text-[14px] text-ink-2">
          {dict.contact.orMail}{" "}
          <a href={`mailto:${email}`} className="u text-ink">
            {email}
          </a>
        </span>
      </div>

      <p role="status" aria-live="polite" className="min-h-[1.5rem] text-[14px]">
        {state === "sent" && <span className="text-ink">{dict.contact.sent}</span>}
        {state === "error" && (
          <span className="text-accent">
            {dict.contact.error}{" "}
            <a href={`mailto:${email}`} className="u">
              {email}
            </a>
          </span>
        )}
      </p>
    </form>
  );
}
