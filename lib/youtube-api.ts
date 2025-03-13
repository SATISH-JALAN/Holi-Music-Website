const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
const BASE_URL = "https://www.googleapis.com/youtube/v3";

export async function getYouTubeVideos(query: string) {
  try {
    const response = await fetch(
      `${BASE_URL}/search?part=snippet&q=${query}&maxResults=10&type=video&key=${API_KEY}`
    );
    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error("Error fetching YouTube videos:", error);
    return [];
  }
}
