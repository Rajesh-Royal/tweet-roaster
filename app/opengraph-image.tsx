import { ImageResponse } from "next/og"

export const runtime = "edge"

export const alt = "TweetRoaster 🔥 - Turn Tweets into Toasted Crumbs"
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        backgroundImage: "linear-gradient(135deg, #fff5f5 0%, #fed7d7 100%)",
        padding: "40px",
      }}
    >
      <div
        style={{
          fontSize: 72,
          fontWeight: "bold",
          background: "linear-gradient(135deg, #f56500 0%, #dc2626 100%)",
          backgroundClip: "text",
          color: "transparent",
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        TweetRoaster 🔥
      </div>
      <div
        style={{
          fontSize: 32,
          color: "#4a5568",
          textAlign: "center",
          marginBottom: "40px",
          fontWeight: "500",
        }}
      >
        Turn tweets into toasted crumbs
      </div>
      <div
        style={{
          display: "flex",
          gap: "20px",
          alignItems: "center",
        }}
      >
        <div style={{ fontSize: 48 }}>🌶️</div>
        <div style={{ fontSize: 48 }}>🔥</div>
        <div style={{ fontSize: 48 }}>💀</div>
      </div>
      <div
        style={{
          fontSize: 20,
          color: "#718096",
          textAlign: "center",
          marginTop: "30px",
        }}
      >
        Choose your roast level • Pick your mood • Get 3 epic burns
      </div>
    </div>,
    {
      ...size,
    },
  )
}
