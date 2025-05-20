"use server";

import { fetchAndExtractPdfText } from "@/lib/langchain";

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
        return { // <-- IMPORTANT: Return the data
            success: true,
            message: "PDF text extracted successfully",
            data: pdfText, // Return the actual extracted text
        };
    } catch (error) {
        return {
            success: false,
            message: "file upload failed",
            data: null,
        };
    }
    
}
 