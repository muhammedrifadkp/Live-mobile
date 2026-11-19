"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone, X } from "lucide-react";
import { NAV_LINKS, PRIMARY_PHONE } from "@/lib/constants";
import { getQuickWhatsAppUrl, telLink } from "@/lib/whatsapp";
import { Logo } from "@/components/Logo";
import { WhatsAppIcon } from "@/components/Icons";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const toggle = toggleRef.current;
    document.body.style.overflow = "hidden";
    panel?.querySelector<HTMLElement>("a")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggle?.focus();
        return;
      }
      // Keep focus inside the menu (toggle button + panel).
      if (e.key === "Tab" && panel && toggle) {
        const items = [toggle, ...panel.querySelectorAll<HTMLElement>("a, button")];
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-50 bg-char text-paper">
      <div className="wrap flex h-[4.5rem] items-center justify-between gap-6">
        <Link href="/" aria-label="Live Mobile, home" className="shrink-0">
          <Logo tone="dark" />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.filter((l) => l.href !== "/book").map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={`py-2 text-[0.9375rem] font-semibold transition-colors hover:text-paper ${
                isActive(link.href) ? "text-brand" : "text-fog"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <a href={telLink(PRIMARY_PHONE.e164)} className="btn btn-smoke min-h-11 px-4 text-[0.9375rem]">
            <Phone aria-hidden />
            <span className="tabular-nums">{PRIMARY_PHONE.display}</span>
          </a>
          <Link href="/book" className="btn btn-brand min-h-11 px-5 text-[0.9375rem]">
            Book a repair
          </Link>
        </div>

        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="-mr-2 flex h-12 w-12 items-center justify-center text-paper transition-colors hover:bg-char-3 lg:hidden"
        >
          {open ? <X className="h-7 w-7" aria-hidden /> : <Menu className="h-7 w-7" aria-hidden />}
        </button>
      </div>

      {open && (
        <div
          id="mobile-menu"
          ref={panelRef}
          className="fixed inset-x-0 bottom-0 top-[4.5rem] z-50 flex flex-col overflow-y-auto overscroll-contain bg-char-2 px-4 pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-4 sm:px-6 lg:hidden"
        >
          <nav aria-label="Mobile" className="flex flex-col">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`display py-3 text-[2.75rem] transition-colors ${
                  isActive(link.href) ? "text-brand" : "text-paper hover:text-brand"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto grid grid-cols-2 gap-2 pt-8">
            <a href={telLink(PRIMARY_PHONE.e164)} className="btn btn-smoke">
              <Phone aria-hidden /> Call
            </a>
            <a href={getQuickWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
              <WhatsAppIcon /> WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
