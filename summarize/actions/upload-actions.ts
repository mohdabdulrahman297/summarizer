"use server";

import { getDbConnection } from "@/lib/db";
import { generateSummaryFromGemini } from "@/lib/geminiai";
import { fetchAndExtractPdfText } from "@/lib/langchain";
import { generateSummaryFromOpenAI } from "@/lib/openai";
import { formatFilenameAsTitle } from "@/utils/format-utils";
import { auth } from "@/node_modules/@clerk/nextjs/dist/types/server";
import { revalidatePath } from "next/cache";

interface pdfSummaryType {
  userId?: string;
  fileUrl: string;
  summary: string;
  title: string;
  fileName: string;
}

export async function generatePdfSummary({
  fileUrl,
  fileName,
}: {
  fileUrl: string;
  fileName: string;
}) {
  if (!fileUrl) {
    return {
      success: false,
      message: "file upload failed",
      data: null,
    };
  }

  try {
    const pdfText = await fetchAndExtractPdfText(fileUrl);
    console.log({ pdfText });

    let summary;
    try {
      summary = await generateSummaryFromGemini(pdfText);
      console.log({ summary });
    } catch (error) {
      console.log(error);
      // call gemini
      if (
        error instanceof Error &&
        error.message === "Rate limit exceeded. Please try again later."
      ) {
        try {
          summary = await generateSummaryFromGemini(pdfText);
        } catch (geminiError) {
          console.error(
            "Gemini API failed after OpenAI API rate limit exceeded",
            geminiError
          );
          throw new Error("Failed to generate summary with available models");
        }
      }
    }

    if (!summary) {
      return {
        success: false,
        message: "Failed to generate summary",
        data: null,
      };
    }

    const formattedFileName = formatFilenameAsTitle(fileName);

    return {
        success: true,
        message: "Summary generated successfully",
        data: {
            title: fileName,
            summary,
        }
    }
  } catch (error) {
    return {
      success: false,
      message: "file upload failed",
      data: null,
    };
  }
}

async function savePdfSummary({
  userId,
  fileUrl,
  summary,
  title,
  fileName,
}: pdfSummaryType) {
  try {
    const sql = await getDbConnection();
    const [savedSummary] = await sql`INSERT INTO pdf_summaries (user_id, orignal_file_url, summary_text, title, file_name)
    VALUES (
       ${userId},
       ${fileUrl},
       ${summary},
       ${title},
       ${fileName}
    ) RETURNING id, summary_text;`;
    return savedSummary;
  } catch (error) {
    console.error("Error saving PDF summary", error);
    throw error;
  }
}

export async function storePdfSummaryAction({
  fileUrl,
  summary,
  title,
  fileName,
}: pdfSummaryType) {
  // user is logged in and has a userId
  // savePdfSummary
  // savePdfSummary()

  let savedSummary: any;

  try {
    const { userId } = await auth();
    if (!userId) {
      return {
        success: false,
        message: "User not found",
      };
    }
    savedSummary = await savePdfSummary({
      userId,
      fileUrl,
      summary,
      title,
      fileName,
    });

    if (!savedSummary) {
      return {
        success: false,
        message: "Failed to save PDF summary",
      };
    }

  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Error saving PDF summary",
    };
  }

  revalidatePath(`/summaries/${savedSummary.id}`);

  return {
    success: true,
    message: "PDF summary saved successfully",
    data: {
      id: savedSummary.id,
    },
  };
}

