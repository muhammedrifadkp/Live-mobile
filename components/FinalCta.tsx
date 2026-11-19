import Link from "next/link";
import { ML } from "@/lib/constants";
import { getQuickWhatsAppUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/Icons";

/** The question at both edges of a dark field; the two answers held in the middle. */
export function FinalCta() {
  const big = "display text-[clamp(4rem,17vw,6.25rem)] lg:text-[clamp(7rem,12.5vw,12rem)]";

  return (
    <section aria-labelledby="cta-h" className="bg-char text-paper">
      <div className="wrap flex min-h-[40rem] flex-col justify-between gap-12 py-12 text-center lg:min-h-[min(100svh,58rem)] lg:py-10">
        <h2 id="cta-h" className={big} data-reveal>
          Dead phone?
        </h2>

        <div className="mx-auto flex w-full max-w-[38rem] flex-col items-center" data-reveal style={{ "--d": "100ms" } as React.CSSProperties}>
          <div className="flex w-full flex-col items-center gap-3 sm:flex-row sm:gap-5">
            <Link href="/book" className="btn btn-brand min-h-14 w-full text-[1.125rem] sm:flex-1">
              Book a repair
            </Link>
            <span className="text-[1.0625rem] text-fog">or</span>
            <a
              href={getQuickWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp min-h-14 w-full text-[1.125rem] sm:flex-1"
            >
              <WhatsAppIcon /> WhatsApp us
            </a>
          </div>
          <p lang="ml" className="mt-6 text-[1.25rem] font-semibold">
            {ML.cta}
          </p>
          <p className="mt-2 text-[1rem] text-fog">Either way, your message goes straight to the shop.</p>
        </div>

        <p className={big} data-reveal style={{ "--d": "160ms" } as React.CSSProperties}>
          Make it live.
        </p>
      </div>
    </section>
  );
}
