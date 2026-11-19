import Image from "next/image";
import Link from "next/link";
import { CalendarCheck, Phone } from "lucide-react";
import { BUSINESS, IMAGES, ML, PRIMARY_PHONE } from "@/lib/constants";
import { getQuickWhatsAppUrl, telLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/Icons";
import { QuickQuote } from "./QuickQuote";

/** A paper job card over a dim workbench. */
export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-char text-paper">
      <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden>
        <Image
          src={IMAGES.hero.src} placeholder="blur"
          alt=""
          fill
          preload
          sizes="100vw"
          className="drift object-cover object-[60%_40%] brightness-[0.42] saturate-[0.85]"
        />
        <div className="absolute inset-0 bg-char/45" />
      </div>

      <div className="wrap grid gap-12 pb-16 pt-12 sm:pt-16 lg:min-h-[calc(100svh-4.5rem)] lg:grid-cols-12 lg:items-center lg:gap-10 lg:py-12">
        <div className="lg:col-span-7">
          <h1 className="rise display text-[clamp(3.25rem,15vw,5.75rem)] sm:text-[clamp(5rem,11vw,7rem)] lg:text-[clamp(5.5rem,7.6vw,7rem)]">
            <span className="block">All mobile</span>
            <span className="block">service centre</span>
          </h1>

          <p lang="ml" style={{ "--d": "60ms" } as React.CSSProperties} className="rise mt-8 text-[1.375rem] font-semibold leading-snug sm:text-[1.625rem]">
            {ML.hero}
          </p>
          <p style={{ "--d": "90ms" } as React.CSSProperties} className="rise mt-3 max-w-[36rem] text-[1.0625rem] leading-relaxed text-paper/85 sm:text-lg">
            Open service: your phone is repaired right in front of you, so your privacy stays yours. Every brand, at{" "}
            {BUSINESS.address.area}, {BUSINESS.address.landmark}, {BUSINESS.city}.
          </p>

          <div style={{ "--d": "120ms" } as React.CSSProperties} className="rise mt-9 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
            <Link href="/book" className="btn btn-brand col-span-2 text-[1.0625rem]">
              <CalendarCheck aria-hidden /> Book a repair
            </Link>
            <a href={telLink(PRIMARY_PHONE.e164)} className="btn btn-smoke">
              <Phone aria-hidden /> Call
            </a>
            <a href={getQuickWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="btn btn-smoke">
              <WhatsAppIcon className="text-whatsapp" /> WhatsApp
            </a>
          </div>
        </div>

        <div style={{ "--d": "100ms" } as React.CSSProperties} className="rise lg:col-span-5 lg:col-start-8">
          <QuickQuote />
        </div>
      </div>
    </section>
  );
}
