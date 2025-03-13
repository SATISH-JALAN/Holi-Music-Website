import Link from "next/link"
import { Info, Music, Sparkles, Lightbulb, Headphones, Wand2, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import ColorSplash from "@/components/color-splash"
import FloatingParticles from "@/components/floating-particles"
import CustomCursor from "@/components/custom-cursor"
import HoliFact from "@/components/holi-fact"
import HoliQuiz from "@/components/holi-quiz"

export default function About() {
  return (
    <main className="relative min-h-screen overflow-hidden animate-fade-in">
      <CustomCursor />
      <FloatingParticles />

      <div className="absolute top-4 left-4 z-50">
        <Link href="/">
          <Button
            variant="outline"
            className="bg-white/20 backdrop-blur-md border-white/20 text-gray-800 hover:bg-white/30 transition-all duration-300"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Home
          </Button>
        </Link>
      </div>

      <div className="container mx-auto px-4 pt-20 pb-40 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4 neon-text">
              About Holi Playlist Generator
            </h1>
            <p className="text-xl text-gray-700">A colorful music experience for the festival of colors</p>
          </div>

          <div className="bg-white/90 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20 mb-12 animate-flip">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
              <Info className="mr-2 h-6 w-6 text-purple-500" />
              About the Site
            </h2>

            <p className="text-gray-700 mb-4">
              The Holi Playlist Generator was built for music lovers who want to celebrate the festival of colors with
              the perfect soundtrack. Our AI-powered platform creates custom playlists based on your mood, helping you
              find the perfect Holi songs for any celebration.
            </p>

            <p className="text-gray-700 mb-4">
              Whether you're looking for energetic dance tracks, chill vibes, traditional Holi songs, or modern remixes,
              our platform has you covered with a colorful and interactive experience.
            </p>

            <div className="mt-8 text-center">
              <p className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 neon-text">
                Made by Satish Jalan
              </p>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20 mb-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
              <Lightbulb className="mr-2 h-6 w-6 text-yellow-500" />
              How It Works
            </h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Login with Spotify</h3>
                  <p className="text-gray-700">
                    Connect your Spotify account to personalize your experience and save your playlists.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold">2</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Choose a Mood</h3>
                  <p className="text-gray-700">
                    Select from moods like Energetic, Chill, Bollywood, EDM, Traditional, or Fusion.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold">3</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">AI Generates Your Playlist</h3>
                  <p className="text-gray-700">Our AI creates a custom Holi playlist tailored to your selected mood.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold">4</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Play, Save, or Share</h3>
                  <p className="text-gray-700">
                    Play songs directly, add them to your Spotify, or share your playlist with friends.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-r from-purple-500 to-violet-500 rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold">5</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Generate Remixes</h3>
                  <p className="text-gray-700">
                    Use our AI to create unique remixes and mashups of your favorite Holi songs.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold">6</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Enjoy the Festival!</h3>
                  <p className="text-gray-700">
                    Share your playlist with friends and enjoy the festival of colors with the perfect soundtrack.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20 mb-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
              <Sparkles className="mr-2 h-6 w-6 text-pink-500" />
              Special Features
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/70 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 group">
                <div className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-full w-12 h-12 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Interactive Color Effects</h3>
                <p className="text-gray-700">
                  Every interaction is playful with color splashes, particles, and dynamic effects.
                </p>
              </div>

              <div className="bg-white/70 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 group">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full w-12 h-12 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Headphones className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Real-Time Music Visuals</h3>
                <p className="text-gray-700">
                  Watch the beat come alive with dynamic visualizations that respond to the music.
                </p>
              </div>

              <div className="bg-white/70 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 group">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-full w-12 h-12 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Wand2 className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">AI-Generated Remixes</h3>
                <p className="text-gray-700">
                  Discover unique mashups and remixes of your favorite Holi songs created by AI.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20">
              <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
                <Info className="mr-2 h-6 w-6 text-blue-500" />
                About Holi Festival
              </h2>

              <p className="text-gray-700 mb-4">
                Holi is a popular ancient Hindu festival, also known as the "Festival of Colors" or the "Festival of
                Love." The festival signifies the triumph of good over evil and the arrival of spring.
              </p>

              <p className="text-gray-700 mb-4">
                It is primarily observed in India, Nepal, and other regions of the world with significant Hindu
                populations. Holi celebrations start with a Holika bonfire on the night before Holi, where people
                gather, perform rituals, and pray for their internal evil to be destroyed.
              </p>

              <p className="text-gray-700">
                The next morning is a free-for-all carnival of colors, where participants play, chase, and color each
                other with dry powder and colored water. The festival brings together friends and foes, rich and poor,
                young and old – everyone celebrates together, forgetting all resentments and bad feelings towards each
                other.
              </p>
            </div>

            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20">
              <HoliFact standalone={true} className="mb-8" />

              <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
                <Lightbulb className="mr-2 h-6 w-6 text-yellow-500" />
                Test Your Holi Knowledge
              </h2>

              <HoliQuiz />
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link href="/generator">
              <Button className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 text-white font-bold py-6 px-10 rounded-full text-xl shadow-lg hover:shadow-xl transition-all duration-300">
                <Music className="mr-2 h-6 w-6" />
                Start Creating Playlists
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <ColorSplash />
    </main>
  )
}

