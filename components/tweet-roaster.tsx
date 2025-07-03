"use client"

import { useState } from "react"
import { Copy, Flame, Sparkles, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Mood, MOODS, ROAST_LEVELS, RoastLevel } from "@/lib/constants"

interface RoastResult {
  text: string
  level: RoastLevel
  mood: Mood
}

const loadingMessages = [
  "Brace yourself! 🔥",
  "Cooking up some heat... 🌶️",
  "Sharpening the roast... ⚔️",
  "Preparing the burn... 💀",
  "Loading maximum sass... 😈",
]

export default function TweetRoaster() {
  const [tweetText, setTweetText] = useState("")
  const [twitterHandle, setTwitterHandle] = useState("")
  const [selectedLevel, setSelectedLevel] = useState<RoastLevel>(ROAST_LEVELS[1].id)
  const [selectedMood, setSelectedMood] = useState<Mood>(MOODS[2].id)
  const [roasts, setRoasts] = useState<RoastResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState("")
  const [error, setError] = useState<string | null>(null)

  const handleRoast = async () => {
    if (!tweetText.trim()) return
    setIsLoading(true)
    setError(null)
    setLoadingMessage(loadingMessages[Math.floor(Math.random() * loadingMessages.length)])
    try {
      const res = await fetch("/app/actions/generate-roasts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tweet: tweetText,
          mood: selectedMood,
          roastLevel: selectedLevel,
          twitterHandle: twitterHandle.replace(/^@/, "") || undefined,
        }),
      })
      const data = await res.json()
      if (data.error) {
        setError(data.error)
        setRoasts([])
      } else if (Array.isArray(data.roasts)) {
        setRoasts(
          data.roasts.map((text: string, i: number) => ({
            text,
            level: ROAST_LEVELS[i]?.id || selectedLevel,
            mood: selectedMood,
          }))
        )
      } else {
        setError("Could not generate roasts. Please try again.")
        setRoasts([])
      }
    } catch {
      setError("Something went wrong. Please try again later.")
      setRoasts([])
    }
    setIsLoading(false)
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      // You could add a toast notification here
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  const clearResults = () => {
    setRoasts([])
  }

  const getMoodColor = (mood: Mood) => {
    switch (mood) {
      case "angry":
        return "border-red-500 bg-red-50"
      case "happy":
        return "border-yellow-500 bg-yellow-50"
      case "humorous":
        return "border-blue-500 bg-blue-50"
      case "sarcastic":
        return "border-purple-500 bg-purple-50"
      default:
        return "border-gray-500 bg-gray-50"
    }
  }

  return (
    <TooltipProvider>
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8">
          <div className="space-y-6">
            {/* Tweet Input */}
            <div>
              <Label htmlFor="tweet-text" className="text-lg font-semibold text-gray-700 mb-2 block">
                Paste the tweet to roast 📝
              </Label>
              <Textarea
                id="tweet-text"
                placeholder="Paste the tweet text here... (e.g., 'Just had the best coffee ever! ☕️ #blessed')"
                value={tweetText}
                onChange={(e) => setTweetText(e.target.value)}
                className="min-h-[120px] text-lg resize-none"
                maxLength={280}
              />
              <p className="text-sm text-gray-500 mt-1">{tweetText.length}/280 characters</p>
            </div>

            {/* Twitter Handle (Optional) */}
            <div>
              <Label htmlFor="twitter-handle" className="text-lg font-semibold text-gray-700 mb-2 block">
                Twitter Handle <span className="text-sm font-normal text-gray-500">(optional)</span>
              </Label>
              <Input
                id="twitter-handle"
                placeholder="@username (for more personalized roasts)"
                value={twitterHandle}
                onChange={(e) => setTwitterHandle(e.target.value)}
                className="text-lg"
              />
            </div>

            {/* Roast Level Selector */}
            <div>
              <Label className="text-lg font-semibold text-gray-700 mb-3 block">Choose your roast level 🌡️</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {ROAST_LEVELS.map((level) => (
                  <Tooltip key={level.id}>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => setSelectedLevel(level.id as RoastLevel)}
                        className={`p-4 rounded-lg border-2 transition-all hover:scale-105 ${
                          selectedLevel === level.id
                            ? "border-orange-500 bg-orange-50 shadow-md"
                            : "border-gray-200 bg-white hover:border-orange-300"
                        }`}
                      >
                        <div className="text-2xl mb-1">{level.emoji}</div>
                        <div className="font-medium text-gray-700">{level.label}</div>
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{level.description}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </div>

            {/* Mood Selector */}
            <div>
              <Label className="text-lg font-semibold text-gray-700 mb-3 block">Pick your mood 🎭</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {MOODS.map((mood) => (
                  <Tooltip key={mood.id}>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => setSelectedMood(mood.id as Mood)}
                        className={`p-4 rounded-lg border-2 transition-all hover:scale-105 ${
                          selectedMood === mood.id
                            ? "border-orange-500 bg-orange-50 shadow-md"
                            : "border-gray-200 bg-white hover:border-orange-300"
                        }`}
                      >
                        <div className="text-2xl mb-1">{mood.emoji}</div>
                        <div className="font-medium text-gray-700 text-sm">{mood.label}</div>
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{mood.description}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </div>

            {/* Roast Button */}
            <div className="text-center pt-4">
              <Button
                onClick={handleRoast}
                disabled={!tweetText.trim() || isLoading}
                className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold py-4 px-8 rounded-xl text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <Flame className="animate-pulse" size={20} />
                    Roasting...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Zap size={20} />
                    Roast it!
                  </div>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Loading Message */}
        {isLoading && (
          <div className="text-center mb-8">
            <div className="bg-white rounded-lg shadow-md p-6 inline-block">
              <div className="flex items-center gap-3">
                <Sparkles className="animate-spin text-orange-500" size={24} />
                <span className="text-lg font-medium text-gray-700">{loadingMessage}</span>
              </div>
            </div>
          </div>
        )}

        {/* Roast Results */}
        {roasts.length > 0 && !isLoading && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">Your Roasts 🔥</h2>
              <Button
                onClick={clearResults}
                variant="outline"
                className="text-gray-600 hover:text-gray-800 bg-transparent"
              >
                Clear Results
              </Button>
            </div>

            <div className="grid gap-4">
              {roasts.map((roast, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-xl border-2 ${getMoodColor(roast.mood)} transition-all hover:shadow-md`}
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-lg">{ROAST_LEVELS.find((l) => l.id === roast.level)?.emoji}</span>
                        <span className="text-lg">{MOODS.find((m) => m.id === roast.mood)?.emoji}</span>
                        <span className="text-sm font-medium text-gray-600">
                          {ROAST_LEVELS.find((l) => l.id === roast.level)?.label} •{" "}
                          {MOODS.find((m) => m.id === roast.mood)?.label}
                        </span>
                      </div>
                      <p className="text-gray-800 text-lg leading-relaxed">{roast.text}</p>
                    </div>
                    <Button
                      onClick={() => copyToClipboard(roast.text)}
                      variant="ghost"
                      size="sm"
                      className="shrink-0 hover:bg-white/50"
                    >
                      <Copy size={16} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="text-center mb-8">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative inline-block" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          </div>
        )}
      </div>
    </TooltipProvider>
  )
}
