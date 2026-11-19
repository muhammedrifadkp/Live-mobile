import Image from "next/image";
import { BUSINESS, FOUNDERS, ML } from "@/lib/constants";
import { InstagramIcon } from "@/components/Icons";

/** The two founders, photographed in the shop. `tone` is the section ground. */
export function Founders({ tone = "paper" }: { tone?: "paper" | "char" }) {
  const dark = tone === "char";
  const ground = dark ? "bg-char text-paper" : "bg-paper text-ink";
  const soft = dark ? "text-fog" : "text-muted";
  const chip = dark ? "bg-char-3 text-paper hover:bg-[#40372f]" : "bg-paper-2 text-ink hover:bg-paper-3";

  return (
    <section aria-labelledby="founders-h" className={`${ground} py-24 lg:py-36`}>
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4 lg:pt-4">
          <h2 id="founders-h" className="display text-[clamp(3.25rem,14vw,4.5rem)] lg:text-[clamp(4.5rem,6vw,6.5rem)]" data-reveal>
            Meet the founders
          </h2>
          <p lang="ml" className="mt-6 text-[1.375rem] font-semibold leading-snug sm:text-[1.625rem]" data-reveal>
            {ML.founders}
          </p>
          <p className="mt-4 max-w-[26rem] text-[1.0625rem] leading-relaxed" data-reveal>
            {BUSINESS.name} is run by {FOUNDERS.map((f) => f.name).join(" and ")}. See the shop&rsquo;s latest repairs on
            Instagram.
          </p>
          <a
            href={BUSINESS.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-brand mt-8"
            data-reveal
          >
            <InstagramIcon /> <span translate="no">{BUSINESS.instagram.handle}</span>
          </a>
        </div>

        <ul className="grid gap-6 sm:grid-cols-2 lg:col-span-7 lg:col-start-6 lg:gap-8">
          {FOUNDERS.map((f, i) => (
            <li key={f.name} data-reveal style={{ "--d": `${i * 90}ms` } as React.CSSProperties} className={i === 1 ? "sm:mt-16" : ""}>
              <figure>
                <div className="relative aspect-[4/5] overflow-hidden bg-char-2">
                  <Image
                    src={f.photo}
                    alt={f.alt}
                    fill
                    sizes="(min-width: 1024px) 28vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-5 flex flex-wrap items-end justify-between gap-x-4 gap-y-3">
                  <span>
                    <span className="display block text-[2.75rem]">{f.name}</span>
                    <span className={`mt-1 block text-[0.9375rem] ${soft}`}>
                      {f.role} · {f.note}
                    </span>
                  </span>
                  <a
                    href={f.instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${f.name} on Instagram (${f.instagram.handle})`}
                    className={`inline-flex min-h-11 items-center gap-2 px-3.5 text-[0.9375rem] font-semibold transition-colors ${chip}`}
                  >
                    <InstagramIcon className="h-[1.125rem] w-[1.125rem]" />
                    <span translate="no">{f.instagram.handle}</span>
                  </a>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
