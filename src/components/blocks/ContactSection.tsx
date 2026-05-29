"use client";

import { useState, type FormEvent } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2, Loader2 } from "lucide-react";
import { cvData } from "@/data/cv-data";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Wysyłka maili bez własnego backendu przez Web3Forms (darmowe, ~250 wiadomości/mies.).
 *
 * Jak aktywować (30 sekund):
 *  1. Wejdź na https://web3forms.com → wpisz swój e-mail (dawid.orlowski2002@gmail.com).
 *  2. Klucz dostępu przyjdzie na Twoją skrzynkę.
 *  3. Wklej go poniżej w WEB3FORMS_ACCESS_KEY.
 * Wiadomości z formularza będą przychodzić na e-mail użyty do wygenerowania klucza.
 *
 * Dopóki klucz jest pusty, formularz używa fallbacku mailto (otwiera klienta poczty).
 */
const WEB3FORMS_ACCESS_KEY = "";

type Status = "idle" | "sending" | "success" | "error";

const inputClass =
  "w-full rounded-xl border border-input bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-ring/40";

export function ContactSection() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (name.trim().length < 2) e.name = "Podaj imię.";
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.trim());
    const isPhone = contact.replace(/\D/g, "").length >= 9;
    if (!isEmail && !isPhone) e.contact = "Podaj e-mail lub numer telefonu.";
    if (message.trim().length < 10) e.message = "Opisz krótko projekt (min. 10 znaków).";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setStatus("sending");

    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.trim());

    try {
      if (WEB3FORMS_ACCESS_KEY) {
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            access_key: WEB3FORMS_ACCESS_KEY,
            subject: `Nowe zapytanie ze strony — ${name}`,
            from_name: "Formularz portfolio",
            Imię: name,
            Kontakt: contact,
            "Czego dotyczy": service || "—",
            message,
            // gdy kontakt to e-mail, ustaw jako reply-to
            ...(isEmail ? { email: contact.trim() } : {}),
          }),
        });
        const json = await res.json();
        if (!json.success) throw new Error("Request failed");
      } else {
        // Fallback bez klucza — otwiera klienta poczty z uzupełnioną treścią
        const subject = encodeURIComponent(`Zapytanie o projekt — ${name}`);
        const body = encodeURIComponent(
          `Imię: ${name}\nKontakt: ${contact}\nUsługa: ${service || "—"}\n\nWiadomość:\n${message}`
        );
        window.location.href = `mailto:${cvData.personal.email}?subject=${subject}&body=${body}`;
      }
      setStatus("success");
      setName("");
      setContact("");
      setService("");
      setMessage("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <Section id="kontakt">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        {/* Lewa kolumna — informacje */}
        <div>
          <SectionHeading
            eyebrow="07 — Kontakt"
            title="Zróbmy coś razem"
            subtitle="Opisz krótko swój pomysł lub firmę. Odpiszę zwykle w ciągu 24h z bezpłatną wyceną i propozycją rozwiązania."
          />

          <div className="flex flex-col gap-4">
            <a
              href={`mailto:${cvData.personal.email}`}
              className="group flex items-center gap-4 rounded-2xl border border-border bg-card/50 p-4 transition-colors hover:border-primary/40"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                <Mail size={18} />
              </span>
              <span>
                <span className="block text-xs text-muted-foreground">E-mail</span>
                <span className="text-sm font-medium text-foreground">
                  {cvData.personal.email}
                </span>
              </span>
            </a>

            <a
              href={`tel:${cvData.personal.phone.replace(/\s/g, "")}`}
              className="group flex items-center gap-4 rounded-2xl border border-border bg-card/50 p-4 transition-colors hover:border-primary/40"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                <Phone size={18} />
              </span>
              <span>
                <span className="block text-xs text-muted-foreground">Telefon</span>
                <span className="text-sm font-medium text-foreground">
                  {cvData.personal.phone}
                </span>
              </span>
            </a>

            <div className="flex items-center gap-4 rounded-2xl border border-border bg-card/50 p-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                <MapPin size={18} />
              </span>
              <span>
                <span className="block text-xs text-muted-foreground">Lokalizacja</span>
                <span className="text-sm font-medium text-foreground">
                  {cvData.personal.location} · zdalnie w całej Polsce
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* Prawa kolumna — formularz */}
        <Reveal delay={0.1}>
          <div className="rounded-3xl border border-border bg-card/50 p-6 md:p-8">
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
                <CheckCircle2 className="h-14 w-14 text-primary" />
                <h3 className="font-display text-2xl font-bold text-foreground">
                  Dziękuję!
                </h3>
                <p className="max-w-sm text-muted-foreground">
                  Wiadomość została przygotowana. Odezwę się najszybciej jak to możliwe.
                </p>
                <Button variant="outline" onClick={() => setStatus("idle")}>
                  Wyślij kolejną
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-foreground">
                    Imię *
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jak się do Ciebie zwracać?"
                    className={cn(inputClass, errors.name && "border-destructive")}
                  />
                  {errors.name && (
                    <p className="mt-1.5 text-xs text-destructive">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="contact" className="mb-1.5 block text-sm font-medium text-foreground">
                    E-mail lub telefon *
                  </label>
                  <input
                    id="contact"
                    type="text"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="abc@firma.pl lub 600 100 200"
                    className={cn(inputClass, errors.contact && "border-destructive")}
                  />
                  {errors.contact && (
                    <p className="mt-1.5 text-xs text-destructive">{errors.contact}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="service" className="mb-1.5 block text-sm font-medium text-foreground">
                    Czego dotyczy projekt?
                  </label>
                  <select
                    id="service"
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className={cn(inputClass, "appearance-none")}
                  >
                    <option value="">Wybierz (opcjonalnie)</option>
                    {cvData.services.map((s) => (
                      <option key={s.id} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                    <option value="Inne">Inne / nie wiem jeszcze</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-foreground">
                    Wiadomość *
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Opowiedz krótko o firmie i czego potrzebujesz…"
                    className={cn(inputClass, "resize-y", errors.message && "border-destructive")}
                  />
                  {errors.message && (
                    <p className="mt-1.5 text-xs text-destructive">{errors.message}</p>
                  )}
                </div>

                {status === "error" && (
                  <p className="text-sm text-destructive">
                    Coś poszło nie tak. Napisz proszę bezpośrednio na {cvData.personal.email}.
                  </p>
                )}

                <Button
                  type="submit"
                  size="lg"
                  disabled={status === "sending"}
                  className="group font-semibold"
                >
                  {status === "sending" ? (
                    <>
                      <Loader2 className="animate-spin" /> Wysyłanie…
                    </>
                  ) : (
                    <>
                      Wyślij zapytanie
                      <Send className="transition-transform duration-300 group-hover:translate-x-0.5" />
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
