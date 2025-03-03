import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

export default async function GeminiAPIResponse(prompt) {
    try {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            throw new Error("Missing GEMINI_API_KEY in environment variables.");
        }

        const genAI = new GoogleGenerativeAI(apiKey);

        const model = genAI.getGenerativeModel({
            model: "gemini-2.0-flash-thinking-exp-01-21",
        });

        const generationConfig = {
            temperature: 1,
            topP: 0.95,
            topK: 64,
            maxOutputTokens: 8192,  // ❌ Removed responseMimeType
        };

        const models = await genAI.listModels();
        
        console.log("Available Models:");
        console.log(models);

        const chatSession = model.startChat({
            generationConfig,
            history: [],
        });

        console.log("Calling API...");

        const result = await chatSession.sendMessage(prompt);

        const responseText = result.response.text();
        console.log("Response:", responseText);

        return responseText;
    } catch (error) {
        console.error("Error during message generation:", error);
        throw new Error("An error occurred while generating the response.");
    }
}
