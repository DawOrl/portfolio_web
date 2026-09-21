import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { createContactEmail, parseInquiry } from "@/lib/contact-email";
import { smtpContactEnabled } from "@/lib/contact-config";
import { SITE_URL } from "@/lib/site";

export const runtime = "nodejs";
export const maxDuration = 30;

const MAX_BYTES = 24_000;
const failure = (status: number) => NextResponse.json({ success: false }, { status });

// Bound actual streamed bytes too: Content-Length may be absent or untrusted.
async function readBody(request: Request) {
  if (!request.body) throw new Error("empty");
  const reader = request.body.getReader();
  const decoder = new TextDecoder();
  let length = 0;
  let body = "";
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      length += value.byteLength;
      if (length > MAX_BYTES) { await reader.cancel(); throw new Error("large"); }
      body += decoder.decode(value, { stream: true });
    }
    return JSON.parse(body + decoder.decode());
  } finally { reader.releaseLock(); }
}

export async function POST(request: Request) {
  const allowedOrigins = new Set([new URL(SITE_URL).origin]);
  if (process.env.NODE_ENV !== "production") allowedOrigins.add(new URL(request.url).origin);
  if (!allowedOrigins.has(request.headers.get("origin") || "")) return failure(403);
  if (!request.headers.get("content-type")?.startsWith("application/json")) return failure(415);
  if (Number(request.headers.get("content-length")) > MAX_BYTES) return failure(413);

  let body;
  try { body = await readBody(request); } catch { return failure(400); }
  const inquiry = parseInquiry(body);
  if (!inquiry || typeof body.website !== "string" || body.website) return failure(400);
  if (!smtpContactEnabled()) return failure(503);
  if (typeof body.token !== "string" || !body.token || body.token.length > 2048) return failure(400);

  try {
    const verification = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret: process.env.TURNSTILE_SECRET_KEY, response: body.token }),
      signal: AbortSignal.timeout(8000),
    });
    if (!verification.ok) return failure(502);
    const result = await verification.json();
    const hostnames = new Set([...allowedOrigins].map((origin) => new URL(origin).hostname));
    if (!result.success || result.action !== "contact" || !hostnames.has(result.hostname)) return failure(403);

    const user = process.env.SMTP_USER!;
    const transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.mail.ovh.net",
      port: 465,
      secure: true,
      auth: { user, pass: process.env.SMTP_PASSWORD },
      connectionTimeout: 8000,
      greetingTimeout: 8000,
      socketTimeout: 12000,
      disableFileAccess: true,
      disableUrlAccess: true,
    });
    const resultMail = await transport.sendMail({
      from: { name: "Dawid Orłowski · Zapytania", address: user },
      // Fixed recipient: user input must never turn this into an open relay.
      to: user,
      ...createContactEmail(inquiry),
    });
    if (!resultMail.accepted.length) return failure(502);
    return NextResponse.json({ success: true });
  } catch {
    // Do not log the inquiry, credentials or full SMTP errors (may contain addresses).
    console.error("Contact delivery failed; inspect SMTP configuration and provider status.");
    return failure(502);
  }
}
