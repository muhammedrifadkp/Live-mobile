import Image from "next/image";
import Link from "next/link";
import { BUSINESS, CREDIT, IMAGES, NAV_LINKS } from "@/lib/constants";
import { getQuickWhatsAppUrl, telLink } from "@/lib/whatsapp";
import { Logo } from "@/components/Logo";
import { InstagramIcon, WhatsAppIcon } from "@/components/Icons";

/** Photograph half, menu half. The back of the object. */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-char-2 pb-[calc(3.5rem+env(safe-area-inset-bottom))] text-paper lg:pb-0">
      <div className="grid lg:min-h-[44rem] lg:grid-cols-2">
        <div className="relative h-[42svh] min-h-64 overflow-hidden lg:h-auto">
          <Image
            src={IMAGES.board.src} placeholder="blur"
            alt={IMAGES.board.alt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="scale-125 object-cover object-[30%_60%]"
          />
        </div>

        <div className="flex flex-col px-4 pb-10 pt-12 sm:px-6 lg:px-16 lg:pb-10 lg:pt-20">
          <Link href="/" aria-label="Live Mobile, home" className="self-start">
            <Logo tone="dark" />
          </Link>

          <nav aria-label="Footer" className="mt-10 lg:mt-14">
            <ul className="group/menu flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="display inline-block py-1 text-[2.75rem] text-paper transition-[transform,color] duration-200 hover:translate-x-3 hover:text-brand! group-hover/menu:text-fog lg:text-[3.25rem]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-12 grid gap-8 text-[0.9375rem] sm:grid-cols-2 lg:mt-16">
            <div>
              <h2 className="font-bold text-paper">Visit or call</h2>
              <address className="mt-3 not-italic leading-relaxed text-fog">
                <a href={BUSINESS.mapsUrl} target="_blank" rel="noopener noreferrer" className="link hover:text-paper">
                  {BUSINESS.address.full}
                </a>
              </address>
              <ul className="mt-3 space-y-1">
                {BUSINESS.phones.map((p) => (
                  <li key={p.e164}>
                    <a href={telLink(p.e164)} className="link font-semibold tabular-nums text-paper">
                      {p.display}
                    </a>
                  </li>
                ))}
              </ul>
              {BUSINESS.openingHours && <p className="mt-3 text-fog">{BUSINESS.openingHours.label}</p>}
            </div>
            <div>
              <h2 className="font-bold text-paper">Follow &amp; message</h2>
              <ul className="mt-3 space-y-2">
                <li>
                  <a
                    href={BUSINESS.instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-2.5 font-semibold text-paper transition-colors hover:text-brand"
                  >
                    <InstagramIcon className="h-5 w-5" />
                    <span translate="no">{BUSINESS.instagram.handle}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={getQuickWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-2.5 font-semibold text-paper transition-colors hover:text-whatsapp"
                  >
                    <WhatsAppIcon className="h-5 w-5" />
                    WhatsApp {BUSINESS.phones[0].display}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-2 text-[0.8125rem] text-fog sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-between lg:mt-auto lg:pr-48 lg:pt-12">
            <p>
              © {year} {BUSINESS.name}, {BUSINESS.city}. Photos: Unsplash.
            </p>
            <a href={CREDIT.url} target="_blank" rel="noopener" className="link font-semibold text-paper">
              {CREDIT.label}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
