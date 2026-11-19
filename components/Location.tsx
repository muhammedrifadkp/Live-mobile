import { Navigation, Phone } from "lucide-react";
import { BUSINESS } from "@/lib/constants";
import { telLink } from "@/lib/whatsapp";
import { InstagramIcon } from "@/components/Icons";

/**
 * The visit coupon: an orange card with notches and a perforation.
 * `ground` must match the section background so the notches read as cut-outs.
 */
export function Location({ headingLevel = "h2" }: { headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  const { address } = BUSINESS;

  return (
    <div className="relative bg-brand text-ink lg:grid lg:grid-cols-[minmax(0,1.1fr)_auto_minmax(0,1fr)]" data-reveal>
      {/* Notches: top and bottom on desktop, left and right on phones. */}
      <span aria-hidden className="absolute -top-4 left-[calc(55%-1rem)] hidden h-8 w-8 rounded-full bg-paper lg:block" />
      <span aria-hidden className="absolute -bottom-4 left-[calc(55%-1rem)] hidden h-8 w-8 rounded-full bg-paper lg:block" />

      <div className="flex flex-col justify-between gap-8 p-6 sm:p-10 lg:p-14">
        <div>
          <H className="display text-[clamp(3rem,13vw,4.25rem)] lg:text-[clamp(4rem,5.4vw,5.75rem)]">
            Find us at {address.area}
          </H>
          <p lang="ml" className="mt-6 text-[1.25rem] font-semibold leading-snug sm:text-[1.375rem]">
            {address.ml}
          </p>
        </div>
        <address className="text-[1.0625rem] not-italic leading-relaxed">
          <span className="block font-bold">{BUSINESS.name}</span>
          {address.area}, {address.landmark}
          <br />
          {address.city}, {address.region}
          {address.postalCode ? ` ${address.postalCode}` : ""}
        </address>
      </div>

      <div className="relative lg:w-0">
        <span aria-hidden className="absolute -left-4 -top-4 h-8 w-8 rounded-full bg-paper lg:hidden" />
        <span aria-hidden className="absolute -right-4 -top-4 h-8 w-8 rounded-full bg-paper lg:hidden" />
        <div className="perf-x mx-6 h-0 [--perf:var(--color-paper)] lg:perf-y lg:mx-0 lg:h-full lg:border-t-0" />
      </div>

      <div className="flex flex-col gap-6 p-6 sm:p-10 lg:p-14">
        <ul className="space-y-7">
          {BUSINESS.phones.map((p) => (
            <li key={p.e164}>
              <a href={telLink(p.e164)} className="group flex items-center justify-between gap-4">
                <span className="min-w-0">
                  <span className="display block whitespace-nowrap text-[2rem] tabular-nums group-hover:underline min-[400px]:text-[2.25rem] sm:text-[2.75rem]">
                    {p.display}
                  </span>
                  <span className="mt-1 block text-[0.9375rem] font-semibold">{p.label}</span>
                </span>
                <span className="flex h-12 w-12 shrink-0 items-center justify-center bg-char text-paper transition-transform duration-200 group-hover:-translate-y-0.5">
                  <Phone className="h-5 w-5" aria-hidden />
                  <span className="sr-only">Call {p.display}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>

        <a
          href={BUSINESS.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-char min-h-16 justify-between px-6 text-[1.0625rem]"
        >
          Get directions <Navigation aria-hidden />
        </a>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-x-6 gap-y-2 text-[1rem]">
          <a
            href={BUSINESS.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 font-bold"
          >
            <InstagramIcon className="h-5 w-5" />
            <span className="link" translate="no">
              {BUSINESS.instagram.handle}
            </span>
          </a>
          {BUSINESS.openingHours && <p className="font-semibold">{BUSINESS.openingHours.label}</p>}
        </div>
      </div>
    </div>
  );
}

/** Home-page section wrapper for the coupon. */
export function LocationSection() {
  return (
    <section id="visit" aria-label="Visit the shop" className="bg-paper py-24 lg:py-32">
      <div className="wrap">
        <Location />
      </div>
    </section>
  );
}
