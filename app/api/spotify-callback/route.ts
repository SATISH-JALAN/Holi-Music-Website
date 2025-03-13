import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { code } = await req.json();

    if (!code) {
      return NextResponse.json({ error: "Authorization code is missing" }, { status: 400 });
    }

    const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
    const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
    const REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI;

    const tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString("base64"),
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: REDIRECT_URI!,
      }),
    });

    const tokenData = await tokenResponse.json();
    return NextResponse.json(tokenData);
  } catch (error) {
    console.error("Error exchanging token:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
