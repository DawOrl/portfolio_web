export function dashboardConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY &&
    process.env.DASHBOARD_ADMIN_USER_ID,
  );
}
export function dashboardServiceConfigured() {
  return (
    dashboardConfigured() && Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY)
  );
}
