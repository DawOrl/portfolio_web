import Link from "next/link";
import { dashboardData } from "@/lib/dashboard/data";
import {
  ActionForm,
  ClientFields,
  DeleteForm,
} from "@/components/dashboard/forms";
export default async function ClientsPage() {
  const { clients, projects } = await dashboardData();
  return (
    <>
      <header className="dash-heading">
        <div>
          <p className="dash-kicker">RELACJE I KONTAKTY</p>
          <h1>Twoi klienci</h1>
          <p>{clients.length} kontaktów w pracowni</p>
        </div>
      </header>
      <div className="dash-columns">
        <section className="dash-card">
          <h2>Dodaj klienta</h2>
          <ActionForm operation="client-create" label="Dodaj klienta">
            <ClientFields />
          </ActionForm>
        </section>
        <section className="dash-card">
          <h2>Książka kontaktów</h2>
          {!clients.length && (
            <p className="dash-muted">
              Pierwszy kontakt dodasz formularzem obok. Klient może mieć kilka
              projektów.
            </p>
          )}
          {clients.map((c) => (
            <details className="dash-client" key={c.id}>
              <summary>
                <strong>{c.company || c.name}</strong>
                <span>{c.company ? c.name : c.email || c.phone}</span>
              </summary>
              <ActionForm operation="client-update">
                <input type="hidden" name="id" value={c.id} />
                <ClientFields client={c} />
              </ActionForm>
              <ul className="dash-links">
                {projects
                  .filter((p) => p.client_id === c.id)
                  .map((p) => (
                    <li key={p.id}>
                      <Link href={`/panel/projekty/${p.id}`}>{p.title} ↗</Link>
                    </li>
                  ))}
              </ul>
              <DeleteForm
                table="crm_clients"
                id={c.id}
                label="Usuń klienta"
                warning="Najpierw usuń powiązane projekty. Usunięcie kontaktu jest nieodwracalne."
              />
            </details>
          ))}
        </section>
      </div>
    </>
  );
}
