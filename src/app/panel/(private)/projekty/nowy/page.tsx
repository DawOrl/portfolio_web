import Link from "next/link";
import { requireAdmin } from "@/lib/dashboard/server";
import { allRows } from "@/lib/dashboard/data";
import type { Client } from "@/lib/dashboard/model";
import { ActionForm, ProjectFields } from "@/components/dashboard/forms";
export default async function NewProject() {
  const { db } = await requireAdmin();
  const data = await allRows<Client>(db, "crm_clients");
  return (
    <>
      <header className="dash-heading">
        <div>
          <Link href="/panel" className="dash-text-link">
            ← Wszystkie projekty
          </Link>
          <h1>Nowy projekt</h1>
          <p>
            Ustal punkt wyjścia. Zakres i cenę możesz dopracować po briefie.
          </p>
        </div>
      </header>
      <section className="dash-card">
        {!data.length ? (
          <div className="dash-empty">
            <h2>Zacznij od klienta</h2>
            <p>Każde zlecenie jest przypisane do kontaktu.</p>
            <Link className="dash-button" href="/panel/klienci">
              Dodaj klienta
            </Link>
          </div>
        ) : (
          <ActionForm operation="project-create" label="Utwórz projekt">
            <ProjectFields clients={data as Client[]} />
          </ActionForm>
        )}
      </section>
    </>
  );
}
