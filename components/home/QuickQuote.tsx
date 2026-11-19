"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BRANDS, PRIMARY_PHONE, PROBLEMS } from "@/lib/constants";
import { buildQuoteMessage, getQuoteWhatsAppUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/Icons";
import { WaText } from "@/components/WaText";

/**
 * The hero's live thing: a paper job card. Pick the phone and what's wrong,
 * read the message as it will arrive at the shop, send it on WhatsApp.
 */
export function QuickQuote() {
  const id = useId();
  const [brand, setBrand] = useState<string>("");
  const [problems, setProblems] = useState<string[]>([]);

  const problemTitles = PROBLEMS.filter((p) => problems.includes(p.id)).map((p) => p.title);
  const message = buildQuoteMessage({ brand, problems: problemTitles });
  const waUrl = getQuoteWhatsAppUrl({ brand, problems: problemTitles });

  const bookParams = new URLSearchParams();
  if (brand) bookParams.set("brand", brand);
  if (problems[0]) bookParams.set("problem", problems.join(","));
  const bookHref = `/book${bookParams.size ? `?${bookParams}` : ""}`;

  const toggleProblem = (pid: string) =>
    setProblems((cur) => (cur.includes(pid) ? cur.filter((p) => p !== pid) : [...cur, pid]));

  return (
    <div className="w-full text-ink" aria-labelledby={`${id}-title`} role="region">
      <div className="notch-b bg-paper px-5 pb-6 pt-6 sm:px-7 sm:pt-7 lg:pt-6">
        <h2 id={`${id}-title`} className="display text-[2.5rem] sm:text-[2.75rem]">
          Quick repair quote
        </h2>
        <p className="mt-2 text-[0.9375rem] leading-snug text-muted">
          Pick your phone and what&rsquo;s wrong. We reply on WhatsApp.
        </p>

        <fieldset className="mt-5 lg:mt-4">
          <legend className="text-[0.9375rem] font-bold">Your phone</legend>
          <div className="mt-2.5 flex flex-wrap gap-1.5 lg:mt-2">
            {BRANDS.map((b) => (
              <button
                key={b}
                type="button"
                className="chip lg:min-h-10 lg:px-3 lg:text-[0.875rem]"
                aria-pressed={brand === b}
                onClick={() => setBrand((cur) => (cur === b ? "" : b))}
              >
                <span translate={b === "Other" ? undefined : "no"}>{b}</span>
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="mt-5 lg:mt-4">
          <legend className="text-[0.9375rem] font-bold">What&rsquo;s wrong?</legend>
          <div className="mt-2.5 flex flex-wrap gap-1.5 lg:mt-2">
            {PROBLEMS.map((p) => (
              <button
                key={p.id}
                type="button"
                className="chip lg:min-h-10 lg:px-3 lg:text-[0.875rem]"
                aria-pressed={problems.includes(p.id)}
                onClick={() => toggleProblem(p.id)}
              >
                {p.chip}
              </button>
            ))}
          </div>
        </fieldset>

        <div className="mt-6 lg:mt-5">
          <p id={`${id}-preview`} className="text-[0.8125rem] font-semibold text-muted">
            Your message
          </p>
          <div
            aria-labelledby={`${id}-preview`}
            className="relative mt-2 bg-paper-2 px-4 py-3 text-[0.9375rem] leading-snug lg:py-2.5 lg:text-[0.875rem]"
          >
            <WaText text={message} />
          </div>
        </div>
      </div>

      <div className="notch-t perf-x bg-paper px-5 pb-5 pt-5 sm:px-7 [--perf:var(--color-paper-3)]">
        <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp w-full text-[1.0625rem]">
          <WhatsAppIcon /> Send on WhatsApp
        </a>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-[0.875rem]">
          <span className="text-muted">
            To <span className="tabular-nums">{PRIMARY_PHONE.display}</span>
          </span>
          <Link href={bookHref} className="link inline-flex min-h-11 items-center gap-1 font-semibold">
            Book a visit instead <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </div>
  );
}
