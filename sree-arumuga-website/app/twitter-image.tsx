import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1a3a8f",
          color: "white",
        }}
      >
        <div style={{ textAlign: "center", padding: "70px" }}>
          <div style={{ fontSize: 64, fontWeight: 900, letterSpacing: 1.2 }}>Sree Arumuga Steel</div>
          <div style={{ fontSize: 28, opacity: 0.92, marginTop: 12 }}>Trusted Since 1984</div>
          <div style={{ fontSize: 24, opacity: 0.88, marginTop: 10 }}>JSW Exclusive Distributor • Chennai</div>
        </div>
      </div>
    ),
    size,
  );
}

