import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BUSINESS, IMAGES } from "@/lib/constants";
import { getQuickWhatsAppUrl } from "@/lib/whatsapp";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/PageHeader";
import { Location } from "@/components/Location";
import { InstagramIcon, WhatsAppIcon } from "@/components/Icons";
import { Faq } from "@/components/Faq";

export const metadata = pageMetadata({
  title: "Contact Live Mobile, Mobile Shop in Kozhikode",
  description: `Call ${BUSINESS.phones[0].display} or ${BUSINESS.phones[1].display}, WhatsApp us, or visit Live Mobile at RP Mall, Mavoor Road, Kozhikode.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Call, message or visit"
        crumb="Contact"
        path="/contact"
        image="flatlay"
        intro="WhatsApp is quickest. Send your phone model and the problem, and we reply in the same chat."
      >
        <div className="mt-8 flex flex-wrap gap-2">
          <a href={getQuickWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
            <WhatsAppIcon /> WhatsApp {BUSINESS.phones[0].display}
          </a>
        </div>
      </PageHeader>

      <section aria-label="Shop address and phone numbers" className="bg-paper py-24 lg:py-32">
        <div className="wrap">
          <Location />
        </div>
      </section>

      <section aria-labelledby="online-h" className="bg-paper-2 py-24 text-ink lg:py-32">
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <h2 id="online-h" className="display text-[clamp(3.25rem,14vw,4.5rem)] lg:text-[clamp(4.5rem,6vw,6.5rem)]" data-reveal>
              Message us
            </h2>
            <ul className="mt-10 grid gap-1.5" data-reveal>
              <li>
                <a
                  href={getQuickWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-4 bg-paper px-5 py-5 transition-[background-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-white"
                >
                  <span>
                    <span className="block font-bold">WhatsApp</span>
                    <span className="block text-[0.9375rem] tabular-nums text-muted">{BUSINESS.phones[0].display}</span>
                  </span>
                  <WhatsAppIcon className="h-7 w-7 text-[#128c4b]" />
                </a>
              </li>
              <li>
                <a
                  href={BUSINESS.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-4 bg-paper px-5 py-5 transition-[background-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-white"
                >
                  <span>
                    <span className="block font-bold">Instagram</span>
                    <span className="block text-[0.9375rem] text-muted" translate="no">
                      {BUSINESS.instagram.handle}
                    </span>
                  </span>
                  <InstagramIcon className="h-7 w-7" />
                </a>
              </li>
              <li>
                <Link
                  href="/book"
                  className="group flex items-center justify-between gap-4 bg-char px-5 py-5 text-paper transition-[background-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-black"
                >
                  <span>
                    <span className="block font-bold">Book a repair</span>
                    <span className="block text-[0.9375rem] text-fog">Four steps, sent on WhatsApp</span>
                  </span>
                  <ArrowRight className="h-7 w-7" aria-hidden />
                </Link>
              </li>
            </ul>
            {BUSINESS.openingHours && (
              <p className="mt-8 text-[1.125rem]">
                <span className="font-bold">Open:</span> {BUSINESS.openingHours.label}
              </p>
            )}
            <div className="relative mt-10 hidden aspect-[4/3] overflow-hidden lg:block" data-reveal>
              <Image src={IMAGES.phoneInHand.src} placeholder="blur" alt={IMAGES.phoneInHand.alt} fill sizes="40vw" className="object-cover" />
            </div>
          </div>

          <figure className="lg:col-span-7" data-reveal>
            <div className="relative aspect-[4/3] overflow-hidden bg-paper-3">
              <iframe
                title={`Map of ${BUSINESS.address.area}, ${BUSINESS.address.city}`}
                src={BUSINESS.mapsEmbedUrl}
                className="absolute inset-0 h-full w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <figcaption className="mt-3 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 text-[0.9375rem] text-muted">
              <span>
                {BUSINESS.address.area}, {BUSINESS.address.city}
              </span>
              <a href={BUSINESS.mapsUrl} target="_blank" rel="noopener noreferrer" className="link font-bold text-ink">
                Open in Google Maps
              </a>
            </figcaption>
          </figure>
        </div>
      </section>

      <Faq />
    </>
  );
}
