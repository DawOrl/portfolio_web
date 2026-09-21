import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { dashboardConfigured } from "@/lib/dashboard/config";

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });
  let isAdmin = false;
  const isPanel =
    request.nextUrl.pathname.startsWith("/panel") ||
    request.nextUrl.pathname.startsWith("/api/panel");
  if (
    dashboardConfigured() &&
    (request.nextUrl.pathname.startsWith("/panel") ||
      request.nextUrl.pathname.startsWith("/api/panel"))
  ) {
    const db = createServerClient(
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
          getAll: () => request.cookies.getAll(),
          setAll: (list) => {
            list.forEach(({ name, value }) => request.cookies.set(name, value));
            response = NextResponse.next({ request });
            list.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options),
            );
          },
        },
      },
    );
    try {
      const { data } = await db.auth.getUser();
      isAdmin = Boolean(
        data.user && data.user.id === process.env.DASHBOARD_ADMIN_USER_ID,
      );
    } catch {
      isAdmin = false;
    }
  }
  if (isPanel && request.nextUrl.pathname !== "/panel/logowanie" && !isAdmin) {
    const denied = NextResponse.redirect(
      new URL("/panel/logowanie", request.url),
    );
    response.cookies.getAll().forEach((cookie) => denied.cookies.set(cookie));
    response = denied;
  }
  response.headers.set("Cache-Control", "private, no-store, max-age=0");
  response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  response.headers.set("Referrer-Policy", "no-referrer");
  response.headers.set("X-Frame-Options", "DENY");
  return response;
}
export const config = {
  matcher: ["/panel/:path*", "/api/panel/:path*", "/brief/:path*"],
};
