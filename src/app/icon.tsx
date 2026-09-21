import { ImageResponse } from "next/og";
import { BrandBlockIcon } from "@/components/ui/brand-block-icon";
// Transparent edges let the 3D silhouette work on light and dark browser tabs.
export const size = { width: 64, height: 64 };
export const contentType = "image/png";
export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <BrandBlockIcon />
    </div>,
    size,
  );
}
