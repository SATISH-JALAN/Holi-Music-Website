"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function WelcomeAnimation() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const title = "Holi Playlist Generator"
  const letters = Array.from(title)

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.3 * i },
    }),
  }

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  }

  return (
    <div className="relative">
      <motion.h1
        className="text-5xl md:text-7xl font-bold text-center"
        variants={container}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      >
        {letters.map((letter, index) => (
          <motion.span
            key={index}
            variants={child}
            className={`inline-block ${
              letter === " " ? "mr-4" : ""
            } text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 neon-text`}
          >
            {letter}
          </motion.span>
        ))}
      </motion.h1>

      <motion.div
        className="absolute -z-10 inset-0 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-indigo-500/20 blur-3xl rounded-full"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.6, scale: 1.2 }}
        transition={{ delay: 0.5, duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
      />
    </div>
  )
}

