"use client"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

type Splash = {
  id: number
  x: number
  y: number
  color: string
  size: number
}

type PaintDot = {
  id: number
  x: number
  y: number
  color: string
  size: number
}

const colors = [
  "bg-pink-500",
  "bg-purple-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-red-500",
  "bg-orange-500",
  "bg-indigo-500",
]

export default function ColorSplash() {
  const [splashes, setSplashes] = useState<Splash[]>([])
  const [paintDots, setPaintDots] = useState<PaintDot[]>([])
  const [confetti, setConfetti] = useState(false)
  const [isPainting, setIsPainting] = useState(false)
  const lastPaintPos = useRef<{ x: number; y: number } | null>(null)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Don't add splash if we're painting
      if (isPainting) return

      const newSplash: Splash = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 100 + 50,
      }

      setSplashes((prev) => [...prev, newSplash])

      // Create particle effect
      for (let i = 0; i < 8; i++) {
        const angle = ((Math.PI * 2) / 8) * i
        const distance = Math.random() * 50 + 30

        const particleSplash: Splash = {
          id: Date.now() + i + 1,
          x: e.clientX + Math.cos(angle) * distance,
          y: e.clientY + Math.sin(angle) * distance,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 30 + 10,
        }

        setTimeout(() => {
          setSplashes((prev) => [...prev, particleSplash])
        }, i * 50)
      }

      // Remove splash after animation
      setTimeout(() => {
        setSplashes((prev) => prev.filter((splash) => splash.id !== newSplash.id))
      }, 2000)
    }

    const handleScroll = () => {
      // Add random splashes on scroll
      if (Math.random() > 0.7) {
        const newSplash: Splash = {
          id: Date.now(),
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 60 + 30,
        }

        setSplashes((prev) => [...prev, newSplash])

        // Remove splash after animation
        setTimeout(() => {
          setSplashes((prev) => prev.filter((splash) => splash.id !== newSplash.id))
        }, 2000)
      }
    }

    const handleConfetti = () => {
      setConfetti(true)

      // Create multiple splashes for confetti effect
      for (let i = 0; i < 20; i++) {
        setTimeout(() => {
          const newSplash: Splash = {
            id: Date.now() + i,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight * 0.5,
            color: colors[Math.floor(Math.random() * colors.length)],
            size: Math.random() * 80 + 40,
          }

          setSplashes((prev) => [...prev, newSplash])

          // Remove splash after animation
          setTimeout(() => {
            setSplashes((prev) => prev.filter((splash) => splash.id !== newSplash.id))
          }, 3000)
        }, i * 100)
      }

      setTimeout(() => {
        setConfetti(false)
      }, 3000)
    }

    // Paint mode handlers
    const handleMouseDown = (e: MouseEvent) => {
      if (e.button === 0) {
        // Left mouse button
        setIsPainting(true)
        lastPaintPos.current = { x: e.clientX, y: e.clientY }
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!isPainting || !lastPaintPos.current) return

      // Calculate distance from last point
      const dx = e.clientX - lastPaintPos.current.x
      const dy = e.clientY - lastPaintPos.current.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      // Only add dots if we've moved enough
      if (distance > 10) {
        const newDot: PaintDot = {
          id: Date.now(),
          x: e.clientX,
          y: e.clientY,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 20 + 10,
        }

        setPaintDots((prev) => [...prev, newDot])
        lastPaintPos.current = { x: e.clientX, y: e.clientY }

        // Remove dot after animation
        setTimeout(() => {
          setPaintDots((prev) => prev.filter((dot) => dot.id !== newDot.id))
        }, 5000)
      }
    }

    const handleMouseUp = () => {
      setIsPainting(false)
      lastPaintPos.current = null
    }

    const handleShake = () => {
      // Clear all splashes and paint dots
      setSplashes([])
      setPaintDots([])
    }

    // Detect device shake (for mobile)
    let lastAcceleration = { x: 0, y: 0, z: 0 }
    const shakeThreshold = 15

    const handleDeviceMotion = (e: DeviceMotionEvent) => {
      if (!e.accelerationIncludingGravity) return

      const { x, y, z } = e.accelerationIncludingGravity
      if (!x || !y || !z) return

      const deltaX = Math.abs(x - lastAcceleration.x)
      const deltaY = Math.abs(y - lastAcceleration.y)
      const deltaZ = Math.abs(z - lastAcceleration.z)

      if (
        (deltaX > shakeThreshold && deltaY > shakeThreshold) ||
        (deltaX > shakeThreshold && deltaZ > shakeThreshold) ||
        (deltaY > shakeThreshold && deltaZ > shakeThreshold)
      ) {
        handleShake()
      }

      lastAcceleration = { x, y, z }
    }

    window.addEventListener("click", handleClick)
    window.addEventListener("scroll", handleScroll)
    document.addEventListener("confetti", handleConfetti)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseup", handleMouseUp)
    window.addEventListener("mouseleave", handleMouseUp)
    window.addEventListener("devicemotion", handleDeviceMotion as any)

    // Add clear button
    const clearButton = document.createElement("button")
    clearButton.textContent = "Clear Colors"
    clearButton.className =
      "fixed bottom-4 right-4 z-50 bg-white/80 backdrop-blur-md text-gray-800 px-4 py-2 rounded-full shadow-lg"
    clearButton.addEventListener("click", handleShake)
    document.body.appendChild(clearButton)

    return () => {
      window.removeEventListener("click", handleClick)
      window.removeEventListener("scroll", handleScroll)
      document.removeEventListener("confetti", handleConfetti)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
      window.removeEventListener("mouseleave", handleMouseUp)
      window.removeEventListener("devicemotion", handleDeviceMotion as any)
      document.body.removeChild(clearButton)
    }
  }, [isPainting])

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <AnimatePresence>
        {splashes.map((splash) => (
          <motion.div
            key={splash.id}
            className={cn("absolute rounded-full opacity-70 pointer-events-none", splash.color)}
            style={{
              left: splash.x - splash.size / 2,
              top: splash.y - splash.size / 2,
              width: splash.size,
              height: splash.size,
            }}
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ scale: 1, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        ))}

        {paintDots.map((dot) => (
          <motion.div
            key={dot.id}
            className={cn("absolute rounded-full opacity-70 pointer-events-none", dot.color)}
            style={{
              left: dot.x - dot.size / 2,
              top: dot.y - dot.size / 2,
              width: dot.size,
              height: dot.size,
            }}
            initial={{ scale: 1, opacity: 0.8 }}
            animate={{ scale: 1.2, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 4, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}

