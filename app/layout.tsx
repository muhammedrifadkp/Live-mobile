import type { Metadata, Viewport } from "next";
import { Anek_Malayalam, Big_Shoulders, Public_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp, MobileCTA } from "@/components/QuickActions";
import { RevealObserver } from "@/components/RevealObserver";
import { StructuredData } from "@/components/StructuredData";
import { BUSINESS, SEO_KEYWORDS } from "@/lib/constants";
import { getSiteUrl } from "@/lib/site";
import { PAUSED_METADATA, SITE_PAUSED } from "@/lib/paused";

const bigShoulders = Big_Shoulders({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-big-shoulders",
  display: "swap",
  adjustFontFallback: false,
  fallback: ["Arial Narrow", "sans-serif"],
});

const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-public-sans",
  display: "swap",
});

const anekMalayalam = Anek_Malayalam({
  subsets: ["malayalam"],
  weight: ["500", "600"],
  variable: "--font-anek-malayalam",
  display: "swap",
  preload: false,
});

const title = "Live Mobile | Mobile Service Centre in Kozhikode — Phone Repair Calicut";
const description =
  "Live Mobile is an all mobile service centre at RP Mall, Mavoor Road, Kozhikode: phone repairs for every brand including iPhone and Samsung, new phones and accessories. Book on WhatsApp.";

const siteMetadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: { default: title, template: "%s | Live Mobile" },
  description,
  keywords: SEO_KEYWORDS,
  applicationName: BUSINESS.name,
  authors: [{ name: BUSINESS.name }],
  creator: BUSINESS.name,
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description,
    url: "/",
    siteName: BUSINESS.name,
    locale: "en_IN",
    type: "website",
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const metadata: Metadata = SITE_PAUSED
  ? { metadataBase: siteMetadata.metadataBase, ...PAUSED_METADATA }
  : siteMetadata;

export const viewport: Viewport = {
  themeColor: "#161311",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const fonts = `${bigShoulders.variable} ${publicSans.variable} ${anekMalayalam.variable}`;

  // Paused (lib/paused.ts): only the "Contact Rifad" screen, no shop header, footer or WhatsApp.
  if (SITE_PAUSED) {
    return (
      <html lang="en-IN" className={fonts} suppressHydrationWarning>
        <body className="flex min-h-screen flex-col">{children}</body>
      </html>
    );
  }

  return (
    <html lang="en-IN" className={fonts} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        <a
          href="#main"
          className="sr-only z-[60] bg-brand px-4 py-3 font-bold text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <StructuredData />
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <FloatingWhatsApp />
        <MobileCTA />
        <RevealObserver />
      </body>
    </html>
  );
}
