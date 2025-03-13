"use client"

import { useEffect, useRef } from "react"

interface MusicVisualizerProps {
  isPlaying: boolean
}

export default function MusicVisualizer({ isPlaying }: MusicVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Generate random data for visualization
    const generateRandomData = () => {
      const data = []
      const count = 64

      for (let i = 0; i < count; i++) {
        // Create a wave-like pattern
        const value = Math.sin(i / 10) * 0.2 + Math.random() * 0.2 + 0.3
        data.push(value)
      }

      return data
    }

    // Draw visualization
    const draw = () => {
      if (!ctx || !canvas) return

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      if (!isPlaying) {
        // Draw flat line when not playing
        ctx.beginPath()
        ctx.moveTo(0, canvas.height / 2)
        ctx.lineTo(canvas.width, canvas.height / 2)
        ctx.strokeStyle = "rgba(255, 255, 255, 0.3)"
        ctx.lineWidth = 2
        ctx.stroke()
        return
      }

      const data = generateRandomData()
      const barWidth = canvas.width / data.length

      // Draw bars
      for (let i = 0; i < data.length; i++) {
        const x = i * barWidth
        const height = data[i] * canvas.height
        const y = (canvas.height - height) / 2

        // Create gradient
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
        gradient.addColorStop(0, "rgba(236, 72, 153, 0.7)") // pink-500
        gradient.addColorStop(0.5, "rgba(168, 85, 247, 0.7)") // purple-500
        gradient.addColorStop(1, "rgba(59, 130, 246, 0.7)") // blue-500

        ctx.fillStyle = gradient
        ctx.fillRect(x, y, barWidth - 1, height)
      }
    }

    // Animation loop
    const animate = () => {
      draw()
      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isPlaying])

  return <canvas ref={canvasRef} className="w-full h-8 mt-2" />
}

