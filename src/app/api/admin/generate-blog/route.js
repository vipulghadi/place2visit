import GeminiAPIResponse from "@/lib/ai/gemini_api";
import ArticleGeneratorPrompt from "@/lib/ai/prompt";

export async function POST(req) {
    try {
      const body = await req.json();
      console.log(body);
      
      const { place, state, country, longitude, latitude } = body;
      
      if (!place) {
        // If 'place' is not provided, return a 400 error
        return new Response(
          JSON.stringify({ error: "Place is required." }), // Provide a meaningful error message
          { status: 400 }
        );
      }
  
      // Create the prompt using dynamic variables
      const prompt = ArticleGeneratorPrompt(place, country, state, longitude, latitude);
      console.log("Generated prompt:", prompt);
  
      // Send the prompt to Gemini API
      const response = await GeminiAPIResponse(prompt);
      console.log("Received response type:", typeof response);
  
      // Ensure the response is a string and attempt to parse it into JSON
      let parsedResponse;
      try {
        parsedResponse = JSON.parse(response);
      } catch (error) {
        console.error("Error parsing response:", error);
        return new Response(
          JSON.stringify({ error: "Failed to parse the response." }),
          { status: 500 }
        );
      }
  
      // Return the parsed JSON response to the client
      return new Response(JSON.stringify(parsedResponse), { status: 200 });
      
    } catch (error) {
      console.log("Error during POST request:", error);
      return new Response(
        JSON.stringify({ error: "Failed to generate blog." }),
        { status: 500 }
      );
    }
  }
  
  