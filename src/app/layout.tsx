import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { cvData } from "@/data/cv-data";
import { SITE_URL } from "@/lib/site";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Dawid Orłowski | Tworzę nowoczesne strony internetowe dla firm",
    template: "%s | Dawid Orłowski",
  },
  description:
    "Projektuję i koduję szybkie, nowoczesne strony i landing page dla firm oraz działalności. Next.js, React, optymalizacja SEO i pełna responsywność. Kraków i zdalnie w całej Polsce.",
  keywords: [
    "strony internetowe dla firm",
    "tworzenie stron Kraków",
    "landing page",
    "Next.js",
    "React",
    "freelancer web developer",
    "Fullstack AI Developer",
  ],
  authors: [{ name: cvData.personal.name }],
  creator: cvData.personal.name,
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    title: "Dawid Orłowski | Strony internetowe dla firm",
    description:
      "Projektuję i koduję nowoczesne, szybkie strony internetowe dla firm i działalności.",
    url: SITE_URL,
    siteName: "Dawid Orłowski",
    locale: "pl_PL",
    type: "website",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dawid Orłowski | Strony internetowe dla firm",
    description:
      "Projektuję i koduję nowoczesne, szybkie strony internetowe dla firm i działalności.",
    images: ["/opengraph-image"],
  },
};

// Dane strukturalne (schema.org) — pomagają Google zrozumieć ofertę i kontakt
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Dawid Orłowski — tworzenie stron internetowych",
  url: SITE_URL,
  description:
    "Projektowanie i kodowanie nowoczesnych stron internetowych oraz landing page dla firm.",
  areaServed: "PL",
  priceRange: "od 990 zł",
  email: cvData.personal.email,
  telephone: `+48${cvData.personal.phone.replace(/\D/g, "")}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: cvData.personal.location,
    addressCountry: "PL",
  },
  founder: {
    "@type": "Person",
    name: cvData.personal.name,
    jobTitle: cvData.personal.role,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" suppressHydrationWarning className={`${inter.variable}`}>
      <body className="font-sans antialiased min-h-screen">
        <a className="skip-link" href="#main-content">
          Przejdź do treści
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
