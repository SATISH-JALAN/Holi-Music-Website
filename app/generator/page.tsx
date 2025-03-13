"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { Music, Shuffle, Heart, SkipForward, Play, Pause, Share2, Download, Flame, Droplet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import ColorSplash from "@/components/color-splash"
import FloatingParticles from "@/components/floating-particles"
import CustomCursor from "@/components/custom-cursor"
import MusicVisualizer from "@/components/music-visualizer"
import HoliNameGenerator from "@/components/holi-name-generator"
import HoliFact from "@/components/holi-fact"
import PichkariButton from "@/components/pichkari-button"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
const moods = [
  { id: "energetic", name: "Energetic", color: "from-pink-500 to-red-500", icon: Flame },
  { id: "chill", name: "Chill", color: "from-blue-500 to-cyan-500", icon: Droplet },
  { id: "bollywood", name: "Bollywood", color: "from-yellow-500 to-orange-500", icon: Music },
  { id: "edm", name: "EDM", color: "from-purple-500 to-violet-500", icon: Music },
  { id: "traditional", name: "Traditional", color: "from-green-500 to-emerald-500", icon: Music },
  { id: "fusion", name: "Fusion", color: "from-indigo-500 to-blue-500", icon: Shuffle },
]

export default function Generator() {
  const [selectedMood, setSelectedMood] = useState("")
  const [generatedPlaylist, setGeneratedPlaylist] = useState<any[]>([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSong, setCurrentSong] = useState<any | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  // Page load animation
  useEffect(() => {
    document.body.classList.add("animate-color-burst")

    return () => {
      document.body.classList.remove("animate-color-burst")
    }
  }, [])

  const handleGeneratePlaylist = async (mood: string) => {
    setIsLoading(true)
    setSelectedMood(mood)

    try {
      // In a real app, this would call an API
      const playlist = await generatePlaylist(mood)
      setGeneratedPlaylist(playlist)

      // Show confetti
      document.dispatchEvent(new CustomEvent("confetti"))

      toast({
        title: "Playlist Generated!",
        description: `Your ${mood} Holi playlist is ready to play!`,
        variant: "default",
      })
    } catch (error) {
      toast({
        title: "Error generating playlist",
        description: "Please try again later",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const playSong = (song: any) => {
    setCurrentSong(song)
    setIsPlaying(true)
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <main className="relative min-h-screen overflow-hidden pb-20 animate-fade-in">
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

      <div className="container mx-auto px-4 pt-20 relative z-10">
        <motion.h1
          className="text-4xl md:text-6xl font-bold text-center bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent mb-8 neon-text"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Holi Playlist Generator
        </motion.h1>

        <Tabs defaultValue="mood" className="w-full max-w-4xl mx-auto">
          <TabsList className="grid grid-cols-3 w-full mb-8 !bg-transparent">
            <TabsTrigger 
              value="mood" 
              className="text-xl font-semibold text-white p-4 rounded-lg shadow-md bg-gradient-to-r from-teal-400 to-indigo-600 hover:from-teal-500 hover:to-indigo-700 transition-all"
            >
              Choose Mood
            </TabsTrigger>
            <TabsTrigger 
              value="remix" 
              className="text-xl font-semibold text-white p-4 rounded-lg shadow-md bg-gradient-to-r from-amber-500 to-purple-700 hover:from-amber-600 hover:to-purple-800 transition-all"
            >
              AI Remix
            </TabsTrigger>
            <TabsTrigger 
              value="name" 
              className="text-xl font-semibold text-white p-4 rounded-lg shadow-md bg-gradient-to-r from-emerald-500 to-red-500 hover:from-emerald-600 hover:to-red-600 transition-all"
            >
              Holi Name
            </TabsTrigger>
          </TabsList>

          <TabsContent value="mood" className="space-y-8">
            <motion.div
              className="grid grid-cols-2 md:grid-cols-3 gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
            >
              {moods.map((mood) => (
                <motion.div
                  key={mood.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <PichkariButton
                    onClick={() => handleGeneratePlaylist(mood.id)}
                    className={cn(
                      "w-full h-24 text-lg font-bold rounded-xl bg-gradient-to-r shadow-lg hover:shadow-xl transition-all duration-300 text-white",
                      mood.color,
                    )}
                  >
                    <mood.icon className="mr-2 h-6 w-6" />
                    {mood.name}
                  </PichkariButton>
                </motion.div>
              ))}
            </motion.div>

            <div className="flex justify-center">
              <PichkariButton
                onClick={() => handleGeneratePlaylist(moods[Math.floor(Math.random() * moods.length)].id)}
                className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 text-white font-bold py-6 px-10 rounded-full text-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Shuffle className="mr-2 h-6 w-6" />
                Surprise Me!
              </PichkariButton>
            </div>

            {isLoading && (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
              </div>
            )}

            {generatedPlaylist.length > 0 && (
              <motion.div
                className="mt-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold mb-6 text-gray-800">
                  Your {selectedMood.charAt(0).toUpperCase() + selectedMood.slice(1)} Holi Playlist
                </h2>

                <div className="space-y-4">
                  {generatedPlaylist.map((song, index) => (
                    <motion.div
                      key={song.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.1}
                      onClick={() => playSong(song)}
                      className="p-4 rounded-lg bg-gradient-to-r from-teal-400 to-indigo-500 cursor-pointer hover:bg-gradient-to-r hover:from-teal-500 hover:to-indigo-600 transition-all"
                    >
                      <h3 className="text-xl font-semibold text-white">{song.title}</h3>
                      <p className="text-md text-white">{song.artist}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </TabsContent>

          <TabsContent value="remix" className="space-y-8">
            <MusicVisualizer isPlaying={isPlaying} />
          </TabsContent>

          <TabsContent value="name" className="space-y-8">
            <HoliNameGenerator />
          </TabsContent>
        </Tabs>
      </div>

      {/* Music Player Controls */}
      <div className="fixed bottom-0 left-0 w-full bg-black text-white p-4">
        {currentSong && (
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                className="p-2 rounded-full"
                onClick={togglePlayPause}
              >
                {isPlaying ? <Pause /> : <Play />}
              </Button>
              <p>{currentSong.title} - {currentSong.artist}</p>
            </div>
            <Slider value={[50]} max={100} />
          </div>
        )}
      </div>
    </main>
  )
}
