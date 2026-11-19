import type { NextConfig } from "next";

// Files in /public aren't content-hashed: cache them for a day and refresh in the background,
// so a replaced file with the same name still updates.
const MEDIA_CACHE = "public, max-age=86400, stale-while-revalidate=604800";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    // All photos are local (public/images, imported in lib/constants.ts), so no remote hosts are needed.
    qualities: [75],
    minimumCacheTTL: 2678400,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
      { source: "/scroll/:path*", headers: [{ key: "Cache-Control", value: MEDIA_CACHE }] },
      { source: "/images/:path*", headers: [{ key: "Cache-Control", value: MEDIA_CACHE }] },
      { source: "/logo.png", headers: [{ key: "Cache-Control", value: MEDIA_CACHE }] },
    ];
  },
};

export default nextConfig;
