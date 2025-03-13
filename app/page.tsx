import { Suspense } from "react"
import Link from "next/link"
import { Music, Sparkles, Play, Shuffle } from "lucide-react"
import { Button } from "@/components/ui/button"
import ColorSplash from "@/components/color-splash"
import FloatingParticles from "@/components/floating-particles"
import HoliFact from "@/components/holi-fact"
import WelcomeAnimation from "@/components/welcome-animation"
import TrendingSongs from "@/components/trending-songs"
import CustomCursor from "@/components/custom-cursor"
import PichkariButton from "@/components/pichkari-button"
import HoliCountdown from "@/components/holi-countdown"

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden animate-fade-in">
      <CustomCursor />
      <FloatingParticles />

      <div className="absolute top-4 right-4 z-50 flex items-center gap-4">
        <Link href="/login">
          <Button
            variant="outline"
            className="bg-white/20 backdrop-blur-md border-white/20 text-gray-800 hover:bg-white/30 transition-all duration-300"
          >
            Login with Spotify
          </Button>
        </Link>
      </div>

      <div className="container mx-auto px-4 pt-20 pb-40 relative z-10">
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
          <WelcomeAnimation />

          <div className="mt-8 relative group">
            <Link href="/generator">
              <PichkariButton className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 text-white font-bold py-6 px-10 rounded-full text-xl shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce-slow relative overflow-hidden">
                <Sparkles className="mr-2 h-6 w-6" />
                Start Your Playlist
              </PichkariButton>
            </Link>
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 opacity-50 blur-xl group-hover:opacity-75 transition-opacity duration-300 rounded-full scale-110"></div>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20 hover:border-white/30 transition-all duration-300 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
                <Music className="mr-2 h-6 w-6 text-pink-500" />
                Create Custom Playlists
              </h3>
              <p className="text-gray-700">
                Choose your mood and let our AI generate the perfect Holi playlist for you. Energetic, Chill, Bollywood,
                EDM, Traditional, or Fusion.
              </p>
              <HoliFact className="mt-4" />
            </div>

            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20 hover:border-white/30 transition-all duration-300 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-green-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
                <Shuffle className="mr-2 h-6 w-6 text-blue-500" />
                AI Remix & Mashup
              </h3>
              <p className="text-gray-700">
                Enter your favorite song and our AI will suggest creative remixes and mashups perfect for your Holi
                celebration.
              </p>
              <HoliFact className="mt-4" />
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl mx-auto">
            <Suspense fallback={<div className="h-64 w-full bg-white/10 animate-pulse rounded-2xl"></div>}>
              <div className="w-full">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
                  <Play className="mr-2 h-6 w-6 text-purple-500" />
                  Trending Holi Songs
                </h2>
                <TrendingSongs />
              </div>
            </Suspense>

            <div className="w-full">
              <HoliCountdown />
            </div>
          </div>

          <div className="mt-16 w-full max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Link href="/about" className="w-full">
                <Button className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-bold py-4 px-6 rounded-xl text-lg shadow-lg hover:shadow-xl transition-all duration-300">
                  <Info className="mr-2 h-5 w-5" />
                  About Holi Festival
                </Button>
              </Link>

              <Link href="/generator" className="w-full">
                <Button className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-bold py-4 px-6 rounded-xl text-lg shadow-lg hover:shadow-xl transition-all duration-300">
                  <Music className="mr-2 h-5 w-5" />
                  Create Your Playlist
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <ColorSplash />
    </main>
  )
}

