"use client";

import { useId, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { IMAGES, PILLARS } from "@/lib/constants";
import { getQuickWhatsAppUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/Icons";

const TAB_LABEL: Record<string, string> = { repairs: "Service", sales: "Sales", accessories: "Accessories" };

/** Square plate on the left, tabs and spare text on the right. */
export function ServicesShowcase() {
  const id = useId();
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: React.KeyboardEvent, i: number) => {
    let next = -1;
    if (e.key === "ArrowRight") next = (i + 1) % PILLARS.length;
    if (e.key === "ArrowLeft") next = (i - 1 + PILLARS.length) % PILLARS.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = PILLARS.length - 1;
    if (next >= 0) {
      e.preventDefault();
      setActive(next);
      tabs.current[next]?.focus();
    }
  };

  return (
    <section aria-labelledby={`${id}-h`} className="bg-paper py-24 text-ink lg:py-36">
      <div className="wrap grid gap-x-16 gap-y-10 lg:grid-cols-2 lg:grid-rows-[auto_1fr]">
        <h2
          id={`${id}-h`}
          className="display text-[clamp(3rem,12vw,4.25rem)] lg:col-start-2 lg:row-start-1 lg:text-[clamp(4rem,5.6vw,5.75rem)]"
          data-reveal
        >
          Everything your phone needs
        </h2>

        {/* Square plate */}
        <div className="relative aspect-square overflow-hidden bg-paper-2 lg:col-start-1 lg:row-span-2 lg:row-start-1" data-reveal>
          {PILLARS.map((p, i) => (
            <Image
              key={p.id}
              src={IMAGES[p.image].src} placeholder="blur"
              alt={i === active ? IMAGES[p.image].alt : ""}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className={`object-cover transition-[opacity,transform] duration-700 ease-[var(--ease-out-quart)] ${
                i === active ? "scale-100 opacity-100" : "scale-[1.04] opacity-0"
              }`}
            />
          ))}
        </div>

        <div className="flex flex-col lg:col-start-2 lg:row-start-2">
          <div
            role="tablist"
            aria-label="Services"
            className="flex flex-wrap gap-1.5"
            data-reveal
            style={{ "--d": "80ms" } as React.CSSProperties}
          >
            {PILLARS.map((p, i) => (
              <button
                key={p.id}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                role="tab"
                id={`${id}-tab-${p.id}`}
                aria-selected={i === active}
                aria-controls={`${id}-panel-${p.id}`}
                tabIndex={i === active ? 0 : -1}
                onClick={() => setActive(i)}
                onKeyDown={(e) => onKey(e, i)}
                className={`min-h-12 px-5 text-[1.0625rem] font-bold transition-colors ${
                  i === active ? "bg-char text-paper" : "bg-paper-2 text-ink hover:bg-paper-3"
                }`}
              >
                {TAB_LABEL[p.id]}
              </button>
            ))}
          </div>

          {PILLARS.map((p, i) => (
            <div
              key={p.id}
              role="tabpanel"
              id={`${id}-panel-${p.id}`}
              aria-labelledby={`${id}-tab-${p.id}`}
              hidden={i !== active}
              className="mt-10 flex flex-1 flex-col"
            >
              <h3 className="text-[1.75rem] font-bold leading-tight sm:text-[2rem]">{p.title}</h3>
              <p className="mt-3 max-w-[36rem] text-[1.0625rem] leading-relaxed">{p.description}</p>
              <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                {p.items.map((item) => (
                  <li key={item.name} className="leading-snug">
                    <span className="block font-bold">{item.name}</span>
                    <span className="block text-[0.9375rem] text-muted">{item.note}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-10 grid gap-2 sm:grid-cols-2 lg:mt-auto lg:pt-10">
                {p.id === "repairs" ? (
                  <Link href="/book" className="btn btn-char min-h-16 justify-between px-6 text-[1.0625rem]">
                    Book a repair <ArrowRight aria-hidden />
                  </Link>
                ) : (
                  <Link href={`/services#${p.id}`} className="btn btn-char min-h-16 justify-between px-6 text-[1.0625rem]">
                    More about {TAB_LABEL[p.id].toLowerCase()} <ArrowRight aria-hidden />
                  </Link>
                )}
                <a
                  href={getQuickWhatsAppUrl(p.topic)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-paper min-h-16 justify-between px-6 text-[1.0625rem]"
                >
                  Ask on WhatsApp <WhatsAppIcon />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
