"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";

const holiFacts = [
  "Holi marks the arrival of spring and the end of winter.",
  "The festival is also known as the 'Festival of Colors' or the 'Festival of Love'.",
  "Holi celebrations start with a Holika bonfire on the night before Holi.",
  "The colored powders used in Holi are called 'gulal'.",
  "Traditional Holi drinks include 'bhang', which is made from cannabis.",
  "Holi is celebrated at the approach of the vernal equinox.",
  "The festival has ancient origins and is mentioned in early religious texts.",
  "Holi celebrates the divine love of Radha and Krishna.",
  "In West Bengal, Holi is known as 'Dol Jatra' or 'Dol Purnima'.",
  "Holi is a time for forgetting and forgiving past conflicts.",
  "The legend of Holika and Prahlad is one of the main stories behind Holi.",
  "In Mathura and Vrindavan, Holi celebrations last for 16 days.",
  "The tradition of playing with colors comes from Krishna, who used to play with colors with the gopis.",
  "Different regions in India have their own unique Holi traditions.",
  "Holi is also celebrated in Nepal, Suriname, Guyana, Trinidad and Tobago, and other countries with significant Hindu populations.",
];

interface HoliFactProps {
  className?: string;
  standalone?: boolean;
}

export default function HoliFact({ className, standalone = false }: HoliFactProps) {
  const [showFact, setShowFact] = useState(false);
  const [fact, setFact] = useState("");
  const [factIndex, setFactIndex] = useState(0);
  const [mounted, setMounted] = useState(false); // Fix SSR hydration issue

  // Fix hydration issue by ensuring component is mounted before rendering interactive elements
  useEffect(() => {
    setMounted(true);
  }, []);

  const getRandomFact = () => {
    console.log("Button clicked!"); // Debugging step

    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * holiFacts.length);
    } while (randomIndex === factIndex && holiFacts.length > 1);

    setFactIndex(randomIndex);
    setFact(holiFacts[randomIndex]);
    setShowFact(true);

    if (!standalone) {
      setTimeout(() => {
        setShowFact(false);
      }, 5000);
    }
  };

  useEffect(() => {
    if (standalone) {
      getRandomFact();
    }
  }, [standalone]);

  if (!mounted) return null; // Prevents rendering until client-side

  return (
    <div className={className}>
      {standalone ? (
        <Button
          onClick={getRandomFact}
          className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold py-3 px-6 rounded-lg text-lg shadow-lg hover:shadow-xl transition-all duration-300 w-full"
        >
          <Info className="h-5 w-5 mr-2" />
          Tell me a Holi Fact
        </Button>
      ) : (
        <button
          onClick={getRandomFact}
          className="text-gray-800 hover:text-gray-900 text-sm flex items-center transition-colors duration-300"
        >
          <Info className="h-4 w-4 mr-1" />
          Holi Fun Fact
        </button>
      )}

      <AnimatePresence>
        {showFact && (
          <motion.div
            initial={{ opacity: 0, y: 10, rotateX: 90 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, y: -10, rotateX: 90 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
            className="mt-4 bg-white/80 backdrop-blur-md rounded-lg p-4 text-gray-800 border border-white/20 shadow-lg"
          >
            <motion.p
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 10,
                delay: 0.1,
              }}
              className="font-medium"
            >
              {fact}
            </motion.p>

            {standalone && (
              <div className="mt-4 flex justify-end">
                <Button variant="outline" size="sm" onClick={getRandomFact} className="text-sm">
                  Next Fact
                </Button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
