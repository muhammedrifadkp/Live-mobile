import { BUSINESS } from "@/lib/constants";

/**
 * The Live Mobile mark: "LM" with an orange phone outline behind the M.
 * Redrawn as a vector from the shop's Instagram logo (same proportions and colours), so it stays
 * sharp at any size. `tone` is the ground it sits on: letters are dark on light grounds, cream on dark.
 * The full round badge (with "LIVE MOBILE" under it) is public/logo.png; favicons are in app/.
 */
export function LogoMark({
  className = "h-10 w-auto",
  tone = "light",
  title,
}: {
  className?: string;
  tone?: "light" | "dark";
  title?: string;
}) {
  const letters = tone === "dark" ? "#F5F1EB" : "#3D3D39";
  return (
    <svg
      viewBox="0 0 260 245"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <rect x="119" y="13" width="129" height="219" rx="20" fill="none" stroke="#E06E1A" strokeWidth="10" />
      <rect x="161" y="29" width="40" height="6" rx="3" fill={letters} />
      <circle cx="182" cy="211" r="7" fill="none" stroke="#E06E1A" strokeWidth="3.5" />
      <path d="M7 52h28v109h49v22H7z" fill={letters} />
      <path d="M96 183V52h32l36 68 36-68h32v131h-26v-83l-42 72-42-72v83z" fill={letters} />
    </svg>
  );
}

/** Mark + wordmark, as used in the header and footer. */
export function Logo({ tone = "dark", showTagline = true }: { tone?: "dark" | "light"; showTagline?: boolean }) {
  const text = tone === "dark" ? "text-paper" : "text-ink";
  const sub = tone === "dark" ? "text-fog" : "text-muted";

  return (
    <span className="flex items-center gap-2.5">
      <LogoMark tone={tone} className="h-10 w-auto shrink-0" title="Live Mobile logo" />
      <span className="flex flex-col leading-none">
        <span translate="no" className={`display text-[1.75rem] tracking-[0.01em] ${text}`}>
          {BUSINESS.logoText}
        </span>
        {showTagline && <span className={`mt-1 text-[0.8125rem] font-semibold ${sub}`}>{BUSINESS.tagline}</span>}
      </span>
    </span>
  );
}
