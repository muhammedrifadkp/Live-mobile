import { Plus } from "lucide-react";
import { FAQS } from "@/lib/constants";
import { JsonLd } from "@/components/StructuredData";

const CARD = ["bg-paper", "bg-brand", "bg-paper-2"];

/**
 * Questions filed like index cards in a drawer. One open at a time (exclusive <details>).
 * `withSchema` adds FAQPage JSON-LD; keep it on one page (home) to avoid duplicates.
 */
export function Faq({ withSchema = false }: { withSchema?: boolean }) {
  return (
    <section aria-labelledby="faq-h" className="bg-char py-24 lg:py-36">
      {withSchema && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQS.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }}
        />
      )}
      <div className="wrap">
        <div className="lg:mx-auto lg:w-10/12">
          <h2 id="faq-h" className="display text-[clamp(3.25rem,14vw,4.5rem)] text-paper lg:text-[clamp(4.5rem,7vw,7.5rem)]" data-reveal>
            Good questions
          </h2>

          <div className="mt-12 pt-10 [--tab-w:7.5rem] sm:[--tab-w:11rem] lg:mt-16 lg:[--tab-w:12.5rem]" data-reveal>
            {FAQS.map((faq, i) => (
              <details
                key={faq.q}
                name="faq"
                open={i === 0}
                className={`group relative text-ink ${CARD[i % CARD.length]} ${i > 0 ? "mt-6" : ""}`}
                style={{ zIndex: i + 1 }}
              >
                <summary className="flex min-h-[5.5rem] cursor-pointer list-none items-center justify-between gap-5 px-5 py-5 focus-visible:outline-ink sm:px-8 [&::-webkit-details-marker]:hidden">
                  {/* Tab: one filled shape with the card. */}
                  <span
                    aria-hidden
                    className={`absolute -top-[2.375rem] flex h-10 w-[var(--tab-w)] items-center justify-center text-[0.9375rem] font-bold ${CARD[i % CARD.length]}`}
                    style={{
                      // Tabs step evenly from the left edge to the right edge of the card.
                      left: `calc(${i} * (100% - var(--tab-w)) / ${FAQS.length - 1})`,
                      clipPath: "polygon(12px 0, calc(100% - 12px) 0, 100% 100%, 0 100%)",
                    }}
                  >
                    {faq.topic}
                  </span>
                  <span className="text-[1.1875rem] font-semibold leading-snug sm:text-[1.375rem]">{faq.q}</span>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-char text-paper">
                    <Plus className="h-5 w-5 transition-transform duration-300 group-open:rotate-45" aria-hidden />
                  </span>
                </summary>
                <p className="max-w-[52ch] px-5 pb-9 text-[1.0625rem] leading-relaxed sm:px-8">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
