import { openai } from "@ai-sdk/openai";

import { OpenAI } from "openai";

export const openaiClient = openai("gpt-4o-mini");
export const openaiRaw = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
