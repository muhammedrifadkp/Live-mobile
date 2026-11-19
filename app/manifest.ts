import type { MetadataRoute } from "next";
import { BUSINESS } from "@/lib/constants";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${BUSINESS.name}, ${BUSINESS.tagline}`,
    short_name: BUSINESS.name,
    description: BUSINESS.summary,
    start_url: "/",
    display: "standalone",
    background_color: "#161311",
    theme_color: "#161311",
    icons: [
      { src: "/logo.png", sizes: "512x512", type: "image/png" },
      { src: "/icon.png", sizes: "192x192", type: "image/png" },
    ],
  };
}
