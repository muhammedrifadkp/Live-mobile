"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp, Heart, MessageCircle, Music2, Pause, Play, Send, Volume2, VolumeX, X } from "lucide-react";
import { BUSINESS, REELS } from "@/lib/constants";
import { getQuickWhatsAppUrl } from "@/lib/whatsapp";
import { LogoMark } from "@/components/Logo";

const LIKES_KEY = "lm-reel-likes";

function readLikes(): string[] {
  try {
    return JSON.parse(localStorage.getItem(LIKES_KEY) ?? "[]");
  } catch {
    return [];
  }
}

/**
 * Full-screen reels viewer that behaves like Instagram Reels: vertical swipe (scroll-snap), tap to
 * pause, double-tap to like, like / comment / share on the right, follow next to the handle.
 * Likes are kept in this browser only; no counts are shown (they would be made up).
 */
export function ReelViewer({ start, onClose }: { start: number; onClose: () => void }) {
  const [active, setActive] = useState(start);
  const [muted, setMuted] = useState(false);
  const [paused, setPaused] = useState(false);
  const [likes, setLikes] = useState<string[]>(readLikes);
  const [burst, setBurst] = useState<{ id: string; key: number } | null>(null);
  const [toast, setToast] = useState("");
  const [progress, setProgress] = useState(0);

  const scroller = useRef<HTMLDivElement>(null);
  const slides = useRef<(HTMLDivElement | null)[]>([]);
  const videos = useRef<(HTMLVideoElement | null)[]>([]);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const tapTimer = useRef<number | null>(null);

  // Open on the chosen reel, lock page scroll, put focus in the dialog and give it back on close.
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    slides.current[start]?.scrollIntoView({ block: "start" });
    document.body.style.overflow = "hidden";
    closeBtn.current?.focus();
    return () => {
      document.body.style.overflow = "";
      opener?.focus();
    };
  }, [start]);

  // Track which reel fills the screen.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setActive(Number((e.target as HTMLElement).dataset.index));
            setPaused(false);
            setProgress(0);
          }
        }
      },
      { root: scroller.current, threshold: 0.6 },
    );
    slides.current.forEach((s) => s && io.observe(s));
    return () => io.disconnect();
  }, []);

  // Play the active reel (with sound if allowed), pause the rest.
  useEffect(() => {
    videos.current.forEach((v, i) => {
      if (!v) return;
      if (i === active) {
        v.muted = muted;
        v.play().catch(() => {
          // Browser refused sound: fall back to muted autoplay, like Instagram does.
          v.muted = true;
          setMuted(true);
          v.play().catch(() => {});
        });
      } else {
        v.pause();
      }
    });
  }, [active, muted]);

  const go = useCallback((delta: number) => {
    const next = Math.min(REELS.length - 1, Math.max(0, active + delta));
    slides.current[next]?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [active]);

  const togglePlay = useCallback(() => {
    const v = videos.current[active];
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => {});
      setPaused(false);
    } else {
      v.pause();
      setPaused(true);
    }
  }, [active]);

  const setLiked = useCallback((id: string, value: boolean) => {
    setLikes((cur) => {
      const next = value ? [...new Set([...cur, id])] : cur.filter((x) => x !== id);
      try {
        localStorage.setItem(LIKES_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  const likeWithBurst = (id: string) => {
    setLiked(id, true);
    setBurst((prev) => ({ id, key: (prev?.key ?? 0) + 1 }));
  };

  // Single tap = play/pause, double tap = like (Instagram behaviour).
  const onTap = (id: string) => {
    if (tapTimer.current) {
      window.clearTimeout(tapTimer.current);
      tapTimer.current = null;
      likeWithBurst(id);
      return;
    }
    tapTimer.current = window.setTimeout(() => {
      tapTimer.current = null;
      togglePlay();
    }, 260);
  };

  const share = async (reel: (typeof REELS)[number]) => {
    const url = `${location.origin}/#reel-${reel.id}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: `${BUSINESS.name} reel`, text: reel.caption, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setToast("Link copied");
    } catch {
      /* share sheet dismissed */
    }
  };

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(""), 1800);
    return () => window.clearTimeout(t);
  }, [toast]);

  // Keyboard: Esc closes, arrows move, space pauses, M mutes, L likes.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowDown" || e.key === "j") {
        e.preventDefault();
        go(1);
      } else if (e.key === "ArrowUp" || e.key === "k") {
        e.preventDefault();
        go(-1);
      } else if (e.key === " " && tag !== "BUTTON" && tag !== "A") {
        e.preventDefault();
        togglePlay();
      }
      else if (e.key === "m") setMuted((m) => !m);
      else if (e.key === "l") likeWithBurst(REELS[active].id);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  });

  const railBtn =
    "flex flex-col items-center gap-1 text-[0.75rem] font-semibold text-white transition-transform active:scale-90 [&_svg]:h-7 [&_svg]:w-7 [&_svg]:drop-shadow";

  return (
    <div role="dialog" aria-modal="true" aria-label="Live Mobile reels" className="fixed inset-0 z-[80] bg-black text-white" data-ui>
      {/* Top bar */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-center justify-between p-3 sm:p-4">
        <span className="text-[1.25rem] font-bold drop-shadow">Reels</span>
        <span className="pointer-events-auto flex gap-2">
          <button
            type="button"
            onClick={() => setMuted((m) => !m)}
            aria-label={muted ? "Turn sound on" : "Turn sound off"}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-black/45 hover:bg-black/70"
          >
            {muted ? <VolumeX className="h-5 w-5" aria-hidden /> : <Volume2 className="h-5 w-5" aria-hidden />}
          </button>
          <button
            ref={closeBtn}
            type="button"
            onClick={onClose}
            aria-label="Close reels"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-black/45 hover:bg-black/70"
          >
            <X className="h-6 w-6" aria-hidden />
          </button>
        </span>
      </div>

      {/* Up / down on larger screens */}
      <div className="absolute right-4 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-2 md:flex">
        <button type="button" onClick={() => go(-1)} disabled={active === 0} aria-label="Previous reel" className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30">
          <ChevronUp className="h-6 w-6" aria-hidden />
        </button>
        <button type="button" onClick={() => go(1)} disabled={active === REELS.length - 1} aria-label="Next reel" className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30">
          <ChevronDown className="h-6 w-6" aria-hidden />
        </button>
      </div>

      <div ref={scroller} className="h-full snap-y snap-mandatory overflow-y-scroll overscroll-contain [scrollbar-width:none]">
        {REELS.map((reel, i) => {
          const liked = likes.includes(reel.id);
          const near = Math.abs(i - active) <= 1;
          return (
            <div
              key={reel.id}
              ref={(el) => {
                slides.current[i] = el;
              }}
              data-index={i}
              className="flex h-[100dvh] snap-start snap-always items-center justify-center md:py-4"
            >
              <div className="relative h-full w-full overflow-hidden bg-neutral-900 md:aspect-[9/16] md:w-auto md:rounded-xl">
                <video
                  ref={(el) => {
                    videos.current[i] = el;
                  }}
                  src={`/reels/${reel.id}.mp4`}
                  poster={`/reels/${reel.id}.webp`}
                  loop
                  playsInline
                  preload={near ? "auto" : "none"}
                  muted={i !== active || muted}
                  onTimeUpdate={(e) => {
                    if (i === active) setProgress(e.currentTarget.currentTime / (e.currentTarget.duration || 1));
                  }}
                  onClick={() => onTap(reel.id)}
                  aria-label={reel.caption}
                  className="absolute inset-0 h-full w-full cursor-pointer object-cover"
                />

                {/* Paused icon */}
                {i === active && paused && (
                  <span aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <span className="flex h-20 w-20 items-center justify-center rounded-full bg-black/45">
                      <Play className="h-9 w-9 fill-current" />
                    </span>
                  </span>
                )}

                {/* Double-tap heart */}
                {burst?.id === reel.id && (
                  <span key={burst.key} aria-hidden className="reel-burst pointer-events-none absolute inset-0 flex items-center justify-center">
                    <Heart className="h-28 w-28 fill-[#ff3040] text-[#ff3040] drop-shadow-lg" />
                  </span>
                )}

                <span aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/75 to-transparent" />

                {/* Right rail */}
                <div className="absolute bottom-24 right-3 z-10 flex flex-col items-center gap-5">
                  <button type="button" onClick={() => (liked ? setLiked(reel.id, false) : likeWithBurst(reel.id))} aria-pressed={liked} aria-label={liked ? "Unlike" : "Like"} className={railBtn}>
                    <Heart className={liked ? "fill-[#ff3040] text-[#ff3040]" : ""} aria-hidden />
                    <span>{liked ? "Liked" : "Like"}</span>
                  </button>
                  <a href={getQuickWhatsAppUrl(`your reel: "${reel.caption}"`)} target="_blank" rel="noopener noreferrer" aria-label="Comment or ask about this repair on WhatsApp" className={railBtn}>
                    <MessageCircle aria-hidden />
                    <span>Comment</span>
                  </a>
                  <button type="button" onClick={() => share(reel)} aria-label="Share this reel" className={railBtn}>
                    <Send aria-hidden />
                    <span>Share</span>
                  </button>
                  <button type="button" onClick={togglePlay} aria-label={paused && i === active ? "Play" : "Pause"} className={railBtn}>
                    {paused && i === active ? <Play aria-hidden /> : <Pause aria-hidden />}
                  </button>
                </div>

                {/* Bottom: profile, follow, caption, audio */}
                <div className="absolute inset-x-0 bottom-0 z-10 p-4 pr-20">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-paper p-1.5">
                      <LogoMark className="h-full w-auto" />
                    </span>
                    <a href={BUSINESS.instagram.url} target="_blank" rel="noopener noreferrer" className="truncate text-[0.9375rem] font-bold hover:underline" translate="no">
                      {BUSINESS.instagram.handle.slice(1)}
                    </a>
                    <a
                      href={BUSINESS.instagram.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 rounded-lg border border-white/80 px-3 py-1 text-[0.875rem] font-semibold hover:bg-white hover:text-black"
                    >
                      Follow
                    </a>
                  </div>
                  <p className="mt-2.5 line-clamp-2 text-[0.9375rem] leading-snug">{reel.caption}</p>
                  <p className="mt-2 flex items-center gap-1.5 text-[0.8125rem] text-white/85">
                    <Music2 className="h-3.5 w-3.5" aria-hidden /> {BUSINESS.name} · Original audio
                  </p>
                </div>

                {/* Progress */}
                <div aria-hidden className="absolute inset-x-0 bottom-0 z-10 h-[3px] bg-white/25">
                  <div className="h-full bg-white" style={{ width: `${i === active ? progress * 100 : 0}%` }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div aria-live="polite" className="pointer-events-none absolute inset-x-0 bottom-28 z-30 flex justify-center">
        {toast && <span className="rounded-full bg-white px-4 py-2 text-[0.9375rem] font-semibold text-black">{toast}</span>}
      </div>
    </div>
  );
}
