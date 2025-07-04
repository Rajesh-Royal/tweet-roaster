import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Github } from "lucide-react";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TweetRoaster 🔥 - Turn Tweets into Toasted Crumbs",
  description:
    "The ultimate tweet roasting machine! Paste any tweet and get 3 hilarious roast responses based on your mood and intensity level. Free online tweet roaster tool.",
  keywords: [
    "tweet roaster",
    "twitter roast",
    "social media humor",
    "tweet generator",
    "roast generator",
    "twitter jokes",
    "social media tools",
  ],
  authors: [{ name: "TweetRoaster Team" }],
  creator: "TweetRoaster",
  publisher: "TweetRoaster",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://tweetroaster.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "TweetRoaster 🔥 - Turn Tweets into Toasted Crumbs",
    description:
      "The ultimate tweet roasting machine! Generate hilarious roast responses for any tweet.",
    url: "https://tweetroaster.vercel.app",
    siteName: "TweetRoaster",
    images: [
      {
        url: "https://tweetroaster.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "TweetRoaster - Turn Tweets into Toasted Crumbs",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TweetRoaster 🔥 - Turn Tweets into Toasted Crumbs",
    description:
      "The ultimate tweet roasting machine! Generate hilarious roast responses for any tweet.",
    images: ["/og-image.png"],
    creator: "@tweetroaster",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "TweetRoaster",
              description:
                "The ultimate tweet roasting machine! Paste any tweet and get 3 hilarious roast responses based on your mood and intensity level.",
              url: "https://tweetroaster.vercel.app",
              applicationCategory: "Entertainment",
              operatingSystem: "Web Browser",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              creator: {
                "@type": "Organization",
                name: "TweetRoaster Team",
              },
              featureList: [
                "Generate 3 roast responses per tweet",
                "Multiple roast intensity levels",
                "Mood-based roasting styles",
                "Copy roasts to clipboard",
                "Mobile-friendly interface",
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${inter.className} min-h-screen bg-gradient-to-br from-orange-50 to-red-50`}
      >
        <div className="min-h-screen flex flex-col">
          <main className="flex-1">{children}</main>
          <footer className="bg-white border-t border-orange-200 py-6 mt-12">
            <div className="container mx-auto px-4 text-center">
              <p className="text-gray-600 mb-2">
                Made with 🔥 by{" "}
                <span className="font-semibold text-orange-600">
                  TweetRoaster Team
                </span>
              </p>
              <Link
                href="https://github.com/Rajesh-Royal/tweet-roaster"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-gray-500 hover:text-orange-600 transition-colors"
              >
                <Github size={20} />
                <span>View on GitHub</span>
              </Link>
            </div>
          </footer>
        </div>
        <Analytics />
        <Toaster />
      </body>
    </html>
  );
}
