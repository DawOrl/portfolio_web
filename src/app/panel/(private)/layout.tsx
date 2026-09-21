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
          <b>
            do<span>.</span>
          </b>
          <span>
            DAWID ORŁOWSKI<small>PRACOWNIA / PANEL</small>
          </span>
        </Link>
        <span className="dash-nav-label">TWOJA PRACOWNIA</span>
        <nav aria-label="Panel">
          <Link href="/panel">
            <LayoutDashboard size={18} /> Przegląd i projekty
          </Link>
          <Link href="/panel/klienci">
            <Users size={18} /> Klienci
          </Link>
          <Link href="/panel/ustawienia">
            <Settings size={18} /> Ustawienia i eksport
          </Link>
        </nav>
        <Link className="dash-button" href="/panel/projekty/nowy">
          <Plus size={16} /> Nowy projekt
        </Link>
        <div className="dash-sidebar-bottom">
          <Link href="/">
            Zobacz portfolio <ArrowUpRight size={16} />
          </Link>
          <form action={logout}>
            <button type="submit">
              <LogOut size={16} /> Wyloguj
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
