import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { BUSINESS } from "@/lib/constants";

export const alt = `${BUSINESS.name}, ${BUSINESS.tagline}, ${BUSINESS.city}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Loads a Google font, subset to `text`; returns null if offline so the build never fails. */
async function loadFont(family: string, weight: number, text: string): Promise<ArrayBuffer | null> {
  try {
    const css = await (
      await fetch(`https://fonts.googleapis.com/css2?family=${family}:wght@${weight}&text=${encodeURIComponent(text)}`)
    ).text();
    const src = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/);
    if (!src) return null;
    const res = await fetch(src[1]);
    return res.ok ? await res.arrayBuffer() : null;
  } catch {
    return null;
  }
}

export default async function OpengraphImage() {
  const lines = ["LIVE MOBILE", "SALES · SERVICE · ACCESSORIES"];
  const small = [BUSINESS.tagline, `${BUSINESS.address.area}, ${BUSINESS.city}  ·  ${BUSINESS.phones[0].display}`];
  const [displayFont, textFont] = await Promise.all([
    loadFont("Big+Shoulders", 800, lines.join("")),
    loadFont("Public+Sans", 600, small.join("")),
  ]);
  const logo = `data:image/png;base64,${(await readFile(join(process.cwd(), "public/logo.png"))).toString("base64")}`;
  const fonts = [
    ...(displayFont ? [{ name: "Display", data: displayFont, weight: 800 as const, style: "normal" as const }] : []),
    ...(textFont ? [{ name: "Text", data: textFont, weight: 600 as const, style: "normal" as const }] : []),
  ];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#161311",
          color: "#F5F1EB",
          padding: "64px 72px",
          alignItems: "center",
          gap: 64,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- next/og renders plain <img> */}
        <img src={logo} width={300} height={300} alt="" />
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <div style={{ fontFamily: "Display", fontSize: 140, fontWeight: 800, lineHeight: 0.9, letterSpacing: -1 }}>
            {lines[0]}
          </div>
          <div style={{ fontFamily: "Text", fontSize: 40, fontWeight: 600, marginTop: 22, color: "#F26B1D" }}>{small[0]}</div>
          <div style={{ fontFamily: "Display", fontSize: 46, fontWeight: 800, marginTop: 30, letterSpacing: 1 }}>{lines[1]}</div>
          <div style={{ fontFamily: "Text", fontSize: 30, fontWeight: 600, marginTop: 34, color: "#B9B0A7" }}>{small[1]}</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: fonts.length ? fonts : undefined,
    },
  );
}
