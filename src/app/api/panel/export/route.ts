import { requireAdmin } from "@/lib/dashboard/server";
export const dynamic = "force-dynamic";
export async function GET() {
  const { db } = await requireAdmin();
  const tables = [
    "crm_clients",
    "crm_projects",
    "crm_tasks",
    "crm_payments",
    "crm_offers",
    "crm_briefs",
  ];
  const payload: Record<string, unknown> = {
    version: 1,
    exported_at: new Date().toISOString(),
  };
  // Paginate to avoid Supabase's default 1000-row response limit.
  for (const table of tables) {
    const rows: unknown[] = [];
    for (let start = 0; ; start += 500) {
      const columns =
        table === "crm_briefs"
          ? "id,owner_id,project_id,expires_at,revoked,answers,submitted_at,created_at"
          : "*";
      const { data, error } = await db
        .from(table)
        .select(columns)
        .order("id")
        .range(start, start + 499);
      if (error)
        return Response.json(
          { error: "Eksport nie powiódł się. Spróbuj ponownie." },
          { status: 503, headers: { "Cache-Control": "no-store" } },
        );
      rows.push(...data);
      if (data.length < 500) break;
    }
    payload[table] = rows;
  }
  return new Response(JSON.stringify(payload, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Content-Disposition": `attachment; filename="pracownia-${new Date().toISOString().slice(0, 10)}.json"`,
      "Cache-Control": "private, no-store",
    },
  });
}
