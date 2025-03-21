"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronDown, ChevronUp } from "lucide-react"

interface FaqItemProps {
  question: string
  answer: string
}

export default function FaqItem({ question, answer }: FaqItemProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Card className="border-gray-800 bg-gray-950/50 shadow-lg backdrop-blur overflow-hidden">
      <CardContent className="p-0">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full p-6 text-left focus:outline-none rounded-lg"
        >
          <h3 className="text-lg font-bold text-white">{question}</h3>
          <div className="ml-4 flex-shrink-0">
            {isOpen ? (
              <ChevronUp className="h-5 w-5 text-gray-400" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-400" />
            )}
          </div>
        </button>
        <div className={`px-6 pb-6 ${isOpen ? "block" : "hidden"}`}>
          <p className="text-gray-400">{answer}</p>
        </div>
      </CardContent>
    </Card>
  )
}

