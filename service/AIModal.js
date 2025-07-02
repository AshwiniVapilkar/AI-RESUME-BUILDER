import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;

const genAI = new GoogleGenerativeAI(apiKey);

export async function generateSummary(prompt) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Correct model ID
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
    return text;
  } catch (err) {
    console.error("❌ AI Error:", err);
    throw new Error("Failed to generate summary. Please try again later.");
  }
}
