import Link from "next/link";
import { notFound } from "next/navigation";
import { projectData } from "@/lib/dashboard/data";
import {
  briefQuestions,
  dateLabel,
  money,
  stages,
  uuid,
} from "@/lib/dashboard/model";
import {
  ActionForm,
  DeleteForm,
  ProjectFields,
} from "@/components/dashboard/forms";
const defaultTerms = `Cena obejmuje dwie rundy zbiorczych poprawek w ustalonym zakresie, wersję mobilną, podstawowe ustawienia SEO oraz publikację. Usuwanie błędów wdrożenia przez 30 dni od publikacji nie zużywa rund poprawek.
Teksty: dostarcza klient; drobna redakcja w cenie. Przygotowanie tekstów i dodatkowe funkcje wymagają osobnego uzgodnienia.
Domena, hosting i płatne usługi zewnętrzne są rozliczane osobno. Ich koszt i odnowienia potwierdzimy przed startem.
Planowany termin: do ustalenia po otrzymaniu materiałów. Nowe funkcje i zmiany zaakceptowanego kierunku wyceniam przed rozpoczęciem dodatkowej pracy.
Sposób rozliczenia i dokument rozliczeniowy: do ustalenia przed przyjęciem zamówienia. Podana cena ma obejmować pełną kwotę do zapłaty przez klienta.
Pierwsza płatność po uzgodnieniu warunków współpracy. Pozostała kwota po akceptacji podglądu, przed publikacją. Kod i dostępy przekazuję po rozliczeniu, z uwzględnieniem licencji zewnętrznych materiałów.`;
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!uuid.safeParse(id).success) notFound();
  const {
    project: p,
    clients,
    tasks,
    payments,
    offers,
    briefs,
  } = await projectData(id);
  if (!p) notFound();
  const client = clients.find((c) => c.id === p.client_id)!;
  const paid = payments.reduce((s, p) => s + p.amount, 0);
  const today = new Date().toISOString().slice(0, 10);
  const valid = new Date(new Date().getTime() + 14 * 86400000)
    .toISOString()
    .slice(0, 10);
  return (
    <>
      <header className="dash-heading">
        <div>
          <Link className="dash-text-link" href="/panel">
            ← Wszystkie projekty
          </Link>
          <p className="dash-kicker">{client.company || client.name}</p>
          <h1>{p.title}</h1>
          <span className={`dash-badge ${p.stage}`}>{stages[p.stage]}</span>
        </div>
        <div className="dash-contact-links">
          {client.email && (
            <a href={`mailto:${client.email}`}>{client.email} ↗</a>
          )}
          {client.phone && (
            <a href={`tel:${client.phone.replace(/[^+\d]/g, "")}`}>
              {client.phone}
            </a>
          )}
        </div>
      </header>
      <div className="dash-stats">
        <section className="dash-stat">
          <span>Wartość projektu</span>
          <strong>{money(p.amount)}</strong>
          <small>Pełna kwota dla klienta</small>
        </section>
        <section className="dash-stat">
          <span>Zarejestrowane wpłaty</span>
          <strong>{money(paid)}</strong>
          <small>Nie są synchronizowane z bankiem</small>
        </section>
        <section className="dash-stat">
          <span>Pozostało</span>
          <strong>{money(Math.max(0, p.amount - paid))}</strong>
          <small>
            {paid > p.amount
              ? `Nadpłata: ${money(paid - p.amount)}`
              : "Według wartości projektu"}
          </small>
        </section>
        <section className="dash-stat">
          <span>Planowana publikacja</span>
          <strong className="dash-stat-date">{dateLabel(p.due_date)}</strong>
          <small>Aktualizacja: {dateLabel(p.updated_at)}</small>
        </section>
      </div>
      <nav className="dash-project-nav" aria-label="Sekcje projektu">
        <a href="#ustalenia">Ustalenia</a>
        <a href="#zadania">Zadania</a>
        <a href="#brief">Brief</a>
        <a href="#oferty">Oferty</a>
        <a href="#platnosci">Płatności</a>
      </nav>
      <div className="dash-columns">
        <section className="dash-card" id="ustalenia">
          <h2>Ustalenia projektu</h2>
          <ActionForm key={p.updated_at} operation="project-update">
            <input type="hidden" name="id" value={id} />
            <input type="hidden" name="version" value={p.updated_at} />
            <ProjectFields clients={clients} project={p} />
          </ActionForm>
        </section>
        <div>
          <section className="dash-card" id="zadania">
            <div className="dash-section-head">
              <h2>Lista zadań</h2>
              <span className="dash-muted">
                {tasks.filter((t) => t.done).length}/{tasks.length}
              </span>
            </div>
            {!tasks.length && (
              <p className="dash-muted">
                Dodaj pierwszy krok, np. odebrać materiały od klienta.
              </p>
            )}
            <ul className="dash-task-list">
              {tasks.map((t) => (
                <li key={t.id}>
                  <ActionForm
                    operation="task-toggle"
                    label={t.done ? "Przywróć" : "Ukończ"}
                    className="dash-inline"
                  >
                    <input type="hidden" name="id" value={t.id} />
                    <input type="hidden" name="done" value={String(!t.done)} />
                    <div>
                      <strong className={t.done ? "dash-done" : ""}>
                        {t.title}
                      </strong>
                      <small>{dateLabel(t.due_date)}</small>
                    </div>
                  </ActionForm>
                  <DeleteForm
                    table="crm_tasks"
                    id={t.id}
                    label="Usuń zadanie"
                  />
                </li>
              ))}
            </ul>
            <ActionForm operation="task-create" label="Dodaj zadanie">
              <input type="hidden" name="project_id" value={id} />
              <label>
                Zadanie
                <input name="title" required minLength={2} maxLength={300} />
              </label>
              <label>
                Termin
                <input name="due_date" type="date" />
              </label>
            </ActionForm>
          </section>
          <section className="dash-card" id="brief">
            <h2>Brief od klienta</h2>
            <p className="dash-muted">
              Wygeneruj jednorazowy link i wyślij go klientowi. Link wygasa po
              14 dniach. Nowy link zastępuje poprzednie niewypełnione
              formularze.
            </p>
            <ActionForm operation="brief-create" label="Utwórz link do briefu">
              <input type="hidden" name="project_id" value={id} />
            </ActionForm>
            {briefs.map((b) => (
              <details className="dash-client" key={b.id}>
                <summary>
                  <strong>
                    {b.submitted_at
                      ? "Wypełniony brief"
                      : b.revoked
                        ? "Link unieważniony"
                        : new Date(b.expires_at) < new Date()
                          ? "Link wygasł"
                          : "Oczekiwanie na odpowiedź"}
                  </strong>
                  <span>
                    {b.submitted_at
                      ? dateLabel(b.submitted_at)
                      : `Ważny do ${dateLabel(b.expires_at)}`}
                  </span>
                </summary>
                {b.answers && (
                  <dl className="dash-answers">
                    {briefQuestions.map(([key, label]) => (
                      <div key={key}>
                        <dt>{label}</dt>
                        <dd>{b.answers?.[key] || "Nie podano"}</dd>
                      </div>
                    ))}
                  </dl>
                )}
                {!b.submitted_at && !b.revoked && (
                  <ActionForm operation="brief-revoke" label="Unieważnij link">
                    <input type="hidden" name="id" value={b.id} />
                  </ActionForm>
                )}
                <DeleteForm table="crm_briefs" id={b.id} label="Usuń brief" />
              </details>
            ))}
          </section>
        </div>
      </div>
      <div className="dash-columns">
        <section className="dash-card" id="oferty">
          <h2>Oferty i wersje wyceny</h2>
          <p className="dash-muted">
            Każda oferta zachowuje własny zakres, cenę i dane klienta. Zapis nie
            wysyła wiadomości. Zmiana oferty nie zmienia wartości projektu —
            uzgodnioną kwotę zapisz w ustaleniach.
          </p>
          <ul className="dash-offer-list">
            {offers.map((o) => (
              <li key={o.id}>
                <Link href={`/panel/projekty/${id}/oferta/${o.id}`}>
                  <strong>{o.number}</strong>
                  <span>
                    {money(o.amount)} ·{" "}
                    {
                      {
                        draft: "Szkic",
                        sent: "Wysłana",
                        accepted: "Zaakceptowana",
                        rejected: "Odrzucona",
                      }[o.status]
                    }{" "}
                    ↗
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <details className="dash-client">
            <summary>
              <strong>Przygotuj nową ofertę</strong>
            </summary>
            <ActionForm operation="offer-create" label="Zapisz ofertę">
              <input type="hidden" name="project_id" value={id} />
              <div className="dash-fields">
                <label>
                  Numer oferty *
                  <input
                    name="number"
                    required
                    maxLength={80}
                    defaultValue={`${today.replaceAll("-", "")}-${id.slice(0, 4)}-${offers.length + 1}`}
                  />
                </label>
                <label>
                  Ważna do *
                  <input
                    name="valid_until"
                    required
                    type="date"
                    defaultValue={valid}
                  />
                </label>
              </div>
              <label>
                Tytuł *
                <input
                  name="title"
                  required
                  minLength={3}
                  maxLength={160}
                  defaultValue={p.title}
                />
              </label>
              <label>
                Dokładny zakres *
                <textarea
                  name="scope"
                  required
                  minLength={10}
                  maxLength={12000}
                  rows={6}
                  defaultValue={p.scope}
                />
              </label>
              <div className="dash-fields">
                <label>
                  Pełna kwota do zapłaty w PLN *
                  <input
                    name="amount"
                    required
                    inputMode="decimal"
                    defaultValue={p.amount / 100}
                  />
                </label>
                <label>
                  Pierwsza wpłata w procentach *
                  <input
                    name="deposit_percent"
                    type="number"
                    min={0}
                    max={100}
                    required
                    defaultValue={50}
                  />
                </label>
              </div>
              <label>
                Terminy, teksty, koszty utrzymania i zasady *
                <textarea
                  name="terms"
                  required
                  minLength={10}
                  maxLength={12000}
                  rows={12}
                  defaultValue={defaultTerms}
                />
              </label>
              <p className="dash-muted">
                Przed wysłaniem uzupełnij terminy, sposób rozliczenia i
                konkretne koszty usług. Oferta nie jest fakturą.
              </p>
            </ActionForm>
          </details>
        </section>
        <section className="dash-card" id="platnosci">
          <h2>Rejestr wpłat</h2>
          <p className="dash-muted">
            Wpisuj tylko otrzymane płatności. To pomocnicza ewidencja projektu,
            nie system księgowy.
          </p>
          {payments.map((payment) => (
            <div className="dash-payment" key={payment.id}>
              <div>
                <strong>{payment.label}</strong>
                <small>{dateLabel(payment.paid_at)}</small>
              </div>
              <b>{money(payment.amount)}</b>
              <DeleteForm
                id={payment.id}
                table="crm_payments"
                label="Usuń wpis"
              />
            </div>
          ))}
          <ActionForm operation="payment-create" label="Zarejestruj wpłatę">
            <input type="hidden" name="project_id" value={id} />
            <label>
              Opis *
              <input
                name="label"
                required
                minLength={2}
                maxLength={160}
                placeholder="Np. Pierwsza wpłata 50%"
              />
            </label>
            <div className="dash-fields">
              <label>
                Kwota w PLN *
                <input name="amount" required inputMode="decimal" />
              </label>
              <label>
                Data otrzymania *
                <input
                  name="paid_at"
                  type="date"
                  required
                  defaultValue={today}
                />
              </label>
            </div>
          </ActionForm>
        </section>
      </div>
      <section className="dash-card">
        <h2>Porządkowanie projektu</h2>
        <p className="dash-muted">
          Aby zachować historię, ustaw etap „Archiwum”. Trwałe usunięcie kasuje
          też zadania, wpłaty, oferty i briefy tego projektu.
        </p>
        <DeleteForm
          table="crm_projects"
          id={id}
          label="Usuń projekt i jego dane"
          warning="Projekt i wszystkie powiązane dane zostaną trwale usunięte. Kontakt klienta pozostanie w książce kontaktów."
        />
      </section>
    </>
  );
}
