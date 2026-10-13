import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Navbar } from "@/components/blocks/Navbar";
import { SiteFooter } from "@/components/blocks/SiteFooter";
import "./not-found.css";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="not-found-page shell">
        <p className="not-found-code" aria-hidden="true">
          404
        </p>
        <div>
          <span className="eyebrow">NIE ZNALEZIONO STRONY</span>
          <h1>
            Ten adres
            <br />
            <em>nie prowadzi dalej.</em>
          </h1>
          <p>
            Link może być nieaktualny albo zawierać literówkę. Wróć na stronę
            główną lub zobacz projekty w bibliotece.
          </p>
          <div className="not-found-actions">
            <Link href="/" className="action action-brand">
              Strona główna <ArrowUpRight size={18} />
            </Link>
            <Link href="/realizacje" className="text-link">
              Zobacz realizacje <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
