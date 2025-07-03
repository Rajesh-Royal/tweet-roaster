You are an Next.js and AI senior full stack engineer, you are updating an existing file called `tweet-roaster.tsx` in a Next.js App Router project. The UI is already working and currently generates static tweet roast responses.

Your task is to:

1. Replace the static roast generation logic with a secure server action that:
   - Accepts `tweet`, `mood`, and optional `twitterHandle` from the frontend
   - Calls the OpenAI Chat Completion API using a `system` and `user` prompt to generate **3 roast responses**
   - Returns the roasts back to the frontend

2. Implement a **server action** in `actions/generate-roasts.ts`:
   - Use `use server` directive
   - Validate input using `zod`:
     - tweet: string, required, max 300 chars, no scripts or code
     - mood: one of `["angry", "happy", "humorous", "sarcastic"]`
     - twitterHandle: optional, alphanumeric or underscore, max 30 chars
   - Sanitize and escape all inputs
   - Rate-limit by IP using `@upstash/ratelimit` (3 requests per minute)
   - Use OpenAI API key from `.env` (never expose it client-side)
   - Return 3 roast strings in an array

3. In `tweet-roaster.tsx`:
   - Replace the static roast generation with a call to `generateRoasts()`
   - Show a loading state while waiting
   - Show error if rate limit is hit (e.g. "Too many roasts! Try again soon.")
   - Display each roast cleanly with emoji and level

4. OWASP security guidelines:
   - Avoid XSS via input/output encoding
   - No stack traces or OpenAI errors exposed to client
   - Ensure OpenAI response is trimmed and safe to render
   - Escape content before injecting into the DOM if needed

5. Example roast response (3 outputs):

```ts
[
  "🌶️ Mild: That tweet was a participation trophy in digital form.",
  "🔥 Medium: You really posted that... on purpose?",
  "💀 Hard: Even your drafts are cringing right now."
]

6. Ensure:
   - The OpenAI API key is securely stored and never exposed to the client.
   - Server actions are used (not exposed API routes).
   - The generation logic mimics ChatGPT-style conversational tone.

7. Rate-limit requests per IP using a simple in-memory or edge-safe approach (e.g. with `upstash/ratelimit`, `next-rate-limit`, or a lightweight KV).
   - Limit: 3 requests per minute per IP.
   - On exceeding, return a friendly JSON error like: `{ error: "Whoa, slow down! Too many roasts at once." }`

8. Input validation:
   - Tweet: required, max 300 chars, no malicious content.
   - Mood: must be one of ['angry', 'happy', 'humorous', 'sarcastic'].
   - Twitter handle: optional, must be alphanumeric or `_`, max 30 chars.

9. OWASP protection must be implemented or acknowledged:
   - Sanitize inputs
   - Prevent XSS/Injection via server validation
   - Use HTTP-only cookies if needed
   - Handle errors without leaking stack traces
   - Consider SSRF protection if image/URL scraping ever added

10. Do not leak any API keys or internal errors to the client.