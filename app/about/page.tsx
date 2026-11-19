import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ABOUT, IMAGES, PILLARS } from "@/lib/constants";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/PageHeader";
import { LocationSection } from "@/components/Location";
import { Founders } from "@/components/Founders";
import { FinalCta } from "@/components/FinalCta";

export const metadata = pageMetadata({
  title: "About Live Mobile, RP Mall, Kozhikode",
  description:
    "Live Mobile is an all mobile service centre at RP Mall, Mavoor Road, Kozhikode, for phone repairs on every brand, new phones and accessories.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHeader title="About Live Mobile" crumb="About" path="/about" image="samsungBox" intro={ABOUT.intro} />

      {/* Story */}
      <section aria-labelledby="story-h" className="bg-paper py-24 text-ink lg:py-36">
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <h2 id="story-h" className="display text-[clamp(3.25rem,14vw,4.5rem)] lg:text-[clamp(4.5rem,6.4vw,7rem)]" data-reveal>
              In dead, out live
            </h2>
            <div className="relative mt-10 aspect-[4/5] overflow-hidden" data-reveal>
              <Image src={IMAGES.phoneInHand.src} placeholder="blur" alt={IMAGES.phoneInHand.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
            </div>
          </div>
          <div className="space-y-6 lg:col-span-6 lg:col-start-7 lg:pt-4">
            {ABOUT.story.map((para, i) => (
              <p
                key={i}
                data-reveal
                className={i === 0 ? "text-[1.375rem] font-semibold leading-snug sm:text-[1.625rem]" : "text-[1.125rem] leading-relaxed"}
              >
                {para}
              </p>
            ))}

            <ul className="mt-12! grid gap-1.5" data-reveal>
              {PILLARS.map((p) => (
                <li key={p.id}>
                  <Link
                    href={`/services#${p.id}`}
                    className="group flex items-center justify-between gap-4 bg-paper-2 px-5 py-5 transition-[background-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-paper-3"
                  >
                    <span>
                      <span className="display block text-[2.25rem]">{p.word}</span>
                      <span className="mt-1 block text-[0.9375rem] text-muted">{p.short}</span>
                    </span>
                    <ArrowUpRight aria-hidden className="h-7 w-7 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Founders tone="char" />

      {/* How we work */}
      <section aria-labelledby="values-h" className="bg-char-2 py-24 text-paper lg:py-36">
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <h2 id="values-h" className="display text-[clamp(3.25rem,14vw,4.5rem)] lg:text-[clamp(4.5rem,6.4vw,7rem)]" data-reveal>
              How we work
            </h2>
            <ul className="mt-10 lg:mt-14">
              {ABOUT.values.map((v, i) => (
                <li key={v.title} data-reveal style={{ "--d": `${i * 80}ms` } as React.CSSProperties} className="py-5 lg:py-7">
                  <h3 className="display text-[2.75rem] text-brand lg:text-[4rem]">{v.title}</h3>
                  <p className="mt-2 max-w-[32rem] text-[1.125rem] leading-relaxed lg:text-[1.25rem]">{v.text}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden lg:col-span-5 lg:aspect-auto" data-reveal>
            <Image src={IMAGES.bench.src} placeholder="blur" alt={IMAGES.bench.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      <LocationSection />
      <FinalCta />
    </>
  );
}
