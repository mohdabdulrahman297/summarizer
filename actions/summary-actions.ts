"use server";

import { getDbConnection } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
export async function deleteSummaryAction(summaryId: string) {
  try {
    const user = await currentUser();
    const userId = user?.id;
    if (!userId) {
      throw new Error("User not found");
    }
    const sql = await getDbConnection();
    // delete the summary from the database
    const result =
      await sql`DELETE FROM pdf_summaries WHERE id = ${summaryId} AND user_id = ${userId} RETURNING id;`;
    // revalidatePath
    if (result.length > 0) {
        revalidatePath("/dashboard");
        return { success: true, message: "Summary deleted successfully" };
    }
    
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete summary");
  }
}
