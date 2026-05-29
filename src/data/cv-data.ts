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

  // Realizacje (przeniesione z komponentu ProjectGallery — jedno źródło prawdy)
  projects: [
    {
      id: 1,
      title: "Strona Mechanika Samochodowego",
      category: "Web",
      tech: "React, Next.js, Tailwind CSS",
      desc: "Strona zbudowana przy pomocy React, Next.js oraz Tailwind CSS, z dynamicznym ładowaniem treści i animacjami. Zoptymalizowana pod kątem SEO i szybkości ładowania.",
      result: "Czytelna prezentacja usług i szybszy kontakt z warsztatem.",
      mainImage: "/mechanic-main.png",
      gallery: [
        "/mechanic-photo1.png",
        "/mechanic-photo2.png",
        "/mechanic-photo3.png",
        "/mechanic-photo4.png",
        "/mechanic-photo5.png",
      ],
      githubUrl: "https://github.com/DawOrl/mechanic-website",
      liveUrl: "https://mechanic-website-rose.vercel.app/",
    },
    {
      id: 2,
      title: "System Automatyzacji E-mail",
      category: "Marketing",
      tech: "HTML/CSS, JS, Iterable",
      desc: "Zestaw responsywnych szablonów e-mail zoptymalizowanych pod kątem Dark Mode dla klientów pocztowych. Podpięty pod zaawansowane testy A/B.",
      result: "Spójne szablony gotowe do kampanii i testów A/B.",
      mainImage: "/twoj-screen-glowny-2.jpg",
      gallery: ["/detal-4.jpg", "/detal-5.jpg"],
      githubUrl: "https://github.com/twoj-profil",
      liveUrl: "https://twoj-projekt.vercel.app",
    },
    {
      id: 3,
      title: "Infrastruktura K8s",
      category: "DevOps",
      tech: "Kubernetes, Docker, Linux",
      desc: "Sklastrowane środowisko do wdrażania aplikacji mikroserwisowych, z automatycznym load-balancingiem i monitoringiem logów.",
      result: "Niezawodne, skalowalne środowisko pod aplikacje.",
      mainImage: "/twoj-screen-glowny-3.jpg",
      gallery: ["/detal-6.jpg", "/detal-7.jpg"],
      githubUrl: "https://github.com/twoj-profil",
      liveUrl: "https://twoj-projekt.vercel.app",
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
