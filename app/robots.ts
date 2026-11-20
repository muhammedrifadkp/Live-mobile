import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";
import { SITE_PAUSED } from "@/lib/paused";

export default function robots(): MetadataRoute.Robots {
  // Keep Vercel preview deployments out of search results; only production is indexable.
  // Also while the site is paused (lib/paused.ts).
  if (SITE_PAUSED || (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production")) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  const base = getSiteUrl();
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${base}/sitemap.xml`,
  };
}
