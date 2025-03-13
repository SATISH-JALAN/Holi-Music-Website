"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Music, Sparkles, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import ColorSplash from "@/components/color-splash"
import FloatingParticles from "@/components/floating-particles"
import CustomCursor from "@/components/custom-cursor"
import PichkariButton from "@/components/pichkari-button"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { getApiKeys } from "@/lib/api-utils"

export default function Login() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Get API keys (in a real app, these would be used for authentication)
    const apiKeys = getApiKeys()

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Login Successful",
        description: "You've been logged in to Spotify!",
      })
      router.push("/generator")
    }, 1500)
  }

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

      <div className="container mx-auto px-4 pt-20 relative z-10 flex flex-col items-center justify-center min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center justify-center p-4 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full mb-4"
            >
              <Music className="h-8 w-8 text-white" />
            </motion.div>
            <h1 className="text-3xl font-bold text-gray-800 neon-text">Connect with Spotify</h1>
            <p className="text-gray-700 mt-2">Login to create personalized Holi playlists</p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20"
          >
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-800">
                  Email
                </Label>
                <Input
                  id="email"
                  placeholder="your.email@example.com"
                  type="email"
                  required
                  className="bg-white/70 border-white/20 text-gray-800 placeholder:text-gray-500 focus:border-pink-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-800">
                  Password
                </Label>
                <Input
                  id="password"
                  placeholder="••••••••"
                  type="password"
                  required
                  className="bg-white/70 border-white/20 text-gray-800 placeholder:text-gray-500 focus:border-pink-500"
                />
              </div>

              <PichkariButton
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 rounded-lg text-lg shadow-lg hover:shadow-xl transition-all duration-300 mt-6"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Connecting...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Sparkles className="mr-2 h-5 w-5" />
                    Login with Spotify
                  </div>
                )}
              </PichkariButton>

              <div className="text-center mt-4">
                <p className="text-gray-700 text-sm">
                  Don't have an account?{" "}
                  <a href="#" className="text-pink-600 hover:text-pink-700 transition-colors duration-300">
                    Sign up for Spotify
                  </a>
                </p>
              </div>
            </form>
          </motion.div>

          <div className="mt-8 text-center">
            <p className="text-gray-700 text-sm">
              By connecting, you agree to our{" "}
              <a href="#" className="text-gray-800 hover:text-black transition-colors duration-300 underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-gray-800 hover:text-black transition-colors duration-300 underline">
                Privacy Policy
              </a>
            </p>
          </div>
        </motion.div>
      </div>

      <ColorSplash />
    </main>
  )
}

