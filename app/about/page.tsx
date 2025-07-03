import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Github, Heart } from "lucide-react"

export const metadata: Metadata = {
  title: "About TweetRoaster 🔥 - The Story Behind the Roasts",
  description:
    "Learn about TweetRoaster, the ultimate tweet roasting machine. Discover our mission, contributors, and how we turn tweets into comedy gold.",
  alternates: {
    canonical: "/about",
  },
}

export default function About() {
  return (
    <div className="container mx-auto px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            name: "About TweetRoaster",
            description: "Learn about TweetRoaster, the ultimate tweet roasting machine and its creators.",
            url: "https://tweetroaster.vercel.app/about",
            mainEntity: {
              "@type": "Organization",
              name: "TweetRoaster",
              description: "Creators of the ultimate tweet roasting machine",
              url: "https://tweetroaster.vercel.app",
            },
          }),
        }}
      />

      <div className="max-w-4xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          Back to Roaster
        </Link>

        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600 mb-6">
            About TweetRoaster 🔥
          </h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-600 mb-8">
              Welcome to the ultimate tweet roasting experience! TweetRoaster was born from a simple idea: what if we
              could turn any tweet into comedy gold with just a few clicks?
            </p>

            <h2 className="text-2xl font-bold text-gray-800 mb-4">🎯 Our Mission</h2>
            <p className="text-gray-600 mb-6">
              We believe that humor is the best way to deal with the chaos of social media. TweetRoaster provides a fun,
              harmless way to generate witty comebacks and roasts for any tweet, helping you perfect your social media
              game or just have a good laugh.
            </p>

            <h2 className="text-2xl font-bold text-gray-800 mb-4">🔥 How It Works</h2>
            <ul className="text-gray-600 mb-6 space-y-2">
              <li>
                • <strong>Paste any tweet</strong> - Copy and paste the tweet text you want to roast
              </li>
              <li>
                • <strong>Choose your intensity</strong> - From gentle teasing to brutal burns
              </li>
              <li>
                • <strong>Pick your mood</strong> - Angry, happy, humorous, or sarcastic
              </li>
              <li>
                • <strong>Get 3 unique roasts</strong> - Each one tailored to your selections
              </li>
              <li>
                • <strong>Copy and share</strong> - Use them responsibly (or not 😈)
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-800 mb-4">👥 Contributors</h2>
            <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-6 mb-6">
              <p className="text-gray-600 mb-4">
                TweetRoaster is an open-source project built with love and lots of coffee. We welcome contributions from
                developers, comedians, and roast enthusiasts alike!
              </p>
              <div className="flex items-center gap-4">
                <Heart className="text-red-500" size={20} />
                <span className="text-gray-600">Built by the community, for the community</span>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-4">🚀 Tech Stack</h2>
            <p className="text-gray-600 mb-6">
              TweetRoaster is built with modern web technologies to ensure a fast, responsive, and enjoyable experience:
            </p>
            <ul className="text-gray-600 mb-6 space-y-1">
              <li>• Next.js 14 with App Router</li>
              <li>• TypeScript for type safety</li>
              <li>• Tailwind CSS for styling</li>
              <li>• Deployed on Vercel</li>
            </ul>

            <div className="bg-orange-100 rounded-lg p-6 text-center">
              <h3 className="text-xl font-bold text-orange-800 mb-2">Want to Contribute?</h3>
              <p className="text-orange-700 mb-4">
                Help us make TweetRoaster even better! Whether you're a developer, designer, or just have great roast
                ideas, we'd love your input.
              </p>
              <Link
                href="https://github.com/tweetroaster/tweetroaster"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors font-medium"
              >
                <Github size={20} />
                View on GitHub
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
