import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Ikona na ekran główny iOS — orzeł na węglowym tle
export default async function AppleIcon() {
  const data = await readFile(join(process.cwd(), "public/logo-mark.png"));
  const src = `data:image/png;base64,${data.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0c0a09",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} width={148} height={148} style={{ objectFit: "contain" }} alt="" />
      </div>
    ),
    { ...size }
  );
}
