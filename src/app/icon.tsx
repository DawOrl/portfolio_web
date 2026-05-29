import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

// Favicon — orzeł na węglowym, zaokrąglonym tle (czytelny w małym rozmiarze)
export default async function Icon() {
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
          borderRadius: 14,
        }}
      >
        <img src={src} width={52} height={52} style={{ objectFit: "contain" }} alt="" />
      </div>
    ),
    { ...size }
  );
}
