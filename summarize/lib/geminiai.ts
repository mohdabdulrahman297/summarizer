import { GoogleGenerativeAI } from "@google/generative-ai";
import { SUMMARY_SYSTEM_PROMPT } from "./prompts";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export const generateSummaryFromGemini = async (pdfText: string) => {
    try {
        const model = genAI.getGenerativeModel({ 
            model: "gemini-1.5-flash-002",
            generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 1024,
            },
        });

        const prompt = {
            contents: [
                {
                    role: "user",
                    parts: [
                        {text: SUMMARY_SYSTEM_PROMPT},
                        {text: `Transform this document into an engaging, easy-to-read summary with contextually relevant emojis and proper markdown formatting:\n\n${pdfText}`},
                    ],
                },
            ],
        };

        const result = await model.generateContent(prompt);
        const response = await result.response;

        if(!response.text()) {
            throw new Error("No response from Gemini API");
        }

        return response.text();
    } catch (error: any) {
        console.error("Error from Gemini API:", error);
        throw error;
    }
}