import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/dashboard/server";
import { type Offer, uuid, money, dateLabel } from "@/lib/dashboard/model";
import {
  ActionForm,
  DeleteForm,
  PrintButton,
} from "@/components/dashboard/forms";
export default async function OfferPage({
  params,
}: {
  params: Promise<{ id: string; offerId: string }>;
}) {
  const { id, offerId } = await params;
  if (!uuid.safeParse(id).success || !uuid.safeParse(offerId).success)
    notFound();
  const { db } = await requireAdmin();
  const { data, error } = await db
    .from("crm_offers")
    .select("*")
    .eq("id", offerId)
    .eq("project_id", id)
    .maybeSingle();
  if (error) throw new Error("Nie udało się pobrać oferty.");
  if (!data) notFound();
  const o = data as Offer;
  const first = Math.round((o.amount * o.deposit_percent) / 100);
  return (
    <>
      <div className="dash-print-tools">
        <Link href={`/panel/projekty/${id}`} className="dash-text-link">
          ← Wróć do projektu
        </Link>
        <PrintButton />
        <ActionForm operation="offer-status" label="Zapisz status">
          <input type="hidden" name="id" value={o.id} />
          <label>
            Status odnotowany ręcznie
            <select name="status" defaultValue={o.status}>
              <option value="draft">Szkic</option>
              <option value="sent">Wysłana</option>
              <option value="accepted">Zaakceptowana</option>
              <option value="rejected">Odrzucona</option>
            </select>
          </label>
        </ActionForm>
        <p className="dash-muted">
          Status jest Twoją notatką, nie podpisem klienta. Aby zmienić treść,
          utwórz nową wersję w projekcie.
        </p>
      </div>
      <article className="dash-offer-document">
        <header>
          <b className="dash-offer-brand">do.</b>
          <span>
            Dawid Orłowski
            <br />
            contact@dorlowski.dev
            <br />
            dorlowski.dev
          </span>
        </header>
        <p className="dash-kicker">OFERTA {o.number}</p>
        <h1>{o.title}</h1>
        <div className="dash-offer-meta">
          <p>
            <small>PRZYGOTOWANO DLA</small>
            <strong>
              {o.client_snapshot.company || o.client_snapshot.name}
            </strong>
            {o.client_snapshot.company && <span>{o.client_snapshot.name}</span>}
            <span>{o.client_snapshot.email}</span>
          </p>
          <p>
            <small>DATA OFERTY</small>
            {dateLabel(o.created_at)}
            <small>WAŻNA DO</small>
            {dateLabel(o.valid_until)}
          </p>
        </div>
        <h2>Zakres współpracy</h2>
        <p className="dash-preserve">{o.scope}</p>
        <div className="dash-offer-total">
          <span>Łączny koszt wykonania</span>
          <strong>{money(o.amount)}</strong>
          <small>Pełna kwota do zapłaty za opisany zakres</small>
        </div>
        <h2>Płatności</h2>
        <p>
          Pierwsza wpłata {o.deposit_percent}%: <strong>{money(first)}</strong>
          <br />
          Pozostała kwota: <strong>{money(o.amount - first)}</strong>
        </p>
        <h2>Terminy i zasady współpracy</h2>
        <p className="dash-preserve">{o.terms}</p>
        <footer>
          Jeśli zakres odpowiada Twoim potrzebom, napisz na
          contact@dorlowski.dev, podając numer oferty. Potwierdzimy warunki
          zamówienia i rozpoczęcie pracy.
          <br />
          <br />
          Dawid Orłowski · dorlowski.dev
        </footer>
      </article>
      <div className="dash-print-tools">
        <DeleteForm id={o.id} table="crm_offers" label="Usuń ofertę" />
      </div>
    </>
  );
}
