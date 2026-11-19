import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarCheck } from "lucide-react";
import { IMAGES, PILLARS, PROBLEMS } from "@/lib/constants";
import { getQuickWhatsAppUrl } from "@/lib/whatsapp";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/PageHeader";
import { ScallopEdge } from "@/components/ScallopEdge";
import { WhatsAppIcon } from "@/components/Icons";
import { Faq } from "@/components/Faq";
import { FinalCta } from "@/components/FinalCta";

export const metadata = pageMetadata({
  title: "Phone Repair, New Phones & Accessories in Kozhikode",
  description:
    "Mobile phone repair for every brand in Kozhikode (Calicut): screen, battery, charging port, water damage, camera, speaker and software. Plus new phones and accessories at Live Mobile, RP Mall, Mavoor Road.",
  path: "/services",
});

const repairs = PILLARS.find((p) => p.id === "repairs")!;
const sales = PILLARS.find((p) => p.id === "sales")!;
const accessories = PILLARS.find((p) => p.id === "accessories")!;

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        title="Our services"
        crumb="Services"
        path="/services"
        image="bench"
        intro="Phone repairs for every brand, new phones and accessories, all at one counter in RP Mall, Mavoor Road, Kozhikode."
      />

      {/* Repairs: copy and photo beside a printed sheet of the common repairs. */}
      <section id="repairs" aria-labelledby="repairs-h" className="bg-char-2 py-24 text-paper lg:py-36">
        <div className="wrap grid gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <h2 id="repairs-h" className="display text-[clamp(3.25rem,14vw,4.5rem)] lg:text-[clamp(4.5rem,6vw,6.5rem)]" data-reveal>
              {repairs.title}
            </h2>
            <p className="mt-6 max-w-[34rem] text-[1.125rem] leading-relaxed" data-reveal>
              {repairs.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-2" data-reveal>
              <Link href="/book" className="btn btn-brand">
                <CalendarCheck aria-hidden /> Book a repair
              </Link>
              <a href={getQuickWhatsAppUrl(repairs.topic)} target="_blank" rel="noopener noreferrer" className="btn btn-smoke">
                <WhatsAppIcon className="text-whatsapp" /> Ask on WhatsApp
              </a>
            </div>
            <div className="relative mt-12 hidden aspect-[4/5] overflow-hidden lg:block" data-reveal>
              <Image src={IMAGES.screws.src} placeholder="blur" alt={IMAGES.screws.alt} fill sizes="40vw" className="object-cover" />
            </div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7" data-reveal>
            <div className="relative bg-paper px-5 py-12 text-ink sm:px-10 sm:py-14 lg:sticky lg:top-28">
              <ScallopEdge side="top" className="text-char-2" />
              <ScallopEdge side="bottom" className="text-char-2" />
              <h3 className="display text-center text-[clamp(2.75rem,11vw,3.5rem)]">Common repairs</h3>
              <ul className="mt-10 space-y-6">
                {PROBLEMS.map((p) => (
                  <li key={p.id}>
                    <Link href={`/book?problem=${p.id}`} className="group block">
                      <span className="flex items-baseline gap-3">
                        <span className="text-[1.1875rem] font-bold leading-tight group-hover:underline">{p.title}</span>
                        <span aria-hidden className="min-w-6 flex-1 -translate-y-1 border-b-4 border-dotted border-paper-3" />
                        <span className="inline-flex shrink-0 items-center gap-1 text-[0.9375rem] font-bold">
                          Book <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                        </span>
                      </span>
                      <span className="mt-1 block max-w-[38ch] text-[0.9375rem] leading-snug text-muted">{p.desc}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-10 text-center text-[0.9375rem] text-muted">
                Price and time depend on the phone. We tell you both after checking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sales: one large photograph, spare text. */}
      <section id="sales" aria-labelledby="sales-h" className="bg-paper py-24 text-ink lg:py-36">
        <div className="wrap grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="relative aspect-[4/3] overflow-hidden lg:col-span-7 lg:aspect-[5/4]" data-reveal>
            <Image src={IMAGES.iphones.src} placeholder="blur" alt={IMAGES.iphones.alt} fill sizes="(min-width: 1024px) 58vw, 100vw" className="object-cover" />
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <h2 id="sales-h" className="display text-[clamp(3.25rem,14vw,4.5rem)] lg:text-[clamp(4.5rem,6vw,6.5rem)]" data-reveal>
              {sales.title}
            </h2>
            <p className="mt-6 text-[1.125rem] leading-relaxed" data-reveal>
              {sales.description}
            </p>
            <ul className="mt-8 space-y-4" data-reveal>
              {sales.items.map((item) => (
                <li key={item.name} className="bg-paper-2 px-5 py-4">
                  <span className="block font-bold">{item.name}</span>
                  <span className="block text-[0.9375rem] text-muted">{item.note}</span>
                </li>
              ))}
            </ul>
            <a
              href={getQuickWhatsAppUrl(sales.topic)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-char mt-8 min-h-16 w-full justify-between px-6"
              data-reveal
            >
              Ask what&rsquo;s in stock <WhatsAppIcon className="text-whatsapp" />
            </a>
          </div>
        </div>
      </section>

      {/* Accessories: the whole field turns orange. */}
      <section id="accessories" aria-labelledby="acc-h" className="bg-brand py-24 text-ink lg:py-36">
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <h2 id="acc-h" className="display text-[clamp(3.25rem,14vw,4.5rem)] lg:text-[clamp(4.5rem,6.6vw,7rem)]" data-reveal>
              {accessories.title}
            </h2>
            <p className="mt-6 max-w-[32rem] text-[1.125rem] font-medium leading-relaxed" data-reveal>
              {accessories.description}
            </p>
            <ul className="mt-10 space-y-1.5">
              {accessories.items.map((item, i) => (
                <li
                  key={item.name}
                  data-reveal
                  style={{ "--d": `${i * 60}ms` } as React.CSSProperties}
                  className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 bg-brand-deep/35 px-5 py-4"
                >
                  <span className="text-[1.1875rem] font-bold">{item.name}</span>
                  <span className="text-[0.9375rem] font-medium">{item.note}</span>
                </li>
              ))}
            </ul>
            <a
              href={getQuickWhatsAppUrl(accessories.topic)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-char mt-8"
              data-reveal
            >
              <WhatsAppIcon className="text-whatsapp" /> Ask for your model
            </a>
          </div>
          <div className="grid gap-1.5 lg:col-span-5 lg:col-start-8" data-reveal>
            <div className="relative aspect-square overflow-hidden">
              <Image src={IMAGES.earbuds.src} placeholder="blur" alt={IMAGES.earbuds.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              <div className="relative aspect-square overflow-hidden">
                <Image src={IMAGES.flatlay.src} placeholder="blur" alt={IMAGES.flatlay.alt} fill sizes="(min-width: 1024px) 20vw, 50vw" className="object-cover" />
              </div>
              <div className="relative aspect-square overflow-hidden">
                <Image src={IMAGES.charger.src} placeholder="blur" alt={IMAGES.charger.alt} fill sizes="(min-width: 1024px) 20vw, 50vw" className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Faq />
      <FinalCta />
    </>
  );
}
