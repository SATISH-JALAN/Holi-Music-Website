"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
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
import { generatePlaylist } from "@/lib/api-utils"

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
          className="text-4xl md:text-6xl font-bold text-center text-gray-800 mb-8 neon-text"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Holi Playlist Generator
        </motion.h1>

        <Tabs defaultValue="mood" className="w-full max-w-4xl mx-auto">
          <TabsList className="grid grid-cols-3 w-full mb-8 bg-white/80 backdrop-blur-md">
            <TabsTrigger value="mood" className="text-lg text-gray-800">
              Choose Mood
            </TabsTrigger>
            <TabsTrigger value="remix" className="text-lg text-gray-800">
              AI Remix
            </TabsTrigger>
            <TabsTrigger value="name" className="text-lg text-gray-800">
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
                      className={cn(
                        "bg-white/80 backdrop-blur-md rounded-xl p-4 shadow-lg border border-white/20 cursor-pointer hover:bg-white/90 transition-all duration-300 flex items-center justify-between group",
                        currentSong?.id === song.id && "border-white/50 bg-white/90",
                      )}
                    >
                      <div className="flex items-center">
                        <div
                          className={cn(
                            "w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r mr-4",
                            song.color,
                          )}
                        >
                          {currentSong?.id === song.id && isPlaying ? (
                            <Pause className="h-6 w-6 text-white" />
                          ) : (
                            <Play className="h-6 w-6 text-white" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-800 flex items-center">
                            {song.title}
                            {song.hot && <Flame className="ml-2 h-4 w-4 text-red-500" />}
                          </h3>
                          <p className="text-gray-600">{song.artist}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-gray-600">{song.duration}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          onClick={(e) => {
                            e.stopPropagation()
                            toast({
                              title: "Added to favorites",
                              description: `${song.title} has been added to your favorites`,
                            })
                          }}
                        >
                          <Heart className="h-5 w-5 text-gray-600 hover:text-pink-500 transition-colors duration-300" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 flex justify-between">
                  <Button
                    onClick={() => {
                      toast({
                        title: "Playlist Shared",
                        description: "Your playlist link has been copied to clipboard!",
                      })
                    }}
                    className="bg-white/80 backdrop-blur-md hover:bg-white/90 text-gray-800"
                  >
                    <Share2 className="mr-2 h-5 w-5" />
                    Share Playlist
                  </Button>

                  <Button
                    onClick={() => {
                      toast({
                        title: "Playlist Downloaded",
                        description: "Your playlist has been saved to Spotify!",
                      })
                    }}
                    className="bg-green-500 hover:bg-green-600 text-white"
                  >
                    <Download className="mr-2 h-5 w-5" />
                    Save to Spotify
                  </Button>
                </div>
              </motion.div>
            )}

            <div className="mt-8">
              <HoliFact standalone={true} />
            </div>
          </TabsContent>

          <TabsContent value="remix" className="space-y-8">
            <Card className="bg-white/80 backdrop-blur-md border-white/20">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-gray-800 font-medium">Enter a song name</label>
                    <input
                      type="text"
                      placeholder="e.g. Balam Pichkari"
                      className="w-full px-4 py-3 rounded-lg bg-white/70 border border-white/20 text-gray-800 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                  </div>

                  <PichkariButton className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 rounded-lg text-lg shadow-lg hover:shadow-xl transition-all duration-300">
                    <Shuffle className="mr-2 h-5 w-5" />
                    Generate Remix
                  </PichkariButton>
                </div>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <Card
                      key={i}
                      className="bg-white/70 border-white/10 hover:bg-white/90 transition-all duration-300 cursor-pointer group perspective"
                    >
                      <CardContent className="p-4 flex items-center justify-between">
                        <div>
                          <h3 className="font-bold text-gray-800">Balam Pichkari (EDM Remix)</h3>
                          <p className="text-gray-600">AI Generated • 3:45</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        >
                          <Play className="h-5 w-5 text-gray-800" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="name" className="space-y-8">
            <HoliNameGenerator />
          </TabsContent>
        </Tabs>

        {currentSong && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-white/20 p-4 z-50"
          >
            <div className="container mx-auto max-w-4xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div
                    className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r mr-4",
                      currentSong.color,
                    )}
                  >
                    <Music className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">{currentSong.title}</h3>
                    <p className="text-gray-600">{currentSong.artist}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="icon" className="text-gray-800">
                    <SkipForward className="h-5 w-5" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="bg-white/20 rounded-full h-12 w-12 text-gray-800"
                    onClick={togglePlayPause}
                  >
                    {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                  </Button>

                  <Button variant="ghost" size="icon" className="text-gray-800">
                    <Heart className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              <div className="mt-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">0:00</span>
                  <div className="flex-1 mx-4">
                    <Slider defaultValue={[33]} max={100} step={1} className="cursor-pointer" />
                  </div>
                  <span className="text-gray-600">{currentSong.duration}</span>
                </div>
              </div>

              <MusicVisualizer isPlaying={isPlaying} />
            </div>
          </motion.div>
        )}
      </div>

      <ColorSplash />
    </main>
  )
}

