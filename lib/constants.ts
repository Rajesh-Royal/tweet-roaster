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