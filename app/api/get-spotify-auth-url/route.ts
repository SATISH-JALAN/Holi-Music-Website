export async function GET() {
    const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
    const REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI;
  
    if (!SPOTIFY_CLIENT_ID || !REDIRECT_URI) {
      return Response.json({ error: "Missing Spotify environment variables" }, { status: 500 });
    }
  
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(
      REDIRECT_URI
    )}&scope=user-read-private user-read-email`;
  
    return Response.json({ authUrl });
  }
  