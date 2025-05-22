"use server";

import { generateSummaryFromGemini } from "@/lib/geminiai";
import { fetchAndExtractPdfText } from "@/lib/langchain";
import { generateSummaryFromOpenAI } from "@/lib/openai";

export async function generatePdfSummary(uploadResponse:[ {
    serverData: {
        userId: string;
        file: {
            url: string;
            name: string;
        };
    };
}]) {
    if (!uploadResponse) {
        return {
            success: false,
            message: "file upload failed",
            data: null,
        };
    }

    const {
        serverData: {
            userId,
            file: { url: pdfUrl, name: fileName },
        }
    } = uploadResponse[0];

    if(!pdfUrl) {
        return {
            success: false,
            message: "file upload failed",
            data: null,
        };
    }

    try {
        const pdfText = await fetchAndExtractPdfText(pdfUrl);
        console.log({pdfText});

        let summary;
        try {
            summary = await generateSummaryFromGemini(pdfText);
            console.log({summary});
        } catch (error) {
            console.log(error);
            // call gemini
            if(error instanceof Error && error.message === "Rate limit exceeded. Please try again later.") {
                try {
                    summary = await generateSummaryFromGemini(pdfText);
                } catch (geminiError) {
                    console.error(
                        'Gemini API failed after OpenAI API rate limit exceeded',
                        geminiError
                    );
                    throw new Error('Failed to generate summary with available models');
                }
            }
        }

        if(!summary) {
            return {
                success: false,
                message: "Failed to generate summary",
                data: null,
            };
        }

    } catch (error) {
        return {
            success: false,
            message: "file upload failed",
            data: null,
        };
    }
    
}
 