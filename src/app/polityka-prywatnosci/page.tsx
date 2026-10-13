import { dashboardConfigured } from "@/lib/dashboard/config";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/blocks/Navbar";
import { SiteFooter } from "@/components/blocks/SiteFooter";
import { SectionTransition } from "@/components/ui/SectionTransition";
import "./privacy.css";
import { smtpContactEnabled } from "@/lib/contact-config";

export const metadata: Metadata = {
  title: "Polityka prywatności",
  description:
    "Jak Dawid Orłowski przetwarza dane z formularza kontaktowego i chroni prywatność odwiedzających dorlowski.dev.",
  alternates: { canonical: "/polityka-prywatnosci" },
};

export default function PrivacyPage() {
  const smtp = smtpContactEnabled();
  const dashboard = dashboardConfigured();
  return (
    <>
      <Navbar />
      <main id="main-content" className="privacy-page">
        <div className="shell privacy-intro">
          <Link href="/" className="privacy-back">
            <ArrowLeft size={16} /> Strona główna
          </Link>
          <header className="privacy-header">
            <p className="privacy-eyebrow">DORLOWSKI.DEV / PRYWATNOŚĆ</p>
            <h1>
              Twoje dane.
              <br />
              <em>Jasne zasady.</em>
            </h1>
            <p>Polityka prywatności serwisu dorlowski.dev</p>
            <small>Aktualizacja: 21 września 2026 r.</small>
          </header>
        </div>
        <SectionTransition from="ink" to="paper" shape="swell" />
        <div className="privacy-reading-surface">
          <div className="shell privacy-reading-layout">
            <nav
              className="privacy-index"
              aria-label="Spis treści polityki prywatności"
            >
              <span className="eyebrow">NA TEJ STRONIE</span>
              <a href="#administrator">
                <span>01</span> Administrator
              </a>
              <a href="#dane">
                <span>02</span> Jakie dane
              </a>
              <a href="#cele">
                <span>03</span> Cele i&nbsp;podstawy
              </a>
              <a href="#dostawcy">
                <span>04</span> Dostawcy usług
              </a>
              <a href="#okres">
                <span>05</span> Przechowywanie
              </a>
              <a href="#prawa">
                <span>06</span> Twoje prawa
              </a>
              <a href="#przegladarka">
                <span>07</span> Przeglądarka
              </a>
              <a href="#linki">
                <span>08</span> Aktualizacje
              </a>
            </nav>
            <div className="privacy-reading-copy">
              <div className="privacy-summary">
                <p>
                  Używam danych, żeby odpowiedzieć na Twoje zapytanie
                  i&nbsp;zapewnić działanie strony. Nie prowadzę newslettera ani
                  reklamowego profilowania. Nie korzystam z&nbsp;Google
                  Analytics, Vercel Analytics ani Meta Pixela.
                </p>
                <a href="mailto:contact@dorlowski.dev">
                  Pytania o&nbsp;dane? contact@dorlowski.dev ↗
                </a>
              </div>
              <article
                className="privacy-content"
                aria-label="Polityka prywatności"
              >
                <section aria-labelledby="administrator">
                  <h2 id="administrator">01. Kto odpowiada za dane</h2>
                  <p>
                    Administratorem danych jest Dawid Orłowski, osoba fizyczna
                    prowadząca tę stronę portfolio. W&nbsp;sprawach prywatności
                    i&nbsp;realizacji swoich praw możesz napisać na{" "}
                    <a href="mailto:contact@dorlowski.dev">
                      contact@dorlowski.dev
                    </a>
                    .
                  </p>
                </section>
                <section aria-labelledby="dane">
                  <h2 id="dane">02. Jakie dane otrzymuję</h2>
                  <p>
                    W&nbsp;formularzu podajesz imię, adres e-mail lub numer
                    telefonu oraz treść wiadomości. Rodzaj projektu jest
                    opcjonalny. Jeśli piszesz bezpośrednio e-mailem, otrzymuję
                    też dane zawarte w&nbsp;korespondencji i&nbsp;ewentualnych
                    załącznikach. Podanie danych jest dobrowolne, ale bez danych
                    kontaktowych nie mogę odpowiedzieć na zapytanie.
                  </p>
                  {dashboard && (
                    <p>
                      Jeśli wypełniasz brief projektu, otrzymuję również
                      informacje o&nbsp;Twojej firmie, celach strony,
                      materiałach, budżecie i&nbsp;terminie. Zapytania, briefy,
                      ustalenia, oferty oraz informacje o&nbsp;wpłatach mogę
                      przechowywać w&nbsp;prywatnym panelu do obsługi
                      współpracy. Link do briefu wygasa po 14 dniach;
                      wygaśnięcie linku nie usuwa już przesłanych odpowiedzi,
                      których dotyczy okres przechowywania opisany poniżej.
                    </p>
                  )}
                  <p>
                    Nie podawaj w&nbsp;formularzu haseł, numeru PESEL ani danych
                    wrażliwych. Wystarczy opis planowanej współpracy.
                  </p>
                  <p>
                    Podczas odwiedzin infrastruktura strony może przetwarzać
                    adres IP, czas żądania, adres odwiedzanej strony, informacje
                    o&nbsp;przeglądarce i&nbsp;urządzeniu oraz błędach
                    połączenia. Są to dane techniczne służące dostarczaniu
                    strony i&nbsp;jej ochronie.
                  </p>
                </section>
                <section aria-labelledby="cele">
                  <h2 id="cele">03. Po co i&nbsp;na jakiej podstawie</h2>
                  <ul>
                    <li>
                      <strong>
                        Przygotowanie oferty i&nbsp;ustalenia dotyczące
                        współpracy:
                      </strong>{" "}
                      działania na Twoje żądanie przed zawarciem umowy lub jej
                      wykonanie&nbsp;- art. 6 ust. 1 lit. b RODO.
                    </li>
                    <li>
                      <strong>
                        Pozostała korespondencja, w&nbsp;tym kontakt
                        z&nbsp;przedstawicielem firmy:
                      </strong>{" "}
                      mój uzasadniony interes polegający na udzielaniu
                      odpowiedzi i&nbsp;prowadzeniu kontaktu&nbsp;- art. 6 ust.
                      1 lit. f RODO.
                    </li>
                    <li>
                      <strong>
                        Działanie strony, ochrona przed spamem
                        i&nbsp;nadużyciami oraz obrona roszczeń:
                      </strong>{" "}
                      mój uzasadniony interes&nbsp;- art. 6 ust. 1 lit. f RODO.
                    </li>
                    <li>
                      <strong>Obowiązki wynikające z&nbsp;przepisów:</strong>{" "}
                      jeżeli powstaną w&nbsp;związku ze współpracą, np.
                      obowiązki podatkowe&nbsp;- art. 6 ust. 1 lit. c RODO.
                    </li>
                  </ul>
                  <p>
                    Wysłanie zapytania nie zapisuje Cię na marketing ani
                    newsletter. Nie podejmuję wobec Ciebie decyzji wywołujących
                    skutki prawne wyłącznie na podstawie automatycznego
                    przetwarzania, w&nbsp;tym profilowania.
                  </p>
                </section>
                <section aria-labelledby="dostawcy">
                  <h2 id="dostawcy">04. Usługi, które obsługują stronę</h2>
                  <ul>
                    <li>
                      <strong>Vercel:</strong> hosting i&nbsp;obsługa żądań do
                      strony
                      {smtp
                        ? ", w tym przesłanie formularza przez funkcję serwerową"
                        : ""}
                      .{" "}
                      <a href="https://vercel.com/legal/privacy-policy">
                        Polityka prywatności Vercel
                      </a>
                      .
                    </li>
                    {dashboard && (
                      <li>
                        <strong>Supabase:</strong> baza danych zapytań
                        i&nbsp;projektów oraz uwierzytelnianie właściciela
                        prywatnego panelu.{" "}
                        <a href="https://supabase.com/privacy">
                          Polityka prywatności Supabase
                        </a>{" "}
                        i{" "}
                        <a href="https://supabase.com/legal/dpa">
                          umowa przetwarzania danych
                        </a>
                        .
                      </li>
                    )}
                    <li>
                      <strong>OVHcloud:</strong> obsługa domeny i&nbsp;skrzynki
                      contact@dorlowski.dev, w&nbsp;której przechowuję
                      korespondencję.{" "}
                      <a href="https://www.ovhcloud.com/pl/personal-data-protection/">
                        Ochrona danych w&nbsp;OVHcloud
                      </a>
                      .
                    </li>
                    {smtp ? (
                      <li>
                        <strong>Cloudflare Turnstile:</strong> ochrona
                        formularza przed botami. Cloudflare przetwarza sygnały
                        techniczne, np. IP i&nbsp;informacje
                        o&nbsp;przeglądarce, aby ocenić ruch. Nie przekazuję do
                        Turnstile treści Twojego zapytania. Cloudflare działa
                        również jako odrębny administrator przy ulepszaniu
                        wykrywania botów.{" "}
                        <a href="https://www.cloudflare.com/turnstile-privacy-policy/">
                          Zasady prywatności Turnstile
                        </a>
                        .
                      </li>
                    ) : process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ? (
                      <li>
                        <strong>Web3Forms:</strong> przekazanie danych
                        formularza na moją skrzynkę pocztową oraz ochrona
                        wysyłki przed spamem.{" "}
                        <a href="https://web3forms.com/privacy">
                          Polityka prywatności Web3Forms
                        </a>
                        .
                      </li>
                    ) : null}
                  </ul>
                  <p>
                    Dane mogą też zostać udostępnione uprawnionym organom, gdy
                    wymaga tego prawo. Nie sprzedaję danych odwiedzających.
                  </p>
                  <p>
                    Dostawcy infrastruktury mogą przetwarzać dane poza
                    Europejskim Obszarem Gospodarczym, w&nbsp;tym w&nbsp;USA.
                    Stosowane zabezpieczenia zależą od dostawcy
                    i&nbsp;transferu: mogą obejmować standardowe klauzule umowne
                    Komisji Europejskiej lub decyzję o&nbsp;odpowiednim poziomie
                    ochrony, jeżeli obejmuje odbiorcę. Informacje zawierają
                    dokumenty dostawców, w&nbsp;tym{" "}
                    <a href="https://vercel.com/legal/dpa">
                      umowa przetwarzania danych Vercel
                    </a>
                    . Możesz zwrócić się do mnie o&nbsp;szczegóły i&nbsp;kopię
                    odpowiednich zabezpieczeń.
                  </p>
                </section>
                <section aria-labelledby="okres">
                  <h2 id="okres">05. Jak długo przechowuję dane</h2>
                  <p>
                    Korespondencję przechowuję przez czas potrzebny do
                    odpowiedzi, ustalenia zakresu współpracy i&nbsp;zakończenia
                    sprawy. Po tym okresie zachowuję ją tylko wtedy, gdy jest
                    potrzebna do realizacji umowy, wykonania obowiązków prawnych
                    lub ustalenia, dochodzenia albo obrony roszczeń&nbsp;- do
                    upływu właściwych terminów.
                  </p>
                  <p>
                    Przy ocenie dalszego przechowywania biorę pod uwagę, czy
                    rozmowa nadal trwa, czy doszło do współpracy i&nbsp;czy
                    istnieje spór lub obowiązek zachowania dokumentów. Zbędne
                    dane usuwam. Dane techniczne są przechowywane zgodnie
                    z&nbsp;okresem retencji danej usługi, przez czas potrzebny
                    do działania infrastruktury, diagnostyki i&nbsp;ochrony
                    przed nadużyciami.
                  </p>
                </section>
                <section aria-labelledby="prawa">
                  <h2 id="prawa">06. Twoje prawa</h2>
                  <p>
                    Na zasadach określonych w&nbsp;RODO masz prawo dostępu do
                    danych, sprostowania, usunięcia, ograniczenia przetwarzania
                    oraz&nbsp;- gdy ma zastosowanie&nbsp;- przenoszenia danych.
                    Możesz wnieść sprzeciw wobec przetwarzania opartego na
                    uzasadnionym interesie ze względu na swoją szczególną
                    sytuację.
                  </p>
                  <p>
                    Aby skorzystać z&nbsp;praw, napisz na{" "}
                    <a href="mailto:contact@dorlowski.dev">
                      contact@dorlowski.dev
                    </a>
                    . Masz też prawo złożyć skargę do{" "}
                    <a href="https://uodo.gov.pl/">
                      Prezesa Urzędu Ochrony Danych Osobowych
                    </a>
                    .
                  </p>
                </section>
                <section aria-labelledby="przegladarka">
                  <h2 id="przegladarka">
                    07. Przeglądarka i&nbsp;narzędzia pomiarowe
                  </h2>
                  <p>
                    Nie stosuję cookies reklamowych ani narzędzi do analizy
                    zachowania użytkowników. Mechanizm motywu strony może
                    zapisać ustawienie wyglądu w&nbsp;pamięci lokalnej
                    przeglądarki (localStorage, klucz „theme”). Możesz usunąć je
                    w&nbsp;ustawieniach danych witryny.
                  </p>
                  {smtp && (
                    <p>
                      Turnstile wykorzystuje sygnały przeglądarki do weryfikacji
                      bezpieczeństwa. Zakres danych i&nbsp;ewentualnych
                      mechanizmów zapisu opisuje{" "}
                      <a href="https://www.cloudflare.com/turnstile-privacy-policy/">
                        dokumentacja prywatności Cloudflare
                      </a>
                      . Jeśli nie chcesz korzystać z&nbsp;formularza, możesz
                      skontaktować się bezpośrednio e-mailem.
                    </p>
                  )}
                  {dashboard && (
                    <p>
                      Logowanie do prywatnego panelu właściciela korzysta
                      z&nbsp;niezbędnych cookies sesyjnych Supabase. Klient
                      wypełniający brief nie zakłada konta. Link do briefu jest
                      indywidualnym kluczem dostępu&nbsp;- nie publikuj go ani
                      nie przekazuj osobom nieupoważnionym.
                    </p>
                  )}
                  <p>
                    Google Search Console służy mi do sprawdzania obecności
                    strony w&nbsp;wynikach wyszukiwania. Jego weryfikacja przez
                    DNS nie instaluje na stronie skryptu Google Analytics.
                  </p>
                  <p>
                    Przed uruchomieniem dodatkowej analityki lub marketingu
                    zaktualizuję tę politykę i, gdy będzie to wymagane,
                    umożliwię dokonanie wyboru przed uruchomieniem takich
                    narzędzi.
                  </p>
                </section>
                <section aria-labelledby="linki">
                  <h2 id="linki">08. Linki i&nbsp;aktualizacje</h2>
                  <p>
                    Linki do realizacji i&nbsp;profili społecznościowych
                    prowadzą do innych serwisów, które stosują własne zasady
                    prywatności. Ta polityka dotyczy dorlowski.dev. Jej aktualna
                    wersja jest dostępna pod tym adresem; datę ostatniej zmiany
                    znajdziesz na górze strony.
                  </p>
                </section>
              </article>
            </div>
          </div>
        </div>
        <SectionTransition from="paper" to="ink" shape="fold" size="shallow" />
      </main>
      <SiteFooter />
    </>
  );
}
