import "server-only";
import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { dashboardConfigured, dashboardServiceConfigured } from "./config";

export async function userDb() {
  if (!dashboardConfigured()) throw new Error("Panel nie jest skonfigurowany.");
  const jar = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookieOptions: {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
      },
      cookies: {
        getAll: () => jar.getAll(),
        setAll: (list) => {
          try {
            list.forEach(({ name, value, options }) =>
              jar.set(name, value, options),
            );
          } catch {
            /* Server components cannot set cookies. Proxy refreshes the session. */
          }
        },
      },
    },
  );
}
export async function requireAdmin() {
  if (!dashboardConfigured()) redirect("/panel/logowanie");
  const db = await userDb();
  const { data, error } = await db.auth.getUser();
  if (
    error ||
    !data.user ||
    data.user.id !== process.env.DASHBOARD_ADMIN_USER_ID
  )
    redirect("/panel/logowanie");
  return { db, user: data.user };
}
// Only public contact capture and token-scoped brief operations use this client.
export function serviceDb() {
  if (!dashboardServiceConfigured())
    throw new Error("Brak konfiguracji usługi.");
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: { persistSession: false, autoRefreshToken: false },
      global: {
        fetch: (url, options) =>
          fetch(url, {
            ...options,
            signal: options?.signal ?? AbortSignal.timeout(6000),
          }),
      },
    },
  );
}
