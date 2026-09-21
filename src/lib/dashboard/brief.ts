import "server-only";
import { createHash } from "node:crypto";
import { serviceDb } from "./server";
import { dashboardServiceConfigured } from "./config";
export const validToken = (token: string) => /^[a-f0-9]{64}$/.test(token);
export const hashToken = (token: string) =>
  createHash("sha256").update(token).digest("hex");
export async function briefAvailable(token: string) {
  if (!validToken(token) || !dashboardServiceConfigured()) return false;
  const { data, error } = await serviceDb()
    .from("crm_briefs")
    .select("id")
    .eq("token_hash", hashToken(token))
    .eq("revoked", false)
    .is("submitted_at", null)
    .gt("expires_at", new Date().toISOString())
    .maybeSingle();
  if (error) throw new Error("Brief chwilowo niedostępny.");
  return Boolean(data);
}
