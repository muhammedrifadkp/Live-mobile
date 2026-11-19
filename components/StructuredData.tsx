import { BUSINESS, FOUNDERS, PILLARS } from "@/lib/constants";
import { getSiteUrl } from "@/lib/site";

/** Renders a JSON-LD <script>. Escapes "<" so the data can't close the tag early. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

/**
 * MobilePhoneStore (a LocalBusiness subtype) + WebSite.
 * Only real data: no rating, reviews, prices or coordinates until the client confirms them.
 */
export function StructuredData() {
  const siteUrl = getSiteUrl();
  const { address } = BUSINESS;

  const store: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "MobilePhoneStore",
    "@id": `${siteUrl}/#store`,
    name: BUSINESS.name,
    alternateName: `${BUSINESS.name}, ${BUSINESS.tagline}`,
    slogan: BUSINESS.tagline,
    description: BUSINESS.summary,
    url: `${siteUrl}/`,
    logo: `${siteUrl}/logo.png`,
    image: `${siteUrl}/opengraph-image`,
    telephone: BUSINESS.phones[0].e164,
    contactPoint: BUSINESS.phones.map((p) => ({
      "@type": "ContactPoint",
      telephone: p.e164,
      contactType: "customer service",
      areaServed: "IN",
      availableLanguage: ["en", "ml"],
    })),
    address: {
      "@type": "PostalAddress",
      streetAddress: `${address.area}, ${address.landmark}`,
      addressLocality: address.city,
      addressRegion: address.region,
      ...(address.postalCode ? { postalCode: address.postalCode } : {}),
      addressCountry: address.country,
    },
    areaServed: [
      { "@type": "City", name: "Kozhikode" },
      { "@type": "City", name: "Calicut" },
    ],
    hasMap: BUSINESS.mapsUrl,
    sameAs: [BUSINESS.instagram.url],
    founder: FOUNDERS.map((f) => ({
      "@type": "Person",
      name: f.name,
      image: `${siteUrl}${f.photo}`,
      sameAs: [f.instagram.url],
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Sales, service and accessories",
      itemListElement: PILLARS.map((p) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: p.title, description: p.short },
      })),
    },
  };

  if (BUSINESS.openingHours) {
    store.openingHours = BUSINESS.openingHours.schema;
  }

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: BUSINESS.name,
    url: `${siteUrl}/`,
    inLanguage: "en-IN",
    publisher: { "@id": `${siteUrl}/#store` },
  };

  return (
    <>
      <JsonLd data={store} />
      <JsonLd data={website} />
    </>
  );
}

/** BreadcrumbList for inner pages. */
export function BreadcrumbData({ name, path }: { name: string; path: string }) {
  const siteUrl = getSiteUrl();
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
          { "@type": "ListItem", position: 2, name, item: `${siteUrl}${path}` },
        ],
      }}
    />
  );
}
