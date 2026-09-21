// Import only from server components and route handlers. Never serialize credentials.
export function smtpContactEnabled() {
  return Boolean(
    process.env.SMTP_USER && process.env.SMTP_PASSWORD &&
    process.env.TURNSTILE_SECRET_KEY && process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
  );
}
