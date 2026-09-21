"use server";

import { randomBytes, createHash } from "node:crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { userDb, requireAdmin } from "./server";
import { dashboardConfigured } from "./config";
import {
  amount,
  clientSchema,
  date,
  projectSchema,
  text,
  uuid,
  type ActionState,
} from "./model";
import { SITE_URL } from "@/lib/site";

export async function login(
  _state: ActionState,
  form: FormData,
): Promise<ActionState> {
  if (!dashboardConfigured())
    return { error: "Panel wymaga konfiguracji bazy i konta administratora." };
  const parsed = z
    .object({
      email: z.string().email().max(254),
      password: z.string().min(8).max(128),
    })
    .safeParse(Object.fromEntries(form));
  if (!parsed.success)
    return { error: "Sprawdź adres e-mail i hasło (minimum 8 znaków)." };
  try {
    const db = await userDb();
    const { data, error } = await db.auth.signInWithPassword(parsed.data);
    if (error || data.user?.id !== process.env.DASHBOARD_ADMIN_USER_ID) {
      await db.auth.signOut();
      return {
        error:
          "Nie udało się zalogować. Sprawdź dane lub spróbuj ponownie później.",
      };
    }
  } catch {
    return { error: "Usługa logowania jest chwilowo niedostępna." };
  }
  redirect("/panel");
}
export async function logout() {
  const db = await userDb();
  await db.auth.signOut();
  redirect("/panel/logowanie");
}

export async function mutate(
  _state: ActionState,
  form: FormData,
): Promise<ActionState> {
  const { db, user } = await requireAdmin();
  let destination = "";
  let state: ActionState = { success: "Zapisano zmiany." };
  const fields = Object.fromEntries(form);
  const owner_id = user.id;
  const id = () => uuid.parse(fields.id);
  const projectId = () => uuid.parse(fields.project_id);
  const ensure = (result: { error: unknown; data?: unknown }) => {
    if (result.error) throw new Error("database");
  };
  try {
    switch (fields.operation) {
      case "client-create": {
        const data = clientSchema.parse(fields);
        ensure(await db.from("crm_clients").insert({ ...data, owner_id }));
        destination = "/panel/klienci";
        break;
      }
      case "client-update": {
        ensure(
          await db
            .from("crm_clients")
            .update(clientSchema.parse(fields))
            .eq("id", id())
            .eq("owner_id", owner_id),
        );
        break;
      }
      case "project-create": {
        const data = projectSchema.parse(fields);
        const result = await db
          .from("crm_projects")
          .insert({ ...data, due_date: data.due_date || null, owner_id })
          .select("id")
          .single();
        ensure(result);
        if (!result.data) throw new Error("database");
        destination = `/panel/projekty/${result.data.id}`;
        break;
      }
      case "project-update": {
        const data = projectSchema.parse(fields);
        const version = z
          .string()
          .datetime({ offset: true })
          .parse(fields.version);
        const result = await db
          .from("crm_projects")
          .update({ ...data, due_date: data.due_date || null })
          .eq("id", id())
          .eq("owner_id", owner_id)
          .eq("updated_at", version)
          .select("id");
        ensure(result);
        if (!result.data?.length)
          return {
            error:
              "Projekt zmienił się w innej karcie. Odśwież stronę i ponów zmianę.",
          };
        break;
      }
      case "task-create": {
        const title = text(300).min(2).parse(fields.title);
        const due = date.parse(fields.due_date);
        ensure(
          await db
            .from("crm_tasks")
            .insert({
              owner_id,
              project_id: projectId(),
              title,
              due_date: due || null,
            }),
        );
        break;
      }
      case "task-toggle": {
        const done = z.enum(["true", "false"]).parse(fields.done) === "true";
        ensure(
          await db
            .from("crm_tasks")
            .update({ done })
            .eq("id", id())
            .eq("owner_id", owner_id),
        );
        break;
      }
      case "payment-create": {
        const value = amount.refine((v) => v > 0).parse(fields.amount);
        const paid_at = date.refine((v) => Boolean(v)).parse(fields.paid_at);
        ensure(
          await db
            .from("crm_payments")
            .insert({
              owner_id,
              project_id: projectId(),
              amount: value,
              paid_at,
              label: text(160).min(2).parse(fields.label),
            }),
        );
        break;
      }
      case "offer-create": {
        const project = await db
          .from("crm_projects")
          .select("*")
          .eq("id", projectId())
          .single();
        ensure(project);
        const client = await db
          .from("crm_clients")
          .select("*")
          .eq("id", project.data.client_id)
          .single();
        ensure(client);
        const data = z
          .object({
            number: text(80).min(1),
            title: text(160).min(3),
            scope: text(12000).min(10),
            terms: text(12000).min(10),
            amount: amount.refine((v) => v > 0),
            deposit_percent: z.coerce.number().int().min(0).max(100),
            valid_until: date.refine((v) => Boolean(v)),
          })
          .parse(fields);
        const result = await db
          .from("crm_offers")
          .insert({
            ...data,
            owner_id,
            project_id: projectId(),
            client_snapshot: client.data,
          })
          .select("id")
          .single();
        ensure(result);
        destination = `/panel/projekty/${projectId()}/oferta/${result.data!.id}`;
        break;
      }
      case "offer-status": {
        const status = z
          .enum(["draft", "sent", "accepted", "rejected"])
          .parse(fields.status);
        ensure(
          await db
            .from("crm_offers")
            .update({ status })
            .eq("id", id())
            .eq("owner_id", owner_id),
        );
        break;
      }
      case "brief-create": {
        const token = randomBytes(32).toString("hex");
        const result = await db.rpc("crm_issue_brief", {
          p_project: projectId(),
          p_hash: createHash("sha256").update(token).digest("hex"),
        });
        ensure(result);
        state = {
          success:
            "Link jest ważny 14 dni. Skopiuj go teraz — zapisujemy tylko jego skrót. Poprzednie niewypełnione linki zostały unieważnione.",
          link: `${SITE_URL}/brief/${token}`,
        };
        break;
      }
      case "brief-revoke": {
        ensure(
          await db
            .from("crm_briefs")
            .update({ revoked: true })
            .eq("id", id())
            .eq("owner_id", owner_id),
        );
        break;
      }
      case "delete": {
        if (fields.confirmation !== "USUŃ")
          return { error: "Wpisz USUŃ, aby potwierdzić trwałe usunięcie." };
        const table = z
          .enum([
            "crm_clients",
            "crm_projects",
            "crm_tasks",
            "crm_payments",
            "crm_offers",
            "crm_briefs",
          ])
          .parse(fields.table);
        ensure(
          await db.from(table).delete().eq("id", id()).eq("owner_id", owner_id),
        );
        if (table === "crm_projects") destination = "/panel";
        if (table === "crm_clients") destination = "/panel/klienci";
        break;
      }
      default:
        return { error: "Nieznana operacja." };
    }
  } catch (error) {
    if (error instanceof z.ZodError)
      return {
        error:
          "Sprawdź wymagane pola, format dat, adresów i kwot. " +
          error.issues[0].message,
      };
    return {
      error:
        "Nie udało się zapisać. Sprawdź połączenie i konfigurację bazy. Numer oferty musi być unikalny; klienta z projektami nie można usunąć.",
    };
  }
  revalidatePath("/panel", "layout");
  if (destination) redirect(destination);
  return state;
}
