import type { Metadata } from "next";

/**
 * Site switch. While `true`, every URL on the site (pages, 404s, photos, videos) shows only the
 * "Contact Rifad" screen (app/paused/page.tsx, routed there by proxy.ts).
 * Set it to `false` and redeploy to bring the full Live Mobile site back.
 */
export const SITE_PAUSED = true;

/** Internal route that proxy.ts rewrites every request to. */
export const PAUSED_PATH = "/paused";

/** Message pre-filled in WhatsApp when a visitor taps a number. */
const WA_MESSAGE = "Hi Rifad, I'm contacting you from the Live Mobile website.";

/** Rifad's WhatsApp numbers (Indian mobiles, without +91). */
export const RIFAD_WHATSAPP = ["6238032586", "7356852496"].map((number) => ({
  number,
  /** "+91 62380 32586" */
  display: `+91 ${number.slice(0, 5)} ${number.slice(5)}`,
  href: `https://wa.me/91${number}?text=${encodeURIComponent(WA_MESSAGE)}`,
}));

/** Metadata for the whole site while paused: no shop details, kept out of search results. */
export const PAUSED_METADATA: Metadata = {
  title: "Contact Rifad",
  description: "This website is temporarily unavailable. Contact Rifad on WhatsApp.",
  robots: { index: false, follow: false },
  formatDetection: { telephone: false },
};
