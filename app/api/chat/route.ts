// app/api/chat/route.ts

import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

// Optional, but recommended: run on the edge runtime.
// See https://vercel.com/docs/concepts/functions/edge-functions
export const runtime = "edge";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  // Extract the `messages` from the body of the request
  const { messages } = await req.json();

  const systemContextMessage = {
    role: "system",
    content:
      "You are a helpful assistant answering questions. Keep answers around 6 - 7 sentences",
  };

  const talksLikeMessage = {
    role: "system",
    content: "Talk like Jar Jar Binks from Star Wars.",
  };

  // Request the OpenAI API for the response based on the prompt
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    stream: true,
    messages: [systemContextMessage, talksLikeMessage, ...messages],
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);

  // Respond with the stream
  return new StreamingTextResponse(stream);
}
