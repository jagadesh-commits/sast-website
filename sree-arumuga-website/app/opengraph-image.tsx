import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
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
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.22), transparent 45%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.12), transparent 40%)",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: "28px", padding: "60px", zIndex: 2 }}>
          <div
            style={{
              width: 140,
              height: 140,
              borderRadius: 999,
              background: "rgba(255,255,255,0.14)",
              border: "1px solid rgba(255,255,255,0.35)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 64,
              fontWeight: 800,
            }}
          >
            SA
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 54, fontWeight: 900, letterSpacing: 1.2, lineHeight: 1.05 }}>
              Sree Arumuga Steel
            </div>
            <div style={{ fontSize: 28, opacity: 0.92, marginTop: 10 }}>JSW Exclusive Distributor • Trusted Since 1984</div>
            <div style={{ fontSize: 22, opacity: 0.88, marginTop: 10 }}>
              Premium Sheets • Plates • Coils — Chennai, Tamil Nadu
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}

