"use client";

import { useCallback, useEffect, useState } from "react";
import { Play } from "lucide-react";
import { BUSINESS, REELS } from "@/lib/constants";
import { InstagramIcon } from "@/components/Icons";
import { LogoMark } from "@/components/Logo";
import { ReelViewer } from "./ReelViewer";

const HASH = "#reel-";

/** Reels row on the page; tapping one opens the full-screen, Instagram-style viewer. */
export function Reels() {
  const [open, setOpen] = useState<number | null>(null);

  // Deep link: /#reel-Video-19295 opens that reel.
  useEffect(() => {
    const fromHash = () => {
      if (!location.hash.startsWith(HASH)) return;
      const i = REELS.findIndex((r) => r.id === location.hash.slice(HASH.length));
      if (i >= 0) setOpen(i);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

  const close = useCallback(() => {
    setOpen(null);
    if (location.hash.startsWith(HASH)) history.replaceState(null, "", location.pathname + location.search);
  }, []);

  return (
    <section id="reels" aria-labelledby="reels-h" className="bg-char py-24 text-paper lg:py-36">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
          <div>
            <h2 id="reels-h" className="display text-[clamp(3.25rem,14vw,4.5rem)] lg:text-[clamp(4.5rem,7vw,7.5rem)]" data-reveal>
              Watch us work
            </h2>
            <p className="mt-4 max-w-[34rem] text-[1.0625rem] leading-relaxed text-paper/85" data-reveal>
              Real repairs from the shop floor, straight from our Instagram. Tap a reel to watch.
            </p>
          </div>

          {/* Profile row, Instagram style */}
          <div className="flex min-w-0 max-w-full items-center gap-3" data-reveal>
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-paper p-2.5 ring-2 ring-brand ring-offset-2 ring-offset-char">
              <LogoMark className="h-full w-auto" />
            </span>
            <span className="min-w-0 leading-tight">
              <span className="block truncate font-bold" translate="no">
                {BUSINESS.instagram.handle.slice(1)}
              </span>
              <span className="block truncate text-[0.875rem] text-fog">{BUSINESS.tagline}</span>
            </span>
            <a
              href={BUSINESS.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-brand ml-auto min-h-11 shrink-0 px-4 text-[0.9375rem] sm:ml-2"
            >
              <InstagramIcon /> Follow
            </a>
          </div>
        </div>
      </div>

      {/* Slow endless loop: two identical tracks, shifted by one track width. Pauses on hover/keyboard focus. */}
      <div className="reel-marquee mt-12 overflow-hidden">
        <div className="reel-track flex w-max">
          {[0, 1].map((copy) => (
            <ul key={copy} className="flex shrink-0 gap-3 pr-3" aria-hidden={copy === 1 || undefined}>
              {REELS.map((reel, i) => (
                <li key={reel.id} className="w-[46vw] max-w-[15rem] shrink-0 sm:w-[13rem]">
                  <button
                    type="button"
                    onClick={() => setOpen(i)}
                    tabIndex={copy === 1 ? -1 : undefined}
                    className="group relative block aspect-[9/16] w-full overflow-hidden bg-char-2 text-left"
                    aria-label={`Play reel: ${reel.caption}`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element -- pre-sized WebP poster */}
                    <img
                      src={`/reels/${reel.id}.webp`}
                      alt=""
                      width={540}
                      height={960}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent" />
                    <span aria-hidden className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/45 text-white">
                      <Play className="h-4 w-4 fill-current" />
                    </span>
                    <span className="absolute inset-x-3 bottom-3 line-clamp-3 text-[0.875rem] font-semibold leading-snug text-white">
                      {reel.caption}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      {open !== null && <ReelViewer start={open} onClose={close} />}
    </section>
  );
}
