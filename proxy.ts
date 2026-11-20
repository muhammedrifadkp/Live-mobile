import { NextResponse, type NextRequest } from "next/server";
import { PAUSED_PATH, SITE_PAUSED } from "@/lib/paused";

/**
 * While the site is paused (lib/paused.ts), every request is answered with the "Contact Rifad"
 * screen, whatever the URL. The address bar keeps the visitor's URL.
 */
export function proxy(request: NextRequest) {
  if (!SITE_PAUSED) return NextResponse.next();
  return NextResponse.rewrite(new URL(PAUSED_PATH, request.url));
}

export const config = {
  // Everything except Next's build files (the paused screen's CSS, JS and fonts), its dev-server
  // endpoints, robots.txt and the share image (which shows "Contact Rifad" while paused).
  // Photos, videos and /_next/image are paused too.
  matcher: ["/((?!_next/static|_next/hmr|_next/webpack-hmr|__nextjs|robots\\.txt|opengraph-image).*)"],
};
