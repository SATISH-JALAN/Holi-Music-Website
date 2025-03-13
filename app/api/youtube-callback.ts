import { NextResponse } from "next/server";

export async function POST(req: Request) {
  console.log("📌 Received request at /api/youtube-callback");

  // Log environment variables (for debugging purposes)
  console.log("🔍 YOUTUBE_CLIENT_ID:", process.env.YOUTUBE_CLIENT_ID);
  console.log("🔍 YOUTUBE_CLIENT_SECRET:", process.env.YOUTUBE_CLIENT_SECRET);
  console.log("🔍 YOUTUBE_REDIRECT_URI:", process.env.YOUTUBE_REDIRECT_URI);

  try {
    const { code } = await req.json();

    if (!code) {
      console.error("❌ No authorization code received!");
      return NextResponse.json({ error: "No authorization code found" }, { status: 400 });
    }

    console.log("🔑 Authorization code received:", code);

    // Request YouTube access token
    const response = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: process.env.YOUTUBE_REDIRECT_URI!,
        client_id: process.env.YOUTUBE_CLIENT_ID!,
        client_secret: process.env.YOUTUBE_CLIENT_SECRET!,
      }),
    });

    const data = await response.json();
    console.log("🎥 YouTube Response:", data);

    if (!response.ok) {
      console.error("❌ YouTube token request failed:", data);
      return NextResponse.json({ error: data.error_description }, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("⚠️ Error during YouTube auth:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
