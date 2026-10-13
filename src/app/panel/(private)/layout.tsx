import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  Settings,
  ArrowUpRight,
  LogOut,
  Plus,
} from "lucide-react";
import { requireAdmin } from "@/lib/dashboard/server";
import { logout } from "@/lib/dashboard/actions";
import { BrandMark } from "@/components/ui/brand-mark";
export default async function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();
  return (
    <div className="dash-shell">
      <aside className="dash-sidebar">
        <Link href="/panel" className="dash-brand">
          <span className="dash-brand-mark" aria-hidden="true">
            <BrandMark />
          </span>
          <span>
            DAWID ORŁOWSKI<small>PRACOWNIA / PANEL</small>
          </span>
        </Link>
        <span className="dash-nav-label">TWOJA PRACOWNIA</span>
        <nav aria-label="Panel">
          <Link href="/panel">
            <LayoutDashboard size={18} aria-hidden="true" /> Przegląd i projekty
          </Link>
          <Link href="/panel/klienci">
            <Users size={18} aria-hidden="true" /> Klienci
          </Link>
          <Link href="/panel/ustawienia">
            <Settings size={18} aria-hidden="true" /> Ustawienia i eksport
          </Link>
        </nav>
        <Link className="dash-button" href="/panel/projekty/nowy">
          <Plus size={16} aria-hidden="true" /> Nowy projekt
        </Link>
        <div className="dash-sidebar-bottom">
          <Link href="/">
            Zobacz portfolio <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
          <form action={logout}>
            <button type="submit">
              <LogOut size={16} aria-hidden="true" /> Wyloguj
            </button>
          </form>
          <small>Prywatna przestrzeń robocza</small>
        </div>
      </aside>
      <main id="main-content" className="dash-main">
        {children}
      </main>
    </div>
  );
}
