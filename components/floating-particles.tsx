"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

type Particle = {
  id: number
  x: number
  y: number
  size: number
  color: string
  duration: number
  delay: number
}

const colors = ["bg-pink-500", "bg-purple-500", "bg-blue-500", "bg-green-500", "bg-yellow-500", "bg-red-500"]

export default function FloatingParticles() {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    // Create initial particles
    const initialParticles: Particle[] = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 10 + 5,
      color: colors[Math.floor(Math.random() * colors.length)],
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
    }))

    setParticles(initialParticles)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={cn("absolute rounded-full opacity-30 pointer-events-none", particle.color)}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            x: [Math.random() * 100 - 50, Math.random() * 100 - 50, Math.random() * 100 - 50],
            y: [Math.random() * 100 - 50, Math.random() * 100 - 50, Math.random() * 100 - 50],
          }}
          transition={{
            duration: particle.duration,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: particle.delay,
          }}
        />
      ))}
    </div>
  )
}

