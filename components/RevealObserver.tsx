"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Fades [data-reveal] elements up as they scroll into view, once.
 * Elements already on screen when the page loads are left alone (no flash),
 * and without JavaScript everything simply stays visible.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)"));

    if (reduce || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }

    const fold = window.innerHeight * 0.92;
    const pending = els.filter((el) => {
      if (el.getBoundingClientRect().top < fold) {
        el.classList.add("is-in");
        return false;
      }
      return true;
    });

    root.classList.add("reveal-on");

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    pending.forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, [pathname]);

  return null;
}
