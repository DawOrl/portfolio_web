"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRight, CheckCircle2, Loader2 } from "lucide-react";
import { cvData } from "@/data/cv-data";
import { ContactChallenge } from "@/components/ui/contact-challenge";

/**
 * Po skonfigurowaniu SMTP i Turnstile formularz wysyła przez /api/contact.
 * Do tego czasu wysyła zapytanie bezpośrednio do Web3Forms.
 * (Darmowy plan Web3Forms dopuszcza wyłącznie wysyłkę po stronie przeglądarki —
 * server-side jest zablokowany, dlatego nie używamy własnego API route.)
 *
 * Klucz pochodzi z NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY w .env.local → NIE trafia do
 * repozytorium. Uwaga: klucze Web3Forms są z założenia publiczne (widoczne w
 * przeglądarce) i mają ochronę antyspamową — to standardowe, bezpieczne użycie.
 * Gdy klucz nie jest ustawiony, formularz robi fallback mailto.
 */

const WEB3FORMS_ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

type Status = "idle" | "sending" | "success" | "error" | "mailto";

export function ContactSection({ smtpEnabled = false }: { smtpEnabled?: boolean }) {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [token, setToken] = useState("");
  const [challengeVersion, setChallengeVersion] = useState(0);
  const [website, setWebsite] = useState("");

  const validate = () => {
    const e: Record<string, string> = {};
    if (name.trim().length < 2) e.name = "Podaj imię.";
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.trim());
    const isPhone = contact.replace(/\D/g, "").length >= 9;
    if (!isEmail && !isPhone) e.contact = "Podaj e-mail lub numer telefonu.";
    if (message.trim().length < 10)
      e.message = "Opisz krótko projekt (min. 10 znaków).";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    if (status === "sending" || (smtpEnabled && !token)) return;
    if (!validate()) return;
    setStatus("sending");

    const mailtoFallback = () => {
      const subject = encodeURIComponent(`Zapytanie o projekt — ${name}`);
      const body = encodeURIComponent(
        `Imię: ${name}\nKontakt: ${contact}\nUsługa: ${service || "—"}\n\nWiadomość:\n${message}`,
      );
      window.location.href = `mailto:${cvData.personal.email}?subject=${subject}&body=${body}`;
    };

    const resetFields = () => {
      setName("");
      setContact("");
      setService("");
      setMessage("");
    };

    // Brak klucza → fallback mailto (otwiera klienta poczty)
    if (!smtpEnabled && !WEB3FORMS_ACCESS_KEY) {
      mailtoFallback();
      setStatus("mailto");
      return;
    }

    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.trim());

    try {
      if (smtpEnabled) {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, contact, service, message, website, token }),
          signal: AbortSignal.timeout(35000),
        });
        const json = await res.json().catch(() => ({}));
        if (!res.ok || !json.success) throw new Error("send failed");
        setStatus("success");
        resetFields();
        return;
      }
      // FormData = "prosty" request (multipart/form-data) → brak preflightu OPTIONS,
      // więc nie napotykamy blokady CORS, którą zwraca Web3Forms dla żądań JSON.
      if (!WEB3FORMS_ACCESS_KEY) throw new Error("missing form configuration");
      const formData = new FormData();
      formData.append("access_key", WEB3FORMS_ACCESS_KEY);
      formData.append("subject", `Nowe zapytanie | ${service || "Projekt indywidualny"} | ${name.trim()}`);
      formData.append("from_name", "Dawid Orłowski | Zapytania ze strony");
      // ASCII field names avoid corrupted multipart field labels in notification emails.
      formData.append("Nadawca", name.trim());
      formData.append("Kontakt", contact.trim());
      formData.append("Projekt", service || "Do ustalenia");
      formData.append("Opis projektu", message.trim());
      if (isEmail) formData.append("replyto", contact.trim());

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.success) throw new Error("send failed");

      setStatus("success");
      resetFields();
    } catch {
      setStatus("error");
    } finally {
      if (smtpEnabled) {
        setToken("");
        setChallengeVersion((value) => value + 1);
      }
    }
  };

  return (
    <section
      id="kontakt"
      className="contact-editorial"
      aria-labelledby="contact-heading"
    >
      <div className="shell">
        <div className="contact-section-label">
          <span>07 / KONTAKT</span>
          <span>DOBRE RZECZY ZACZYNAJĄ SIĘ OD ROZMOWY.</span>
        </div>
        <div className="contact-layout">
          <div className="contact-form-column">
            {status === "success" || status === "mailto" ? (
              <div className="contact-success" role="status">
                <CheckCircle2 size={42} />
                <h3>
                  {status === "mailto"
                    ? "Jeszcze jeden krok."
                    : "Dziękuję za wiadomość."}
                </h3>
                <p>
                  {status === "mailto"
                    ? "Otworzyłem program pocztowy z treścią zapytania. Wyślij wiadomość w swoim programie, aby do mnie dotarła."
                    : "Twoja wiadomość została wysłana. Odezwę się najszybciej, jak to możliwe."}
                </p>
                <button
                  className="contact-submit"
                  onClick={() => setStatus("idle")}
                >
                  {status === "mailto"
                    ? "Wróć do formularza"
                    : "Wyślij kolejną"}
                  <ArrowUpRight size={18} />
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="contact-form"
                aria-label="Zapytanie o projekt"
                aria-busy={status === "sending"}
              >
                <div className="contact-field">
                  <label htmlFor="name">
                    Twoje imię <span>*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    autoComplete="name"
                    maxLength={100}
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jak się do Ciebie zwracać?"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                  />
                  {errors.name && (
                    <p id="name-error" role="alert">
                      {errors.name}
                    </p>
                  )}
                </div>
                <div className="contact-field">
                  <label htmlFor="contact">
                    E-mail lub telefon <span>*</span>
                  </label>
                  <input
                    id="contact"
                    name="contact"
                    maxLength={254}
                    required
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="Gdzie mogę się odezwać?"
                    aria-invalid={!!errors.contact}
                    aria-describedby={
                      errors.contact ? "contact-error" : undefined
                    }
                  />
                  {errors.contact && (
                    <p id="contact-error" role="alert">
                      {errors.contact}
                    </p>
                  )}
                </div>
                <div className="contact-field">
                  <label htmlFor="service">
                    Co tworzymy? <span>opcjonalnie</span>
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                  >
                    <option value="">Wybierz rodzaj projektu</option>
                    {cvData.services.map((s) => (
                      <option key={s.id} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                    <option value="Inne">
                      Porozmawiajmy — jeszcze nie wiem
                    </option>
                  </select>
                </div>
                <div className="contact-field">
                  <label htmlFor="message">
                    Opowiedz o swoim pomyśle <span>*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    maxLength={5000}
                    required
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Czym się zajmujesz i czego potrzebujesz?"
                    aria-invalid={!!errors.message}
                    aria-describedby={
                      errors.message ? "message-error" : undefined
                    }
                  />
                  {errors.message && (
                    <p id="message-error" role="alert">
                      {errors.message}
                    </p>
                  )}
                </div>
                {smtpEnabled && <>
                  <div hidden aria-hidden="true">
                    <label htmlFor="contact-website">Website</label>
                    <input id="contact-website" name="website" tabIndex={-1} autoComplete="off" value={website} onChange={(event) => setWebsite(event.target.value)} />
                  </div>
                  <ContactChallenge key={challengeVersion} onToken={setToken} />
                </>}
                {status === "error" && (
                  <p className="contact-error" role="alert">
                    Nie udało się wysłać wiadomości. Spróbuj ponownie lub napisz
                    na{" "}
                    <a href={`mailto:${cvData.personal.email}`}>
                      {cvData.personal.email}
                    </a>
                    .
                  </p>
                )}
                <button
                  type="submit"
                  disabled={status === "sending" || (smtpEnabled && !token)}
                  className="contact-submit"
                >
                  {status === "sending" ? (
                    <>
                      Wysyłanie…
                      <Loader2 className="animate-spin" size={18} />
                    </>
                  ) : (
                    <>
                      Wyślij zapytanie
                      <ArrowUpRight size={21} />
                    </>
                  )}
                </button>
                <p className="contact-form-note">
                  Bezpłatna wycena. Bez zobowiązań.{" "}
                  <span>* Pola wymagane.</span>
                </p>
              </form>
            )}
          </div>
          <div className="contact-invitation">
            <div className="contact-title-art">
              <svg
                className="contact-contour"
                viewBox="0 0 460 360"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M83 50C159-2 372 19 409 99C446 179 341 329 260 336C179 343 176 251 95 219C14 187 7 102 83 50Z"
                  stroke="currentColor"
                />
                <path
                  d="M103 30C191-7 384 55 391 135C398 215 322 334 239 326C156 318 175 245 100 204C25 164 15 68 103 30Z"
                  stroke="currentColor"
                  opacity=".35"
                />
              </svg>
              <span className="contact-mini-cube" aria-hidden="true" />
              <h2 id="contact-heading">
                Zróbmy
                <br />
                <span>
                  <i aria-hidden="true" />
                  coś <em>razem.</em>
                </span>
              </h2>
            </div>
            <p className="contact-invitation-copy">
              Masz pomysł, pytanie albo potrzebujesz nowego spojrzenia na swoją
              stronę? Napisz kilka słów. Zwykle odpowiadam w ciągu 24 godzin.
            </p>
            <div className="contact-direct">
              <a href={`mailto:${cvData.personal.email}`}>
                {cvData.personal.email}
                <ArrowUpRight size={15} />
              </a>
              <a href={`tel:+48${cvData.personal.phone.replace(/\D/g, "")}`}>
                +48 {cvData.personal.phone}
                <ArrowUpRight size={15} />
              </a>
              <span>Kraków · współpraca zdalna w całej Polsce</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
