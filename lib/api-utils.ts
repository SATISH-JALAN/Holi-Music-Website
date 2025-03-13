// Utility functions for API calls

// Function to load environment variables
export const getApiKeys = () => {
  // In a real app, these would be loaded from environment variables
  // For this demo, we'll return mock values
  return {
    spotifyClientId: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID || "mock_spotify_client_id",
    spotifySecret: process.env.SPOTIFY_SECRET || "mock_spotify_secret",
    youtubeApiKey: process.env.YOUTUBE_API_KEY || "mock_youtube_api_key",
  }
}

// Mock function to fetch trending Holi songs from YouTube
export const fetchTrendingHoliSongs = async () => {
  // In a real app, this would make an API call to YouTube
  // For this demo, we'll return mock data
  const mockSongs = [
    { id: 1, title: "Balam Pichkari", artist: "Vishal & Shalmali", color: "from-pink-500 to-red-500", hot: true },
    { id: 2, title: "Rang Barse", artist: "Amitabh Bachchan", color: "from-yellow-500 to-orange-500", hot: true },
    {
      id: 3,
      title: "Holi Khele Raghuveera",
      artist: "Amitabh Bachchan",
      color: "from-green-500 to-emerald-500",
      hot: false,
    },
    { id: 4, title: "Go Pagal", artist: "Raftaar & Nindy Kaur", color: "from-purple-500 to-violet-500", hot: true },
    { id: 5, title: "Badri Ki Dulhania", artist: "Dev Negi & Others", color: "from-blue-500 to-cyan-500", hot: false },
    { id: 6, title: "Holi Biraj Ma", artist: "Aditi Sharma", color: "from-indigo-500 to-blue-500", hot: false },
  ]

  return mockSongs
}

// Mock function to generate a playlist based on mood
export const generatePlaylist = async (mood: string) => {
  // In a real app, this would make an API call to Spotify
  // For this demo, we'll return mock data
  const allSongs = [
    {
      id: 1,
      title: "Balam Pichkari",
      artist: "Vishal & Shalmali",
      duration: "4:25",
      color: "from-pink-500 to-red-500",
      hot: true,
    },
    {
      id: 2,
      title: "Rang Barse",
      artist: "Amitabh Bachchan",
      duration: "5:12",
      color: "from-yellow-500 to-orange-500",
      hot: true,
    },
    {
      id: 3,
      title: "Holi Khele Raghuveera",
      artist: "Amitabh Bachchan",
      duration: "6:03",
      color: "from-green-500 to-emerald-500",
      hot: false,
    },
    {
      id: 4,
      title: "Go Pagal",
      artist: "Raftaar & Nindy Kaur",
      duration: "3:47",
      color: "from-purple-500 to-violet-500",
      hot: true,
    },
    {
      id: 5,
      title: "Badri Ki Dulhania",
      artist: "Dev Negi & Others",
      duration: "3:56",
      color: "from-blue-500 to-cyan-500",
      hot: false,
    },
    {
      id: 6,
      title: "Holi Biraj Ma",
      artist: "Aditi Sharma",
      duration: "4:32",
      color: "from-indigo-500 to-blue-500",
      hot: false,
    },
    {
      id: 7,
      title: "Do Me A Favour",
      artist: "Anu Malik",
      duration: "4:01",
      color: "from-pink-500 to-purple-500",
      hot: false,
    },
    {
      id: 8,
      title: "Lahu Munh Lag Gaya",
      artist: "Shail Hada",
      duration: "3:28",
      color: "from-red-500 to-pink-500",
      hot: true,
    },
    {
      id: 9,
      title: "Holi Mein GST Jod Ke",
      artist: "Pawan Singh",
      duration: "3:15",
      color: "from-green-500 to-yellow-500",
      hot: true,
    },
    {
      id: 10,
      title: "Holi Khelungi",
      artist: "Sunidhi Chauhan",
      duration: "4:45",
      color: "from-purple-500 to-pink-500",
      hot: false,
    },
    {
      id: 11,
      title: "Jai Jai Shiv Shankar",
      artist: "Kishore Kumar",
      duration: "5:30",
      color: "from-orange-500 to-red-500",
      hot: false,
    },
    {
      id: 12,
      title: "Aaj Na Chhodenge",
      artist: "Kishore Kumar",
      duration: "4:12",
      color: "from-blue-500 to-indigo-500",
      hot: true,
    },
    {
      id: 13,
      title: "Holi Re Holi",
      artist: "Amit Trivedi",
      duration: "3:52",
      color: "from-yellow-500 to-green-500",
      hot: false,
    },
    {
      id: 14,
      title: "Gori Tu Latth Maar",
      artist: "Aditi Singh Sharma",
      duration: "3:40",
      color: "from-pink-500 to-red-500",
      hot: true,
    },
    {
      id: 15,
      title: "Holi Biraj Ma (EDM Remix)",
      artist: "DJ Suketu",
      duration: "4:15",
      color: "from-purple-500 to-blue-500",
      hot: true,
    },
  ]

  // Filter songs based on mood
  let filteredSongs
  switch (mood) {
    case "energetic":
      filteredSongs = allSongs.filter((song) => song.hot)
      break
    case "chill":
      filteredSongs = allSongs.filter((song) => !song.hot)
      break
    case "bollywood":
      filteredSongs = allSongs.filter(
        (song) => song.artist.includes("Vishal") || song.artist.includes("Amit") || song.artist.includes("Sunidhi"),
      )
      break
    case "edm":
      filteredSongs = allSongs.filter((song) => song.title.includes("Remix") || song.artist.includes("DJ"))
      break
    case "traditional":
      filteredSongs = allSongs.filter(
        (song) => song.title.includes("Biraj") || song.artist.includes("Amitabh") || song.title.includes("Rang Barse"),
      )
      break
    case "fusion":
      filteredSongs = allSongs.filter(
        (song) => song.title.includes("Remix") || song.artist.includes("DJ") || song.title.includes("GST"),
      )
      break
    default:
      filteredSongs = allSongs
  }

  // Shuffle and take 5 songs
  return filteredSongs.sort(() => Math.random() - 0.5).slice(0, 5)
}

