import { NextResponse } from "next/server";

export async function POST(req: Request) {
  console.log("📌 Received request at /api/spotify-callback");

  // Log environment variables (for debugging purposes)
  console.log("🔍 SPOTIFY_CLIENT_ID:", process.env.SPOTIFY_CLIENT_ID);
  console.log("🔍 SPOTIFY_CLIENT_SECRET:", process.env.SPOTIFY_CLIENT_SECRET);
  console.log("🔍 SPOTIFY_REDIRECT_URI:", process.env.SPOTIFY_REDIRECT_URI);

  try {
    const { code } = await req.json();

    if (!code) {
      console.error("❌ No authorization code received!");
      return NextResponse.json({ error: "No authorization code found" }, { status: 400 });
    }

    console.log("🔑 Authorization code received:", code);

    // Request Spotify access token
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          Buffer.from(
            `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
          ).toString("base64"),
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: process.env.SPOTIFY_REDIRECT_URI!,
      }),
    });

    const data = await response.json();
    console.log("🎵 Spotify Response:", data);

    if (!response.ok) {
      console.error("❌ Spotify token request failed:", data);
      return NextResponse.json({ error: data.error_description }, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("⚠️ Error during Spotify auth:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
