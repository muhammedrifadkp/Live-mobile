import Link from "next/link";
import type { Metadata } from "next";
import { getQuickWhatsAppUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="bg-char text-paper">
      <div className="wrap flex min-h-[70svh] flex-col justify-center py-20">
        <h1 className="display text-[clamp(4rem,18vw,6.5rem)] lg:text-[clamp(7rem,11vw,11rem)]">This page is dead</h1>
        <p className="mt-6 max-w-[34rem] text-[1.125rem] leading-relaxed text-paper/85">
          The link may be old or mistyped. Let&rsquo;s get you back to something that works.
        </p>
        <div className="mt-9 flex flex-wrap gap-2">
          <Link href="/" className="btn btn-brand">
            Back to home
          </Link>
          <Link href="/book" className="btn btn-smoke">
            Book a repair
          </Link>
          <a href={getQuickWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="btn btn-smoke">
            <WhatsAppIcon className="text-whatsapp" /> WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
