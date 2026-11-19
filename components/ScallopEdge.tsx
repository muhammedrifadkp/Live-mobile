import { useId } from "react";

/**
 * A row of half-circles in the ground colour, laid over the top or bottom edge of a paper
 * sheet so the edge reads as scalloped. `className` sets the ground colour (text-*).
 */
export function ScallopEdge({ side, className = "text-char" }: { side: "top" | "bottom"; className?: string }) {
  const id = useId();
  return (
    <svg
      aria-hidden
      className={`pointer-events-none absolute inset-x-0 h-[9px] w-full ${side === "top" ? "top-0" : "bottom-0"} ${className}`}
      preserveAspectRatio="none"
    >
      <defs>
        <pattern id={id} width="18" height="9" patternUnits="userSpaceOnUse">
          <circle cx="9" cy={side === "top" ? 0 : 9} r="9" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="9" fill={`url(#${id})`} />
    </svg>
  );
}
