"use client";

import { useEffect, useRef, useState } from "react";
import { ML, STEPS } from "@/lib/constants";
import { ScrollPhone } from "./ScrollPhone";

const ORDER = ["First", "Then", "Last"];
/** Desktop: share of the pinned scroll that holds the first frame, and the last frame. */
const DESKTOP_HOLD = 0.18;
const DESKTOP_END_HOLD = 0.1;

/**
 * How it works: a cracked phone is repaired and switched on as the visitor scrolls past the
 * three steps. The video stays pinned (left on desktop, top on phones) while the steps scroll.
 */
export function HowItWorks() {
  const stepsRef = useRef<HTMLOListElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const ol = stepsRef.current;
      const grid = gridRef.current;
      const pin = pinRef.current;
      if (!ol || !grid || !pin) return;
      const vh = window.innerHeight;
      const clamp = (n: number) => Math.min(1, Math.max(0, n));

      let p: number;
      if (window.matchMedia("(min-width: 1024px)").matches) {
        // Desktop: play only while the phone is pinned. 0 the moment it pins, 1 when it unpins…
        const g = grid.getBoundingClientRect();
        const pinTop = parseFloat(getComputedStyle(pin).top) || 0;
        const pinned = clamp((pinTop - g.top) / Math.max(1, g.height - pin.offsetHeight));
        // …with the cracked phone held for the first part, so it settles before the repair starts.
        p = clamp((pinned - DESKTOP_HOLD) / (1 - DESKTOP_HOLD - DESKTOP_END_HOLD));
      } else {
        // Phones: 0 when the first step reaches the middle of the screen, 1 when the last one leaves it.
        const r = ol.getBoundingClientRect();
        p = clamp((vh * 0.55 - r.top) / Math.max(1, r.height - vh * 0.35));
      }
      setProgress(p);

      // The step whose text is nearest the middle of the screen is the active one.
      let current = 0;
      ol.querySelectorAll("li").forEach((li, i) => {
        if (li.getBoundingClientRect().top < vh * 0.6) current = i;
      });
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section aria-labelledby="how-h" className="bg-video py-24 text-paper lg:py-36">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
          <h2 id="how-h" className="display text-[clamp(3.25rem,14vw,4.5rem)] lg:text-[clamp(4.5rem,7vw,7.5rem)]" data-reveal>
            How it works
          </h2>
          <p lang="ml" className="text-[1.375rem] font-semibold sm:text-[1.625rem]" data-reveal style={{ "--d": "80ms" } as React.CSSProperties}>
            {ML.steps}
          </p>
        </div>

        <div ref={gridRef} className="mt-8 grid lg:mt-4 lg:grid-cols-12 lg:gap-8">
          {/* Pinned video: top of the screen on phones, left column on desktop. */}
          <div ref={pinRef} className="sticky top-[4.5rem] z-10 -mx-4 bg-video px-4 sm:-mx-6 sm:px-6 lg:col-span-5 lg:mx-0 lg:h-[calc(100svh-4.5rem)] lg:bg-transparent lg:px-0">
            <div className="flex h-[44svh] items-center justify-center py-2 lg:h-full lg:py-8">
              <ScrollPhone progress={progress} />
            </div>
          </div>

          <ol ref={stepsRef} className="lg:col-span-6 lg:col-start-7">
            {STEPS.map((step, i) => (
              <li
                key={step.title}
                aria-current={i === active ? "step" : undefined}
                className="flex min-h-[62svh] flex-col justify-center py-10 lg:min-h-[80svh] lg:py-16"
              >
                <p
                  aria-hidden
                  className={`display text-[4.5rem] transition-colors duration-300 lg:text-[7.5rem] ${
                    i === active ? "text-brand" : "text-paper"
                  }`}
                >
                  {ORDER[i]}
                </p>
                <h3 className="mt-3 text-[1.75rem] font-bold leading-tight sm:text-[2rem]">{step.title}</h3>
                <p className="mt-3 max-w-[30rem] text-[1.0625rem] leading-relaxed text-paper/85">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
