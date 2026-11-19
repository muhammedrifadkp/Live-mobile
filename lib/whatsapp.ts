import { BUSINESS } from "./constants";

/** wa.me link to the shop's WhatsApp with a pre-filled message. */
export function waLink(text: string): string {
  return `https://wa.me/${BUSINESS.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

/** tel: link for a phone in E.164 format. */
export function telLink(e164: string): string {
  return `tel:${e164}`;
}

/** Generic enquiry, optionally about a topic ("a phone repair", "mobile accessories"…). */
export function getQuickWhatsAppUrl(topic?: string): string {
  return waLink(
    topic
      ? `Hello ${BUSINESS.name}, I'd like to ask about ${topic}.`
      : `Hello ${BUSINESS.name}, I have a question about my phone.`,
  );
}

export interface QuoteDetails {
  brand?: string;
  problems: string[];
}

/** Message for the hero "Quick repair quote" card. */
export function buildQuoteMessage({ brand, problems }: QuoteDetails): string {
  const lines = [`Hello ${BUSINESS.name}, I'd like a repair quote.`, ""];
  lines.push(`*Phone:* ${brand || "Not sure"}`);
  lines.push(`*Problem:* ${problems.length ? problems.join(", ") : "Not sure"}`);
  lines.push("", "How much will it cost and how long will it take?");
  return lines.join("\n");
}

export function getQuoteWhatsAppUrl(details: QuoteDetails): string {
  return waLink(buildQuoteMessage(details));
}

export interface BookingDetails {
  service: string;
  brand: string;
  model: string;
  /** Problems (repair) or items (accessories). */
  needs: string[];
  date: string;
  time: string;
  name: string;
  phone: string;
  notes: string;
}

const SERVICE_INTRO: Record<string, string> = {
  Repair: "I'd like to book a repair.",
  "New phone": "I'm looking for a new phone.",
  Accessories: "I'm looking for accessories.",
};

/** Formatted booking message, as it will appear in WhatsApp (*bold* is WhatsApp markup). */
export function buildBookingMessage(d: BookingDetails): string {
  const needsLabel = d.service === "Repair" ? "Problem" : d.service === "Accessories" ? "Looking for" : "Interested in";
  const rows: [string, string][] = [
    ["Service", d.service],
    ["Brand", d.brand],
    ["Model", d.model],
    [needsLabel, d.needs.join(", ")],
    ["Preferred date", d.date],
    ["Preferred time", d.time],
    ["Name", d.name],
    ["Phone", d.phone],
    ["Notes", d.notes],
  ];

  const lines = [`Hello ${BUSINESS.name}, ${SERVICE_INTRO[d.service] ?? "I'd like to book a visit."}`, ""];
  for (const [label, value] of rows) {
    const v = value.trim();
    if (v) lines.push(`*${label}:* ${v}`);
  }
  lines.push("", "Please confirm. Thank you!");
  return lines.join("\n");
}

export function getBookingWhatsAppUrl(d: BookingDetails): string {
  return waLink(buildBookingMessage(d));
}
