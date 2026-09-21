import Link from "next/link";
import { ArrowUpRight, Plus, Search } from "lucide-react";
import { dashboardData } from "@/lib/dashboard/data";
import {
  money,
  stages,
  totals,
  dateLabel,
  type Stage,
} from "@/lib/dashboard/model";
export default async function Dashboard({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; stage?: string; view?: string }>;
}) {
  const { projects, clients, tasks, payments } = await dashboardData();
  const filter = await searchParams;
  const q = (filter.q || "").slice(0, 160).toLocaleLowerCase("pl");
  const values = totals(projects, payments);
  const visible = projects.filter(
    (p) =>
      (filter.stage ? p.stage === filter.stage : p.stage !== "archived") &&
      `${p.title} ${clients.find((c) => c.id === p.client_id)?.name} ${clients.find((c) => c.id === p.client_id)?.company}`
        .toLocaleLowerCase("pl")
        .includes(q),
  );
  const pending = tasks.filter(
    (t) =>
      !t.done &&
      projects.some(
        (p) =>
          p.id === t.project_id && !["completed", "archived"].includes(p.stage),
      ),
  );
  const today = new Date().toISOString().slice(0, 10);
  return (
    <>
      <header className="dash-heading">
        <div>
          <p className="dash-kicker">PRZEGLĄD PRACOWNI</p>
          <h1>
            Dobry plan.
            <br />
            <em>Spokojniejsza praca.</em>
          </h1>
          <p>
            {
              projects.filter(
                (p) => !["completed", "archived"].includes(p.stage),
              ).length
            }{" "}
            otwartych projektów · {pending.length} zadań do zrobienia
          </p>
        </div>
        <Link className="dash-button" href="/panel/projekty/nowy">
          <Plus size={16} /> Nowy projekt
        </Link>
      </header>
      <div className="dash-stats">
        {[
          ["W rozmowach", values.pipeline, "Zapytania i wyceny"],
          ["Wartość uzgodniona", values.agreed, "Zaakceptowane i realizowane"],
          ["Wpłaty", values.paid, "Ręcznie zarejestrowane"],
          [
            "Do rozliczenia",
            values.remaining,
            "Uzgodnione projekty bez archiwum",
          ],
        ].map(([label, value, detail]) => (
          <section key={label} className="dash-stat">
            <span>{label}</span>
            <strong>{money(Number(value))}</strong>
            <small>{detail}</small>
          </section>
        ))}
      </div>
      <section className="dash-card">
        <div className="dash-section-head">
          <div>
            <p className="dash-kicker">OD ZAPYTANIA DO REALIZACJI</p>
            <h2>Twoje projekty</h2>
          </div>
          <div className="dash-view">
            <Link
              aria-current={filter.view !== "board" ? "page" : undefined}
              href={{ pathname: "/panel", query: { ...filter, view: "list" } }}
            >
              Lista
            </Link>
            <Link
              aria-current={filter.view === "board" ? "page" : undefined}
              href={{ pathname: "/panel", query: { ...filter, view: "board" } }}
            >
              Tablica
            </Link>
          </div>
        </div>
        <form className="dash-filters" action="/panel">
          <label>
            <span className="sr-only">Szukaj projektu lub klienta</span>
            <Search size={16} />
            <input
              name="q"
              defaultValue={filter.q}
              placeholder="Szukaj projektu lub klienta…"
              maxLength={160}
            />
          </label>
          <label>
            <span className="sr-only">Etap</span>
            <select name="stage" defaultValue={filter.stage || ""}>
              <option value="">Wszystkie otwarte i zakończone</option>
              {Object.entries(stages).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </label>
          <input type="hidden" name="view" value={filter.view || "list"} />
          <button className="dash-button secondary">Filtruj</button>
        </form>
        {!visible.length ? (
          <div className="dash-empty">
            <h3>
              {projects.length
                ? "Brak wyników"
                : "Miejsce na Twój pierwszy projekt"}
            </h3>
            <p>
              {projects.length
                ? "Zmień wyszukiwanie lub etap projektu."
                : "Dodaj klienta, utwórz projekt i wyślij brief. Nowe zapytania ze strony pojawią się tutaj po podłączeniu integracji."}
            </p>
            <Link
              href={projects.length ? "/panel" : "/panel/klienci"}
              className="dash-text-link"
            >
              {projects.length ? "Wyczyść filtry" : "Dodaj pierwszego klienta"}{" "}
              <ArrowUpRight size={16} />
            </Link>
          </div>
        ) : filter.view === "board" ? (
          <div className="dash-board">
            {Object.entries(stages)
              .filter(([key]) =>
                filter.stage ? key === filter.stage : key !== "archived",
              )
              .map(([key, label]) => (
                <section key={key}>
                  <h3>
                    {label}
                    <span>{visible.filter((p) => p.stage === key).length}</span>
                  </h3>
                  {visible
                    .filter((p) => p.stage === key)
                    .map((p) => (
                      <Link
                        className="dash-board-card"
                        href={`/panel/projekty/${p.id}`}
                        key={p.id}
                      >
                        <small>
                          {clients.find((c) => c.id === p.client_id)?.company ||
                            clients.find((c) => c.id === p.client_id)?.name}
                        </small>
                        <strong>{p.title}</strong>
                        <span>{money(p.amount)}</span>
                        <small>{dateLabel(p.due_date)}</small>
                      </Link>
                    ))}
                </section>
              ))}
          </div>
        ) : (
          <div className="dash-table-scroll">
            <table className="dash-table">
              <thead>
                <tr>
                  <th>Projekt / klient</th>
                  <th>Etap</th>
                  <th>Wartość</th>
                  <th>Termin</th>
                  <th>
                    <span className="sr-only">Otwórz</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {visible.map((p) => (
                  <tr key={p.id}>
                    <td>
                      <Link href={`/panel/projekty/${p.id}`}>
                        <strong>{p.title}</strong>
                        <small>
                          {clients.find((c) => c.id === p.client_id)?.company ||
                            clients.find((c) => c.id === p.client_id)?.name}
                          {p.source === "website" ? " · Formularz strony" : ""}
                        </small>
                      </Link>
                    </td>
                    <td>
                      <span className={`dash-badge ${p.stage}`}>
                        {stages[p.stage as Stage]}
                      </span>
                    </td>
                    <td>{money(p.amount)}</td>
                    <td
                      className={
                        p.due_date &&
                        p.due_date < today &&
                        !["completed", "archived"].includes(p.stage)
                          ? "dash-overdue"
                          : ""
                      }
                    >
                      {dateLabel(p.due_date)}
                    </td>
                    <td>
                      <Link
                        aria-label={`Otwórz ${p.title}`}
                        href={`/panel/projekty/${p.id}`}
                      >
                        <ArrowUpRight size={18} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
      <section className="dash-card">
        <div className="dash-section-head">
          <h2>Następne kroki</h2>
          <span className="dash-muted">{pending.length} do zrobienia</span>
        </div>
        {pending.length ? (
          <ul className="dash-next-tasks">
            {pending.slice(0, 10).map((t) => (
              <li key={t.id}>
                <Link href={`/panel/projekty/${t.project_id}`}>
                  <strong>{t.title}</strong>
                  <small>
                    {projects.find((p) => p.id === t.project_id)?.title}
                  </small>
                </Link>
                <span
                  className={
                    t.due_date && t.due_date < today
                      ? "dash-overdue"
                      : "dash-muted"
                  }
                >
                  {dateLabel(t.due_date)}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="dash-muted">
            Nie masz zaległych zadań. Checklistę dodasz w karcie projektu.
          </p>
        )}
      </section>
    </>
  );
}
