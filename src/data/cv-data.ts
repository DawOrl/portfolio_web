import { plDeep } from "@/lib/typography";

const rawCvData = {
  personal: {
    name: "Dawid Orłowski",
    role: "Fullstack AI Developer",
    email: "contact@dorlowski.dev",
    phone: "739 258 786",
    location: "Kraków",
    // Przekaz sprzedażowy (hero)
    headline: "Tworzę nowoczesne strony internetowe dla firm",
    subheadline:
      "Projektuję i koduję szybkie, estetyczne strony i landing page, które budują wizerunek Twojej firmy i przyciągają klientów. Bez gotowych szablonów - wszystko pod Twoje potrzeby.",
    availability: "Dostępny na nowe projekty",
    about:
      "Jestem osobą po studiach informatycznych. Na co dzień pracuję jako Fullstack AI Developer - tworzę aplikacje webowe oparte o sztuczną inteligencję i automatyzacje. Wcześniej, jako Email Marketing Specialist, prowadziłem kampanie i poznałem od podszewki to, co realnie sprzedaje online. Strony internetowe łączą obie te perspektywy: czysty, wydajny kod programisty i spojrzenie marketingowca na to, co przyciąga klienta.",
  },

  // Wyróżniki pokazywane w pasku zaufania pod hero
  highlights: [
    "Next.js & React",
    "100% RWD (mobile-first)",
    "Optymalizacja pod SEO",
    "Błyskawiczne ładowanie",
  ],

  // Oferta / Usługi
  services: [
    {
      id: "strony-firmowe",
      icon: "Globe",
      title: "Strony firmowe",
      description:
        "Profesjonalna wizytówka Twojej działalności w sieci - buduje zaufanie i prezentuje ofertę.",
      features: [
        "Strona wizytówka",
        "Strona usługowa",
        "Sekcja bloga",
        "Edycja treści",
      ],
    },
    {
      id: "landing-page",
      icon: "Target",
      title: "Landing page",
      description:
        "Strony jednocelowe pod kampanie reklamowe, nastawione na konkretną akcję i wysoką konwersję.",
      features: [
        "Pod kampanie Ads",
        "Formularze leadowe",
        "A/B testy",
        "Analityka",
      ],
    },
    {
      id: "sklepy",
      icon: "ShoppingBag",
      title: "Sklepy internetowe",
      description:
        "Lekkie sklepy i strony produktowe gotowe do sprzedaży, z wygodnym zarządzaniem.",
      features: [
        "Katalog produktów",
        "Koszyk i płatności",
        "Panel zarządzania",
        "Integracje",
      ],
    },
    {
      id: "aplikacje",
      icon: "Smartphone",
      title: "Aplikacje & automatyzacje",
      description:
        "Aplikacje webowe i mobilne oraz narzędzia automatyzujące powtarzalne zadania w firmie.",
      features: [
        "Aplikacje webowe",
        "Aplikacje mobilne",
        "Integracje API",
        "Automatyzacje",
      ],
    },
  ],

  // Proces współpracy
  processSteps: [
    {
      step: "01",
      title: "Konsultacja i wycena",
      description:
        "Poznajemy cele Twojej firmy i grupę odbiorców. Doradzam najlepsze rozwiązanie i przygotowuję bezpłatną, konkretną wycenę.",
    },
    {
      step: "02",
      title: "Projekt (UI/UX)",
      description:
        "Tworzę projekt graficzny strony spójny z Twoją marką. Wszystko ustalamy i akceptujemy zanim powstanie jedna linijka kodu.",
    },
    {
      step: "03",
      title: "Kodowanie i wdrożenie",
      description:
        "Programuję stronę w nowoczesnych technologiach - responsywną, szybką i zoptymalizowaną pod wyszukiwarki, z testami na każdym etapie.",
    },
    {
      step: "04",
      title: "Publikacja i wsparcie",
      description:
        "Publikuję stronę, wdrażam analitykę i przekazuję dostęp. Zostaję do dyspozycji przy aktualizacjach i rozwoju projektu.",
    },
  ],

  // Ceny wejściowe dla określonego zakresu; dodatki wyceniane osobno.
  pricing: [
    {
      name: "Start",
      tagline: "Wizytówka Twojej firmy",
      price: "od 990 zł",
      description:
        "Dla małej firmy, która potrzebuje dobrego pierwszego wrażenia i prostego sposobu na kontakt.",
      features: [
        "Jedna strona, do 5 sekcji",
        "Wygląd dopasowany do Twojej marki",
        "Wersja na telefon, tablet i komputer",
        "Formularz kontaktowy",
        "Podstawowe ustawienia SEO",
        "Podpięcie domeny i publikacja",
      ],
      featured: false,
      cta: "Zapytaj o wizytówkę",
    },
    {
      name: "Biznes",
      tagline: "Strona firmowa",
      price: "od 1 990 zł",
      description:
        "Miejsce na Twoją ofertę, realizacje i historię firmy. Dla klientów, którzy chcą poznać Cię bliżej.",
      features: [
        "Do 5 stron, w tym strona główna",
        "Indywidualny wygląd dopasowany do marki",
        "Czytelna prezentacja usług i realizacji",
        "Wersja na telefon, tablet i komputer",
        "Formularz i podstawowe ustawienia SEO",
        "Podpięcie domeny i publikacja",
      ],
      featured: true,
      cta: "Zapytaj o stronę firmową",
    },
    {
      name: "Landing",
      tagline: "Jedna oferta. Konkretny cel.",
      price: "od 1 490 zł",
      description:
        "Strona pod wybraną usługę lub kampanię. Pomaga zrozumieć ofertę i zrobić kolejny krok.",
      features: [
        "Jedna strona, do 8 sekcji",
        "Układ dopasowany do celu kampanii",
        "Uporządkowanie argumentów oferty",
        "Wezwania do działania, formularz i FAQ",
        "Wersja mobilna i podstawowe SEO",
        "Podpięcie domeny i publikacja",
      ],
      featured: false,
      cta: "Zapytaj o landing page",
    },
  ],
  pricingExtras: [
    {
      name: "Teksty na wizytówkę lub landing",
      detail: "Do 1 000 słów",
      price: "+350 zł",
    },
    {
      name: "Teksty na stronę firmową",
      detail: "Do 2 500 słów",
      price: "+700 zł",
    },
    {
      name: "Dodatkowa podstrona",
      detail: "W istniejącym układzie strony",
      price: "+250 zł",
    },
  ],

  // Opinie — TODO: zastąp prawdziwymi opiniami klientów (na razie przykładowe)
  testimonials: [
    {
      name: "Klient - branża motoryzacyjna",
      role: "Właściciel warsztatu",
      quote:
        "Strona powstała szybko i dokładnie tak, jak ustaliliśmy. Klienci częściej dzwonią po obejrzeniu oferty online, a całość wygląda naprawdę profesjonalnie.",
      rating: 5,
    },
    {
      name: "Klient - usługi lokalne",
      role: "Mała działalność",
      quote:
        "Dawid dobrze doradził, co faktycznie jest mi potrzebne, zamiast sprzedawać niepotrzebne dodatki. Kontakt bezproblemowy, terminy dotrzymane.",
      rating: 5,
    },
    {
      name: "Klient - landing kampanijny",
      role: "Marketing",
      quote:
        "Landing pod kampanię reklamową ładuje się błyskawicznie i ładnie konwertuje. Współpraca konkretna i merytoryczna.",
      rating: 5,
    },
  ],

  // Najczęściej zadawane pytania
  faq: [
    {
      q: "Ile kosztuje strona internetowa?",
      a: "Wizytówka do 5 sekcji kosztuje od 990 zł, strona firmowa do 5 stron od 1 990 zł, a landing do 8 sekcji od 1 490 zł. Przed rozpoczęciem pracy otrzymujesz bezpłatną wycenę z pełną kwotą do zapłaty i ustalonym zakresem. Domena, hosting i płatne usługi są rozliczane osobno.",
    },
    {
      q: "Jak długo trwa realizacja?",
      a: "Wizytówkę typu one-page jestem w stanie wdrożyć w ok. 7 dni. Większe, kilkupodstronowe projekty to zwykle 2–4 tygodnie, w zależności od zakresu i tempa dostarczania treści.",
    },
    {
      q: "Czy strona będzie widoczna w Google?",
      a: "Tak. Każdą stronę optymalizuję pod wyszukiwarki (struktura, metadane, szybkość ładowania, wersja mobilna), co jest podstawą dobrej widoczności w Google.",
    },
    {
      q: "Czy będę mógł samodzielnie edytować treści?",
      a: "Tak, jeśli rozszerzymy projekt o system zarządzania treścią (CMS). Panel edycji i blog wyceniam osobno - nie są zawarte w podstawowych pakietach. Możesz też zlecać mi późniejsze zmiany według ustalonej wyceny.",
    },
    {
      q: "Co z hostingiem i domeną?",
      a: "Pomogę dobrać i skonfigurować domenę oraz hosting odpowiedni do projektu i jego komercyjnego wykorzystania. Ich zakup, odnowienia oraz płatne usługi zewnętrzne są poza ceną wykonania strony. Koszty poznasz przed rozpoczęciem pracy.",
    },
    {
      q: "Czy kod strony należy do mnie?",
      a: "Tak. Po rozliczeniu projektu przekazuję pełen dostęp i kod - strona jest w 100% Twoją własnością, bez uzależnienia od jednego dostawcy.",
    },
  ],

  // Realizacje — jedno źródło prawdy (biblioteka projektów + podstrony case study).
  //
  // Konwencja zdjęć: pliki trzymamy w public/projects/<slug>/.
  // Zrzuty z live można generować automatycznie: `npm run shots <slug>`
  // (konfiguracja w scripts/shots.config.json) → tworzy desktop.png i mobile.png.
  //
  // Pola: slug (URL), category (filtr), tagline (krótki opis na karcie),
  // problem/solution/result (case study), stack[] + scope[] (zakres),
  // cover (miniatura/okładka), gallery[] (zdjęcia), liveUrl/githubUrl, featured.
  projects: [
    {
      slug: "topauto-serwis",
      title: "TopAuto Serwis - strona warsztatu",
      category: "Strona firmowa",
      kind: "client" as const,
      year: "2026",
      client: "TopAuto Serwis Zbigniew Orłowski",
      tagline:
        "Strona lokalnego warsztatu w Nieskurzowie Starym: oferta serwisu, podstrony usług i bezpośredni kontakt z mechanikiem.",
      problem:
        "Przygotowujący się do otwarcia warsztat potrzebował czytelnej prezentacji oferty, lokalizacji i sposobu umawiania wizyt. Najważniejsze było ułatwienie kierowcom kontaktu telefonicznego oraz znalezienia dojazdu.",
      solution:
        "Strona prezentuje wulkanizację, serwis olejowy, klimatyzację i bieżące naprawy na osobnych podstronach. Wyeksponowane przyciski telefonu, informacje o warsztacie, FAQ oraz mapa z dojazdem prowadzą użytkownika od poznania oferty do kontaktu. Projekt obejmuje wersję mobilną oraz jasny i ciemny motyw.",
      result:
        "Warsztat ma jedno miejsce z aktualną ofertą i danymi kontaktowymi. Kierowca może sprawdzić zakres usługi, zadzwonić w sprawie terminu i wyznaczyć trasę do warsztatu.",
      stack: ["Next.js", "React"],
      scope: [
        "Projekt UI/UX",
        "Podstrony usług",
        "Wersja mobilna",
        "Mapa i kontakt",
        "Jasny i ciemny motyw",
      ],
      cover: "/projects/topauto-serwis/desktop.png",
      gallery: [
        "/projects/topauto-serwis/desktop.png",
        "/projects/topauto-serwis/mobile.png",
      ],
      features: [
        {
          src: "/projects/topauto-serwis/features/uslugi-podstrony.webp",
          alt: "Sekcja usług TopAuto Serwis: cztery usługi warsztatu z krótkim opisem i linkiem „Zobacz zakres”",
          caption:
            "Cztery usługi warsztatu. Każda prowadzi do własnej podstrony z zakresem prac.",
          step: "solution",
          device: "desktop",
        },
        {
          src: "/projects/topauto-serwis/features/podstrona-wulkanizacja.webp",
          alt: "Podstrona wymiany opon i wulkanizacji z nawigacją okruszkową, opisem usługi oraz przyciskami Zadzwoń i Dojazd",
          caption:
            "Podstrona wulkanizacji: opis usługi, a przyciski telefonu i dojazdu tuż pod nagłówkiem.",
          step: "solution",
          device: "desktop",
        },
        {
          src: "/projects/topauto-serwis/features/ciemny-motyw-mobile.webp",
          alt: "Strona główna TopAuto Serwis na telefonie w ciemnym motywie, z przypiętym na dole paskiem Zadzwoń i Dojazd",
          caption:
            "Na telefonie przyciski Zadzwoń i Dojazd są zawsze pod kciukiem, także w ciemnym motywie.",
          step: "solution",
          device: "mobile",
        },
        {
          src: "/projects/topauto-serwis/features/kontakt-telefon-mapa.webp",
          alt: "Sekcja kontaktu z dużym numerem telefonu warsztatu, statusem otwarcia, adresem, godzinami i mapą dojazdu",
          caption:
            "Numer telefonu, godziny otwarcia i mapa w jednym miejscu. Kierowca dzwoni albo od razu wyznacza trasę.",
          step: "result",
          device: "desktop",
        },
      ] as const,
      githubUrl: "",
      liveUrl: "https://topauto-serwis.vercel.app/",
      featured: false,
    },

    // ───────────── Projekty autorskie (demo) — live na Vercelu ─────────────
    // Nowy projekt: dodaj wpis do scripts/shots.config.json, uruchom
    // `npm run shots <slug>`, dodaj obiekt poniżej (draft: true ukrywa
    // z biblioteki/teasera/sitemap do czasu uzupełnienia treści).

    {
      slug: "restauracja-bella",
      title: "Bella Cucina - strona restauracji",
      category: "Strona firmowa",
      kind: "demo" as const,
      year: "2026",
      client: "Projekt autorski (demo)",
      tagline:
        "Strona restauracji z menu online, galerią dań i rezerwacją stolika - bez konieczności dzwonienia.",
      problem:
        "Większość lokali gastronomicznych w Polsce działa wyłącznie na Instagramie i Facebooku. Menu krąży jako zdjęcie sprzed miesięcy, nie da się zarezerwować stolika online, a Google nie ma czego zaindeksować - lokal jest niewidoczny dla nowych gości.",
      solution:
        "Zaprojektowałem stronę, która sprzedaje atmosferę lokalu: apetyczna sekcja hero, menu online łatwe do aktualizacji, galeria dań, godziny otwarcia, mapa dojazdu i prosty formularz rezerwacji stolika. Mobile-first, bo gości najczęściej szukają w telefonie.",
      result:
        "Gość w kilka sekund widzi menu, lokalizację i rezerwuje stolik - bez telefonu i przeszukiwania social mediów. Lokal zyskuje profesjonalny wizerunek i widoczność w Google.",
      stack: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
      scope: [
        "Projekt UI/UX",
        "Menu online",
        "Formularz rezerwacji",
        "SEO lokalne",
      ],
      cover: "/projects/restauracja-bella/desktop.png",
      gallery: [
        "/projects/restauracja-bella/desktop.png",
        "/projects/restauracja-bella/mobile.png",
      ],
      features: [
        {
          src: "/projects/restauracja-bella/features/menu-online.webp",
          alt: "Menu online Bella Cucina z zakładkami kategorii i daniami z działu Antipasti: zdjęcie, opis i cena każdej pozycji",
          caption:
            "Menu online podzielone na kategorie, ze zdjęciem, opisem i ceną każdego dania.",
          step: "solution",
          device: "desktop",
        },
        {
          src: "/projects/restauracja-bella/features/galeria-dan.webp",
          alt: "Galeria „Atmosfera i smak” z mozaiką zdjęć dań, wnętrza restauracji i napojów",
          caption:
            "Galeria dań i wnętrza pokazuje atmosferę lokalu, zanim gość do niego przyjdzie.",
          step: "solution",
          device: "desktop",
        },
        {
          src: "/projects/restauracja-bella/features/menu-mobile.webp",
          alt: "Menu restauracji na telefonie z przypiętym paskiem kategorii i listą makaronów z cenami",
          caption:
            "Na telefonie pasek kategorii zostaje u góry ekranu, więc gość nie gubi się w karcie.",
          step: "solution",
          device: "mobile",
        },
        {
          src: "/projects/restauracja-bella/features/rezerwacja-stolika.webp",
          alt: "Formularz rezerwacji stolika z wpisanym imieniem, datą 24.10.2026, godziną 19:00, liczbą osób i uwagami",
          caption:
            "Rezerwacja stolika w jednym formularzu: data, godzina, liczba osób i uwagi dla obsługi.",
          step: "result",
          device: "desktop",
        },
        {
          src: "/projects/restauracja-bella/features/dojazd-godziny.webp",
          alt: "Sekcja „Jak do nas trafić” z adresem, godzinami otwarcia, danymi kontaktowymi i mapą Google",
          caption:
            "Adres, godziny otwarcia i mapa dojazdu są na stronie, a nie w nieaktualnym poście.",
          step: "result",
          device: "desktop",
        },
      ] as const,
      githubUrl: "https://github.com/DawOrl/restauracja-bella",
      liveUrl: "https://restauracja-bella.vercel.app/",
      featured: false,
    },

    {
      slug: "salon-glow",
      title: "Glow Studio - rezerwacja wizyt online",
      category: "Strona firmowa",
      kind: "demo" as const,
      year: "2026",
      client: "Projekt autorski (demo)",
      tagline:
        "Strona salonu beauty/barber z cennikiem usług i rezerwacją wizyt online - niezależna od prowizji platform.",
      problem:
        "Salony fryzjerskie, barber shopy i gabinety beauty są uzależnione od platform typu Booksy, które pobierają prowizje i „pożyczają” im klientów. Brakuje własnego kanału, który buduje markę salonu i nie oddaje bazy klientów pośrednikowi.",
      solution:
        "Stworzyłem stronę z pełnym cennikiem usług, prezentacją zespołu i portfolio realizacji oraz własnym systemem rezerwacji wizyt (wybór usługi, terminu i pracownika). Klient rezerwuje bezpośrednio u salonu - bez prowizji i przekierowań do zewnętrznych aplikacji.",
      result:
        "Salon ma własny, profesjonalny kanał rezerwacji i przestaje oddawać prowizję pośrednikom. Marka buduje rozpoznawalność, a baza klientów należy do salonu.",
      stack: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
      scope: [
        "Projekt UI/UX",
        "System rezerwacji",
        "Cennik usług",
        "SEO lokalne",
      ],
      cover: "/projects/salon-glow/desktop.png",
      gallery: [
        "/projects/salon-glow/desktop.png",
        "/projects/salon-glow/mobile.png",
      ],
      features: [
        {
          src: "/projects/salon-glow/features/cennik-uslug.webp",
          alt: "Cennik Glow Studio z kategoriami Strzyżenie i modelowanie oraz Koloryzacja, z czasem trwania i ceną każdej usługi",
          caption:
            "Pełny cennik: przy każdej usłudze widać czas wizyty i przedział ceny.",
          step: "solution",
          device: "desktop",
        },
        {
          src: "/projects/salon-glow/features/zespol.webp",
          alt: "Sekcja zespołu ze zdjęciami czworga stylistów, ich rolami, ocenami i specjalizacjami",
          caption: "Prezentacja zespołu: klientka wie, do kogo się zapisuje.",
          step: "solution",
          device: "desktop",
        },
        {
          src: "/projects/salon-glow/features/metamorfozy-przed-po.webp",
          alt: "Porównanie przed i po koloryzacji z suwakiem, opisem usługi, stylistki i czasu wizyty oraz miniaturami innych metamorfoz",
          caption:
            "Portfolio metamorfoz z suwakiem przed i po. Każda opisana usługą, stylistką i czasem wizyty.",
          step: "solution",
          device: "desktop",
        },
        {
          src: "/projects/salon-glow/features/rezerwacja-stylista-mobile.webp",
          alt: "Drugi krok rezerwacji na telefonie: wybór stylistki, a pod nim podsumowanie wizyty",
          caption:
            "Rezerwacja prowadzi krok po kroku: usługa, stylistka, termin i dane.",
          step: "result",
          device: "mobile",
        },
        {
          src: "/projects/salon-glow/features/rezerwacja-termin.webp",
          alt: "Trzeci krok rezerwacji online: wybór dnia i godziny, obok podsumowanie z usługą, stylistką, terminem i ceną",
          caption:
            "Własny kalendarz rezerwacji salonu. Podsumowanie pokazuje termin i cenę, bez prowizji pośrednika.",
          step: "result",
          device: "desktop",
        },
      ] as const,
      githubUrl: "https://github.com/DawOrl/salon-glow",
      liveUrl: "https://salon-glow-gamma.vercel.app/",
      featured: false,
    },

    {
      slug: "sklep-craft-coffee",
      title: "Craft Coffee - sklep internetowy",
      category: "Sklep internetowy",
      kind: "demo" as const,
      year: "2026",
      client: "Projekt autorski (demo)",
      tagline:
        "Sklep e-commerce lokalnej palarni kawy: katalog produktów, koszyk i płatności online.",
      problem:
        "Małe, lokalne marki (palarnie kawy, rękodzieło, produkty regionalne) sprzedają głównie stacjonarnie lub przez wiadomości na social mediach. Brakuje im sklepu, który przyjmie zamówienie i płatność o każdej porze - tracą sprzedaż poza godzinami otwarcia.",
      solution:
        "Zbudowałem lekki sklep internetowy: estetyczny katalog produktów z filtrowaniem, koszyk, proces zamówienia i integracja z płatnościami online. Wydajny, szybki i prosty w zarządzaniu asortymentem.",
      result:
        "Marka sprzedaje online 24/7, przyjmuje płatności automatycznie i dociera poza swój region. Klient zarządza produktami samodzielnie, bez programisty przy każdej zmianie.",
      stack: ["Next.js", "React", "Tailwind CSS", "Stripe"],
      scope: [
        "Projekt UI/UX",
        "Katalog i koszyk",
        "Płatności online",
        "Panel zarządzania",
      ],
      cover: "/projects/sklep-craft-coffee/desktop.png",
      gallery: [
        "/projects/sklep-craft-coffee/desktop.png",
        "/projects/sklep-craft-coffee/mobile.png",
      ],
      features: [
        {
          src: "/projects/sklep-craft-coffee/features/katalog-filtry.webp",
          alt: "Katalog kaw z filtrami palenia, rodzaju i mielenia; aktywny filtr Jasne zawęża listę do czterech kaw",
          caption:
            "Katalog z filtrowaniem: po wybraniu jasnego palenia zostają cztery kawy.",
          step: "solution",
          device: "desktop",
        },
        {
          src: "/projects/sklep-craft-coffee/features/karta-produktu.webp",
          alt: "Karta produktu Etiopia Yirgacheffe z wyborem gramatury, mielenia i ilości oraz przyciskiem Dodaj do koszyka",
          caption:
            "Karta produktu: klient wybiera gramaturę, sposób mielenia i ilość.",
          step: "solution",
          device: "desktop",
        },
        {
          src: "/projects/sklep-craft-coffee/features/koszyk-szuflada.webp",
          alt: "Wysuwany panel koszyka z dodaną kawą, licznikiem ilości, sumą i przyciskiem Zobacz koszyk",
          caption:
            "Po dodaniu kawy koszyk wysuwa się z boku, bez opuszczania strony produktu.",
          step: "solution",
          device: "desktop",
        },
        {
          src: "/projects/sklep-craft-coffee/features/koszyk-mobile.webp",
          alt: "Koszyk na telefonie z produktem, sumą, paskiem postępu do darmowej dostawy i przyciskiem Przejdź do zamówienia",
          caption:
            "Koszyk na telefonie podpowiada, ile brakuje do darmowej dostawy.",
          step: "result",
          device: "mobile",
        },
      ] as const,
      githubUrl: "https://github.com/DawOrl/sklep-craft-coffee",
      liveUrl: "https://sklep-craft-coffee.vercel.app/",
      featured: true,
    },

    {
      slug: "asystent-ai",
      title: "Asystent AI dla firmy - chatbot i generator ofert",
      category: "Aplikacja & automatyzacja",
      kind: "demo" as const,
      year: "2026",
      client: "Projekt autorski (demo)",
      tagline:
        "Aplikacja webowa z AI: chatbot odpowiadający na pytania klientów i generator spersonalizowanych ofert.",
      problem:
        "Małe firmy tracą zapytania poza godzinami pracy i marnują czas na powtarzalne pytania klientów (cennik, dostępność, zakres usług). Ręczne przygotowywanie ofert jest wolne i niespójne.",
      solution:
        "Zbudowałem aplikację webową opartą o model językowy (LLM): chatbot odpowiada na pytania klientów na podstawie wiedzy o firmie 24/7, a generator ofert na podstawie kilku pól tworzy gotową, spersonalizowaną propozycję. Integracja przez API, z naciskiem na szybkość i bezpieczeństwo danych.",
      result:
        "Firma odpowiada klientom natychmiast o każdej porze i automatyzuje powtarzalną pracę. Pokazuje praktyczne zastosowanie AI w obsłudze klienta - mój główny wyróżnik jako Fullstack AI Developer.",
      stack: ["Next.js", "React", "TypeScript", "OpenAI API", "Vercel"],
      scope: [
        "Projekt UI/UX",
        "Integracja LLM",
        "Chatbot Q&A",
        "Generator ofert",
      ],
      cover: "/projects/asystent-ai/desktop.png",
      gallery: [
        "/projects/asystent-ai/desktop.png",
        "/projects/asystent-ai/mobile.png",
      ],
      features: [
        {
          src: "/projects/asystent-ai/features/czat-odpowiedz.webp",
          alt: "Okno czatu z asystentem AI: pytanie „Ile kosztuje wdrożenie?” i odpowiedź z orientacyjnymi cenami usług",
          caption:
            "Czat odpowiada na pytanie o cenę na podstawie wiedzy o firmie, w kilka sekund.",
          step: "solution",
          device: "desktop",
        },
        {
          src: "/projects/asystent-ai/features/generator-oferty.webp",
          alt: "Generator ofert: formularz z branżą, zakresem i budżetem, obok wygenerowana oferta z pozycjami i sumą 5200 zł",
          caption:
            "Generator ofert: kilka pól po lewej, gotowa oferta z wyceną po prawej.",
          step: "solution",
          device: "desktop",
        },
        {
          src: "/projects/asystent-ai/features/czat-mobile.webp",
          alt: "Czat asystenta na telefonie z pytaniem o bezpieczeństwo klucza API i odpowiedzią asystenta",
          caption:
            "Klient dostaje odpowiedź od razu, także na telefonie i poza godzinami pracy.",
          step: "result",
          device: "mobile",
        },
      ] as const,
      githubUrl: "https://github.com/DawOrl/asystent-ai",
      liveUrl: "https://asystent-ai-three.vercel.app/",
      featured: true,
    },

    {
      slug: "eko-solar",
      title: "EkoSolar - landing fotowoltaiki z wyceną",
      category: "Landing page",
      kind: "demo" as const,
      year: "2026",
      client: "Projekt autorski (demo)",
      tagline:
        "Landing pod kampanie reklamowe z kalkulatorem oszczędności i formularzem wyceny - jedna strona, jeden cel: lead.",
      problem:
        "Firmy usługowe (fotowoltaika, ocieplenia, instalacje) płacą za reklamy Google i Facebook, a ruch kierują na ogólną stronę firmową, która nie prowadzi do żadnej akcji. Klient klika, błądzi i wychodzi - budżet reklamowy się pali, a zapytań brak.",
      solution:
        "Zaprojektowałem landing skupiony na jednej akcji: bezpłatnej wycenie. Interaktywny kalkulator oszczędności (suwak rachunku → dobrana moc instalacji i roczne oszczędności) angażuje i prowadzi prosto do formularza. Po drodze: liczby budujące zaufanie, proces w 4 krokach, realizacje z okolicy, opinie z Google, sekcja dotacji i FAQ rozwiewające obiekcje.",
      result:
        "Każdy element strony pracuje na konwersję - odwiedzający z reklamy w kilkadziesiąt sekund rozumie korzyść, sprawdza oszczędności na własnym rachunku i zostawia kontakt. Wzorzec gotowy do adaptacji dla dowolnej usługi lokalnej rozliczanej z leadów.",
      stack: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
      scope: [
        "Projekt UI/UX",
        "Kalkulator oszczędności",
        "Formularz leadowy",
        "Optymalizacja konwersji",
      ],
      cover: "/projects/eko-solar/desktop.png",
      gallery: [
        "/projects/eko-solar/desktop.png",
        "/projects/eko-solar/mobile.png",
      ],
      features: [
        {
          src: "/projects/eko-solar/features/kalkulator-oszczednosci.webp",
          alt: "Kalkulator oszczędności z suwakiem rachunku ustawionym na 550 zł i wynikiem: 5600 zł oszczędności rocznie i moc 5,5 kWp",
          caption:
            "Suwak rachunku za prąd od razu przelicza roczną oszczędność i moc instalacji.",
          step: "solution",
          device: "desktop",
        },
        {
          src: "/projects/eko-solar/features/proces-4-kroki.webp",
          alt: "Sekcja procesu w czterech krokach: audyt, projekt i wycena, montaż oraz serwis, z czasem każdego etapu",
          caption:
            "Proces w czterech krokach, z czasem każdego etapu, odpowiada na pytanie „co dalej?”.",
          step: "solution",
          device: "desktop",
        },
        {
          src: "/projects/eko-solar/features/realizacje-okolica.webp",
          alt: "Sekcja „Ostatnie montaże w Twojej okolicy” z kartami instalacji w Wieliczce i Niepołomicach, mocą i oszczędnością",
          caption:
            "Montaże z okolicy, z mocą i oszczędnością, budują zaufanie do firmy.",
          step: "solution",
          device: "desktop",
        },
        {
          src: "/projects/eko-solar/features/wycena-mobile.webp",
          alt: "Formularz bezpłatnej wyceny na telefonie z polami imię, telefon, kod pocztowy i miesięczny rachunek za prąd",
          caption:
            "Na końcu krótki formularz: wystarczy imię, telefon i kod pocztowy, żeby zostawić kontakt.",
          step: "result",
          device: "mobile",
        },
      ] as const,
      githubUrl: "https://github.com/DawOrl/eko-solar",
      liveUrl: "https://eko-solar-nu.vercel.app/",
      featured: true,
    },

    {
      slug: "fotograf-lena",
      title: "Lena Czarnecka - portfolio fotografki",
      category: "Strona firmowa",
      kind: "demo" as const,
      year: "2026",
      client: "Projekt autorski (demo)",
      tagline:
        "Jasne, magazynowe portfolio fotografki ślubnej: galeria z filtrowaniem, pakiety i zapytania o terminy.",
      problem:
        "Fotografowie i inni twórcy pokazują prace głównie na Instagramie, gdzie portfolio miesza się z relacjami, a algorytm decyduje, co zobaczy klientka. Brakuje miejsca, które prezentuje dorobek w pełnej jakości, porządkuje ofertę i zbiera zapytania o terminy.",
      solution:
        "Zbudowałem stronę, w której bohaterem są zdjęcia: minimalistyczny, jasny layout z serifową typografią, galeria z filtrowaniem kategorii (śluby, portrety, rodzinne), czytelne pakiety cenowe i formularz zapytania z datą wydarzenia. Estetyka „editorial” zamiast szablonu - strona ma wyglądać jak rozkładówka magazynu.",
      result:
        "Klientka w minutę ogląda wyselekcjonowane portfolio, zna ceny pakietów i wysyła zapytanie z konkretną datą. Fotografka dostaje profesjonalną wizytówkę niezależną od algorytmów - wzorzec dla każdej branży kreatywnej.",
      stack: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
      scope: [
        "Projekt UI/UX",
        "Galeria z filtrowaniem",
        "Pakiety i cennik",
        "Formularz zapytań",
      ],
      cover: "/projects/fotograf-lena/desktop.png",
      gallery: [
        "/projects/fotograf-lena/desktop.png",
        "/projects/fotograf-lena/mobile.png",
      ],
      features: [
        {
          src: "/projects/fotograf-lena/features/portfolio-filtr-sluby.webp",
          alt: "Portfolio fotografki z aktywnym filtrem Śluby i trzema zdjęciami par młodych",
          caption:
            "Galeria z filtrowaniem kategorii. Tu wybrane są tylko śluby.",
          step: "solution",
          device: "desktop",
        },
        {
          src: "/projects/fotograf-lena/features/podglad-zdjecia.webp",
          alt: "Zdjęcie pary młodej na plaży otwarte w pełnym rozmiarze, z numerem kadru, podpisem i strzałkami nawigacji",
          caption:
            "Każdy kadr otwiera się w pełnym rozmiarze, z podpisem i nawigacją strzałkami.",
          step: "solution",
          device: "desktop",
        },
        {
          src: "/projects/fotograf-lena/features/pakiety-cennik.webp",
          alt: "Sekcja oferty z pakietami Portret od 650 zł i Ślub od 4900 zł oraz listą tego, co zawierają",
          caption:
            "Pakiety z ceną „od” i konkretną zawartością zamiast „ceny do ustalenia”.",
          step: "solution",
          device: "desktop",
        },
        {
          src: "/projects/fotograf-lena/features/portfolio-mobile.webp",
          alt: "Portfolio na telefonie z filtrami kategorii i pierwszym zdjęciem ślubnym na całą szerokość ekranu",
          caption:
            "Na telefonie zdjęcia zajmują całą szerokość ekranu, a filtry są pod ręką.",
          step: "result",
          device: "mobile",
        },
        {
          src: "/projects/fotograf-lena/features/zapytanie-o-termin.webp",
          alt: "Formularz zapytania o termin z wpisanym imieniem, datą wydarzenia 12.06.2027 i wiadomością",
          caption:
            "Zapytanie od razu zawiera datę wydarzenia, więc fotografka wie, o jaki termin chodzi.",
          step: "result",
          device: "desktop",
        },
      ] as const,
      githubUrl: "https://github.com/DawOrl/fotograf-lena",
      liveUrl: "https://fotograf-lena.vercel.app/",
      featured: false,
    },

    {
      slug: "kalkulator-wyceny",
      title: "Kalkulator wyceny strony www - wizard",
      category: "Aplikacja & automatyzacja",
      kind: "demo" as const,
      year: "2026",
      client: "Projekt autorski (demo)",
      tagline:
        "Interaktywny wizard: 6 pytań i klient widzi widełki cenowe z rozpisem kosztów - automatyzacja pierwszego kontaktu.",
      problem:
        "Pierwsze pytanie każdego klienta brzmi „ile to kosztuje?”, a odpowiedź wymaga maili, telefonów i ręcznego liczenia. Część zainteresowanych odpada, zanim dostanie jakąkolwiek liczbę, a usługodawca traci czas na wyceny, z których nic nie wynika.",
      solution:
        "Zbudowałem konwersacyjny kalkulator: jedno pytanie na ekran (typ strony, podstrony, design, treści, funkcje, termin), płynne przejścia między krokami i wynik od razu - widełki cenowe, szacowany czas realizacji i kosztorys pozycja po pozycji. Bez żargonu, bez podawania maila, bez zobowiązań.",
      result:
        "Klient dostaje orientacyjną cenę w 60 sekund o dowolnej porze, a do rozmowy trafia już z realnymi oczekiwaniami. Wzorzec automatyzacji pierwszego kontaktu do wpięcia w stronę dowolnej firmy usługowej.",
      stack: ["Next.js", "React", "TypeScript", "Framer Motion"],
      scope: [
        "Projekt UI/UX",
        "Wizard 6 kroków",
        "Silnik wyceny",
        "Kosztorys pozycja po pozycji",
      ],
      cover: "/projects/kalkulator-wyceny/desktop.png",
      gallery: [
        "/projects/kalkulator-wyceny/desktop.png",
        "/projects/kalkulator-wyceny/mobile.png",
      ],
      features: [
        {
          src: "/projects/kalkulator-wyceny/features/start-60-sekund.webp",
          alt: "Ekran startowy kalkulatora z hasłem „Sprawdź orientacyjną cenę swojej strony w 60 sekund” i przyciskiem Zaczynamy",
          caption:
            "Pytanie „ile to kosztuje?” dostaje odpowiedź już od pierwszego ekranu.",
          step: "challenge",
          device: "desktop",
        },
        {
          src: "/projects/kalkulator-wyceny/features/krok-rodzaj-strony-mobile.webp",
          alt: "Pierwszy krok kalkulatora na telefonie: wybór rodzaju strony, przy każdej opcji cena od 990 zł wzwyż",
          caption:
            "Jedno pytanie na ekran. Na telefonie odpowiedź to jedno dotknięcie.",
          step: "solution",
          device: "mobile",
        },
        {
          src: "/projects/kalkulator-wyceny/features/krok-funkcje-kosztorys.webp",
          alt: "Piąty krok kalkulatora z wybranymi funkcjami Rezerwacje online i Animacje premium, obok kosztorys wstępny z sześcioma pozycjami",
          caption:
            "Kosztorys obok pytań rośnie pozycja po pozycji z każdym wyborem.",
          step: "solution",
          device: "desktop",
        },
        {
          src: "/projects/kalkulator-wyceny/features/wynik-widelki-kosztorys.webp",
          alt: "Wynik wyceny: przedział od 5600 do 7500 zł netto, czas realizacji od 2 do 6 tygodni i rozpis sześciu pozycji kosztorysu",
          caption:
            "Wynik od razu: widełki cenowe, czas realizacji i rozpis kosztów.",
          step: "result",
          device: "desktop",
        },
      ] as const,
      githubUrl: "https://github.com/DawOrl/kalkulator-wyceny",
      liveUrl: "https://kalkulator-wyceny-three.vercel.app/",
      featured: false,
    },
  ],

  experience: {
    role: "Fullstack AI Developer",
    company: "Webimpact",
    period: "05.2026 - nadal",
    description:
      "Tworzenie aplikacji full-stack opartych o sztuczną inteligencję - integracje z modelami językowymi (LLM), automatyzacje procesów i narzędzia wewnętrzne. Łączę warstwę front-end (React / Next.js) z logiką back-endową i wdrożeniami w chmurze.",
  },
  education: {
    school: "Politechnika Krakowska im. Tadeusza Kościuszki",
    degree:
      "Informatyki w inżynierii komputerowej - brak obrony pracy dyplomowej",
    period: "2021 - 2025",
  },
  certifications: [
    "Red Hat OpenShift I: Containers & Kubernetes 4.10 (DO180)",
    "Red Hat System Administration 19.0 (RH124)",
    "JavaScript od Podstaw do Eksperta",
  ],
  skills: [
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Framer Motion",
    "Node.js",
    "Python",
    "REST API",
    "Git",
    "Vercel",
    "Claude",
    "Claude Code",
    "Gemini",
    "Nano Banana 2",
    "Obsidian",
  ],
  otherExperience: [
    {
      role: "Email Marketing Specialist",
      company: "Webimpact",
      period: "09.2023 - 05.2026",
      description:
        "Zarządzanie kampaniami marketingowymi w systemach Iterable/Beehiiv/Ghost. Tworzenie materiałów w kodzie HTML oraz w kreatorach. Projektowanie i programowanie aplikacji automatyzujących zadania. Zarządzanie bazami danych (Suppress/blacklist), wgrywanie zasobów na serwery Amazon oraz analiza testów dostarczalności.",
    },
    {
      role: "Pomoc administracyjna",
      company: "Urząd Gminy w Lipniku",
      period: "10.2021 - 01.2022",
      description:
        "Zarządzanie stroną internetową oraz fanpage'm urzędu, obsługa klienta.",
    },
    {
      role: "Pracownik biura w dziale planowania",
      company: "AGC Glass Poland",
      period: "06.2021 - 09.2021",
      description:
        "Obsługa zamówień oraz programu do wprowadzania danych systemowych.",
    },
  ],
};

/** Treści z poprawioną polską typografią (twarde spacje po jednoliterowych słowach). */
export const cvData = plDeep(rawCvData);
