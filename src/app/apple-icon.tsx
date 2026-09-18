import { ImageResponse } from "next/og";
import { BrandMark } from "@/components/ui/brand-mark";
export const size = { width: 180, height: 180 };
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
        background: "#f4f0eb",
        color: "#A00C30",
        padding: "12%",
      }}
    >
      <BrandMark />
    </div>,
    size,
  );
}
