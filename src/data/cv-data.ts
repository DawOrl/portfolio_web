export const cvData = {
  personal: {
    name: "Dawid Orłowski",
    role: "Fullstack AI Developer",
    email: "dawid.orlowski2002@gmail.com",
    phone: "739 258 786",
    location: "Kraków",
    // Przekaz sprzedażowy (hero)
    headline: "Tworzę nowoczesne strony internetowe dla firm",
    subheadline:
      "Projektuję i koduję szybkie, estetyczne strony i landing page, które budują wizerunek Twojej firmy i przyciągają klientów. Bez gotowych szablonów — wszystko pod Twoje potrzeby.",
    availability: "Dostępny na nowe projekty",
    about:
      "Jestem osobą po studiach informatycznych. Na co dzień pracuję jako Fullstack AI Developer — tworzę aplikacje webowe oparte o sztuczną inteligencję i automatyzacje. Wcześniej, jako Email Marketing Specialist, prowadziłem kampanie i poznałem od podszewki to, co realnie sprzedaje online. Strony internetowe łączą obie te perspektywy: czysty, wydajny kod programisty i spojrzenie marketingowca na to, co przyciąga klienta.",
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
        "Profesjonalna wizytówka Twojej działalności w sieci — buduje zaufanie i prezentuje ofertę.",
      features: ["Strona wizytówka", "Strona usługowa", "Sekcja bloga", "Edycja treści"],
    },
    {
      id: "landing-page",
      icon: "Target",
      title: "Landing page",
      description:
        "Strony jednocelowe pod kampanie reklamowe, nastawione na konkretną akcję i wysoką konwersję.",
      features: ["Pod kampanie Ads", "Formularze leadowe", "A/B testy", "Analityka"],
    },
    {
      id: "sklepy",
      icon: "ShoppingBag",
      title: "Sklepy internetowe",
      description:
        "Lekkie sklepy i strony produktowe gotowe do sprzedaży, z wygodnym zarządzaniem.",
      features: ["Katalog produktów", "Koszyk i płatności", "Panel zarządzania", "Integracje"],
    },
    {
      id: "aplikacje",
      icon: "Smartphone",
      title: "Aplikacje & automatyzacje",
      description:
        "Aplikacje webowe i mobilne oraz narzędzia automatyzujące powtarzalne zadania w firmie.",
      features: ["Aplikacje webowe", "Aplikacje mobilne", "Integracje API", "Automatyzacje"],
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
        "Programuję stronę w nowoczesnych technologiach — responsywną, szybką i zoptymalizowaną pod wyszukiwarki, z testami na każdym etapie.",
    },
    {
      step: "04",
      title: "Publikacja i wsparcie",
      description:
        "Publikuję stronę, wdrażam analitykę i przekazuję dostęp. Zostaję do dyspozycji przy aktualizacjach i rozwoju projektu.",
    },
  ],

  // Cennik / pakiety (orientacyjne — finalna wycena indywidualna)
  pricing: [
    {
      name: "Start",
      tagline: "Wizytówka one-page",
      price: "od 990 zł",
      description: "Idealny dla nowych działalności, które chcą szybko zaistnieć w sieci.",
      features: [
        "Strona one-page",
        "Pełna responsywność (RWD)",
        "Formularz kontaktowy",
        "Podstawowa optymalizacja SEO",
        "Realizacja do 7 dni",
      ],
      featured: false,
      cta: "Wybieram Start",
    },
    {
      name: "Biznes",
      tagline: "Rozbudowana strona firmowa",
      price: "od 2 490 zł",
      description: "Kompletna strona, która sprzedaje i buduje profesjonalny wizerunek.",
      features: [
        "Do 6 podstron",
        "Indywidualny projekt UI/UX",
        "Animacje i mikrointerakcje",
        "Samodzielna edycja treści (CMS)",
        "Zaawansowane SEO + Google Analytics",
        "30 dni wsparcia po wdrożeniu",
      ],
      featured: true,
      cta: "Wybieram Biznes",
    },
    {
      name: "Indywidualny",
      tagline: "Sklep / aplikacja / integracje",
      price: "wycena indywidualna",
      description: "Złożone projekty: e-commerce, panele, integracje i aplikacje.",
      features: [
        "Sklep internetowy / e-commerce",
        "Integracje z systemami i API",
        "Panel administracyjny",
        "Automatyzacje procesów",
        "Indywidualny zakres wsparcia",
      ],
      featured: false,
      cta: "Porozmawiajmy",
    },
  ],

  // Opinie — TODO: zastąp prawdziwymi opiniami klientów (na razie przykładowe)
  testimonials: [
    {
      name: "Klient — branża motoryzacyjna",
      role: "Właściciel warsztatu",
      quote:
        "Strona powstała szybko i dokładnie tak, jak ustaliliśmy. Klienci częściej dzwonią po obejrzeniu oferty online, a całość wygląda naprawdę profesjonalnie.",
      rating: 5,
    },
    {
      name: "Klient — usługi lokalne",
      role: "Mała działalność",
      quote:
        "Dawid dobrze doradził, co faktycznie jest mi potrzebne, zamiast sprzedawać niepotrzebne dodatki. Kontakt bezproblemowy, terminy dotrzymane.",
      rating: 5,
    },
    {
      name: "Klient — landing kampanijny",
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
      a: "Cena zależy od zakresu — prosta wizytówka zaczyna się od 990 zł, a rozbudowana strona firmowa od 2 490 zł. Wycenę zawsze przygotowuję bezpłatnie i indywidualnie po krótkiej rozmowie o Twoich potrzebach.",
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
      a: "W pakiecie Biznes wdrażam prosty system zarządzania treścią (CMS), dzięki któremu samodzielnie zmienisz teksty czy zdjęcia. Przy prostszych stronach edycję mogę przejąć w ramach wsparcia.",
    },
    {
      q: "Co z hostingiem i domeną?",
      a: "Doradzę i pomogę skonfigurować hosting oraz domenę. Strony stawiam na nowoczesnej, szybkiej infrastrukturze (np. Vercel) — często w darmowym lub bardzo tanim planie.",
    },
    {
      q: "Czy kod strony należy do mnie?",
      a: "Tak. Po rozliczeniu projektu przekazuję pełen dostęp i kod — strona jest w 100% Twoją własnością, bez uzależnienia od jednego dostawcy.",
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
      slug: "zbychu-garage",
      title: "Zbychu Garage — strona warsztatu",
      category: "Strona firmowa",
      kind: "demo" as const,
      year: "2025",
      client: "Warsztat samochodowy",
      tagline:
        "Nowoczesna wizytówka warsztatu z czytelną ofertą usług i szybkim kontaktem.",
      problem:
        "Lokalny warsztat nie miał profesjonalnej strony — klienci trafiali głównie z polecenia, a oferta i zakres usług nie były nigdzie jasno przedstawione.",
      solution:
        "Zaprojektowałem i zakodowałem od zera jednostronicową witrynę: sekcja usług, proces obsługi krok po kroku, opinie i wyróżniki budujące zaufanie oraz wyeksponowany kontakt (telefon zawsze pod ręką). Całość zoptymalizowana pod urządzenia mobilne i szybkość ładowania.",
      result:
        "Czytelna prezentacja usług i znacznie łatwiejszy kontakt — klient ma teraz profesjonalną wizytówkę, którą może podać w reklamie i wizytówkach.",
      stack: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
      scope: ["Projekt UI/UX", "Kodowanie", "Optymalizacja SEO", "Wdrożenie"],
      cover: "/projects/zbychu-garage/desktop.png",
      gallery: [
        "/projects/zbychu-garage/desktop.png",
        "/projects/zbychu-garage/mobile.png",
      ],
      githubUrl: "https://github.com/DawOrl/mechanic-website",
      liveUrl: "https://mechanic-website-rose.vercel.app/",
      featured: false,
    },

    // ───────────── Projekty autorskie (demo) — live na Vercelu ─────────────
    // Nowy projekt: dodaj wpis do scripts/shots.config.json, uruchom
    // `npm run shots <slug>`, dodaj obiekt poniżej (draft: true ukrywa
    // z biblioteki/teasera/sitemap do czasu uzupełnienia treści).

    {
      slug: "restauracja-bella",
      title: "Bella Cucina — strona restauracji",
      category: "Strona firmowa",
      kind: "demo" as const,
      year: "2026",
      client: "Projekt autorski (demo)",
      tagline:
        "Strona restauracji z menu online, galerią dań i rezerwacją stolika — bez konieczności dzwonienia.",
      problem:
        "Większość lokali gastronomicznych w Polsce działa wyłącznie na Instagramie i Facebooku. Menu krąży jako zdjęcie sprzed miesięcy, nie da się zarezerwować stolika online, a Google nie ma czego zaindeksować — lokal jest niewidoczny dla nowych gości.",
      solution:
        "Zaprojektowałem stronę, która sprzedaje atmosferę lokalu: apetyczna sekcja hero, menu online łatwe do aktualizacji, galeria dań, godziny otwarcia, mapa dojazdu i prosty formularz rezerwacji stolika. Mobile-first, bo gości najczęściej szukają w telefonie.",
      result:
        "Gość w kilka sekund widzi menu, lokalizację i rezerwuje stolik — bez telefonu i przeszukiwania social mediów. Lokal zyskuje profesjonalny wizerunek i widoczność w Google.",
      stack: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
      scope: ["Projekt UI/UX", "Menu online", "Formularz rezerwacji", "SEO lokalne"],
      cover: "/projects/restauracja-bella/desktop.png",
      gallery: [
        "/projects/restauracja-bella/desktop.png",
        "/projects/restauracja-bella/mobile.png",
      ],
      githubUrl: "https://github.com/DawOrl/restauracja-bella",
      liveUrl: "https://restauracja-bella.vercel.app/",
      featured: false,
    },

    {
      slug: "salon-glow",
      title: "Glow Studio — rezerwacja wizyt online",
      category: "Strona usługowa",
      kind: "demo" as const,
      year: "2026",
      client: "Projekt autorski (demo)",
      tagline:
        "Strona salonu beauty/barber z cennikiem usług i rezerwacją wizyt online — niezależna od prowizji platform.",
      problem:
        "Salony fryzjerskie, barber shopy i gabinety beauty są uzależnione od platform typu Booksy, które pobierają prowizje i „pożyczają” im klientów. Brakuje własnego kanału, który buduje markę salonu i nie oddaje bazy klientów pośrednikowi.",
      solution:
        "Stworzyłem stronę z pełnym cennikiem usług, prezentacją zespołu i portfolio realizacji oraz własnym systemem rezerwacji wizyt (wybór usługi, terminu i pracownika). Klient rezerwuje bezpośrednio u salonu — bez prowizji i przekierowań do zewnętrznych aplikacji.",
      result:
        "Salon ma własny, profesjonalny kanał rezerwacji i przestaje oddawać prowizję pośrednikom. Marka buduje rozpoznawalność, a baza klientów należy do salonu.",
      stack: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
      scope: ["Projekt UI/UX", "System rezerwacji", "Cennik usług", "SEO lokalne"],
      cover: "/projects/salon-glow/desktop.png",
      gallery: [
        "/projects/salon-glow/desktop.png",
        "/projects/salon-glow/mobile.png",
      ],
      githubUrl: "https://github.com/DawOrl/salon-glow",
      liveUrl: "https://salon-glow-gamma.vercel.app/",
      featured: false,
    },

    {
      slug: "sklep-craft-coffee",
      title: "Craft Coffee — sklep internetowy",
      category: "Sklep internetowy",
      kind: "demo" as const,
      year: "2026",
      client: "Projekt autorski (demo)",
      tagline:
        "Sklep e-commerce lokalnej palarni kawy: katalog produktów, koszyk i płatności online.",
      problem:
        "Małe, lokalne marki (palarnie kawy, rękodzieło, produkty regionalne) sprzedają głównie stacjonarnie lub przez wiadomości na social mediach. Brakuje im sklepu, który przyjmie zamówienie i płatność o każdej porze — tracą sprzedaż poza godzinami otwarcia.",
      solution:
        "Zbudowałem lekki sklep internetowy: estetyczny katalog produktów z filtrowaniem, koszyk, proces zamówienia i integracja z płatnościami online. Wydajny, szybki i prosty w zarządzaniu asortymentem.",
      result:
        "Marka sprzedaje online 24/7, przyjmuje płatności automatycznie i dociera poza swój region. Klient zarządza produktami samodzielnie, bez programisty przy każdej zmianie.",
      stack: ["Next.js", "React", "Tailwind CSS", "Stripe"],
      scope: ["Projekt UI/UX", "Katalog i koszyk", "Płatności online", "Panel zarządzania"],
      cover: "/projects/sklep-craft-coffee/desktop.png",
      gallery: [
        "/projects/sklep-craft-coffee/desktop.png",
        "/projects/sklep-craft-coffee/mobile.png",
      ],
      githubUrl: "https://github.com/DawOrl/sklep-craft-coffee",
      liveUrl: "https://sklep-craft-coffee.vercel.app/",
      featured: true,
    },

    {
      slug: "asystent-ai",
      title: "Asystent AI dla firmy — chatbot i generator ofert",
      category: "Aplikacja & AI",
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
        "Firma odpowiada klientom natychmiast o każdej porze i automatyzuje powtarzalną pracę. Pokazuje praktyczne zastosowanie AI w obsłudze klienta — mój główny wyróżnik jako Fullstack AI Developer.",
      stack: ["Next.js", "React", "TypeScript", "OpenAI API", "Vercel"],
      scope: ["Projekt UI/UX", "Integracja LLM", "Chatbot Q&A", "Generator ofert"],
      cover: "/projects/asystent-ai/desktop.png",
      gallery: [
        "/projects/asystent-ai/desktop.png",
        "/projects/asystent-ai/mobile.png",
      ],
      githubUrl: "https://github.com/DawOrl/asystent-ai",
      liveUrl: "https://asystent-ai-three.vercel.app/",
      featured: true,
    },

    {
      slug: "eko-solar",
      title: "EkoSolar — landing fotowoltaiki z wyceną",
      category: "Landing page",
      kind: "demo" as const,
      year: "2026",
      client: "Projekt autorski (demo)",
      tagline:
        "Landing pod kampanie reklamowe z kalkulatorem oszczędności i formularzem wyceny — jedna strona, jeden cel: lead.",
      problem:
        "Firmy usługowe (fotowoltaika, ocieplenia, instalacje) płacą za reklamy Google i Facebook, a ruch kierują na ogólną stronę firmową, która nie prowadzi do żadnej akcji. Klient klika, błądzi i wychodzi — budżet reklamowy się pali, a zapytań brak.",
      solution:
        "Zaprojektowałem landing skupiony na jednej akcji: bezpłatnej wycenie. Interaktywny kalkulator oszczędności (suwak rachunku → dobrana moc instalacji i roczne oszczędności) angażuje i prowadzi prosto do formularza. Po drodze: liczby budujące zaufanie, proces w 4 krokach, realizacje z okolicy, opinie z Google, sekcja dotacji i FAQ rozwiewające obiekcje.",
      result:
        "Każdy element strony pracuje na konwersję — odwiedzający z reklamy w kilkadziesiąt sekund rozumie korzyść, sprawdza oszczędności na własnym rachunku i zostawia kontakt. Wzorzec gotowy do adaptacji dla dowolnej usługi lokalnej rozliczanej z leadów.",
      stack: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
      scope: ["Projekt UI/UX", "Kalkulator oszczędności", "Formularz leadowy", "Optymalizacja konwersji"],
      cover: "/projects/eko-solar/desktop.png",
      gallery: [
        "/projects/eko-solar/desktop.png",
        "/projects/eko-solar/mobile.png",
      ],
      githubUrl: "https://github.com/DawOrl/eko-solar",
      liveUrl: "https://eko-solar-nu.vercel.app/",
      featured: true,
    },

    {
      slug: "fotograf-lena",
      title: "Lena Czarnecka — portfolio fotografki",
      category: "Portfolio",
      kind: "demo" as const,
      year: "2026",
      client: "Projekt autorski (demo)",
      tagline:
        "Jasne, magazynowe portfolio fotografki ślubnej: galeria z filtrowaniem, pakiety i zapytania o terminy.",
      problem:
        "Fotografowie i inni twórcy pokazują prace głównie na Instagramie, gdzie portfolio miesza się z relacjami, a algorytm decyduje, co zobaczy klientka. Brakuje miejsca, które prezentuje dorobek w pełnej jakości, porządkuje ofertę i zbiera zapytania o terminy.",
      solution:
        "Zbudowałem stronę, w której bohaterem są zdjęcia: minimalistyczny, jasny layout z serifową typografią, galeria z filtrowaniem kategorii (śluby, portrety, rodzinne), czytelne pakiety cenowe i formularz zapytania z datą wydarzenia. Estetyka „editorial” zamiast szablonu — strona ma wyglądać jak rozkładówka magazynu.",
      result:
        "Klientka w minutę ogląda wyselekcjonowane portfolio, zna ceny pakietów i wysyła zapytanie z konkretną datą. Fotografka dostaje profesjonalną wizytówkę niezależną od algorytmów — wzorzec dla każdej branży kreatywnej.",
      stack: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
      scope: ["Projekt UI/UX", "Galeria z filtrowaniem", "Pakiety i cennik", "Formularz zapytań"],
      cover: "/projects/fotograf-lena/desktop.png",
      gallery: [
        "/projects/fotograf-lena/desktop.png",
        "/projects/fotograf-lena/mobile.png",
      ],
      githubUrl: "https://github.com/DawOrl/fotograf-lena",
      liveUrl: "https://fotograf-lena.vercel.app/",
      featured: false,
    },

    {
      slug: "kalkulator-wyceny",
      title: "Kalkulator wyceny strony www — wizard",
      category: "Aplikacja & automatyzacja",
      kind: "demo" as const,
      year: "2026",
      client: "Projekt autorski (demo)",
      tagline:
        "Interaktywny wizard: 6 pytań i klient widzi widełki cenowe z rozpisem kosztów — automatyzacja pierwszego kontaktu.",
      problem:
        "Pierwsze pytanie każdego klienta brzmi „ile to kosztuje?”, a odpowiedź wymaga maili, telefonów i ręcznego liczenia. Część zainteresowanych odpada, zanim dostanie jakąkolwiek liczbę, a usługodawca traci czas na wyceny, z których nic nie wynika.",
      solution:
        "Zbudowałem konwersacyjny kalkulator: jedno pytanie na ekran (typ strony, podstrony, design, treści, funkcje, termin), płynne przejścia między krokami i wynik od razu — widełki cenowe, szacowany czas realizacji i kosztorys pozycja po pozycji. Bez żargonu, bez podawania maila, bez zobowiązań.",
      result:
        "Klient dostaje orientacyjną cenę w 60 sekund o dowolnej porze, a do rozmowy trafia już z realnymi oczekiwaniami. Wzorzec automatyzacji pierwszego kontaktu do wpięcia w stronę dowolnej firmy usługowej.",
      stack: ["Next.js", "React", "TypeScript", "Framer Motion"],
      scope: ["Projekt UI/UX", "Wizard 6 kroków", "Silnik wyceny", "Kosztorys pozycja po pozycji"],
      cover: "/projects/kalkulator-wyceny/desktop.png",
      gallery: [
        "/projects/kalkulator-wyceny/desktop.png",
        "/projects/kalkulator-wyceny/mobile.png",
      ],
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
      "Tworzenie aplikacji full-stack opartych o sztuczną inteligencję — integracje z modelami językowymi (LLM), automatyzacje procesów i narzędzia wewnętrzne. Łączę warstwę front-end (React / Next.js) z logiką back-endową i wdrożeniami w chmurze.",
  },
  education: {
    school: "Politechnika Krakowska im. Tadeusza Kościuszki",
    degree: "Informatyki w inżynierii komputerowej - brak obrony pracy dyplomowej",
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
