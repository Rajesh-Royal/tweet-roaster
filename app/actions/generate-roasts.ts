"use server";

import { z } from "zod";
import { OpenAI } from "openai";
import { headers } from "next/headers";
import { MOODS, ROAST_LEVELS } from "@/lib/constants";

const roastSchema = z.object({
  tweet: z
    .string()
    .min(1, "Tweet is required.")
    .max(300, "Tweet must be at most 300 characters.")
    .refine(
      (val) => !/<script|<\/script|<iframe|<object|<embed|<applet|<form|<input|<textarea|<button|<link|<style|<img|<svg|<math|<base|<meta|<body|<html|<head|<title|<audio|<video|<source|<track|<canvas|<map|<area|<frame|<frameset|<noframes|<param|<bgsound|<layer|<ilayer|<plaintext|<xmp|<xml|<marquee|<blink|<spacer|<comment|<isindex|<listing|<nextid|<noembed|<noscript|<rb|<rtc|<shadow|<template|<tt|<u|<wbr|<xmp/gi.test(val),
      {
        message: "Tweet contains forbidden content.",
      }
    ),
  mood: z.enum(MOODS.map((m) => m.id) as [string, ...string[]]),
  roastLevel: z.enum(ROAST_LEVELS.map((r) => r.id) as [string, ...string[]]),
  twitterHandle: z
    .string()
    .max(30)
    .regex(/^([a-zA-Z0-9_]+)?$/, "Invalid Twitter handle.")
    .optional(),
});

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

function escapeHTML(str: string) {
  return str.replace(/[&<>'"`]/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;",
    "`": "&#96;",
  }[c] as string));
}

export async function generateRoasts(formData: unknown) {
  try {
    const { tweet, mood, roastLevel, twitterHandle } = roastSchema.parse(formData);
    // Sanitize inputs
    const safeTweet = escapeHTML(tweet.trim());
    const safeHandle = twitterHandle ? escapeHTML(twitterHandle.trim()) : undefined;
    const systemPrompt = `You are a witty AI roast generator. Given a tweet, a mood, and a roast level (easy, medium, hard), generate 3 roast responses in a conversational, ChatGPT-like tone. Each roast should be labeled with an emoji and level (Mild, Medium, Hard). Format: [\n"🌶️ Mild: ...", "🔥 Medium: ...", "💀 Hard: ..."]\nRoast Level: ${roastLevel}`;
    const userPrompt = `Tweet: "${safeTweet}"\nMood: ${mood}${safeHandle ? `\nTwitter Handle: @${safeHandle}` : ""}`;
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      max_tokens: 300,
      temperature: 0.9,
    });
    const text = completion.choices[0]?.message?.content || "";
    // Extract array of roasts from response
    let roasts: string[] = [];
    try {
      roasts = JSON.parse(text);
    } catch {
      // fallback: try to split by newlines if not valid JSON
      roasts = text.split(/\n+/).filter(Boolean).map((r) => r.trim());
    }
    // Final output sanitization
    roasts = roasts.map((r) => escapeHTML(r).slice(0, 300));
    if (roasts.length !== 3) {
      return { error: "Could not generate 3 roasts. Please try again." };
    }
    return { roasts };
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return { error: err.errors[0]?.message || "Invalid input." };
    }
    // Handle OpenAI quota exceeded error
    if (err?.code === "insufficient_quota" || err?.status === 429) {
      return { error: "OpenAI quota exceeded 😢. Please try again later or check your API plan." };
    }
    // Do not leak stack traces or OpenAI errors
    return { error: "Something went wrong. Please try again later." };
  }
} 