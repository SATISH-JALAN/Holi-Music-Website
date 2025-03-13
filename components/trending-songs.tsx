"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Play, Flame, Droplet } from "lucide-react"
import { cn } from "@/lib/utils"

const trendingSongs = [
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

export default function TrendingSongs() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % trendingSongs.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-md p-6 border border-white/20">
      <div className="flex overflow-x-auto scrollbar-hide -mx-2 pb-4">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${(currentIndex * 100) / trendingSongs.length}%)` }}
        >
          {trendingSongs.map((song, index) => (
            <motion.div
              key={song.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="min-w-[250px] sm:min-w-[300px] px-2"
            >
              <div
                className={cn(
                  "rounded-xl overflow-hidden h-40 relative group cursor-pointer",
                  "bg-gradient-to-r shadow-lg",
                  song.color,
                )}
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />

                <div className="absolute inset-0 p-4 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-white text-lg">{song.title}</h3>
                      <p className="text-white/80 text-sm">{song.artist}</p>
                    </div>

                    {song.hot ? (
                      <div className="bg-red-500 rounded-full p-1">
                        <Flame className="h-4 w-4 text-white" />
                      </div>
                    ) : (
                      <div className="bg-blue-500 rounded-full p-1">
                        <Droplet className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white/30">
                      <Play className="h-5 w-5 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-4 gap-1">
        {trendingSongs.map((_, index) => (
          <button
            key={index}
            className={cn(
              "w-2 h-2 rounded-full transition-colors duration-300",
              index === currentIndex ? "bg-white" : "bg-white/30",
            )}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  )
}

