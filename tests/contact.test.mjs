import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import ts from "typescript";

// Load server modules with isolated dependencies: tests never send real mail.
function load(path, dependencies = {}) {
  const source = ts.transpileModule(readFileSync(new URL(path, import.meta.url), "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true },
  }).outputText;
  const loadedModule = { exports: {} };
  new Function("require", "module", "exports", source)((name) => {
    if (!(name in dependencies)) throw new Error(`Unexpected dependency: ${name}`);
    return dependencies[name];
  }, loadedModule, loadedModule.exports);
  return loadedModule.exports;
}
const email = load("../src/lib/contact-email.ts");
const inquiry = { name: "Anna Żółć", contact: "anna@example.com", service: "Strona firmowa", message: "Pierwsza linia\nDruga linia" };

test("validation rejects header injection, invalid contacts and oversized messages", () => {
  assert.deepEqual(email.parseInquiry(inquiry), inquiry);
  for (const change of [{ name: "Anna\r\nBcc: attacker@example.com" }, { contact: "text123456789" }, { contact: "a@example.com,b@example.com" }, { service: "A\nB" }, { message: "x".repeat(5001) }]) {
    assert.equal(email.parseInquiry({ ...inquiry, ...change }), null);
  }
});
test("HTML is escaped; Unicode, line breaks and plain text are preserved", () => {
  const output = email.createContactEmail({ ...inquiry, message: '<script>alert("x")</script>\nCześć' });
  assert.ok(!output.html.includes("<script>"));
  assert.ok(output.html.includes("&lt;script&gt;"));
  assert.ok(output.html.includes("<br />Cześć"));
  assert.ok(output.html.includes("Anna Żółć"));
  assert.equal(output.replyTo, inquiry.contact);
  assert.ok(output.text.includes('alert("x")'));
});
test("phone enquiries use a call action and omit email Reply-To", () => {
  const output = email.createContactEmail({ ...inquiry, contact: "+48 123 456 789" });
  assert.equal(output.replyTo, undefined);
  assert.ok(output.html.includes('href="tel:+48123456789"'));
  assert.ok(output.html.includes("Zadzwoń do klienta"));
});

test("API validates origin, size, challenge and SMTP acceptance before success", async () => {
  const originalFetch = globalThis.fetch;
  const originalUser = process.env.SMTP_USER;
  process.env.SMTP_USER = "contact@dorlowski.dev";
  let ready = true;
  let verification = { success: true, hostname: "dorlowski.dev", action: "contact" };
  let sent;
  let accepted = ["contact@dorlowski.dev"];
  const route = load("../src/app/api/contact/route.ts", {
    nodemailer: { createTransport: () => ({ sendMail: async (mail) => { sent = mail; return { accepted }; } }) },
    "next/server": { NextResponse: { json: (data, init) => Response.json(data, init) } },
    "@/lib/contact-email": email,
    "@/lib/contact-config": { smtpContactEnabled: () => ready },
    "@/lib/site": { SITE_URL: "https://dorlowski.dev" },
  });
  globalThis.fetch = async () => Response.json(verification);
  const request = (fields = {}, origin = "https://dorlowski.dev") => new Request("https://dorlowski.dev/api/contact", {
    method: "POST", headers: { origin, "content-type": "application/json" },
    body: JSON.stringify({ ...inquiry, website: "", token: "test-token", ...fields }),
  });
  try {
    assert.equal((await route.POST(request({}, "https://other.example"))).status, 403);
    assert.equal((await route.POST(request({ message: "x".repeat(25000) }))).status, 400);
    assert.equal((await route.POST(request({ website: "bot" }))).status, 400);
    ready = false;
    assert.equal((await route.POST(request())).status, 503);
    ready = true;
    assert.equal((await route.POST(request({ token: "" }))).status, 400);
    verification.success = false;
    assert.equal((await route.POST(request())).status, 403);
    verification = { success: true, hostname: "other.example", action: "contact" };
    assert.equal((await route.POST(request())).status, 403);
    assert.equal(sent, undefined);
    verification = { success: true, hostname: "dorlowski.dev", action: "contact" };
    assert.equal((await route.POST(request())).status, 200);
    assert.equal(sent.to, "contact@dorlowski.dev");
    assert.equal(sent.from.address, "contact@dorlowski.dev");
    assert.equal(sent.replyTo, inquiry.contact);
    accepted = [];
    assert.equal((await route.POST(request())).status, 502);
  } finally {
    globalThis.fetch = originalFetch;
    if (originalUser === undefined) delete process.env.SMTP_USER;
    else process.env.SMTP_USER = originalUser;
  }
});
