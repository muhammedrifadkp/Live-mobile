import { notFound } from "next/navigation";
import { WhatsAppIcon } from "@/components/Icons";
import { RIFAD_WHATSAPP, SITE_PAUSED } from "@/lib/paused";

/** The only screen while the site is paused; proxy.ts sends every URL here. See lib/paused.ts. */
export default function Paused() {
  if (!SITE_PAUSED) notFound();

  return (
    <main
      id="main"
      className="flex min-h-svh flex-1 items-center bg-char text-paper"
      style={{
        paddingTop: "max(3rem, env(safe-area-inset-top))",
        paddingBottom: "max(3rem, env(safe-area-inset-bottom))",
      }}
    >
      <div className="wrap max-w-[40rem]">
        <h1 className="display text-[clamp(4rem,19vw,7.5rem)]">Contact Rifad</h1>
        <p className="mt-6 max-w-[30rem] text-[1.125rem] leading-relaxed text-fog">
          This website is temporarily unavailable. Message Rifad on WhatsApp:
        </p>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {RIFAD_WHATSAPP.map((wa) => (
            <li key={wa.number}>
              <a
                href={wa.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp w-full text-[1.0625rem] tabular-nums"
              >
                <WhatsAppIcon />
                <span className="sr-only">WhatsApp </span>
                <span translate="no">{wa.display}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
