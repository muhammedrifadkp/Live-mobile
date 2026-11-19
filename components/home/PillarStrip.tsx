import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PILLARS } from "@/lib/constants";

/** The three words from the shop's sign, Sales | Service | Accessories, set as a full orange band. */
export function PillarStrip() {
  const order = ["sales", "repairs", "accessories"] as const;
  const pillars = order.map((id) => PILLARS.find((p) => p.id === id)!);

  return (
    <section aria-label="Sales, service and accessories" className="bg-brand text-ink">
      <ul className="wrap grid py-6 lg:grid-cols-[1fr_1fr_1.4fr] lg:gap-10 lg:py-14">
        {pillars.map((p, i) => (
          <li key={p.id} data-reveal style={{ "--d": `${i * 80}ms` } as React.CSSProperties}>
            <Link
              href={`/services#${p.id}`}
              className="group flex items-end justify-between gap-4 py-4 transition-transform duration-200 hover:-translate-y-1 md:grid md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_auto] md:gap-8 lg:flex lg:flex-col lg:items-start lg:gap-4 lg:py-0"
            >
              <span className="min-w-0 md:contents lg:block">
                <h2 className="display text-[clamp(3.25rem,15vw,5rem)] md:text-[4.25rem] lg:text-[clamp(3.5rem,5.6vw,5.75rem)]">{p.word}</h2>
                <span className="mt-2 block max-w-[24rem] text-[1rem] font-semibold leading-snug md:mt-0 md:pb-2 lg:mt-4 lg:pb-0 lg:text-[1.0625rem]">
                  {p.short}
                </span>
              </span>
              <ArrowUpRight
                aria-hidden
                className="mb-1 h-8 w-8 shrink-0 transition-transform duration-200 group-hover:-translate-y-1 group-hover:translate-x-1 lg:mb-0 lg:mt-5"
              />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
