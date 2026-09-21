"use client";
import { useActionState, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { mutate } from "@/lib/dashboard/actions";
import {
  packages,
  type ActionState,
  type Client,
  type Project,
} from "@/lib/dashboard/model";
import { stages } from "@/lib/dashboard/model";

function Submit({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button className="dash-button" disabled={pending} type="submit">
      {pending ? "Zapisywanie…" : label}
    </button>
  );
}
export function ActionForm({
  children,
  operation,
  label = "Zapisz",
  action = mutate,
  className = "",
}: {
  children: React.ReactNode;
  operation?: string;
  label?: string;
  action?: (state: ActionState, form: FormData) => Promise<ActionState>;
  className?: string;
}) {
  const keepInput = useRef(false);
  const [state, dispatch] = useActionState(
    async (previous: ActionState, form: FormData) => {
      const next = await action(previous, form);
      keepInput.current = Boolean(next.error);
      return next;
    },
    {},
  );
  return (
    <form
      action={dispatch}
      className={`dash-form ${className}`}
      onReset={(event) => {
        // React resets uncontrolled inputs after actions; keep edits when validation fails.
        if (keepInput.current) event.preventDefault();
      }}
    >
      {operation && <input type="hidden" name="operation" value={operation} />}
      {children}
      <div className="dash-form-bottom">
        <Submit label={label} />
        {state.error && (
          <p role="alert" className="dash-error">
            {state.error}
          </p>
        )}
        {state.success && (
          <p role="status" className="dash-success">
            {state.success}
          </p>
        )}
      </div>
      {state.link && <CopyLink value={state.link} />}
    </form>
  );
}
function CopyLink({ value }: { value: string }) {
  const [message, setMessage] = useState("");
  return (
    <div className="dash-copy">
      <label>
        Link dla klienta
        <input readOnly value={value} onFocus={(e) => e.target.select()} />
      </label>
      <button
        type="button"
        className="dash-button secondary"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(value);
            setMessage("Skopiowano");
          } catch {
            setMessage("Zaznacz link i skopiuj ręcznie");
          }
        }}
      >
        {message || "Kopiuj link"}
      </button>
    </div>
  );
}
export function ClientFields({ client }: { client?: Client }) {
  return (
    <>
      <div className="dash-fields">
        <label>
          Imię i nazwisko *
          <input
            name="name"
            required
            minLength={2}
            maxLength={120}
            defaultValue={client?.name}
            autoComplete="name"
          />
        </label>
        <label>
          Firma
          <input
            name="company"
            maxLength={160}
            defaultValue={client?.company}
            autoComplete="organization"
          />
        </label>
        <label>
          E-mail
          <input
            type="email"
            name="email"
            maxLength={254}
            defaultValue={client?.email}
            autoComplete="email"
          />
        </label>
        <label>
          Telefon
          <input
            name="phone"
            type="tel"
            maxLength={40}
            defaultValue={client?.phone}
            autoComplete="tel"
          />
        </label>
      </div>
      <label>
        Notatki o kliencie
        <textarea
          name="notes"
          maxLength={5000}
          defaultValue={client?.notes}
          rows={3}
        />
      </label>
    </>
  );
}
export function ProjectFields({
  clients,
  project,
}: {
  clients: Client[];
  project?: Project;
}) {
  const [value, setValue] = useState(
    project ? String(project.amount / 100) : "990",
  );
  return (
    <>
      <div className="dash-fields">
        <label>
          Nazwa projektu *
          <input
            name="title"
            required
            minLength={3}
            maxLength={160}
            defaultValue={project?.title}
            placeholder="Np. Strona dla pracowni ceramicznej"
          />
        </label>
        <label>
          Klient *
          <select
            name="client_id"
            defaultValue={project?.client_id || ""}
            required
          >
            <option value="" disabled>
              Wybierz klienta
            </option>
            {clients.map((c) => (
              <option key={c.id} value={c.id}>
                {c.company || c.name} · {c.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Pakiet
          <select
            name="package"
            defaultValue={project?.package || "start"}
            onChange={(e) => {
              if (!project)
                setValue(
                  String(
                    packages[e.target.value as keyof typeof packages].amount /
                      100,
                  ),
                );
            }}
          >
            {Object.entries(packages).map(([key, p]) => (
              <option key={key} value={key}>
                {p.label}
              </option>
            ))}
          </select>
        </label>
        <label>
          Etap
          <select name="stage" defaultValue={project?.stage || "inquiry"}>
            {Object.entries(stages).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <label>
          Ustalona wartość w PLN *
          <input
            name="amount"
            inputMode="decimal"
            required
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </label>
        <label>
          Termin publikacji
          <input
            name="due_date"
            type="date"
            defaultValue={project?.due_date || ""}
          />
        </label>
      </div>
      <label>
        Zakres projektu
        <textarea
          name="scope"
          rows={5}
          maxLength={12000}
          defaultValue={project?.scope}
          placeholder="Sekcje, podstrony, funkcje i ustalenia"
        />
      </label>
      <label>
        Link do materiałów
        <input
          name="materials_url"
          type="url"
          maxLength={2000}
          defaultValue={project?.materials_url}
          placeholder="https://…"
        />
      </label>
      <label>
        Notatki wewnętrzne
        <textarea
          name="notes"
          rows={4}
          maxLength={12000}
          defaultValue={project?.notes}
          placeholder="Kolejny krok, ustalenia z rozmowy…"
        />
      </label>
    </>
  );
}
export function DeleteForm({
  table,
  id,
  label = "Usuń",
  warning,
}: {
  table: string;
  id: string;
  label?: string;
  warning?: string;
}) {
  return (
    <details className="dash-delete">
      <summary>{label}</summary>
      <p>{warning || "Ta operacja jest nieodwracalna."}</p>
      <ActionForm operation="delete" label="Potwierdź usunięcie">
        <input type="hidden" name="table" value={table} />
        <input type="hidden" name="id" value={id} />
        <label>
          Wpisz USUŃ
          <input
            name="confirmation"
            required
            pattern="USUŃ"
            autoComplete="off"
          />
        </label>
      </ActionForm>
    </details>
  );
}
export function PrintButton() {
  return (
    <button className="dash-button" onClick={() => window.print()}>
      Drukuj / zapisz PDF
    </button>
  );
}
