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

  // Realizacje: jedno źródło prawdy (biblioteka projektów + podstrony case study).
  //
  // Konwencja zdjęć: pliki trzymamy w public/projects/<slug>/.
  // Zrzuty z live można generować automatycznie: `npm run shots <slug>`
  // (konfiguracja w scripts/shots.config.json) → tworzy desktop.png i mobile.png.
  // Zrzuty z października 2026 (okładki i features) pochodzą z lokalnych buildów
  // gałęzi redesign każdego projektu, a `npm run shots` nadpisałby je starą
  // wersją live, dopóki te projekty nie zostaną wdrożone.
  //
  // Pola: slug (URL), category (filtr), tagline (krótki opis na karcie),
  // problem/solution/result (case study), stack[] + scope[] (zakres),
  // cover (miniatura/okładka), gallery[] (zdjęcia), liveUrl/githubUrl
  // (pusty tekst = brak przycisku), featured.
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
          src: "/projects/topauto-serwis/features/zakres-uslug.webp",
          alt: "Sekcja zakresu usług w ciemnym motywie: nagłówek „Dobra robota. Od podstaw.”, czarno-białe zdjęcie opon i numerowana lista czterech usług",
          caption:
            "Kierowca od razu widzi cztery usługi warsztatu, opisane bez obietnic, których właściciel nie potwierdził.",
          step: "challenge",
          device: "desktop",
        },
        {
          src: "/projects/topauto-serwis/features/motyw-jasny.webp",
          alt: "Pierwszy ekran w jasnym motywie: nagłówek „Mechanika. Wulkanizacja. Po sąsiedzku.”, przyciski Zadzwoń i Dojazd oraz pomarańczowy panel z adresem warsztatu",
          caption:
            "Przy pierwszej wizycie strona przejmuje jasny lub ciemny motyw z telefonu, a przełącznik w nagłówku pozwala go zmienić.",
          step: "solution",
          device: "desktop",
        },
        {
          src: "/projects/topauto-serwis/features/podstrona-uslugi.webp",
          alt: "Podstrona wymiany opon i wulkanizacji w okolicach Baćkowic: okruszki nawigacji, przyciski kontaktu, zdjęcie opon i początek listy „Co podać przez telefon”",
          caption:
            "Każda usługa ma własną podstronę pod lokalne wyszukiwanie, z listą informacji, które warto podać przez telefon.",
          step: "solution",
          device: "desktop",
        },
        {
          src: "/projects/topauto-serwis/features/telefon-kroki-wizyty.webp",
          alt: "Telefon w ciemnym motywie: trzy kroki umawiania serwisu na pomarańczowej osi i stały pasek Zadzwoń oraz Dojazd na dole ekranu",
          caption:
            "Zadzwoń i Dojazd są zawsze pod kciukiem, a wizytę umawia się w trzech krokach.",
          step: "solution",
          device: "mobile",
        },
        {
          src: "/projects/topauto-serwis/features/kontakt-i-mapa.webp",
          alt: "Sekcja kontaktu w jasnym motywie: status otwarcia, adres, godziny, e-mail i mapa okolicy z pinezką TopAuto Serwis oraz odnośnikiem Wyznacz trasę",
          caption:
            "Adres, godziny i mapa są w jednym miejscu, a nad nimi widać, czy warsztat jest teraz otwarty.",
          step: "result",
          device: "desktop",
        },
        {
          src: "/projects/topauto-serwis/features/telefon-mapa.webp",
          alt: "Telefon w jasnym motywie: mapa okolicy z pinezką warsztatu, przyciskami powiększania i odnośnikiem Wyznacz trasę",
          caption:
            "Kierowca jednym dotknięciem wyznacza trasę do warsztatu w małej miejscowości.",
          step: "result",
          device: "mobile",
        },
      ] as const,
      githubUrl: "",
      liveUrl: "https://topauto-serwis.vercel.app/",
      featured: false,
    },

    // ───────────── Projekty autorskie (demo) ─────────────
    // Nowy projekt z adresem live: dodaj wpis do scripts/shots.config.json,
    // uruchom `npm run shots <slug>`, dodaj obiekt poniżej (draft: true ukrywa
    // z biblioteki/teasera/sitemap do czasu uzupełnienia treści).
    // Projekt bez adresu live: zrzuty kopiujemy ręcznie, a do shots.config.json
    // trafia dopiero po wdrożeniu.

    {
      slug: "taxi-opatow",
      title: "Taxi Opatów - wizytówka lokalnej taksówki",
      category: "Strona firmowa",
      kind: "demo" as const,
      year: "2026",
      client: "Wersja demonstracyjna (dane przykładowe)",
      tagline:
        "Strona lokalnego taksówkarza, w której wszystko prowadzi do telefonu, a cennik wygląda jak paragon z taksometru.",
      problem:
        "Klient lokalnej taksówki nie chce instalować aplikacji ani wypełniać długich formularzy. Chce szybko sprawdzić, czy kierowca dojedzie do jego miejscowości i od czego zależy cena, a potem zadzwonić. Mały przewoźnik często ma tylko numer na wizytówce i profil w mediach społecznościowych, więc trudno go znaleźć w Google, a te same pytania o dworzec, lotnisko i ceny wracają przy każdym telefonie.",
      solution:
        "Zaprojektowałem stronę, której celem jest telefon. Numer stoi na dużej żółtej „tablicy” w pierwszym ekranie, a na telefonie przyciski Zadzwoń i SMS są zawsze w dolnym pasku. Usługi dzielą się na kursy „na teraz” i wyjazdy umawiane wcześniej, jak dworzec czy lotnisko. Zamawianie w trzech krokach jest narysowane jak trasa, obszar działania to schemat linii zamiast ciężkiej mapy, a cennik jak paragon z taksometru tłumaczy, od czego zależy cena, zamiast obiecywać stawki. Kursy planowane przyjmuje formularz z walidacją, ochroną przed spamem i limitem zapytań. Dane firmy są w jednym pliku konfiguracyjnym, a strona niczego nie zmyśla. Krój Barlow wywodzi się ze znaków drogowych, podświetlany kogut TAXI to render z Blendera, a strona ładuje minimum JavaScriptu i nie używa bibliotek animacji.",
      result:
        "Pasażer w kilka sekund sprawdza, czy taksówka do niego dojedzie i od czego zależy cena, a potem dzwoni jednym dotknięciem. Wyjazd na dworzec czy lotnisko zgłasza z wyprzedzeniem, bez czekania na połączenie. Dane strukturalne TaxiService i LocalBusiness przygotowują stronę do lokalnych wyników wyszukiwania. W portfolio strona działa w trybie demonstracyjnym, z przykładowymi danymi kierowcy, auta i stawek.",
      stack: [
        "Next.js",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Zod",
        "Blender",
      ],
      scope: [
        "Projekt UI/UX",
        "Pasek Zadzwoń i SMS",
        "Formularz kursów planowanych",
        "SEO lokalne",
        "Render 3D (Blender)",
      ],
      cover: "/projects/taxi-opatow/desktop.png",
      gallery: [
        "/projects/taxi-opatow/desktop.png",
        "/projects/taxi-opatow/mobile.png",
      ],
      features: [
        {
          src: "/projects/taxi-opatow/features/uslugi-teraz-i-planowane.webp",
          alt: "Sekcja usług: nagłówek „Taxi w Opatowie: w czym mogę pomóc?”, zdjęcie bagażnika przed dworcem i lista usług z grupy Na teraz",
          caption:
            "Klient od razu widzi, czy dzwoni po kurs na teraz, czy umawia wyjazd na dworzec lub lotnisko z wyprzedzeniem.",
          step: "challenge",
          device: "desktop",
        },
        {
          src: "/projects/taxi-opatow/features/zamawianie-jak-trasa.webp",
          alt: "Nocna sekcja „Jak zamówić przejazd?”: trzy kroki połączone przerywaną linią jak pas na jezdni, a pod nimi żółta tablica z numerem telefonu",
          caption:
            "Zamawianie wytłumaczone w trzech krokach czyta się jak trasę, która kończy się numerem telefonu.",
          step: "solution",
          device: "desktop",
        },
        {
          src: "/projects/taxi-opatow/features/obszar-dzialania-schemat.webp",
          alt: "Obszar działania jako schemat linii: pełna linia z najbliższymi miejscowościami, przerywana z dalszymi kierunkami, obok zdjęcie drogi wśród pól o zmierzchu",
          caption:
            "Mieszkaniec okolicznej wsi w kilka sekund sprawdza, czy taksówka do niego dojedzie, bez ładowania ciężkiej mapy.",
          step: "solution",
          device: "desktop",
        },
        {
          src: "/projects/taxi-opatow/features/cennik-paragon.webp",
          alt: "Cennik: trzy numerowane czynniki ceny obok paragonu z taksometru z przykładowymi stawkami oznaczonymi jako dane demonstracyjne",
          caption:
            "Cennik tłumaczy, od czego zależy cena, zamiast obiecywać stawki, których kierowca nie może zagwarantować.",
          step: "solution",
          device: "desktop",
        },
        {
          src: "/projects/taxi-opatow/features/kierowca-i-auto.webp",
          alt: "Sekcja O mnie na telefonie: przykładowe zdjęcie kierowcy przy kombi, mniejsze zdjęcie auta z kogutem, nagłówek „Lokalny kierowca, nie anonimowa aplikacja” i dolny pasek z numerem",
          caption:
            "Zdjęcie kierowcy i auta buduje zaufanie, którego nie da anonimowa aplikacja.",
          step: "result",
          device: "mobile",
        },
        {
          src: "/projects/taxi-opatow/features/formularz-kursu-planowanego.webp",
          alt: "Formularz „Zapytanie o kurs planowany” na telefonie z żółtą notką, że pilny przejazd zamawia się telefonicznie, oraz polami imienia, telefonu, daty i miejsca odbioru",
          caption:
            "Kurs planowany zgłasza się formularzem, a pilny przejazd nadal telefonem.",
          step: "result",
          device: "mobile",
        },
      ] as const,
      githubUrl: "",
      liveUrl: "",
      featured: false,
    },

    {
      slug: "restauracja-bella",
      title: "Bella Cucina - strona restauracji",
      category: "Strona firmowa",
      kind: "demo" as const,
      year: "2026",
      client: "Projekt autorski (demo)",
      tagline:
        "Strona trattorii złożona jak drukowana karta dań: menu online, spójna seria zdjęć i prośba o stolik bez dzwonienia.",
      problem:
        "Większość lokali gastronomicznych w Polsce działa wyłącznie na Instagramie i Facebooku. Menu krąży jako zdjęcie sprzed miesięcy, nie da się zarezerwować stolika online, a Google nie ma czego zaindeksować - lokal jest niewidoczny dla nowych gości.",
      solution:
        "Zaprojektowałem stronę jak drukowaną kartę dań trattorii: hero ze zdjęciem w łuku ceglanego sklepienia, menu z jednym zdjęciem na kategorię i cenami na kropkowanych liniach, a na telefonie przyklejony pasek kategorii. Wszystkie zdjęcia tworzą jedną serię w tym samym świetle świec, z lnem i cegłą, a uzupełnia ją martwa natura z makaronu wyrenderowana w Blenderze. Dojazd pokazuje własny plan Starego Miasta, a mapa Google wczytuje się dopiero po kliknięciu, więc strona nie zapisuje ciasteczek na starcie. Formularz rezerwacji podpowiada godziny zależne od dnia tygodnia.",
      result:
        "Gość w kilka sekund widzi menu z cenami i drogę do lokalu, a potem wysyła prośbę o stolik bez dzwonienia i przeszukiwania mediów społecznościowych. Lokal zyskuje spójny wizerunek, a karta dań trafia do Google jako tekst i dane strukturalne.",
      stack: [
        "Next.js",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Framer Motion",
        "Blender",
      ],
      scope: [
        "Projekt UI/UX",
        "Art direction zdjęć",
        "Menu online",
        "Formularz rezerwacji",
        "Render 3D (Blender)",
        "SEO lokalne",
      ],
      cover: "/projects/restauracja-bella/desktop.png",
      gallery: [
        "/projects/restauracja-bella/desktop.png",
        "/projects/restauracja-bella/mobile.png",
      ],
      features: [
        {
          src: "/projects/restauracja-bella/features/karta-dan.webp",
          alt: "Karta dań na komputerze: przyklejony pasek kategorii od Antipasti do Bevande, przystawki z cenami na kropkowanych liniach i zdjęcie burraty w łukowym kadrze",
          caption:
            "Menu, które krążyło jako zdjęcie kartki, jest teraz czytelną stroną z cenami, oznaczeniami diet i jednym zdjęciem na kategorię.",
          step: "challenge",
          device: "desktop",
        },
        {
          src: "/projects/restauracja-bella/features/karta-dan-telefon.webp",
          alt: "Karta dań na telefonie: pasek kategorii pod nagłówkiem, sekcja Pasta ze zdjęciem carbonary i cenami, na dole przyciski Zadzwoń i Zarezerwuj stolik",
          caption:
            "Kategorie zmienia się jednym dotknięciem, a telefon i rezerwacja są pod kciukiem.",
          step: "solution",
          device: "mobile",
        },
        {
          src: "/projects/restauracja-bella/features/galeria.webp",
          alt: "Galeria na ciemnym tle: sala pod ceglanym sklepieniem ze świecami, piec opalany drewnem i kuchnia z miedzianymi rondlami",
          caption:
            "Spójna seria zdjęć w jednym świetle pokazuje klimat lokalu, zanim gość przekroczy próg.",
          step: "solution",
          device: "desktop",
        },
        {
          src: "/projects/restauracja-bella/features/dojazd-plan-starego-miasta.webp",
          alt: "Sekcja dojazdu: adres przy Floriańskiej, przyciski Wyznacz trasę i Otwórz w Mapach Google, godziny z wyróżnionym dzisiejszym dniem i schematyczny plan Starego Miasta",
          caption:
            "Plan Starego Miasta od razu pokazuje drogę, a mapa Google wczytuje się dopiero na życzenie, bez ciasteczek na starcie.",
          step: "solution",
          device: "desktop",
        },
        {
          src: "/projects/restauracja-bella/features/rezerwacja-stolika.webp",
          alt: "Sekcja rezerwacji: numer telefonu i godziny otwarcia obok formularza z imieniem, telefonem, datą, godziną, liczbą osób, uwagami i zgodą",
          caption:
            "Formularz podpowiada godziny otwarcia w wybranym dniu i opisuje błędy przy polach, więc prośba o stolik zajmuje chwilę.",
          step: "result",
          device: "desktop",
        },
        {
          src: "/projects/restauracja-bella/features/rezerwacja-potwierdzenie-telefon.webp",
          alt: "Potwierdzenie na telefonie: podziękowanie z imieniem gościa, data zapisana słownie, godzina, liczba osób i numer, na który lokal oddzwoni",
          caption:
            "Gość widzi podsumowanie prośby i wie, że lokal oddzwoni, żeby ją potwierdzić.",
          step: "result",
          device: "mobile",
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
        "Strona studia fryzjerskiego w duchu drukowanej karty salonu: uczciwe metamorfozy, cennik w zakładkach i własna rezerwacja wizyt bez prowizji platform.",
      problem:
        "Salony fryzjerskie, barber shopy i gabinety beauty są uzależnione od platform typu Booksy, które pobierają prowizje i „pożyczają” im klientów. Brakuje własnego kanału, który buduje markę salonu i nie oddaje bazy klientów pośrednikowi.",
      solution:
        "Stronę zaprojektowałem jak drukowaną kartę salonu, ze zdjęciami w łuku okna kamienicy i jedną spójną serią zdjęć. Metamorfozy są uczciwe: przed i po to ta sama osoba w tym samym kadrze, a suwak porównania działa myszą, dotykiem i klawiaturą. Cennik w zakładkach pokazuje cenę i czas każdej usługi. Kreator rezerwacji prowadzi przez usługę, stylistkę, termin i dane. Pokazuje tylko wolne godziny wybranej stylistki, w których wizyta zmieści się przed zamknięciem, a na telefonie trzyma podsumowanie i przycisk „Dalej” w dolnym pasku. Klimat dopełnia render terakotowego grzebienia z mosiężnym kosmykiem, wykonany w Blenderze.",
      result:
        "Salon ma własny kanał rezerwacji i nie oddaje prowizji pośrednikom, a kontakt do klientek zostaje u niego. Klientka przed wizytą zna cenę, czas i efekt, którego może się spodziewać, a po rezerwacji dodaje termin do kalendarza.",
      stack: [
        "Next.js",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Zod",
        "Blender",
      ],
      scope: [
        "Projekt UI/UX",
        "Art direction zdjęć",
        "System rezerwacji",
        "Cennik usług",
        "Render 3D (Blender)",
        "SEO lokalne",
      ],
      cover: "/projects/salon-glow/desktop.png",
      gallery: [
        "/projects/salon-glow/desktop.png",
        "/projects/salon-glow/mobile.png",
      ],
      features: [
        {
          src: "/projects/salon-glow/features/rezerwacja-bez-posrednikow.webp",
          alt: "Sekcja rezerwacji Glow Studio: kącik z lnianymi zasłonami w łuku okna, nagłówek „Umów się bezpośrednio u nas”, cztery kroki rezerwacji i przyciski rezerwacji online oraz telefonu",
          caption:
            "Salon przyjmuje rezerwacje u siebie, więc nie oddaje prowizji platformom i zatrzymuje kontakt do klientek.",
          step: "challenge",
          device: "desktop",
        },
        {
          src: "/projects/salon-glow/features/metamorfozy-suwak-przed-po.webp",
          alt: "Suwak przed i po: ta sama klientka przy oknie, z lewej jednolity ciemny brąz, z prawej ciepły balayage, obok usługa, stylistka, czas wizyty i lista sześciu metamorfoz",
          caption:
            "Klientka przeciąga suwak i widzi efekt na tej samej osobie, a jednym kliknięciem przechodzi do rezerwacji takiej usługi.",
          step: "solution",
          device: "desktop",
        },
        {
          src: "/projects/salon-glow/features/karta-uslug.webp",
          alt: "Karta usług jak drukowany cennik: kategorie w zakładkach po lewej, po prawej koloryzacje z kropkową linią, ceną, czasem trwania i linkiem Umów",
          caption:
            "Cena i czas każdej usługi są widoczne przed wizytą, więc klientka nie musi dzwonić z pytaniem o koszt.",
          step: "solution",
          device: "desktop",
        },
        {
          src: "/projects/salon-glow/features/rezerwacja-wybor-terminu.webp",
          alt: "Trzeci krok rezerwacji: pasek dni, godziny pogrupowane na rano, po południu i wieczorem, zajęte godziny przekreślone, obok podsumowanie wizyty z ceną",
          caption:
            "Kreator pokazuje tylko godziny, w których wizyta zmieści się przed zamknięciem, a podsumowanie z ceną jest cały czas obok.",
          step: "solution",
          device: "desktop",
        },
        {
          src: "/projects/salon-glow/features/rezerwacja-telefon.webp",
          alt: "Wybór terminu na telefonie: przewijany pasek dni, siatka godzin i przyklejony dolny pasek z usługą, ceną i przyciskiem Dalej",
          caption:
            "Podsumowanie i „Dalej” zostają pod kciukiem, więc rezerwacja zajmuje kilka stuknięć.",
          step: "solution",
          device: "mobile",
        },
        {
          src: "/projects/salon-glow/features/potwierdzenie-rezerwacji.webp",
          alt: "Potwierdzenie na telefonie: nagłówek „Dziękujemy, mamy Twoją prośbę”, usługa, termin, stylistka i czas wizyty oraz przyciski Dodaj do kalendarza i Wróć na stronę główną",
          caption:
            "Klientka widzi podsumowanie wizyty i jednym kliknięciem dodaje ją do kalendarza.",
          step: "result",
          device: "mobile",
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
        "Sklep rzemieślniczej palarni kawy: ziarna 3D z Blendera, spójna seria zdjęć produktów, katalog z filtrami i koszyk przygotowany pod płatności online.",
      problem:
        "Małe, lokalne marki (palarnie kawy, rękodzieło, produkty regionalne) sprzedają głównie stacjonarnie lub przez wiadomości na social mediach. Brakuje im sklepu, który przyjmie zamówienie i płatność o każdej porze - tracą sprzedaż poza godzinami otwarcia.",
      solution:
        "Zbudowałem sklep, który od pierwszego ekranu wygląda jak palarnia, a nie szablon. W hero unoszą się palone ziarna wymodelowane w Blenderze i pokazane w lekkiej scenie 3D (three.js), która działa też na telefonie. Dziesięć kaw ma spójną serię zdjęć produktów, a przewijana historia „Od ziarna do filiżanki” i strona o palarni pokazują proces na zdjęciach. Katalog filtruje kawy po paleniu, rodzaju i mieleniu i zapisuje wybór w adresie strony. Karta produktu liczy cenę wariantu i oszczędność na paczce 1 kg, a koszyk pokazuje, ile brakuje do darmowej dostawy. Proces zamówienia jest przygotowany pod podpięcie płatności Stripe.",
      result:
        "Marka może sprzedawać online o każdej porze i docierać poza swój region, a zdjęcia i historia palarni budują zaufanie, którego mała marka potrzebuje w sieci. Podpowiedzi o oszczędności na większej paczce i progu darmowej dostawy zachęcają do większych zamówień.",
      stack: [
        "Next.js",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "three.js",
        "GSAP",
        "Blender",
      ],
      scope: [
        "Projekt UI/UX",
        "Model 3D (Blender)",
        "Art direction zdjęć",
        "Katalog i koszyk",
        "Zamówienie gotowe pod Stripe",
      ],
      cover: "/projects/sklep-craft-coffee/desktop.png",
      gallery: [
        "/projects/sklep-craft-coffee/desktop.png",
        "/projects/sklep-craft-coffee/mobile.png",
      ],
      features: [
        {
          src: "/projects/sklep-craft-coffee/features/hero-ziarna-3d.webp",
          alt: "Pierwszy ekran sklepu: szeryfowy nagłówek „Kawa, która ma charakter” i unoszące się trójwymiarowe palone ziarna kawy na ciemnobrązowym tle",
          caption:
            "Sklep od pierwszego ekranu wygląda jak palarnia, a lekki model ziaren z Blendera działa też na telefonie.",
          step: "challenge",
          device: "desktop",
        },
        {
          src: "/projects/sklep-craft-coffee/features/proces-od-ziarna.webp",
          alt: "Sekcja „Od ziarna do filiżanki” w trakcie przewijania w poziomie: krok 02 Palenie z renderem palonych ziaren i paskiem postępu kroków",
          caption:
            "Przewijana w poziomie historia procesu tłumaczy, za co klient płaci, zanim dotrze do cen.",
          step: "solution",
          device: "desktop",
        },
        {
          src: "/projects/sklep-craft-coffee/features/katalog-filtry.webp",
          alt: "Katalog z aktywnym filtrem jasnego palenia: cztery kawy w spójnych zdjęciach toreb, z nutami smakowymi, ocenami i ceną za 250 g",
          caption:
            "Filtry zapisują się w adresie strony, więc klient może wysłać znajomemu link do gotowego wyboru.",
          step: "solution",
          device: "desktop",
        },
        {
          src: "/projects/sklep-craft-coffee/features/karta-produktu.webp",
          alt: "Karta produktu Kenia AA: zdjęcie torby, wybrana gramatura 1 kg z informacją o 20% oszczędności, mielenie, ilość, cena łączna i przycisk Dodaj do koszyka",
          caption:
            "Karta produktu od razu liczy cenę wariantu i pokazuje oszczędność na paczce 1 kg, co zachęca do większego zamówienia.",
          step: "solution",
          device: "desktop",
        },
        {
          src: "/projects/sklep-craft-coffee/features/o-nas-palarnia.webp",
          alt: "Strona O nas: zdjęcie małego pieca do palenia kawy w ceglanej hali obok nagłówka „Pięć kilogramów i jeden upór” i historii palarni",
          caption:
            "Historia palarni opowiedziana zdjęciami buduje zaufanie, którego mała marka potrzebuje, żeby sprzedawać w sieci.",
          step: "result",
          device: "desktop",
        },
        {
          src: "/projects/sklep-craft-coffee/features/szuflada-koszyka-mobile.webp",
          alt: "Koszyk na telefonie z dwiema kawami, licznikami ilości, sumą 123 zł, paskiem postępu do darmowej dostawy i przyciskiem Przejdź do zamówienia",
          caption:
            "Koszyk podpowiada, ile brakuje do darmowej dostawy, i prowadzi prosto do zamówienia.",
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
        "Asystent AI dla małych firm: czat, który odpowiada klientom na żywo także po godzinach, i generator ofert z zapisem do PDF.",
      problem:
        "Małe firmy tracą zapytania poza godzinami pracy i marnują czas na powtarzalne pytania klientów (cennik, dostępność, zakres usług). Ręczne przygotowywanie ofert jest wolne i niespójne.",
      solution:
        "Zamiast ciemnego szablonu „AI” zaprojektowałem tożsamość z papieru i kobaltowego szkliwa: kobalt to głos asystenta, kolor gliny to głos klienta. Bohaterem pierwszego ekranu jest działający czat, który odpowiada na żywo na podstawie cennika i zasad firmy. Sekcja zastosowań pokazuje przykładowe rozmowy w salonie, warsztacie i gabinecie, a „Jak to działa” tłumaczy, skąd asystent bierze odpowiedzi i jak pilnowane są koszty. Generator ofert z kilku pól składa spersonalizowaną propozycję do skopiowania lub zapisania jako PDF, a cennik wygląda jak kartka przy kasie. Model językowy jest wymienny (Claude albo OpenAI), a klucz API zostaje na serwerze. Całość uzupełnia ceramiczna rzeźba dymków rozmowy wyrenderowana w Blenderze.",
      result:
        "Firma odpowiada klientom natychmiast o każdej porze i automatyzuje powtarzalną pracę. Pokazuje praktyczne zastosowanie AI w obsłudze klienta - mój główny wyróżnik jako Fullstack AI Developer.",
      stack: [
        "Next.js",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Vercel AI SDK",
        "Claude API",
        "OpenAI API",
        "Blender",
      ],
      scope: [
        "Projekt UI/UX",
        "Integracja LLM",
        "Chatbot Q&A",
        "Generator ofert",
        "Eksport do PDF",
        "Render 3D (Blender)",
      ],
      cover: "/projects/asystent-ai/desktop.png",
      gallery: [
        "/projects/asystent-ai/desktop.png",
        "/projects/asystent-ai/mobile.png",
      ],
      features: [
        {
          src: "/projects/asystent-ai/features/zastosowania-telefon.webp",
          alt: "Sekcja zastosowań na telefonie: salon fryzjerski po zamknięciu i rozmowa, w której klientka pyta o koloryzację i sobotni termin, a asystent odpowiada w kobaltowym dymku",
          caption:
            "Klient pyta po godzinach i od razu dostaje odpowiedź, a salon oddzwania rano.",
          step: "challenge",
          device: "mobile",
        },
        {
          src: "/projects/asystent-ai/features/czat-na-zywo.webp",
          alt: "Strona demo czatu: pytania o cenę asystenta i o odpowiedź na opinię 1★, odpowiedzi w kobaltowych dymkach, obok opis działania demo",
          caption:
            "Czat odpowiada na żywo na podstawie cennika i zasad firmy, bez zgadywania cen.",
          step: "solution",
          device: "desktop",
        },
        {
          src: "/projects/asystent-ai/features/generator-ofert.webp",
          alt: "Generator ofert: branża, zakres i budżet po lewej, po prawej oferta jak kartka dokumentu z pozycjami, sumą 5200 zł, datą ważności i przyciskami Kopiuj ofertę oraz Zapisz jako PDF",
          caption:
            "Kilka kliknięć wystarczy, żeby powstała spójna oferta do skopiowania albo zapisania jako PDF.",
          step: "solution",
          device: "desktop",
        },
        {
          src: "/projects/asystent-ai/features/jak-to-dziala.webp",
          alt: "Sekcja Jak to działa: wymiana z czatu z trzema dopiskami na marginesie (pytanie klienta, źródła wiedzy, odpowiedź asystenta) i lista zabezpieczeń kosztów oraz danych",
          caption:
            "Właściciel widzi, skąd asystent bierze odpowiedzi i jak pilnowane są koszty.",
          step: "solution",
          device: "desktop",
        },
        {
          src: "/projects/asystent-ai/features/czat-na-telefonie.webp",
          alt: "Czat na telefonie: przykładowa odpowiedź na opinię 1★, karta Gotowe do wklejenia i rząd gotowych pytań nad polem wiadomości",
          caption:
            "Na telefonie cała rozmowa mieści się na ekranie, a gotowe pytania są pod kciukiem.",
          step: "result",
          device: "mobile",
        },
        {
          src: "/projects/asystent-ai/features/cennik.webp",
          alt: "Cennik jak kartka przy kasie: cztery usługi z cenami od 1900 zł do 4500 zł, czasem wdrożenia i oznaczeniem najczęściej wybieranych na start",
          caption:
            "Cennik z czasem wdrożenia odpowiada na pytanie o koszt, a dokładną wycenę klient składa sam w generatorze.",
          step: "result",
          device: "desktop",
        },
      ] as const,
      githubUrl: "https://github.com/DawOrl/asystent-ai",
      liveUrl: "https://asystent-ai-three.vercel.app/",
      featured: true,
    },

    {
      slug: "worksmart",
      title: "WorkSmart - AI copilot szukania pracy",
      category: "Aplikacja & automatyzacja",
      kind: "demo" as const,
      year: "2026",
      client: "Projekt autorski (demo)",
      tagline:
        "Aplikacja, która zbiera oferty pracy z pięciu portali, ocenia ich dopasowanie do CV i pomaga zdecydować, gdzie aplikować dziś.",
      problem:
        "Szukanie pracy to codzienne przeglądanie kilku portali, te same ogłoszenia w różnych miejscach i zgadywanie, czy CV w ogóle przejdzie przez systemy rekrutacyjne (ATS). Kandydat traci czas na oferty, które do niego nie pasują, gubi się w wysłanych aplikacjach i nie wie, kiedy przypomnieć się firmie, która milczy.",
      solution:
        "Zbudowałem aplikację, która przejmuje najbardziej żmudną część szukania pracy. Scrapery Playwright według harmonogramu zbierają oferty z JustJoin.it, Pracuj.pl, NoFluffJobs, RocketJobs i OLX. Analiza CV pokazuje, jak czytają je systemy ATS, i wskazuje najważniejsze poprawki. Każda oferta dostaje wynik dopasowania od 0 do 100, a wymagania, które kandydat spełnia, są zakreślone jak markerem obok tych, których brakuje. Pulpit odpowiada na pytanie „gdzie aplikować dziś”, tracker pilnuje terminów rozmów i przypomina o firmach, które milczą, alerty e-mail informują o nowych dopasowaniach, a generator listów motywacyjnych (Claude API) pisze list pod konkretną ofertę. Backend działa na Express i Supabase (PostgreSQL z pgvector), a płatności obsługuje Stripe w złotówkach. Zamiast neonowej estetyki „AI” aplikacja ma tożsamość papieru, atramentu i zakreślacza, a dopasowanie symbolizuje render klucza i zamka z Blendera.",
      result:
        "Kandydat zaczyna dzień od krótkiej listy ofert ułożonych według dopasowania do swojego CV i widzi, dlaczego dana oferta pasuje albo nie. Aplikacje, terminy rozmów i przypomnienia ma w jednym miejscu, a list motywacyjny pod wybraną ofertę dostaje bez pisania od zera. Wersja demonstracyjna działa w całości w przeglądarce, na przykładowych danych i bez żadnych kluczy API.",
      stack: [
        "React",
        "Vite",
        "TypeScript",
        "Tailwind CSS",
        "Express",
        "Supabase",
        "Claude API",
        "Playwright",
      ],
      scope: [
        "Projekt UI/UX",
        "Scrapery ofert",
        "Analiza CV pod ATS",
        "Match score",
        "Tracker aplikacji",
        "Integracja LLM",
      ],
      cover: "/projects/worksmart/desktop.png",
      gallery: [
        "/projects/worksmart/desktop.png",
        "/projects/worksmart/mobile.png",
      ],
      features: [
        {
          src: "/projects/worksmart/features/analiza-cv.webp",
          alt: "Ekran Moje CV: czytelność dla systemów ATS 72 na 100 na linijce z kresek, lista poprawek oznaczonych wpływem oraz umiejętności, doświadczenie i wykształcenie odczytane z CV",
          caption:
            "Kandydat od razu widzi, co w CV umyka systemom rekrutacyjnym i od której poprawki zacząć.",
          step: "challenge",
          device: "desktop",
        },
        {
          src: "/projects/worksmart/features/pulpit-dopasowania.webp",
          alt: "Pulpit: ranking sześciu ofert z wynikiem dopasowania, firmą, miejscem, widełkami i portalem źródłowym, obok podsumowanie CV, aplikacji w toku i aktywnego alertu",
          caption:
            "Oferty z pięciu portali trafiają do jednej listy, ułożonej według dopasowania do konkretnego CV.",
          step: "solution",
          device: "desktop",
        },
        {
          src: "/projects/worksmart/features/oferta-z-dopasowaniem.webp",
          alt: "Oferta Mid Frontend Developer: pięć wymagań zakreślonych markerem jako obecne w CV, Figma podkreślona jako brakująca, obok wynik 89, rekomendacja i akcje trackera oraz listu",
          caption:
            "Dopasowanie da się sprawdzić, bo widać, które wymagania kandydat spełnia, a których mu brakuje.",
          step: "solution",
          device: "desktop",
        },
        {
          src: "/projects/worksmart/features/oferta-mobile.webp",
          alt: "Ta sama oferta na telefonie: wymagania z zakreśleniami i wynik dopasowania 89 z rekomendacją nad dolnym paskiem nawigacji",
          caption:
            "Na telefonie decyzja o aplikowaniu zajmuje kilka sekund, bez przewijania ogłoszenia.",
          step: "solution",
          device: "mobile",
        },
        {
          src: "/projects/worksmart/features/tracker-aplikacji.webp",
          alt: "Tracker aplikacji w czterech kolumnach: wysłane, rozmowa, oferta i odmowa, z terminem rozmowy i podpowiedzią przy aplikacji bez odpowiedzi od 11 dni",
          caption:
            "Wszystkie aplikacje są w jednym miejscu, a gdy firma milczy dłużej niż tydzień, aplikacja podpowiada, żeby się przypomnieć.",
          step: "result",
          device: "desktop",
        },
        {
          src: "/projects/worksmart/features/list-motywacyjny.webp",
          alt: "Generator listów: wybór oferty, stylu i języka po lewej, a po prawej gotowy list w stylu bezpośrednim złożony szeryfowym krojem, z przyciskami kopiowania i pobrania",
          caption:
            "List motywacyjny powstaje pod konkretną ofertę i od razu można go poprawić przed wysłaniem.",
          step: "result",
          device: "desktop",
        },
        {
          src: "/projects/worksmart/features/pulpit-mobile.webp",
          alt: "Pulpit na telefonie: powitanie, liczba ofert dopasowanych w co najmniej 80 procentach i ranking ofert z linijką dopasowania nad dolnym paskiem nawigacji",
          caption:
            "Codzienny przegląd nowych dopasowań wygodnie robi się jedną ręką.",
          step: "result",
          device: "mobile",
        },
      ] as const,
      githubUrl: "https://github.com/DawOrl/WorkSmart",
      liveUrl: "",
      featured: false,
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
        "Zaprojektowałem landing skupiony na jednej akcji: bezpłatnej wycenie. Styl „solar print” prowadzi przez stronę motyw łuku drogi słońca, a sekcje mają różne układy zamiast ciągu identycznych kart. Kalkulator zamienia miesięczny rachunek na paski „dziś” i „po montażu”, roczną oszczędność i dobraną moc instalacji, nad nim stoi izometryczny render domu z panelami z Blendera, a wpisana kwota sama trafia do formularza. Po drodze: wykres cen prądu, proces w 4 krokach na łuku słońca, montaże na domach z Małopolski zamiast stockowej farmy, opinie, sekcja dotacji i FAQ rozwiewające obiekcje.",
      result:
        "Każdy element strony pracuje na konwersję - odwiedzający z reklamy w kilkadziesiąt sekund rozumie korzyść, sprawdza oszczędności na własnym rachunku i zostawia kontakt. Wzorzec gotowy do adaptacji dla dowolnej usługi lokalnej rozliczanej z leadów.",
      stack: [
        "Next.js",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Framer Motion",
        "Blender",
      ],
      scope: [
        "Projekt UI/UX",
        "Kalkulator oszczędności",
        "Formularz leadowy",
        "Optymalizacja konwersji",
        "Render 3D (Blender)",
      ],
      cover: "/projects/eko-solar/desktop.png",
      gallery: [
        "/projects/eko-solar/desktop.png",
        "/projects/eko-solar/mobile.png",
      ],
      features: [
        {
          src: "/projects/eko-solar/features/ceny-pradu.webp",
          alt: "Sekcja o cenach prądu: wykres cen 1 kWh od 2020 do 2026 roku z naklejką +95% i trzy numerowane argumenty obok",
          caption:
            "Problem pokazany liczbami: klient widzi, o ile podrożał prąd, zanim przeczyta o panelach.",
          step: "challenge",
          device: "desktop",
        },
        {
          src: "/projects/eko-solar/features/kalkulator-oszczednosci.webp",
          alt: "Kalkulator na żółtym tle: suwak rachunku, paski rachunku dziś i po montażu, roczna oszczędność, dobrana moc i zwrot, nad kartą render domu z panelami pod łukiem słońca",
          caption:
            "Kalkulator zamienia miesięczny rachunek w roczną oszczędność i od razu prowadzi do wyceny.",
          step: "solution",
          device: "desktop",
        },
        {
          src: "/projects/eko-solar/features/proces-na-luku-slonca.webp",
          alt: "Cztery kroki współpracy: audyt, projekt i wycena, montaż oraz serwis, ułożone na kreskowanym łuku drogi słońca, z terminem przy każdym kroku",
          caption:
            "Cały proces od pierwszego telefonu do własnego prądu widać w jednym spojrzeniu, razem z terminami.",
          step: "solution",
          device: "desktop",
        },
        {
          src: "/projects/eko-solar/features/kalkulator-mobile.webp",
          alt: "Kalkulator na telefonie: render domu nad kartą, rachunek 550 zł na suwaku, paski przed i po montażu oraz oszczędność 5600 zł rocznie",
          caption:
            "Kalkulator obsługuje się kciukiem, a wynik jest czytelny bez przybliżania.",
          step: "solution",
          device: "mobile",
        },
        {
          src: "/projects/eko-solar/features/realizacje-w-okolicy.webp",
          alt: "Realizacje: duża karta domu z Wieliczki z panelami na dachu i trzy mniejsze karty z Niepołomic, Skawiny i Dobczyc z mocą instalacji i oszczędnością",
          caption:
            "Montaże z pobliskich miejscowości budują zaufanie lepiej niż ogólne hasła.",
          step: "result",
          device: "desktop",
        },
        {
          src: "/projects/eko-solar/features/formularz-wyceny-mobile.webp",
          alt: "Formularz wyceny na telefonie z imieniem, telefonem, kodem pocztowym, rachunkiem przeniesionym z kalkulatora, zgodą i żółtym przyciskiem wysyłki",
          caption:
            "Rachunek z kalkulatora sam trafia do formularza, więc zostawienie numeru trwa chwilę.",
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
        "Portfolio fotografki ślubnej złożone jak numer magazynu: jedna seria zdjęć w filmowej gradacji, galeria z filtrami, pakiety i zapytania o termin.",
      problem:
        "Fotografowie i inni twórcy pokazują prace głównie na Instagramie, gdzie portfolio miesza się z relacjami, a algorytm decyduje, co zobaczy klientka. Brakuje miejsca, które prezentuje dorobek w pełnej jakości, porządkuje ofertę i zbiera zapytania o terminy.",
      solution:
        "Zbudowałem stronę, w której bohaterem są zdjęcia, złożoną jak numer magazynu ślubnego. Wszystkie kadry przechodzą przez jedną filmową gradację w stylu negatywu Portra, więc wyglądają jak praca jednej autorki. Hero ma spis „W tym numerze”, który prowadzi prosto do filtrów galerii (śluby, portrety, rodzinne). Galeria w układzie masonry nadaje kadrom stałe numery jak na stykówce, a nowy podgląd zdjęć obsługuje klawiaturę, przeciąganie myszą i przesunięcie palcem, po czym wraca do oglądanej miniatury. Oferta to redakcyjny cennik z renderem kaset 35 mm z Blendera, a „Zapytaj o ten pakiet” od razu wybiera pakiet w formularzu.",
      result:
        "Klientka w minutę ogląda wyselekcjonowane portfolio, zna ceny pakietów i wysyła zapytanie z konkretną datą. Fotografka dostaje profesjonalną wizytówkę niezależną od algorytmów - wzorzec dla każdej branży kreatywnej.",
      stack: [
        "Next.js",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Framer Motion",
        "Blender",
      ],
      scope: [
        "Projekt UI/UX",
        "Gradacja serii zdjęć",
        "Galeria z filtrowaniem",
        "Pakiety i cennik",
        "Formularz zapytań",
        "Render 3D (Blender)",
      ],
      cover: "/projects/fotograf-lena/desktop.png",
      gallery: [
        "/projects/fotograf-lena/desktop.png",
        "/projects/fotograf-lena/mobile.png",
      ],
      features: [
        {
          src: "/projects/fotograf-lena/features/galeria-masonry.webp",
          alt: "Portfolio: filtry Wszystkie, Śluby, Portrety i Rodzinne z licznikami oraz trzy kolumny zdjęć w ciepłej, filmowej gradacji, ze środkową kolumną przesuniętą w dół",
          caption:
            "Kadry z różnych sesji wyglądają jak jedna seria jednej autorki, bo przechodzą przez tę samą filmową gradację.",
          step: "challenge",
          device: "desktop",
        },
        {
          src: "/projects/fotograf-lena/features/lightbox.webp",
          alt: "Jasny podgląd pełnoekranowy z kadrem pierwszego tańca w stodole, licznikiem 05 / 14, strzałkami po bokach i podpisem z numerem kadru i miejscem",
          caption:
            "Zdjęcia przegląda się strzałkami, klawiaturą albo gestem, a po zamknięciu strona wraca do oglądanej miniatury.",
          step: "solution",
          device: "desktop",
        },
        {
          src: "/projects/fotograf-lena/features/o-mnie.webp",
          alt: "Sekcja O mnie: kursywny nagłówek w sepii, portret fotografki z aparatem w łukowej masce, tekst z inicjałem, podpis i trzy liczby w linii",
          caption:
            "Historia fotografki opowiedziana jak w magazynie buduje zaufanie, zanim klientka zapyta o termin.",
          step: "solution",
          device: "desktop",
        },
        {
          src: "/projects/fotograf-lena/features/oferta-cennik.webp",
          alt: "Sekcja oferty: nagłówek „Trzy pakiety, zero gwiazdek w cenniku”, render kaset filmu 35 mm z wysuniętą kliszą i cennik z cienkimi liniami oraz cenami „od”",
          caption:
            "Ceny „od” są podane wprost, a wybór pakietu jednym kliknięciem trafia do formularza.",
          step: "solution",
          device: "desktop",
        },
        {
          src: "/projects/fotograf-lena/features/lightbox-mobile.webp",
          alt: "Podgląd zdjęcia na telefonie: kadr zapinania guzików sukni ślubnej, licznik 03 / 14, przycisk Zamknij i strzałki przy podpisie",
          caption:
            "Kadry przegląda się przesunięciem palca, a duże przyciski są pod kciukiem.",
          step: "solution",
          device: "mobile",
        },
        {
          src: "/projects/fotograf-lena/features/formularz-mobile.webp",
          alt: "Formularz zapytania na telefonie z imieniem, adresem e-mail, wybranym pakietem Ślub, datą 19.06.2027, wiadomością i przyciskiem Wyślij zapytanie",
          caption:
            "Zapytanie zajmuje minutę: pakiet jest już wybrany, a błędy mówią, co poprawić.",
          step: "result",
          device: "mobile",
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
        "Interaktywny wizard: 6 pytań, makieta z Blendera, która rośnie z każdą odpowiedzią, i kosztorys na żywo zakończony widełkami cenowymi.",
      problem:
        "Pierwsze pytanie każdego klienta brzmi „ile to kosztuje?”, a odpowiedź wymaga maili, telefonów i ręcznego liczenia. Część zainteresowanych odpada, zanim dostanie jakąkolwiek liczbę, a usługodawca traci czas na wyceny, z których nic nie wynika.",
      solution:
        "Zbudowałem kalkulator w estetyce rysunku technicznego: jedno pytanie na ekran (typ strony, podstrony, design, treści, funkcje, termin), a obok pytań rośnie makieta placu budowy złożona z 18 warstw wyrenderowanych w Blenderze. Każda odpowiedź dokłada element makiety, a najechanie na opcję pokazuje jej szkic, zanim klient ją wybierze. Kosztorys dopisuje pozycje na żywo, suma nalicza się jak na taksometrze, a numer w kółku przy pozycji wskazuje ten sam element na makiecie, jak na rysunku złożeniowym. Kalkulator obsłużysz z klawiatury, a na telefonie kosztorys czeka w dolnej szufladzie. Wynik to arkusz z widełkami, czasem realizacji, założeniami i przyciskiem „Zmień” przy każdym kroku. Bez żargonu, bez podawania maila, bez zobowiązań.",
      result:
        "Klient dostaje orientacyjną cenę w 60 sekund o dowolnej porze, a do rozmowy trafia już z realnymi oczekiwaniami. Wzorzec automatyzacji pierwszego kontaktu do wpięcia w stronę dowolnej firmy usługowej.",
      stack: [
        "Next.js",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Framer Motion",
        "Blender",
      ],
      scope: [
        "Projekt UI/UX",
        "Wizard 6 kroków",
        "Silnik wyceny",
        "Kosztorys pozycja po pozycji",
        "Makieta 3D (Blender)",
      ],
      cover: "/projects/kalkulator-wyceny/desktop.png",
      gallery: [
        "/projects/kalkulator-wyceny/desktop.png",
        "/projects/kalkulator-wyceny/mobile.png",
      ],
      features: [
        {
          src: "/projects/kalkulator-wyceny/features/pierwsze-pytanie.webp",
          alt: "Pierwszy krok kalkulatora: pytanie „Czego potrzebujesz?” z pięcioma typami strony i cenami od 990 zł, obok pusta mata makiety i pusty kosztorys wstępny",
          caption:
            "Klient nie musi znać cennika, bo zaczyna od prostego pytania, a pusty kosztorys czeka na jego pierwszą decyzję.",
          step: "challenge",
          device: "desktop",
        },
        {
          src: "/projects/kalkulator-wyceny/features/podglad-opcji.webp",
          alt: "Krok „Ile podstron?”: kursor nad opcją 6-10 podstron, a na makiecie obok budynku pojawiają się szare, półprzezroczyste skrzydła jako podgląd tej opcji",
          caption:
            "Zanim klient kliknie, widzi szkic tego, co dana opcja dobuduje do jego strony.",
          step: "solution",
          device: "desktop",
        },
        {
          src: "/projects/kalkulator-wyceny/features/kosztorys-na-zywo.webp",
          alt: "Krok funkcji dodatkowych z trzema zaznaczonymi opcjami, obok makieta z budynkiem, skrzydłami i dodatkami oraz kosztorys z siedmioma numerowanymi pozycjami i sumą 8 358 zł netto",
          caption:
            "Każda odpowiedź dopisuje pozycję do kosztorysu i element do makiety, a numer w kółku łączy jedno z drugim.",
          step: "solution",
          device: "desktop",
        },
        {
          src: "/projects/kalkulator-wyceny/features/krok-z-makieta-mobile.webp",
          alt: "Telefon: krok „Treści na stronę” z makietą nad pytaniem i dolnym paskiem kosztorysu z sumą 7 350 zł",
          caption:
            "Makieta rośnie nad pytaniem, a pełny kosztorys czeka w dolnej szufladzie.",
          step: "solution",
          device: "mobile",
        },
        {
          src: "/projects/kalkulator-wyceny/features/wynik-wyceny.webp",
          alt: "Arkusz wyniku: makieta całego projektu z żurawiem i pieczątką „Wycena wstępna”, przedział od 9 400 do 12 550 zł netto, czas realizacji, suma pozycji i przycisk wysyłki szczegółowej wyceny",
          caption:
            "Klient dostaje widełki, czas realizacji i jeden jasny następny krok zamiast maila z pytaniem o cenę.",
          step: "result",
          device: "desktop",
        },
        {
          src: "/projects/kalkulator-wyceny/features/wynik-mobile.webp",
          alt: "Wynik na telefonie: tabliczka dokumentu, makieta z ośmioma odnośnikami, przedział od 9 400 do 12 550 zł, czas realizacji i suma pozycji",
          caption:
            "Tę samą wycenę na telefonie można wysłać wspólnikowi jako link.",
          step: "result",
          device: "mobile",
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
