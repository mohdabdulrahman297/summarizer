export const isDev = process.env.NODE_ENV === "development";
export const isProd = process.env.NODE_ENV === "production";

export const ORIGIN_URL = isDev
  ? "http://localhost:3000"
  : process.env.NEXT_PUBLIC_ORIGIN_URL || "https://your-production-domain.com";
