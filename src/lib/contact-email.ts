export type ContactInquiry = {
  name: string;
  contact: string;
  service: string;
  message: string;
};

export const isContactEmail = (value: string) =>
  /^[^\s@<>(),;:"\\]+@[^\s@<>(),;:"\\]+\.[^\s@<>(),;:"\\]+$/.test(value);

export function parseInquiry(value: unknown): ContactInquiry | null {
  if (!value || typeof value !== "object") return null;
  const data = value as Record<string, unknown>;
  if (!["name", "contact", "service", "message"].every((key) => typeof data[key] === "string")) return null;
  const name = (data.name as string).trim();
  const contact = (data.contact as string).trim();
  const service = (data.service as string).trim();
  const message = (data.message as string).trim();
  if (name.length < 2 || name.length > 100 || contact.length > 254 || service.length > 100 || message.length < 10 || message.length > 5000) return null;
  if ([name, contact, service].some((field) => /[\r\n\x00-\x1f\x7f]/.test(field))) return null;
  const digits = contact.replace(/\D/g, "");
  const phone = /^[+\d ()-]+$/.test(contact) && digits.length >= 9 && digits.length <= 15;
  if (!isContactEmail(contact) && !phone) return null;
  return { name, contact, service: service || "Projekt indywidualny", message };
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]!);
}

export function createContactEmail(inquiry: ContactInquiry) {
  const { name, contact, service, message } = inquiry;
  const email = isContactEmail(contact);
  const subject = `Nowe zapytanie | ${service} | ${name}`;
  const href = email
    ? `mailto:${contact}?subject=${encodeURIComponent(`Re: ${service}`)}`
    : `tel:${contact.replace(/[^+\d]/g, "")}`;
  const safe = { name: escapeHtml(name), contact: escapeHtml(contact), service: escapeHtml(service), message: escapeHtml(message).replace(/\r?\n/g, "<br />") };
  const text = `NOWE ZAPYTANIE · DORLOWSKI.DEV\n\nNadawca: ${name}\nKontakt: ${contact}\nProjekt: ${service}\n\nOPIS PROJEKTU\n${message}\n\n${email ? "Odpowiedz na tę wiadomość, aby skontaktować się z nadawcą." : "Klient podał numer telefonu — skontaktuj się z nim telefonicznie."}`;
  const html = `<!doctype html>
<html lang="pl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Nowe zapytanie</title></head>
<body style="margin:0;padding:0;background:#f2f0ed;color:#1d1d1d;font-family:Arial,Helvetica,sans-serif;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${safe.name} — ${safe.service}. Nowa wiadomość z portfolio.</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f2f0ed;"><tr><td align="center" style="padding:32px 12px;">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:#ffffff;border:1px solid #e4e0db;">
<tr><td style="padding:28px 32px;background:#1d1d1d;color:#ffffff;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td style="font-size:32px;font-weight:bold;letter-spacing:-3px;">do<span style="color:#ffffff;">.</span></td><td align="right" style="font-size:11px;letter-spacing:2px;color:#d6d2ce;">DORLOWSKI.DEV</td></tr></table>
</td></tr>
<tr><td style="height:5px;background:#a00c30;font-size:0;">&nbsp;</td></tr>
<tr><td style="padding:36px 32px 24px;">
<p style="margin:0 0 14px;color:#a00c30;font-size:11px;font-weight:bold;letter-spacing:2px;">FORMULARZ KONTAKTOWY</p>
<h1 style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:36px;line-height:1.15;font-weight:normal;">Nowy projekt<br>zaczyna się tutaj.</h1>
<p style="margin:18px 0 0;font-size:15px;line-height:1.7;color:#65615c;">${safe.name} przesyła zapytanie o współpracę.</p>
</td></tr>
<tr><td style="padding:0 32px 28px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f6f4f1;">
<tr><td style="padding:20px 20px 6px;color:#716b65;font-size:11px;letter-spacing:1px;">RODZAJ PROJEKTU</td></tr>
<tr><td style="padding:0 20px 20px;font-size:20px;font-weight:bold;overflow-wrap:anywhere;">${safe.service}</td></tr>
<tr><td style="padding:0 20px 6px;color:#716b65;font-size:11px;letter-spacing:1px;">KONTAKT</td></tr>
<tr><td style="padding:0 20px 20px;font-size:15px;line-height:1.6;overflow-wrap:anywhere;">${safe.name}<br><a href="${escapeHtml(href)}" style="color:#a00c30;text-decoration:underline;">${safe.contact}</a></td></tr>
</table></td></tr>
<tr><td style="padding:0 32px 30px;">
<p style="margin:0 0 14px;font-size:11px;letter-spacing:2px;color:#716b65;">WIADOMOŚĆ</p>
<div style="font-size:16px;line-height:1.8;overflow-wrap:anywhere;word-break:break-word;">${safe.message}</div>
</td></tr>
<tr><td style="padding:0 32px 36px;">
<table role="presentation" cellpadding="0" cellspacing="0"><tr><td bgcolor="#a00c30" style="background:#a00c30;padding:16px 24px;"><a href="${escapeHtml(href)}" style="color:#ffffff;text-decoration:none;font-size:14px;font-weight:bold;">${email ? "Odpowiedz na zapytanie" : "Zadzwoń do klienta"} &rarr;</a></td></tr></table>
<p style="margin:16px 0 0;font-size:12px;line-height:1.6;color:#716b65;">${email ? "Możesz też użyć przycisku „Odpowiedz” w swojej poczcie." : "Nadawca podał numer telefonu zamiast adresu e-mail."}</p>
</td></tr>
<tr><td style="border-top:1px solid #e4e0db;padding:22px 32px;font-size:11px;line-height:1.7;color:#716b65;">Dawid Orłowski · Design & Development<br>Powiadomienie z formularza na dorlowski.dev</td></tr>
</table></td></tr></table></body></html>`;
  return { subject, text, html, replyTo: email ? contact : undefined };
}
