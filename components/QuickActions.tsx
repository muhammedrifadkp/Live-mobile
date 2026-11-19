import Link from "next/link";
import { CalendarCheck, Phone } from "lucide-react";
import { PRIMARY_PHONE } from "@/lib/constants";
import { getQuickWhatsAppUrl, telLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/Icons";

/** Sticky Call / WhatsApp / Book bar at the bottom of the screen on phones and tablets. */
export function MobileCTA() {
  const cell =
    "flex min-h-14 items-center justify-center gap-2 text-[0.9375rem] font-bold transition-[filter,transform] active:scale-[0.98] active:brightness-95";
  return (
    <nav
      aria-label="Quick actions"
      className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-[1fr_1.25fr_1fr] bg-char pb-[env(safe-area-inset-bottom)] lg:hidden"
    >
      <a href={telLink(PRIMARY_PHONE.e164)} className={`${cell} bg-char-3 text-paper`}>
        <Phone className="h-5 w-5" aria-hidden /> Call
      </a>
      <a
        href={getQuickWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className={`${cell} bg-whatsapp text-ink`}
      >
        <WhatsAppIcon className="h-5 w-5" /> WhatsApp
      </a>
      <Link href="/book" className={`${cell} bg-brand text-ink`}>
        <CalendarCheck className="h-5 w-5" aria-hidden /> Book
      </Link>
    </nav>
  );
}

/** Floating WhatsApp button on desktop (the mobile bar replaces it below lg). */
export function FloatingWhatsApp() {
  return (
    <a
      href={getQuickWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Live Mobile on WhatsApp"
      className="group fixed bottom-6 right-6 z-40 hidden h-14 items-center gap-0 bg-whatsapp pl-4 pr-4 text-ink shadow-[0_2px_6px_rgb(0_0_0/0.18),0_12px_32px_rgb(0_0_0/0.28)] transition-[transform,gap] duration-200 hover:-translate-y-0.5 hover:gap-2.5 focus-visible:gap-2.5 lg:flex"
    >
      <WhatsAppIcon className="h-7 w-7" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap font-bold transition-[max-width] duration-300 group-hover:max-w-40 group-focus-visible:max-w-40">
        Chat on WhatsApp
      </span>
    </a>
  );
}
