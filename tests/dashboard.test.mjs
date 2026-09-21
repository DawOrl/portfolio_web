import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import ts from "typescript";
import { PGlite } from "@electric-sql/pglite";
const require = createRequire(import.meta.url);
function load(path, mocks = {}) {
  const code = ts.transpileModule(
    readFileSync(new URL(path, import.meta.url), "utf8"),
    {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2022,
        esModuleInterop: true,
      },
    },
  ).outputText;
  const mod = { exports: {} };
  new Function("require", "module", "exports", code)(
    (name) => (name in mocks ? mocks[name] : require(name)),
    mod,
    mod.exports,
  );
  return mod.exports;
}
const model = load("../src/lib/dashboard/model.ts");
test("money validation uses integer cents and rejects negatives, exponent and excess precision", () => {
  assert.equal(model.amount.parse("1990,99"), 199099);
  for (const value of ["-1", "1e3", "1.999", "Infinity", "1000001"])
    assert.equal(model.amount.safeParse(value).success, false);
  assert.equal(model.date.safeParse("2026-02-31").success, false);
});
test("brief strips unknown fields, bounds answers and requires core answers", () => {
  const input = Object.fromEntries(
    model.briefQuestions.map(([key]) => [key, "do ustalenia"]),
  );
  assert.equal(
    model.briefSchema.parse({ ...input, owner_id: "attacker" }).owner_id,
    undefined,
  );
  assert.equal(
    model.briefSchema.safeParse({ ...input, business: "" }).success,
    false,
  );
  assert.equal(
    model.briefSchema.safeParse({ ...input, scope: "x".repeat(3001) }).success,
    false,
  );
});
test("financial summary does not treat pipeline as revenue or overpayments as negative balances", () => {
  const projects = [
    { id: "a", stage: "inquiry", amount: 99000 },
    { id: "b", stage: "progress", amount: 199000 },
    { id: "c", stage: "archived", amount: 99900 },
  ];
  assert.deepEqual(
    model.totals(projects, [{ project_id: "b", amount: 200000 }]),
    { pipeline: 99000, agreed: 199000, paid: 200000, remaining: 0 },
  );
});
test("authorization validates identity for every server access, rejecting missing and non-admin sessions", async () => {
  const original = process.env.DASHBOARD_ADMIN_USER_ID;
  process.env.DASHBOARD_ADMIN_USER_ID = "owner";
  let user = null;
  let ready = true;
  let called = 0;
  const server = load("../src/lib/dashboard/server.ts", {
    "server-only": {},
    "@supabase/ssr": {
      createServerClient: () => ({
        auth: {
          getUser: async () => {
            called++;
            return { data: { user }, error: null };
          },
        },
      }),
    },
    "@supabase/supabase-js": {},
    "next/headers": { cookies: async () => ({ getAll: () => [] }) },
    "next/navigation": {
      redirect: () => {
        throw new Error("REDIRECT");
      },
    },
    "./config": {
      dashboardConfigured: () => ready,
      dashboardServiceConfigured: () => false,
    },
  });
  try {
    await assert.rejects(server.requireAdmin(), /REDIRECT/);
    user = { id: "other" };
    await assert.rejects(server.requireAdmin(), /REDIRECT/);
    user = { id: "owner" };
    assert.equal((await server.requireAdmin()).user.id, "owner");
    ready = false;
    await assert.rejects(server.requireAdmin(), /REDIRECT/);
    assert.equal(called, 3);
  } finally {
    if (original === undefined) delete process.env.DASHBOARD_ADMIN_USER_ID;
    else process.env.DASHBOARD_ADMIN_USER_ID = original;
  }
});
test("SQL migration enforces row isolation, atomic briefs, expiry, replay protection and cascades", async () => {
  const db = new PGlite();
  const a = "11111111-1111-4111-8111-111111111111",
    b = "22222222-2222-4222-8222-222222222222",
    outsider = "33333333-3333-4333-8333-333333333333";
  try {
    await db.exec(
      `create role anon; create role authenticated; create role service_role bypassrls; create schema auth; create table auth.users(id uuid primary key); create function auth.uid() returns uuid language sql stable as $$ select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid $$; grant usage on schema auth to authenticated; grant execute on function auth.uid() to authenticated;`,
    );
    await db.exec(
      readFileSync(
        new URL(
          "../supabase/migrations/202609210001_dashboard.sql",
          import.meta.url,
        ),
        "utf8",
      ),
    );
    await db.exec(
      readFileSync(
        new URL(
          "../supabase/migrations/202609210002_explicit_privileges.sql",
          import.meta.url,
        ),
        "utf8",
      ),
    );
    await db.exec(
      `insert into auth.users values('${a}'),('${b}'),('${outsider}'); insert into public.crm_admins values('${a}'),('${b}');`,
    );
    const act = async (role, uid) => {
      await db.exec(
        `reset role; set role ${role}; select set_config('request.jwt.claim.sub','${uid}',false);`,
      );
    };
    await act("authenticated", a);
    const client = (
      await db.query(
        "insert into public.crm_clients(owner_id,name) values($1,$2) returning id",
        [a, "Klient A"],
      )
    ).rows[0].id;
    const project = (
      await db.query(
        "insert into public.crm_projects(owner_id,client_id,title) values($1,$2,$3) returning id",
        [a, client, "Projekt A"],
      )
    ).rows[0].id;
    await act("authenticated", b);
    await assert.rejects(
      db.query("truncate public.crm_tasks"),
      /permission denied/,
    );
    await assert.rejects(
      db.query("delete from public.crm_admins"),
      /permission denied/,
    );
    assert.equal(
      (await db.query("select * from public.crm_projects")).rows.length,
      0,
    );
    await assert.rejects(
      db.query(
        "insert into public.crm_projects(owner_id,client_id,title) values($1,$2,$3)",
        [b, client, "Atak B"],
      ),
      /foreign key/,
    );
    assert.equal(
      (
        await db.query(
          "update public.crm_projects set title=$1 where id=$2 returning id",
          ["Atak", project],
        )
      ).rows.length,
      0,
    );
    await act("authenticated", outsider);
    await assert.rejects(
      db.query("insert into public.crm_clients(owner_id,name) values($1,$2)", [
        outsider,
        "Atak",
      ]),
      /row-level security/,
    );
    await act("anon", "");
    await assert.rejects(
      db.query("select * from public.crm_clients"),
      /permission denied/,
    );
    await assert.rejects(
      db.query("select public.crm_submit_brief($1,$2)", ["a".repeat(64), "{}"]),
      /permission denied/,
    );
    await act("authenticated", a);
    await db.query("select public.crm_issue_brief($1,$2)", [
      project,
      "a".repeat(64),
    ]);
    await db.query("select public.crm_issue_brief($1,$2)", [
      project,
      "b".repeat(64),
    ]);
    assert.equal(
      (
        await db.query(
          "select revoked from public.crm_briefs where token_hash=$1",
          ["a".repeat(64)],
        )
      ).rows[0].revoked,
      true,
    );
    await assert.rejects(
      db.query("select public.crm_submit_brief($1,$2)", ["b".repeat(64), "{}"]),
      /permission denied/,
    );
    await act("service_role", "");
    const submit = async (hash) =>
      (
        await db.query("select public.crm_submit_brief($1,$2) as accepted", [
          hash,
          JSON.stringify({ business: "Firma", goal: "Kontakt" }),
        ])
      ).rows[0].accepted;
    assert.equal(await submit("a".repeat(64)), false);
    assert.equal(await submit("c".repeat(64)), false);
    assert.equal(await submit("b".repeat(64)), true);
    assert.equal(await submit("b".repeat(64)), false);
    await act("authenticated", a);
    await db.query("select public.crm_issue_brief($1,$2)", [
      project,
      "c".repeat(64),
    ]);
    await db.query(
      "update public.crm_briefs set expires_at=now()-interval '1 second' where token_hash=$1",
      ["c".repeat(64)],
    );
    await act("service_role", "");
    assert.equal(await submit("c".repeat(64)), false);
    await act("authenticated", a);
    await db.query("delete from public.crm_projects where id=$1", [project]);
    assert.equal(
      (await db.query("select * from public.crm_briefs")).rows.length,
      0,
    );
    assert.equal(
      (await db.query("select * from public.crm_clients")).rows.length,
      1,
    );
  } finally {
    await db.close();
  }
});
test("actions reject invalid mutations and detect stale edits without claiming success", async () => {
  const rows = [];
  let result = { data: [], error: null };
  const chain = {
    update: (v) => {
      rows.push(v);
      return chain;
    },
    insert: (v) => {
      rows.push(v);
      return chain;
    },
    delete: () => {
      rows.push("delete");
      return chain;
    },
    eq: () => chain,
    select: () => chain,
    then: (resolve) => Promise.resolve(result).then(resolve),
  };
  const actions = load("../src/lib/dashboard/actions.ts", {
    "next/cache": { revalidatePath: () => {} },
    "next/navigation": {
      redirect: () => {
        throw new Error("REDIRECT");
      },
    },
    "./server": {
      requireAdmin: async () => ({
        db: { from: () => chain },
        user: { id: "11111111-1111-4111-8111-111111111111" },
      }),
    },
    "./config": {},
    "./model": model,
    "@/lib/site": { SITE_URL: "https://dorlowski.dev" },
  });
  const submit = async (fields) => {
    const f = new FormData();
    Object.entries(fields).forEach(([k, v]) => f.set(k, v));
    return actions.mutate({}, f);
  };
  assert.ok(
    (await submit({ operation: "payment-create", amount: "-10" })).error,
  );
  assert.equal(rows.length, 0);
  assert.ok((await submit({ operation: "delete", confirmation: "nie" })).error);
  assert.equal(rows.length, 0);
  const project = {
    operation: "project-update",
    id: "11111111-1111-4111-8111-111111111111",
    client_id: "11111111-1111-4111-8111-111111111111",
    title: "Projekt klienta",
    package: "start",
    stage: "inquiry",
    amount: "990",
    due_date: "",
    scope: "",
    notes: "",
    materials_url: "",
    version: "2026-09-21T10:00:00Z",
  };
  assert.match((await submit(project)).error, /innej karcie/);
  result = { data: [{ id: project.id }], error: null };
  assert.equal((await submit(project)).success, "Zapisano zmiany.");
  assert.equal(rows[0].amount, 99000);
  assert.equal(rows[0].due_date, null);
});
test("contact capture failure never drops an already delivered email", async () => {
  let logged = false;
  const original = console.error;
  console.error = () => {
    logged = true;
  };
  try {
    const capture = load("../src/lib/dashboard/capture.ts", {
      "server-only": {},
      "./server": {
        serviceDb: () => ({
          rpc: async () => ({ error: new Error("private error") }),
        }),
      },
      "./config": { dashboardServiceConfigured: () => true },
      "@/lib/contact-email": { isContactEmail: () => true },
    });
    await capture.captureInquiry({
      name: "Anna",
      contact: "anna@example.com",
      service: "Strona",
      message: "Opis",
    });
    assert.equal(logged, true);
  } finally {
    console.error = original;
  }
});
