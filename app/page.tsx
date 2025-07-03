import type { Metadata } from "next"
import TweetRoaster from "@/components/tweet-roaster"

export const metadata: Metadata = {
  title: "TweetRoaster 🔥 - Turn Tweets into Toasted Crumbs",
  description:
    "The ultimate tweet roasting machine! Paste any tweet and get 3 hilarious roast responses. Choose your roast intensity and mood for personalized burns.",
  alternates: {
    canonical: "/",
  },
}

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "TweetRoaster - Home",
            description:
              "Generate hilarious roast responses for any tweet with customizable intensity and mood settings.",
            url: "https://tweetroaster.vercel.app",
            mainEntity: {
              "@type": "SoftwareApplication",
              name: "TweetRoaster",
              applicationCategory: "Entertainment",
              operatingSystem: "Web Browser",
            },
          }),
        }}
      />

      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600 mb-4">
          TweetRoaster 🔥
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 font-medium">Turn tweets into toasted crumbs.</p>
        <p className="text-gray-500 mt-2 max-w-2xl mx-auto">
          Paste any tweet and watch our AI roast it with style. Choose your intensity and mood for the perfect burn!
        </p>
      </div>

      <TweetRoaster />
    </div>
  )
}
