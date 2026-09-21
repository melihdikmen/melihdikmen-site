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

  const field =
    "w-full rounded-xl border border-line bg-surface/80 px-4 py-3 backdrop-blur text-[15px] text-ink placeholder:text-muted/70 focus:border-accent focus:outline-none";

  return (
    <form onSubmit={onSubmit} className="grid gap-4" noValidate={false}>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-1.5">
          <span className="font-mono text-xs uppercase tracking-[0.08em] text-muted">{dict.contact.name}</span>
          <input id="contact-name" name="name" required autoComplete="name" className={field} />
        </label>
        <label className="grid gap-1.5">
          <span className="font-mono text-xs uppercase tracking-[0.08em] text-muted">{dict.contact.email}</span>
          <input id="contact-email" name="email" type="email" required autoComplete="email" className={field} />
        </label>
      </div>
      <label className="grid gap-1.5">
        <span className="font-mono text-xs uppercase tracking-[0.08em] text-muted">{dict.contact.message}</span>
        <textarea id="contact-message" name="message" required minLength={10} rows={5} className={field} />
      </label>
      {/* Honeypot */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          id="contact-submit"
          disabled={state === "sending"}
          className="glow inline-flex items-center rounded-xl bg-[linear-gradient(135deg,var(--g1),var(--g2))] px-6 py-3 font-display text-base font-bold text-white transition-transform hover:-translate-y-0.5 disabled:opacity-60"
        >
          {state === "sending" ? dict.contact.sending : dict.contact.send}
        </button>
        <span className="text-sm text-muted">
          {dict.contact.orMail}{" "}
          <a href={`mailto:${email}`} className="text-ink underline underline-offset-4">
            {email}
          </a>
        </span>
      </div>

      <p role="status" aria-live="polite" className="min-h-[1.5rem] text-sm">
        {state === "sent" && <span className="text-teal">{dict.contact.sent}</span>}
        {state === "error" && (
          <span className="text-accent">
            {dict.contact.error}{" "}
            <a href={`mailto:${email}`} className="underline underline-offset-4">
              {email}
            </a>
          </span>
        )}
      </p>
    </form>
  );
}
