import { getDbConnection } from "./db";

export async function getSummaries(userId: string) {
  const sql = await getDbConnection();
  const summaries = await sql`
        SELECT * FROM pdf_summaries
        WHERE user_id = ${userId}
        ORDER BY created_at DESC
    `;
  return summaries;
}

export async function getSummaryId(id: string) {
  try {
    const sql = await getDbConnection();
    const [summary] = await sql`
      SELECT id, user_id, title, orignal_file_url, summary_text, created_at, updated_at, status, file_name,
        LENGTH(summary_text) - LENGTH(REPLACE(summary_text, ' ', '')) + 1 as word_count
      from pdf_summaries
      where id = ${id}
    `;
    return summary;
  } catch (error) {
    console.error("Error getting summary by id", error);
    throw error;
  }
}

export async function getUserUploadCount(userId: string) {
  const sql = await getDbConnection();
  try {
    const [result] = await sql`
      SELECT COUNT(*) as count FROM pdf_summaries
      WHERE user_id = ${userId}
    `;
    return result.count;
  } catch (error) {
    console.error("Error getting user upload count", error);
    throw error;
  }
}
