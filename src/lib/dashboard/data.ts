import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { requireAdmin } from "./server";
import type { Client, Project, Task, Payment, Brief, Offer } from "./model";

// Supabase limits individual responses; paginate before calculating totals.
export async function allRows<T>(
  db: SupabaseClient,
  table: string,
  columns = "*",
  projectId?: string,
): Promise<T[]> {
  const rows: T[] = [];
  for (let start = 0; ; start += 500) {
    let query = db
      .from(table)
      .select(columns)
      .order("id")
      .range(start, start + 499);
    if (projectId) query = query.eq("project_id", projectId);
    const { data, error } = await query;
    if (error)
      throw new Error(
        "Nie udało się pobrać danych panelu. Sprawdź migrację i połączenie z bazą.",
      );
    rows.push(...(data as unknown as T[]));
    if (data.length < 500) return rows;
  }
}
export async function dashboardData() {
  const { db } = await requireAdmin();
  const [projects, clients, tasks, payments] = await Promise.all([
    allRows<Project>(db, "crm_projects"),
    allRows<Client>(db, "crm_clients"),
    allRows<Task>(db, "crm_tasks"),
    allRows<Payment>(db, "crm_payments"),
  ]);
  projects.sort((a, b) => b.created_at.localeCompare(a.created_at));
  clients.sort((a, b) => a.name.localeCompare(b.name, "pl"));
  tasks.sort((a, b) =>
    (a.due_date || "9999").localeCompare(b.due_date || "9999"),
  );
  payments.sort((a, b) => b.paid_at.localeCompare(a.paid_at));
  return { projects, clients, tasks, payments };
}
export async function projectData(id: string) {
  const { db } = await requireAdmin();
  const [result, clients, tasks, payments, offers, briefs] = await Promise.all([
    db.from("crm_projects").select("*").eq("id", id).maybeSingle(),
    allRows<Client>(db, "crm_clients"),
    allRows<Task>(db, "crm_tasks", "*", id),
    allRows<Payment>(db, "crm_payments", "*", id),
    allRows<Offer>(db, "crm_offers", "*", id),
    allRows<Brief>(
      db,
      "crm_briefs",
      "id,project_id,expires_at,revoked,submitted_at,answers,created_at",
      id,
    ),
  ]);
  if (result.error) throw new Error("Nie udało się pobrać projektu.");
  clients.sort((a, b) => a.name.localeCompare(b.name, "pl"));
  offers.sort((a, b) => b.created_at.localeCompare(a.created_at));
  briefs.sort((a, b) => b.created_at.localeCompare(a.created_at));
  return {
    project: result.data as Project | null,
    clients,
    tasks,
    payments,
    offers,
    briefs,
  };
}
