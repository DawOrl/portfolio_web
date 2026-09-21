# Powiadomienia z formularza przez OVH

Szablon: `src/lib/contact-email.ts`. Podgląd z fikcyjnymi danymi:
`design/contact-email-preview.html`. HTML tabelkowy, style inline, wersja tekstowa,
polskie znaki, Reply-To klienta lub przycisk telefonu. Wygląd zależy też od programu pocztowego.

## Aktywacja

1. Utwórz darmowe konto Cloudflare i widget **Turnstile** (Managed).
   Nazwa: `Portfolio contact`. Hostname: `dorlowski.dev`. Nie przenoś DNS z OVH.
2. W Vercel → projekt → Settings → Environment Variables → Production ustaw:

| Nazwa | Wartość | Typ |
| --- | --- | --- |
| SMTP_USER | contact@dorlowski.dev | Config |
| SMTP_PASSWORD | hasło skrzynki Zimbra, nie konta OVH | Secret |
| NEXT_PUBLIC_TURNSTILE_SITE_KEY | Site Key widgetu | Config |
| TURNSTILE_SECRET_KEY | Secret Key widgetu | Secret |
| NEXT_PUBLIC_SITE_URL | https://dorlowski.dev | Config |

Serwer domyślny: smtp.mail.ovh.net, port 465, TLS. Opcjonalnie SMTP_HOST.
Nie wpisuj haseł do kodu ani czatu. Nie używaj NEXT_PUBLIC_ dla hasła ani Secret Key.
Pozostaw istniejący NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY do zakończenia migracji.

3. Wdróż kod i wykonaj Redeploy po ustawieniu zmiennych.
   Tryb SMTP włącza się dopiero po ustawieniu SMTP_USER, SMTP_PASSWORD oraz obu
   kluczy Turnstile. W przeciwnym razie działa poprzednia integracja Web3Forms.
4. Wyślij z produkcyjnego formularza jedno zapytanie z e-mailem i jedno z telefonem.
   Sprawdź HTML, polskie znaki, Reply-To, przycisk telefonu i SPF/DKIM/DMARC.
   Testy automatyczne używają atrapy SMTP; nie potwierdzają połączenia z kontem OVH.
5. Dopisz OVH i Cloudflare oraz sposób działania formularza do informacji o prywatności.

## Zabezpieczenia i ograniczenia

Hasło wyłącznie na serwerze. Turnstile weryfikowany na serwerze z kontrolą hostname
i action, jednorazowe tokeny, honeypot, limity pól i rozmiaru żądania, kontrola Origin,
kodowanie danych w HTML, stały nadawca i odbiorca, brak autorespondera do obcych adresów.
Turnstile ogranicza boty, nie zastępuje pełnego limitowania ruchu. W razie nadużyć
dodaj limit na /api/contact w zaporze hostingu. Nie ma automatycznej ponownej wysyłki
po błędzie SMTP, aby ograniczyć ryzyko podwójnych wiadomości.

Brak dodatkowej subskrypcji pocztowej; obowiązują limity istniejącej skrzynki OVH
i wybranego planu hostingu. Potwierdzenie formularza oznacza przyjęcie przez SMTP,
nie gwarantuje umieszczenia w Odebranych.

Źródła:
- https://docs.ovhcloud.com/en/guides/web-cloud/email-and-collaborative-solutions/zimbra/mail-apps
- https://developers.cloudflare.com/turnstile/plans/
- https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
