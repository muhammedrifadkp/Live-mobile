import Image from "next/image";
import { IMAGES, ML } from "@/lib/constants";
import { pageMetadata } from "@/lib/seo";
import { BookingFromParams } from "@/components/booking/BookingFromParams";
import { BreadcrumbData } from "@/components/StructuredData";

export const metadata = pageMetadata({
  title: "Book a Phone Repair in Kozhikode",
  description:
    "Book a mobile phone repair at Live Mobile, RP Mall, Mavoor Road, Kozhikode. Choose your phone, the problem and a time to visit; we confirm on WhatsApp.",
  path: "/book",
});

export default function BookPage() {
  return (
    <>
      <BreadcrumbData name="Book a Repair" path="/book" />
      <section className="relative isolate overflow-hidden bg-char text-paper">
        {/* Desktop: a dim photo fills the right of the band. Phones get straight to the form. */}
        <div className="absolute inset-y-0 right-0 -z-10 hidden w-[42%] lg:block" aria-hidden>
          <Image src={IMAGES.screws.src} placeholder="blur" alt="" fill preload sizes="42vw" className="object-cover brightness-[0.55]" />
        </div>
        <div className="wrap grid gap-6 pb-14 pt-12 lg:grid-cols-12 lg:gap-8 lg:pb-20 lg:pt-16">
          <div className="lg:col-span-6">
            <h1 className="rise display text-[clamp(3.75rem,17vw,5.5rem)] lg:text-[clamp(5.5rem,8vw,8rem)]">Book a repair</h1>
            <p
              style={{ "--d": "100ms" } as React.CSSProperties}
              className="rise mt-6 max-w-[30rem] text-[1.125rem] leading-relaxed text-paper/85 sm:text-[1.25rem]"
            >
              Four quick steps. At the end, WhatsApp opens with everything written for you; press send and we confirm
              your visit.
            </p>
            <p lang="ml" style={{ "--d": "80ms" } as React.CSSProperties} className="rise mt-4 text-[1.25rem] font-semibold">
              {ML.hero}
            </p>
          </div>
        </div>
      </section>

      <section aria-label="Booking" className="bg-paper py-14 text-ink lg:py-24">
        <div className="wrap">
          <BookingFromParams />
        </div>
      </section>
    </>
  );
}
