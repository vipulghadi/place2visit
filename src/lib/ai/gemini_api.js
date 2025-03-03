import { GoogleGenerativeAI } from "@google/generative-ai";

function extractJSON(text) {
    try {
        if (text.startsWith("`")) {
            console.log("Extracting JSON from code block...");
            let start = text.indexOf('{');
            let end = text.lastIndexOf('}');

            if (start !== -1 && end !== -1) {
                let jsonText = text.substring(start, end + 1); 
                return jsonText
            }
        } else if (text.startsWith("{") && text.endsWith("}")) {
            console.log("Extracting JSON from plain text...");
            return jsonText
        }
    } catch (error) {
        console.error("Error parsing JSON:", error);
    }
    return text; // Return text if JSON parsing fails
}

export default async function GeminiAPIResponse(prompt) {
    try {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            throw new Error("Missing GEMINI_API_KEY in environment variables.");
        }

        const genAI = new GoogleGenerativeAI(apiKey);

        const model = genAI.getGenerativeModel({ model: "gemini-2.0-pro-exp-02-05" });

        const generationConfig = {
            temperature: 1,
            topP: 0.95,
            topK: 64,
            maxOutputTokens: 8192,
        };

        const chatSession = model.startChat({
            generationConfig,
            history: [],
        });

        console.log("Calling Gemini API...");

        const result = await chatSession.sendMessage(prompt);

        const responseText =  result.response.text(); 
        const extractedJSON = extractJSON(responseText);
        
        return extractedJSON
         // Ensure text() is awaited
        
// const json_resp=await extractJSON(responseText);
// console.log(json_resp);

//         return json_resp
    } catch (error) {
        console.error("Error during Gemini API call:", error);
        throw new Error("An error occurred while generating the response.");
    }
}
