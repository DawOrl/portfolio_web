import { ImageResponse } from "next/og";
import { BrandBlockIcon } from "@/components/ui/brand-block-icon";
// Home-screen icons use an opaque background around the same 3D mark.
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
        background: "#1d1d1d",
      }}
    >
      <BrandBlockIcon size={156} />
    </div>,
    size,
  );
}
