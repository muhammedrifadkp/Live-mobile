"use client";

import { useEffect, useRef, useState } from "react";
import { SCROLL_VIDEO } from "@/lib/constants";

const pad = (n: number) => String(n).padStart(4, "0");
const EDGE_FADE =
  "linear-gradient(to right, transparent, #000 7%, #000 93%, transparent), linear-gradient(to bottom, transparent, #000 7%, #000 93%, transparent)";

/**
 * Scroll-scrubbed repair video, drawn frame by frame onto a canvas (smooth in both directions,
 * unlike seeking an MP4). `progress` (0–1) comes from the parent's scroll position.
 * Frames load only when the section comes near; until then (and with reduced motion or no JS)
 * the poster image shows instead.
 */
export function ScrollPhone({ progress }: { progress: number }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const lastDrawn = useRef(-1);
  const progressRef = useRef(progress);
  const [ready, setReady] = useState(false);
  const [reduced, setReduced] = useState(false);

  // Load the frame sequence once the section is within a screen of the viewport.
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-off read of a media query on mount
      setReduced(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const set = window.innerWidth < 768 ? SCROLL_VIDEO.mobile : SCROLL_VIDEO.desktop;
        const frames = Array.from({ length: SCROLL_VIDEO.frameCount }, (_, i) => {
          const img = new Image();
          img.decoding = "async";
          img.src = `${set.dir}/${pad(i + 1)}.webp`;
          return img;
        });
        framesRef.current = frames;
        // Show the canvas once the first frame is in; redraw as the rest stream in behind it.
        frames.forEach((img, i) => {
          img.onload = () => {
            if (i === 0) setReady(true);
            draw();
          };
        });
      },
      { rootMargin: "100% 0px" },
    );
    io.observe(wrap);
    return () => io.disconnect();
  }, []);

  // Draw the frame for the current scroll position (falls back to the nearest loaded one).
  function draw() {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const frames = framesRef.current;
    if (!canvas || !ctx || !frames.length) return;

    const target = Math.round(Math.min(1, Math.max(0, progressRef.current)) * (frames.length - 1));
    let i = target;
    while (i > 0 && !(frames[i].complete && frames[i].naturalWidth)) i--;
    if (i === lastDrawn.current) return;

    const img = frames[i];
    if (canvas.width !== img.naturalWidth) {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
    }
    ctx.drawImage(img, 0, 0);
    lastDrawn.current = i;
  }

  useEffect(() => {
    progressRef.current = progress;
    if (ready) draw();
  });

  return (
    <div
      ref={wrapRef}
      className="relative mx-auto h-full max-h-full w-auto max-w-full overflow-hidden"
      style={{
        aspectRatio: `${SCROLL_VIDEO.desktop.width} / ${SCROLL_VIDEO.desktop.height}`,
        // Feather all four edges into the section colour, so parts moving out of frame fade instead of being cut.
        maskImage: EDGE_FADE,
        WebkitMaskImage: EDGE_FADE,
        maskComposite: "intersect",
        WebkitMaskComposite: "source-in",
      }}
    >
      {/* Poster: first paint, no-JS and reduced-motion view. */}
      {/* eslint-disable-next-line @next/next/no-img-element -- static poster, same size as the frames */}
      <img
        src={reduced ? SCROLL_VIDEO.posterEnd : SCROLL_VIDEO.poster}
        alt={SCROLL_VIDEO.alt}
        width={SCROLL_VIDEO.desktop.width}
        height={SCROLL_VIDEO.desktop.height}
        loading="lazy"
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${ready ? "opacity-0" : "opacity-100"}`}
      />
      <canvas
        ref={canvasRef}
        aria-hidden
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${ready ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}
