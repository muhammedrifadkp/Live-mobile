import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { IMAGES, ML, PROBLEMS } from "@/lib/constants";
import { getQuickWhatsAppUrl } from "@/lib/whatsapp";

/** "What's wrong with your phone?" Each problem opens the booking form with it filled in. */
export function ProblemGrid() {
  return (
    <section id="problems" aria-labelledby="problems-h" className="bg-char py-24 text-paper lg:py-36">
      <div className="wrap">
        <h2 id="problems-h" className="display text-[clamp(2.5rem,11.6vw,4.5rem)] lg:text-[clamp(4.5rem,6.6vw,7rem)]" data-reveal>
          What&rsquo;s wrong with your phone?
        </h2>

        <div className="mt-10 grid gap-10 lg:mt-16 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4" data-reveal style={{ "--d": "80ms" } as React.CSSProperties}>
            <p lang="ml" className="text-[1.5rem] font-semibold leading-snug sm:text-[1.75rem]">
              {ML.problems}
            </p>
            <p className="mt-4 max-w-sm text-[1.0625rem] leading-relaxed text-paper/85">
              Pick the closest match and the booking form opens with it filled in.
            </p>
            <p className="mt-6 text-[1.0625rem]">
              Something else?{" "}
              <a
                href={getQuickWhatsAppUrl("a problem with my phone")}
                target="_blank"
                rel="noopener noreferrer"
                className="link font-semibold text-brand"
              >
                Describe it on WhatsApp
              </a>
            </p>
            <div className="relative mt-10 hidden aspect-[4/5] overflow-hidden lg:block">
              <Image src={IMAGES.bench.src} placeholder="blur" alt={IMAGES.bench.alt} fill sizes="30vw" className="object-cover" />
            </div>
          </div>

          <ul className="grid gap-1.5 sm:grid-cols-2 lg:col-span-8">
            {PROBLEMS.map((p, i) => (
              <li key={p.id} data-reveal style={{ "--d": `${(i % 2) * 70 + Math.floor(i / 2) * 50}ms` } as React.CSSProperties}>
                <Link
                  href={`/book?problem=${p.id}`}
                  className="group flex h-full min-h-[8.5rem] flex-col justify-between gap-4 bg-char-2 p-5 transition-[background-color,transform] duration-200 hover:-translate-y-1 hover:bg-char-3 sm:p-6"
                >
                  <span className="flex items-start justify-between gap-4">
                    <span className="text-[1.375rem] font-bold leading-tight">{p.title}</span>
                    <ArrowUpRight
                      aria-hidden
                      className="h-6 w-6 shrink-0 text-brand transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </span>
                  <span className="text-[0.9375rem] leading-snug text-fog">{p.desc}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
