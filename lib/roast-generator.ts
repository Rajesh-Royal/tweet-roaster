type RoastLevel = "easy" | "medium" | "hard"
type Mood = "angry" | "happy" | "humorous" | "sarcastic"

interface RoastResult {
  text: string
  level: RoastLevel
  mood: Mood
}

const roastTemplates = {
  easy: {
    angry: [
      "This tweet is mildly annoying, like a mosquito that won't leave you alone.",
      "I've seen more excitement in a grocery store receipt.",
      "This take is about as hot as lukewarm coffee.",
    ],
    happy: [
      "Aww, this tweet is trying so hard to be relevant! 😊",
      "Bless your heart for sharing this with the world!",
      "This is cute in the way a participation trophy is cute!",
    ],
    humorous: [
      "This tweet walked into a bar... and nobody noticed.",
      "I'd roast this harder, but I don't want to overcook something already well-done.",
      "This tweet is like a dad joke - it thinks it's funnier than it is.",
    ],
    sarcastic: [
      "Oh wow, what a groundbreaking observation. Truly revolutionary.",
      "I'm sure this will age like fine wine... or milk left in the sun.",
      "Such wisdom. I'm definitely taking notes here.",
    ],
  },
  medium: {
    angry: [
      "This tweet makes me want to throw my phone into a volcano.",
      "The audacity of posting this publicly is honestly impressive.",
      "This is the kind of content that makes aliens avoid Earth.",
    ],
    happy: [
      "This tweet is so precious! Like a child's first attempt at philosophy! 🌟",
      "I love how confident you are about being completely wrong!",
      "This radiates the same energy as someone wearing socks with sandals!",
    ],
    humorous: [
      "This tweet just called - it wants its credibility back.",
      "I've seen more depth in a puddle after a light drizzle.",
      "This is the tweet equivalent of bringing a spoon to a knife fight.",
    ],
    sarcastic: [
      "Ah yes, because this is exactly what the internet was missing.",
      "I'm sure your high school English teacher is very proud right now.",
      "This tweet really said 'hold my beer' to common sense.",
    ],
  },
  hard: {
    angry: [
      "This tweet is a crime against humanity and should be tried at The Hague.",
      "I've lost brain cells just reading this digital disaster.",
      "This is why aliens won't visit us - they've seen your tweets.",
    ],
    happy: [
      "This tweet is adorably wrong! Like watching someone confidently walk into a glass door! ✨",
      "I'm genuinely impressed by your ability to be this confidently incorrect!",
      "This has the same energy as someone explaining the internet to Einstein!",
    ],
    humorous: [
      "This tweet just got roasted harder than a marshmallow at a bonfire.",
      "I'd explain why this is wrong, but I don't have that kind of time or crayons.",
      "This tweet is the reason why Twitter has a character limit - to minimize the damage.",
    ],
    sarcastic: [
      "Congratulations, you've just set the bar so low it's practically underground.",
      "This tweet is a masterclass in how to be wrong with maximum confidence.",
      "I'm sure this seemed brilliant in your head. That's where it should have stayed.",
    ],
  },
}

const personalizedPrefixes = [
  "Hey @{handle},",
  "@{handle}, sweetie,",
  "Listen @{handle},",
  "@{handle}, bless your heart,",
  "Oh @{handle},",
]

export function generateRoasts(tweetText: string, twitterHandle: string, level: RoastLevel, mood: Mood): RoastResult[] {
  const templates = roastTemplates[level][mood]
  const results: RoastResult[] = []

  // Generate 3 unique roasts
  const shuffledTemplates = [...templates].sort(() => Math.random() - 0.5)

  for (let i = 0; i < 3; i++) {
    let roastText = shuffledTemplates[i % templates.length]

    // Add personalization if handle is provided
    if (twitterHandle && Math.random() > 0.5) {
      const prefix = personalizedPrefixes[Math.floor(Math.random() * personalizedPrefixes.length)]
      const cleanHandle = twitterHandle.replace("@", "")
      roastText = prefix.replace("{handle}", cleanHandle) + " " + roastText.toLowerCase()
    }

    // Add some variety by occasionally referencing the tweet content
    if (tweetText.length > 0 && Math.random() > 0.7) {
      const tweetWords = tweetText.toLowerCase().split(" ")
      const keyWords = tweetWords.filter(
        (word) =>
          word.length > 4 &&
          !["this", "that", "with", "have", "will", "been", "from", "they", "know", "want", "been"].includes(word),
      )

      if (keyWords.length > 0) {
        const randomWord = keyWords[Math.floor(Math.random() * keyWords.length)]
        const contextualRoasts = [
          `Imagine thinking "${randomWord}" was worth sharing with the world.`,
          `The way you used "${randomWord}" tells me everything I need to know.`,
          `"${randomWord}" - and I cannot stress this enough - is not the flex you think it is.`,
        ]

        if (Math.random() > 0.5) {
          roastText = contextualRoasts[Math.floor(Math.random() * contextualRoasts.length)]
        }
      }
    }

    results.push({
      text: roastText,
      level,
      mood,
    })
  }

  return results
}
