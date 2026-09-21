import type { Metadata } from "next";
import "@/components/dashboard/dashboard.css";
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Panel pracowni",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
  alternates: { canonical: null },
  referrer: "no-referrer",
};
export default function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="dashboard-root">{children}</div>;
}
