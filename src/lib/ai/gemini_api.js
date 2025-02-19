import { GoogleGenerativeAI } from "@google/generative-ai";



export default  async function GeminiAPIResponse(  prompt )
{
const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-pro-exp-02-05",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };

  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  try {
    console.log("calling api");
    
    const result = await chatSession.sendMessage(prompt);
    
    console.log(result.response.text());
    
    return result.response.text()

  } catch (error) {
    console.error("Error during message generation:", error);
    return "An error occurred while generating the response.";
  }
}







