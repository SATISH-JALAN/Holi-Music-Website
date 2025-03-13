"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "lucide-react"

export default function HoliCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    // Calculate next Holi date
    const calculateNextHoli = () => {
      const now = new Date()
      const currentYear = now.getFullYear()

      // Holi is typically in March, but the exact date varies
      // For this example, we'll use March 25 as an approximation
      let nextHoli = new Date(currentYear, 2, 25) // March 25th of current year

      // If Holi has already passed this year, set for next year
      if (now > nextHoli) {
        nextHoli = new Date(currentYear + 1, 2, 25)
      }

      return nextHoli
    }

    const nextHoli = calculateNextHoli()

    const calculateTimeLeft = () => {
      const now = new Date()
      const difference = nextHoli.getTime() - now.getTime()

      if (difference <= 0) {
        // It's Holi today!
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        }
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }
    }

    // Update countdown every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    // Initial calculation
    setTimeLeft(calculateTimeLeft())

    return () => clearInterval(timer)
  }, [])

  return (
    <Card className="w-full bg-white/90 backdrop-blur-md shadow-xl border-white/20">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-2">
          <Calendar className="h-6 w-6 text-purple-500" />
        </div>
        <CardTitle className="text-xl font-bold text-gray-800">Countdown to Next Holi</CardTitle>
        <CardDescription className="text-gray-600">The festival of colors is coming!</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-2 text-center">
          <div className="bg-gradient-to-b from-pink-100 to-pink-200 rounded-lg p-3">
            <motion.div
              key={timeLeft.days}
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-2xl font-bold text-pink-600"
            >
              {timeLeft.days}
            </motion.div>
            <div className="text-xs text-pink-700 font-medium mt-1">DAYS</div>
          </div>

          <div className="bg-gradient-to-b from-purple-100 to-purple-200 rounded-lg p-3">
            <motion.div
              key={timeLeft.hours}
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-2xl font-bold text-purple-600"
            >
              {timeLeft.hours}
            </motion.div>
            <div className="text-xs text-purple-700 font-medium mt-1">HOURS</div>
          </div>

          <div className="bg-gradient-to-b from-blue-100 to-blue-200 rounded-lg p-3">
            <motion.div
              key={timeLeft.minutes}
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-2xl font-bold text-blue-600"
            >
              {timeLeft.minutes}
            </motion.div>
            <div className="text-xs text-blue-700 font-medium mt-1">MINUTES</div>
          </div>

          <div className="bg-gradient-to-b from-green-100 to-green-200 rounded-lg p-3">
            <motion.div
              key={timeLeft.seconds}
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-2xl font-bold text-green-600"
            >
              {timeLeft.seconds}
            </motion.div>
            <div className="text-xs text-green-700 font-medium mt-1">SECONDS</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

