export const ROAST_LEVELS = [
  { id: "easy", emoji: "🌶️", label: "Easy Roast", description: "Gentle teasing with a smile" },
  { id: "medium", emoji: "🔥", label: "Medium Roast", description: "Solid burns with attitude" },
  { id: "hard", emoji: "💀", label: "Hard Roast", description: "Brutal and unfiltered destruction" },
] as const;
export type RoastLevel = typeof ROAST_LEVELS[number]["id"];

export const MOODS = [
  { id: "angry", emoji: "😡", label: "Angry", description: "Furious and aggressive tone" },
  { id: "happy", emoji: "😄", label: "Happy", description: "Cheerful but cutting remarks" },
  { id: "humorous", emoji: "😂", label: "Humorous", description: "Funny and witty comebacks" },
  { id: "sarcastic", emoji: "🧐", label: "Sarcastic", description: "Dry wit and clever mockery" },
] as const;
export type Mood = typeof MOODS[number]["id"];

export const openAPIErrors = {
  original: { error: "OpenAI quota exceeded 😢. Please try again later or check your API plan." },
  funny: { error: "You've roasted too hard and broke the AI 🔥💀. OpenAI says 'no more jokes for now.' Check your plan or give it a break." },
  funnyUserApi: { error: "Your OpenAI key ran out of roast fuel ⛽. Either top it up or let the poor model rest." },
  playful: { error: "Your API key needs a nap 😴. Looks like OpenAI put it in timeout. Try again later!" },
  userApiByMood: {
    angry: { error: "Your API key is as angry as you are! 😡 It's out of quota. Try topping it up or take a breather." },
    happy: { error: "Even happy keys need a break! 😄 Your API key is out of quota. Recharge and try again soon." },
    humorous: { error: "Your API key ran out of jokes! 😂 Out of quota. Maybe it's time for a coffee break?" },
    sarcastic: { error: "Your API key is being sarcastic: 'Oh, you thought you had unlimited quota?' 🧐 Try again later." },
  }
}