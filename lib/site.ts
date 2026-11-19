/**
 * Public base URL of the site (no trailing slash), used for canonical URLs, the sitemap,
 * robots.txt, Open Graph and structured data.
 *
 * Order: NEXT_PUBLIC_SITE_URL → Vercel production domain → localhost.
 * TODO: set NEXT_PUBLIC_SITE_URL in Vercel once the client's domain is live.
 */
export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/+$/, "");

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel.replace(/\/+$/, "")}`;

  return "http://localhost:3000";
}
