"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { HelpCircle, CheckCircle, XCircle, Award } from "lucide-react"
import { cn } from "@/lib/utils"

type Question = {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

const quizQuestions: Question[] = [
  {
    id: 1,
    question: "What does Holi celebrate?",
    options: [
      "The victory of good over evil",
      "The arrival of spring",
      "The divine love of Radha and Krishna",
      "All of the above",
    ],
    correctAnswer: 3,
    explanation:
      "Holi celebrates the victory of good over evil, the arrival of spring, and the divine love of Radha and Krishna.",
  },
  {
    id: 2,
    question: "What is the name of the bonfire lit on the eve of Holi?",
    options: ["Holika Dahan", "Rangwali Holi", "Dhulandi", "Lathmar Holi"],
    correctAnswer: 0,
    explanation:
      "Holika Dahan is the ritual bonfire lit on the eve of Holi, symbolizing the burning of the demoness Holika.",
  },
  {
    id: 3,
    question: "What is 'gulal'?",
    options: [
      "A traditional Holi drink",
      "The colored powder used in Holi",
      "A special Holi sweet",
      "The bonfire lit during Holi",
    ],
    correctAnswer: 1,
    explanation: "Gulal refers to the colored powders that are thrown during Holi celebrations.",
  },
  {
    id: 4,
    question: "In which Indian state is Lathmar Holi celebrated?",
    options: ["Rajasthan", "Gujarat", "Uttar Pradesh", "West Bengal"],
    correctAnswer: 2,
    explanation: "Lathmar Holi is celebrated in Barsana, Uttar Pradesh, where women playfully beat men with sticks.",
  },
  {
    id: 5,
    question: "What traditional drink is associated with Holi celebrations?",
    options: ["Lassi", "Thandai", "Bhang", "Both B and C"],
    correctAnswer: 3,
    explanation:
      "Both Thandai and Bhang are traditional drinks associated with Holi. Bhang is often mixed into Thandai.",
  },
]

export default function HoliQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [showExplanation, setShowExplanation] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [quizStarted, setQuizStarted] = useState(false)

  const handleOptionSelect = (optionIndex: number) => {
    if (selectedOption !== null) return // Prevent changing answer

    setSelectedOption(optionIndex)

    if (optionIndex === quizQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1)
    }

    setShowExplanation(true)
  }

  const handleNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedOption(null)
      setShowExplanation(false)
    } else {
      setQuizCompleted(true)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedOption(null)
    setScore(0)
    setShowExplanation(false)
    setQuizCompleted(false)
  }

  const startQuiz = () => {
    setQuizStarted(true)
  }

  if (!quizStarted) {
    return (
      <Card className="w-full bg-white/90 backdrop-blur-md shadow-xl border-white/20">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-800">Holi Quiz Challenge</CardTitle>
          <CardDescription className="text-gray-600">Test your knowledge about the festival of colors!</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <HelpCircle className="w-16 h-16 mx-auto text-purple-500 mb-4" />
          <p className="text-gray-700 mb-4">
            This quiz contains 5 questions about Holi traditions, history, and celebrations. See how much you know about
            this colorful festival!
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button
            onClick={startQuiz}
            className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold py-3 px-6 rounded-lg text-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Start Quiz
          </Button>
        </CardFooter>
      </Card>
    )
  }

  if (quizCompleted) {
    return (
      <Card className="w-full bg-white/90 backdrop-blur-md shadow-xl border-white/20">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-800">Quiz Completed!</CardTitle>
          <CardDescription className="text-gray-600">
            You scored {score} out of {quizQuestions.length}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <Award
            className={cn(
              "w-16 h-16 mx-auto mb-4",
              score === quizQuestions.length
                ? "text-yellow-500"
                : score >= quizQuestions.length * 0.6
                  ? "text-green-500"
                  : "text-blue-500",
            )}
          />

          <h3 className="text-xl font-bold text-gray-800 mb-2">
            {score === quizQuestions.length
              ? "Perfect Score! Holi Expert!"
              : score >= quizQuestions.length * 0.6
                ? "Great Job! Holi Enthusiast!"
                : "Good Try! Keep Learning About Holi!"}
          </h3>

          <p className="text-gray-700 mb-4">
            {score === quizQuestions.length
              ? "You know everything about Holi! Amazing knowledge!"
              : "Keep learning about Holi traditions and celebrations. You're on the right track!"}
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button
            onClick={resetQuiz}
            className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-bold py-3 px-6 rounded-lg text-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Play Again
          </Button>
        </CardFooter>
      </Card>
    )
  }

  const question = quizQuestions[currentQuestion]

  return (
    <Card className="w-full bg-white/90 backdrop-blur-md shadow-xl border-white/20">
      <CardHeader>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-600">
            Question {currentQuestion + 1}/{quizQuestions.length}
          </span>
          <span className="text-sm font-medium text-gray-600">Score: {score}</span>
        </div>
        <CardTitle className="text-xl font-bold text-gray-800">{question.question}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {question.options.map((option, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: selectedOption === null ? 1.02 : 1 }}
            whileTap={{ scale: selectedOption === null ? 0.98 : 1 }}
          >
            <Button
              onClick={() => handleOptionSelect(index)}
              className={cn(
                "w-full justify-start text-left py-4 px-6 rounded-lg text-gray-800 font-medium",
                selectedOption === null
                  ? "bg-white/70 hover:bg-white/90"
                  : index === question.correctAnswer
                    ? "bg-green-100 border-green-500"
                    : selectedOption === index
                      ? "bg-red-100 border-red-500"
                      : "bg-white/70",
                "transition-all duration-300",
              )}
              disabled={selectedOption !== null}
            >
              <div className="flex items-center w-full">
                <span className="mr-2">{String.fromCharCode(65 + index)}.</span>
                <span className="flex-grow">{option}</span>
                {selectedOption !== null && index === question.correctAnswer && (
                  <CheckCircle className="h-5 w-5 text-green-500 ml-2" />
                )}
                {selectedOption === index && index !== question.correctAnswer && (
                  <XCircle className="h-5 w-5 text-red-500 ml-2" />
                )}
              </div>
            </Button>
          </motion.div>
        ))}

        <AnimatePresence>
          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4"
            >
              <p className="text-blue-800 font-medium">Explanation:</p>
              <p className="text-blue-700">{question.explanation}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
      <CardFooter className="flex justify-end">
        {selectedOption !== null && (
          <Button
            onClick={handleNextQuestion}
            className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {currentQuestion < quizQuestions.length - 1 ? "Next Question" : "See Results"}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

