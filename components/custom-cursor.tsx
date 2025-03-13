"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [cursorColor, setCursorColor] = useState("rgba(236, 72, 153, 0.7)") // pink-500

  useEffect(() => {
    const colors = [
      "rgba(236, 72, 153, 0.7)", // pink-500
      "rgba(168, 85, 247, 0.7)", // purple-500
      "rgba(59, 130, 246, 0.7)", // blue-500
      "rgba(34, 197, 94, 0.7)", // green-500
      "rgba(234, 179, 8, 0.7)", // yellow-500
    ]

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseOver = (e: MouseEvent) => {
      if (e.target instanceof HTMLElement) {
        const isButton = e.target.tagName === "BUTTON" || e.target.closest("button") || e.target.closest("a")

        setIsHovering(!!isButton)

        // Change color randomly on hover
        if (isButton) {
          setCursorColor(colors[Math.floor(Math.random() * colors.length)])
        }
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseover", handleMouseOver)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseover", handleMouseOver)
    }
  }, [])

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 mix-blend-screen hidden md:block"
        style={{
          x: position.x - 16,
          y: position.y - 16,
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
        }}
      >
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="16" cy="16" r="12" fill={cursorColor} />
          <circle cx="16" cy="16" r="14" stroke={cursorColor} strokeWidth="2" strokeOpacity="0.5" />
        </svg>
      </motion.div>

      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 mix-blend-screen hidden md:block"
        style={{
          x: position.x,
          y: position.y,
          backgroundColor: cursorColor,
        }}
        animate={{
          scale: isHovering ? 0 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
        }}
        className="w-1 h-1 rounded-full bg-pink-500"
      />
    </>
  )
}

