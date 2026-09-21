import { NextResponse } from "next/server";
import { profile } from "@/data/profile";

/**
 * İletişim formu. RESEND_API_KEY tanımlıysa Resend üzerinden e-posta gönderir.
 * Tanımlı değilse 503 döner ve arayüz mailto bağlantısına düşer.
 */
export async function POST(request: Request) {
  let body: { name?: string; email?: string; message?: string; company?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  // Honeypot: gerçek kullanıcılar bu alanı görmez.
  if (body.company) return NextResponse.json({ ok: true });

  const name = (body.name ?? "").trim().slice(0, 120);
  const email = (body.email ?? "").trim().slice(0, 200);
  const message = (body.message ?? "").trim().slice(0, 5000);
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || message.length < 10) {
    return NextResponse.json({ error: "invalid_fields" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO ?? profile.email;
  const from = process.env.CONTACT_FROM ?? "Portfolio <onboarding@resend.dev>";
  if (!apiKey) return NextResponse.json({ error: "not_configured" }, { status: 503 });

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject: `Portfolio: ${name}`,
      text: `${name} <${email}>\n\n${message}`,
    }),
  });
  if (!res.ok) return NextResponse.json({ error: "send_failed" }, { status: 502 });
  return NextResponse.json({ ok: true });
}
