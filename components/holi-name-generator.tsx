"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Wand2, Copy, Share2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const holiPrefixes = [
  "Rang",
  "Gulal",
  "Pichkari",
  "Abeer",
  "Tesu",
  "Falgun",
  "Basant",
  "Anand",
  "Masti",
  "Dhuleti",
  "Radha",
  "Krishna",
  "Holika",
  "Phag",
  "Dol",
  "Mathura",
  "Vrindavan",
  "Braj",
  "Rasiya",
  "Panguni",
]

const holiSuffixes = [
  "Bahar",
  "Utsav",
  "Anand",
  "Khushi",
  "Rang",
  "Roop",
  "Leela",
  "Raas",
  "Masti",
  "Dhoom",
  "Dhamaal",
  "Tarang",
  "Lahiri",
  "Jhoom",
  "Dhmal",
  "Rasiya",
  "Madhur",
  "Mithas",
  "Madhurya",
  "Madhuri",
]

export default function HoliNameGenerator() {
  const [name, setName] = useState("")
  const [generatedName, setGeneratedName] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [showCopied, setShowCopied] = useState(false)
  const { toast } = useToast()

  const generateHoliName = () => {
    if (!name.trim()) {
      toast({
        title: "Please enter your name",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)

    // Simulate AI processing
    setTimeout(() => {
      const prefix = holiPrefixes[Math.floor(Math.random() * holiPrefixes.length)]
      const suffix = holiSuffixes[Math.floor(Math.random() * holiSuffixes.length)]

      // Use first letter of name if possible
      let middlePart = ""
      if (name.length > 0) {
        const firstLetter = name.charAt(0).toUpperCase()
        const restOfName = name.slice(1, 3).toLowerCase()
        middlePart = firstLetter + restOfName
      }

      const newName = `${prefix} ${middlePart} ${suffix}`
      setGeneratedName(newName)
      setIsGenerating(false)

      // Trigger confetti
      document.dispatchEvent(new CustomEvent("confetti"))
    }, 1500)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedName)
    setShowCopied(true)

    toast({
      title: "Copied to clipboard!",
      description: "Your Holi name has been copied to clipboard.",
    })

    setTimeout(() => {
      setShowCopied(false)
    }, 2000)
  }

  const shareHoliName = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "My Holi Festival Name",
          text: `My Holi festival name is ${generatedName}! Generate yours at Holi Playlist Generator.`,
          url: window.location.href,
        })
        .then(() => {
          toast({
            title: "Shared successfully!",
          })
        })
        .catch((error) => {
          toast({
            title: "Error sharing",
            description: error.message,
            variant: "destructive",
          })
        })
    } else {
      copyToClipboard()
    }
  }

  return (
    <Card className="w-full bg-white/90 backdrop-blur-md shadow-xl border-white/20">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-gray-800">Holi Name Generator</CardTitle>
        <CardDescription className="text-gray-600">Get your festive Holi celebration name!</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Enter your name</label>
          <Input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-white/70 border-white/20 text-gray-800 placeholder:text-gray-400 focus:border-pink-500"
          />
        </div>

        <Button
          onClick={generateHoliName}
          disabled={isGenerating}
          className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
        >
          {isGenerating ? (
            <div className="flex items-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Generating...
            </div>
          ) : (
            <div className="flex items-center">
              <Wand2 className="mr-2 h-5 w-5" />
              Generate Holi Name
            </div>
          )}
        </Button>

        <AnimatePresence>
          {generatedName && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-6 text-center"
            >
              <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text font-bold text-2xl mb-4 p-2">
                {generatedName}
              </div>

              <div className="flex justify-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyToClipboard}
                  className="flex items-center text-gray-700"
                >
                  <Copy className="h-4 w-4 mr-1" />
                  {showCopied ? "Copied!" : "Copy"}
                </Button>

                <Button variant="outline" size="sm" onClick={shareHoliName} className="flex items-center text-gray-700">
                  <Share2 className="h-4 w-4 mr-1" />
                  Share
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}

