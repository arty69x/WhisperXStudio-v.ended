import { GoogleGenAI } from "@google/genai";

const ai = process.env.GEMINI_API_KEY 
  ? new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })
  : null;

export async function callGemini(prompt: string, systemInstruction: string = "", maxTokens: number = 600) {
  if (!ai) {
    throw new Error("Gemini API key not configured");
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction,
        maxOutputTokens: maxTokens,
      },
    });

    return response.text?.trim() || "";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
}

export async function callGeminiJSON<T>(prompt: string, systemInstruction: string = ""): Promise<T> {
  if (!ai) {
    throw new Error("Gemini API key not configured");
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: systemInstruction + "\n\nCRITICAL: Respond ONLY with a valid JSON object. No markdown formatting, no backticks.",
        responseMimeType: "application/json",
      },
    });

    const text = response.text?.trim() || "{}";
    return JSON.parse(text) as T;
  } catch (error) {
    console.error("Gemini JSON API Error:", error);
    throw error;
  }
}
