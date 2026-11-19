import { BRAND_WALL, ML } from "@/lib/constants";
import { getQuickWhatsAppUrl } from "@/lib/whatsapp";

/** Brands as a wall of tall type: the names are the picture. */
export function Brands() {
  return (
    <section aria-labelledby="brands-h" className="bg-paper-2 py-24 text-ink lg:py-32">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
          <h2 id="brands-h" className="text-[1.75rem] font-bold leading-tight sm:text-[2.25rem]" data-reveal>
            Brands we service
          </h2>
          <p lang="ml" className="text-[1.375rem] font-semibold sm:text-[1.625rem]" data-reveal>
            {ML.brands}
          </p>
        </div>

        <ul className="display mt-8 flex flex-wrap gap-x-[0.3em] text-[clamp(2.6rem,11vw,3.75rem)] leading-[0.95] md:text-[clamp(3.75rem,7.4vw,7.25rem)]">
          {BRAND_WALL.map((brand, i) => (
            <li
              key={brand}
              translate="no"
              data-reveal
              style={{ "--d": `${(i % 6) * 40}ms` } as React.CSSProperties}
              className={`whitespace-nowrap ${i % 3 === 1 ? "text-muted" : "text-ink"}`}
            >
              {brand}
            </li>
          ))}
        </ul>

        <p className="mt-10 max-w-xl text-[1.0625rem] leading-relaxed">
          Don&rsquo;t see yours? We repair all brands.{" "}
          <a
            href={getQuickWhatsAppUrl("repairing my phone")}
            target="_blank"
            rel="noopener noreferrer"
            className="link font-bold"
          >
            Ask on WhatsApp
          </a>
          .
        </p>
      </div>
    </section>
  );
}
