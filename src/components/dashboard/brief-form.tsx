"use client";
import Link from "next/link";
import { useActionState, useState } from "react";
import { submitBrief } from "@/app/brief/[token]/actions";
import { briefQuestions } from "@/lib/dashboard/model";
export function BriefForm({ token }: { token: string }) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [state, action, pending] = useActionState(submitBrief, {});
  if (state.success)
    return (
      <section className="dash-card" role="status">
        <p className="dash-kicker">BRIEF WYSŁANY</p>
        <h2>Dziękuję za odpowiedzi</h2>
        <p>{state.success}</p>
        <Link href="/" className="dash-button">
          Wróć do portfolio
        </Link>
      </section>
    );
  return (
    <form action={action} className="dash-form">
      <input type="hidden" name="token" value={token} />
      <div className="dash-honeypot" aria-hidden="true">
        <label>
          Strona internetowa
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      {briefQuestions.map(([key, label, hint], index) => (
        <section key={key} className="dash-brief-question">
          <label htmlFor={`brief-${key}`}>
            <span className="dash-kicker">
              {String(index + 1).padStart(2, "0")}
            </span>
            <strong>
              {label}
              {index < 2 ? " *" : ""}
            </strong>
          </label>
          <p id={`hint-${key}`} className="dash-muted">
            {hint}
          </p>
          <textarea
            id={`brief-${key}`}
            aria-describedby={`hint-${key}`}
            name={key}
            value={answers[key] || ""}
            onChange={(e) =>
              setAnswers((prev) => ({ ...prev, [key]: e.target.value }))
            }
            required={index < 2}
            minLength={index < 2 ? 3 : undefined}
            maxLength={3000}
            rows={4}
          />
        </section>
      ))}
      <p className="dash-muted">
        Odpowiedzi służą przygotowaniu oferty i ustaleniom współpracy. Nie
        wpisuj haseł ani danych wrażliwych. Szczegóły w{" "}
        <a href="/polityka-prywatnosci" target="_blank" rel="noreferrer">
          polityce prywatności
        </a>
        . Wysłanie briefu nie jest zamówieniem.
      </p>
      {state.error && (
        <p role="alert" className="dash-error">
          {state.error}
        </p>
      )}
      <button className="dash-button" disabled={pending}>
        {pending ? "Zapisywanie…" : "Wyślij brief"}
      </button>
    </form>
  );
}
