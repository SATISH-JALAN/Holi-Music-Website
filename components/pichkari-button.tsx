"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface PichkariButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export default function PichkariButton({ children, className, onClick }: PichkariButtonProps) {
  const [isHovering, setIsHovering] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [particles, setParticles] = useState<
    Array<{
      id: number
      x: number
      y: number
      size: number
      color: string
      angle: number
      speed: number
    }>
  >([])

  const colors = ["bg-pink-500", "bg-purple-500", "bg-blue-500", "bg-green-500", "bg-yellow-500", "bg-red-500"]

  const handleMouseEnter = () => {
    setIsHovering(true)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
  }

  const handleClick = () => {
    if (onClick) onClick()
    setIsClicked(true)

    // Create particles
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const newParticles = Array.from({ length: 20 }, (_, i) => ({
        id: Date.now() + i,
        x: centerX,
        y: centerY,
        size: Math.random() * 10 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        angle: Math.random() * Math.PI * 2,
        speed: Math.random() * 5 + 2,
      }))

      setParticles((prev) => [...prev, ...newParticles])

      // Remove particles after animation
      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => !newParticles.find((np) => np.id === p.id)))
      }, 1000)
    }

    setTimeout(() => {
      setIsClicked(false)
    }, 500)
  }

  useEffect(() => {
    if (particles.length > 0) {
      const interval = setInterval(() => {
        setParticles((prev) =>
          prev.map((particle) => ({
            ...particle,
            x: particle.x + Math.cos(particle.angle) * particle.speed,
            y: particle.y + Math.sin(particle.angle) * particle.speed,
          })),
        )
      }, 16)

      return () => clearInterval(interval)
    }
  }, [particles])

  return (
    <>
      <Button
        ref={buttonRef}
        className={cn(
          "relative overflow-hidden transition-all duration-300",
          isHovering ? "pichkari-spray" : "",
          isClicked ? "animate-bounce" : "",
          className,
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        {children}

        {isHovering && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_1s_infinite]"></div>
          </motion.div>
        )}
      </Button>

      {/* Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={cn("absolute rounded-full pointer-events-none z-50", particle.color)}
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
          }}
          initial={{ opacity: 0.8, scale: 1 }}
          animate={{ opacity: 0, scale: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      ))}
    </>
  )
}

