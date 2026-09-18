import { ImageResponse } from "next/og";
export const alt = "Dawid Orłowski — Design & Development";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        background: "#A00C30",
        color: "#f4f0eb",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "65px 75px",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 22,
        }}
      >
        <span>Dawid Orłowski</span>
        <span style={{ color: "#ffffff" }}>DESIGN & DEVELOPMENT</span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 92,
          letterSpacing: -5,
          lineHeight: 1.1,
        }}
      >
        <span>Dobry design.</span>
        <span style={{ color: "#ffffff" }}>Jeszcze lepsza strona.</span>
      </div>
      <div
        style={{
          display: "flex",
          borderTop: "1px solid #555",
          paddingTop: 24,
          justifyContent: "space-between",
          fontSize: 20,
        }}
      >
        <span>dorlowski.dev</span>
        <span>Strony internetowe z charakterem.</span>
      </div>
    </div>,
    size,
  );
}
