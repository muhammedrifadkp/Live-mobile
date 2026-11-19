import heroImg from "@/public/images/stock/hero.webp";
import benchImg from "@/public/images/stock/bench.webp";
import screwsImg from "@/public/images/stock/screws.webp";
import boardImg from "@/public/images/stock/board.webp";
import androidImg from "@/public/images/stock/android.webp";
import iphonesImg from "@/public/images/stock/iphones.webp";
import samsungBoxImg from "@/public/images/stock/samsung-box.webp";
import flatlayImg from "@/public/images/stock/flatlay.webp";
import earbudsImg from "@/public/images/stock/earbuds.webp";
import chargerImg from "@/public/images/stock/charger.webp";
import phoneInHandImg from "@/public/images/stock/phone-in-hand.webp";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  LIVE MOBILE — every piece of business data and editable copy lives here.
 *  Change it once in this file and the whole site (pages, footer, WhatsApp
 *  messages, SEO, structured data) updates.
 *
 *  Rule for this file: only real, confirmed facts. Anything unknown is `null`
 *  (the UI hides it) and carries a TODO. No ratings, reviews, prices, warranties,
 *  years in business or customer counts until the client confirms them.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export interface PhoneLine {
  label: string;
  display: string;
  /** E.164 format, used for tel: links and structured data. */
  e164: string;
  whatsapp: boolean;
}

export interface OpeningHours {
  /** Shown in the UI, e.g. "Mon – Sat, 9:30 am – 9 pm". */
  label: string;
  /** schema.org openingHours values, e.g. ["Mo-Sa 09:30-21:00"]. */
  schema: string[];
}

export const BUSINESS = {
  name: "Live Mobile",
  logoText: "LIVE MOBILE",
  tagline: "All Mobile Service Centre",
  pillars: ["Sales", "Service", "Accessories"] as const,
  city: "Kozhikode",
  cityAlt: "Calicut",
  summary:
    "Live Mobile is an all mobile service centre in Kozhikode: open service, so your phone is repaired right in front of you and your privacy stays yours. Repairs on every brand, new phones and mobile accessories.",

  phones: [
    { label: "Call or WhatsApp", display: "+91 90746 47081", e164: "+919074647081", whatsapp: true },
    { label: "Second line", display: "+91 90728 16934", e164: "+919072816934", whatsapp: false },
  ] satisfies readonly PhoneLine[],

  /** WhatsApp number in wa.me format: country code + number, digits only. */
  whatsappNumber: "919074647081",

  // Confirmed by the client: RP Mall, Mavoor Road.
  // TODO: ask for the shop/floor number inside the mall, the PIN code and the Google Maps pin.
  address: {
    area: "RP Mall",
    landmark: "Mavoor Road",
    city: "Kozhikode",
    region: "Kerala",
    country: "IN",
    postalCode: null as string | null, // TODO: PIN code
    full: "RP Mall, Mavoor Road, Kozhikode, Kerala",
    /** Malayalam version of the address line. Update together with `full`. */
    ml: "ആർ.പി. മാൾ, മാവൂർ റോഡ്, കോഴിക്കോട്",
  },

  /** Opens Google Maps with a search. Replace with the shop's own Maps link once its listing exists. */
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Live%20Mobile%20RP%20Mall%20Mavoor%20Road%20Kozhikode",
  /** Map embed of RP Mall (not a pin on the shop itself) until the client shares the exact location. */
  mapsEmbedUrl: "https://maps.google.com/maps?q=RP%20Mall%2C%20Mavoor%20Road%2C%20Kozhikode&z=15&output=embed",

  /** The brand's main Instagram (lists both founders). */
  instagram: {
    handle: "@livemobiles_calicut",
    url: "https://www.instagram.com/livemobiles_calicut/",
  },

  // TODO: opening hours unknown — ask the client. While null, hours are hidden everywhere
  // (UI and structured data). Example: { label: "Mon – Sat, 9:30 am – 9 pm", schema: ["Mo-Sa 09:30-21:00"] }
  openingHours: null as OpeningHours | null,
} as const;

export const PRIMARY_PHONE = BUSINESS.phones[0];

/** Logo. The header/footer mark is drawn as a vector in components/Logo.tsx (redrawn from the shop's
 *  Instagram logo). The round badge is public/logo.png; favicons are app/icon.png, app/apple-icon.png
 *  and app/favicon.ico. TODO: if the client has the original logo file, swap these for it. */
export const LOGO = {
  image: "/logo.png",
  width: 512,
  height: 512,
  alt: "Live Mobile logo",
};

/** Founders, from the brand's Instagram. Photos in /public/images/founders (originals in media-src/founders). */
export const FOUNDERS = [
  {
    name: "Farsad",
    role: "Founder",
    note: "Mobile technician",
    photo: "/images/founders/farsad.webp",
    alt: "Farsad, founder of Live Mobile, standing in the shop",
    instagram: { handle: "@farsadfayziiii", url: "https://www.instagram.com/farsadfayziiii/" },
  },
  {
    name: "Mubashir",
    role: "Founder",
    note: "Also known as Chottu",
    photo: "/images/founders/mubashir.webp",
    alt: "Mubashir, founder of Live Mobile, standing in the shop",
    instagram: { handle: "@mubashir__036", url: "https://www.instagram.com/mubashir__036/" },
  },
] as const;

/** Developer credit in the footer. */
export const CREDIT = { label: "Website by Rifad", url: "https://rifad.site" };

/**
 * Photos. Unsplash stock photos used as placeholders for the demo, stored in the project
 * (public/images/stock, pre-sized WebP; full-size originals in media-src/stock) so they load fast
 * and get blur placeholders. Static imports give next/image their exact sizes.
 * TODO: replace with real photos of the shop, the counter, the repair bench and stock.
 */
export const IMAGES = {
  hero: { src: heroImg, alt: "A technician working on a circuit board with a screwdriver" },
  bench: { src: benchImg, alt: "Hands repairing an electronic device on a workbench" },
  screws: { src: screwsImg, alt: "Tiny phone screws and parts spread on a white bench" },
  board: { src: boardImg, alt: "Close-up of a circuit board" },
  android: { src: androidImg, alt: "Two new Android smartphones in yellow and blue" },
  iphones: { src: iphonesImg, alt: "A fan of new iPhones in different colours" },
  samsungBox: { src: samsungBoxImg, alt: "A new Samsung phone resting on its box" },
  flatlay: { src: flatlayImg, alt: "A phone with earbuds, a watch and a wallet on a desk" },
  earbuds: { src: earbudsImg, alt: "Wireless earbuds on a teal surface" },
  charger: { src: chargerImg, alt: "A phone charger and cable" },
  phoneInHand: { src: phoneInHandImg, alt: "A smartphone held in one hand" },
} as const;

export type ImageKey = keyof typeof IMAGES;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/book", label: "Book a Repair" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

/** A few Malayalam lines for local feel. Keep `lang="ml"` on the elements that show them. */
export const ML = {
  hero: "ഫോൺ എന്ത് പ്രശ്നമായാലും, ഒരു WhatsApp മതി.", // Whatever the phone's problem, one WhatsApp is enough.
  problems: "ഫോണിന് എന്ത് പറ്റി?", // What happened to your phone?
  steps: "മൂന്ന് സ്റ്റെപ്പ്, അത്രയേ ഉള്ളൂ.", // Three steps, that's all.
  brands: "ഏത് ബ്രാൻഡ് ആയാലും.", // Whatever the brand.
  cta: "വിളിക്കൂ, അല്ലെങ്കിൽ ഒരു മെസ്സേജ് അയക്കൂ.", // Call, or send a message.
  founders: "ഒപ്പം ഇരിക്കാം, മൊബൈൽ ശരിയാക്കാം.", // From the brand's Instagram bio: sit with us, get your mobile fixed.
  // The shop's main promise: your phone is made ready right in front of you; open service, so your privacy stays yours.
  open: "നിങ്ങളുടെ മുന്നിൽ വെച്ചുതന്നെ നിങ്ങളുടെ ഫോൺ റെഡിയാക്കുന്നു.",
  privacy: "ഓപ്പൺ സർവീസ്, നിങ്ങളുടെ പ്രൈവസി നിങ്ങളുടെ കയ്യിൽ.",
} as const;

/* ─── Services ─────────────────────────────────────────────────────────────── */

export type PillarId = "repairs" | "sales" | "accessories";

export interface Pillar {
  id: PillarId;
  /** Word used on the shop's sign: Sales | Service | Accessories. */
  word: string;
  title: string;
  short: string;
  description: string;
  image: ImageKey;
  items: { name: string; note: string }[];
  /** Topic used in the pre-filled WhatsApp enquiry. */
  topic: string;
}

export const PILLARS: Pillar[] = [
  {
    id: "repairs",
    word: "Service",
    title: "Repairs for every brand",
    short: "Screens, batteries, charging ports, water damage and more.",
    description:
      "Bring in any phone, any brand. Take a seat at the counter and watch: we open it, show you what's wrong and fix it right in front of you.",
    image: "screws",
    items: [
      { name: "Screen & display", note: "Cracked glass, lines, touch not working" },
      { name: "Battery", note: "Drains fast, swollen, switches off" },
      { name: "Charging port", note: "Loose, slow or not charging" },
      { name: "Water damage", note: "Dropped in water or got wet" },
      { name: "Software", note: "Stuck on logo, slow, update errors" },
    ],
    topic: "a phone repair",
  },
  {
    id: "sales",
    word: "Sales",
    title: "New phones",
    short: "New smartphones, and help choosing the right one.",
    description:
      "Looking for a new phone? Tell us what you need it for and roughly what you want to spend, and we'll show you what's in stock.",
    image: "android",
    // TODO: confirm with the client which brands and models they sell.
    items: [
      { name: "New smartphones", note: "Ask for the models in stock" },
      { name: "Help choosing", note: "Tell us how you use your phone" },
      { name: "Check availability", note: "Send the model on WhatsApp" },
    ],
    topic: "buying a new phone",
  },
  {
    id: "accessories",
    word: "Accessories",
    title: "Accessories",
    short: "Cases, screen guards, chargers, cables and audio.",
    description:
      "Protect the phone you have and keep it charged. Tell us your model and we'll find what fits.",
    image: "earbuds",
    // TODO: confirm the accessory range with the client.
    items: [
      { name: "Cases & covers", note: "For your exact model" },
      { name: "Tempered glass", note: "Screen guards fitted in store" },
      { name: "Chargers & cables", note: "Wall chargers, cables, car chargers" },
      { name: "Earphones & headphones", note: "Wired and wireless" },
      { name: "Power banks", note: "For long days out" },
    ],
    topic: "mobile accessories",
  },
];

/* ─── Problems (home grid, quote card, booking form, services list) ────────── */

export interface Problem {
  id: string;
  title: string;
  /** Short label for chips. */
  chip: string;
  desc: string;
}

export const PROBLEMS: Problem[] = [
  { id: "screen", title: "Screen / display", chip: "Screen", desc: "Cracked glass, lines, black screen or touch not working." },
  { id: "battery", title: "Battery", chip: "Battery", desc: "Drains fast, swells, or the phone switches off by itself." },
  { id: "charging", title: "Charging port", chip: "Charging", desc: "Loose cable, slow charging or not charging at all." },
  { id: "water", title: "Water damage", chip: "Water damage", desc: "Dropped in water, rain, or anything spilled on it." },
  { id: "camera", title: "Camera", chip: "Camera", desc: "Blurry photos, cracked lens, or the camera won't open." },
  { id: "audio", title: "Speaker / mic", chip: "Speaker / mic", desc: "No sound, low volume, or callers can't hear you." },
  { id: "software", title: "Software", chip: "Software", desc: "Stuck on the logo, restarting, slow or update errors." },
  { id: "dead", title: "Dead phone", chip: "Dead phone", desc: "Won't switch on, won't charge, no sign of life." },
];

/** Brands for the quote card and booking form. */
export const BRANDS = [
  "iPhone",
  "Samsung",
  "OnePlus",
  "Xiaomi / Redmi / Poco",
  "Vivo / iQOO",
  "Oppo",
  "Realme",
  "Google Pixel",
  "Motorola",
  "Nothing",
  "Other",
] as const;

/** Names shown in the "Brands we service" wall. The shop repairs all brands; edit freely. */
export const BRAND_WALL = [
  "Apple",
  "Samsung",
  "OnePlus",
  "Xiaomi",
  "Redmi",
  "Poco",
  "Vivo",
  "iQOO",
  "Oppo",
  "Realme",
  "Google Pixel",
  "Motorola",
  "Nothing",
  "Nokia",
  "Honor",
  "Infinix",
  "Tecno",
  "Lava",
] as const;

export const ACCESSORY_NEEDS = ["Case / cover", "Screen guard", "Charger / cable", "Earphones", "Power bank", "Something else"] as const;

/** Visit slots for the booking form. No clock times until opening hours are confirmed. */
export const TIME_SLOTS = ["Morning", "Afternoon", "Evening", "Any time"] as const;

/* ─── Reels ───────────────────────────────────────────────────────────────── */

/**
 * Shop reels from Instagram. Web versions + posters in /public/reels (originals in media-src/reels).
 * No like/comment counts are shown: they would be invented. Likes on the site are saved only in the
 * visitor's own browser.
 */
export const REELS = [
  { id: "Video-19295", caption: "Samsung S23 Ultra battery change, done at the counter." },
  { id: "Video-32863", caption: "iPhone 13 battery change. Open service: you watch every step." },
  { id: "Video-16218", caption: "Walk in, take a seat, and watch your phone get fixed." },
  { id: "Video-19535", caption: "iPhone repair under the microscope, then straight back in your hand." },
  { id: "Video-89810", caption: "Nothing Phone repair at the bench." },
  { id: "Video-33139", caption: "Back glass work, done carefully in front of the customer." },
  { id: "Video-94070", caption: "iPhone opened up and repaired on the bench." },
  { id: "Video-72965", caption: "A walk-in repair, start to finish." },
  { id: "Video-71524", caption: "All mobile live service. Bring any phone, any brand." },
] as const;

/* ─── How it works: scroll-scrubbed repair video ───────────────────────────── */

/**
 * Frames cut from media-src/phone-repair-flow.mp4 (made in Google Flow), 12 fps, cropped to the phone.
 * To replace: export a new clip on the same plain background, then re-run the ffmpeg commands in README.
 * The section background (--color-video in globals.css) is sampled from the clip: keep them identical.
 */
export const SCROLL_VIDEO = {
  frameCount: 96,
  desktop: { dir: "/scroll/phone/d", width: 560, height: 1000 },
  mobile: { dir: "/scroll/phone/m", width: 336, height: 600 },
  poster: "/scroll/phone/poster.webp",
  posterEnd: "/scroll/phone/poster-end.webp",
  alt: "A phone with a cracked screen gets a new display and switches on",
};

/* ─── How it works ─────────────────────────────────────────────────────────── */

export const STEPS = [
  {
    title: "Send the problem",
    text: "WhatsApp us the phone model and what's wrong, or just call. A photo of the damage helps.",
  },
  {
    title: "Watch it get fixed",
    text: `Come to ${BUSINESS.address.area}, ${BUSINESS.address.landmark} and take a seat. We repair your phone right in front of you, so it never leaves your sight.`,
  },
  {
    title: "Take it home, live again",
    text: "Check that everything works before you leave. Your phone, your data, back in your hand.",
  },
] as const;

/* ─── FAQ ──────────────────────────────────────────────────────────────────── */

export const FAQS = [
  {
    topic: "Privacy",
    q: "Will my phone leave my sight?",
    a: "No. It's open service: we repair your phone right in front of you at the counter, so your photos, chats and accounts stay private.",
  },
  {
    topic: "Location",
    q: "Where is Live Mobile?",
    a: `We're at ${BUSINESS.address.full}. Tap "Get directions" on this page to open it in Google Maps.`,
  },
  {
    topic: "Brands",
    q: "Which phones do you repair?",
    a: "All brands: iPhone, Samsung, OnePlus, Xiaomi, Redmi, Vivo, Oppo, Realme, Google Pixel, Motorola and more. If you don't see yours, ask us.",
  },
  {
    topic: "Booking",
    q: "How do I book a repair?",
    a: "Use the booking form. It opens WhatsApp with your details already written, so you only press send. You can also call or walk in.",
  },
  {
    topic: "Cost",
    q: "How much will my repair cost?",
    a: "It depends on the phone and the fault. Send us the model and the problem on WhatsApp and we'll tell you the price after checking.",
  },
  {
    topic: "Time",
    q: "How long does a repair take?",
    a: "It depends on the fault and on parts. We'll tell you how long it will take when we check your phone.",
  },
  {
    topic: "Shopping",
    q: "Do you sell new phones and accessories?",
    a: "Yes. We sell new phones and accessories like cases, screen guards, chargers and earphones. Message us your model to check what's in stock.",
  },
] as const;

/* ─── About page copy (generic, editable) ──────────────────────────────────── */

export const ABOUT = {
  intro:
    "A phone shop in Kozhikode for the three things people need most: getting a phone fixed, buying a new one, and the accessories to go with it.",
  story: [
    "Live Mobile is an all mobile service centre at RP Mall on Mavoor Road, Kozhikode. People walk in with every kind of phone and every kind of problem: a cracked screen, a battery that won't last, a phone that went into the water, or one that simply stopped.",
    "Here, nothing happens behind a closed door. You sit at the counter and we repair your phone right in front of you, so it never leaves your sight and your privacy stays yours. Then you take it home working again. That's the whole idea behind the name: bring the phone in dead, take it home live.",
    "When it's time for a new phone, we help you pick one that suits how you use it. And for the phone you already have, there are cases, screen guards, chargers and earphones on the shelf.",
  ],
  values: [
    { title: "Open service", text: "Your phone is repaired in front of you. It never leaves your sight, so your privacy stays yours." },
    { title: "Every brand welcome", text: "iPhone or Android, new or old, we'll take a look." },
    { title: "WhatsApp first", text: "Ask, book and get updates in the chat you already use." },
  ],
} as const;

/** SEO keywords used in the root metadata. */
export const SEO_KEYWORDS = [
  "mobile service Kozhikode",
  "mobile service centre Kozhikode",
  "phone repair Calicut",
  "mobile repair Kozhikode",
  "iPhone service Kozhikode",
  "Samsung service Kozhikode",
  "mobile shop Kozhikode",
  "mobile accessories Kozhikode",
  "Live Mobile RP Mall",
  "mobile shop RP Mall Kozhikode",
  "mobile service Mavoor Road",
  "Live Mobile Calicut",
];
