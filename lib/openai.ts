import { OpenAI } from "openai";
import { SUMMARY_SYSTEM_PROMPT } from "./prompts";

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  throw new Error("Missing OPENAI_API_KEY");
}

const openai = new OpenAI({ apiKey });

export async function generateSummaryFromOpenAI(pdfText: string): Promise<string> {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: SUMMARY_SYSTEM_PROMPT },
        {
          role: "user",
          content: `Transform this document into an engaging, easy-to-read summary with contextually relevant emojis and proper markdown formatting:\n\n${pdfText}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 1500,
    });

    const message = completion.choices?.[0]?.message?.content;
    if (!message) {
      throw new Error("OpenAI returned no summary content");
    }
    return message;

  } catch (error: any) {
    // Rate-limit fallback
    if (error?.response?.status === 429) {
      throw new Error("Rate limit exceeded. Please try again later.");
    }

    // Log full details for debugging
    console.error(
      `OpenAI API error ${error?.response?.status ?? ""}:`,
      error
    );
    throw new Error("Failed to generate summary.");
  }
}
