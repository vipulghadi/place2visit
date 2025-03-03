import GeminiAPIResponse from "@/lib/ai/gemini_api";
import ArticleGeneratorPrompt from "@/lib/ai/prompt";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    console.log(body);

    const { title,place, state, country, longitude, latitude } = body;
     console.log(title);

     
    if (!place) {
      // If 'place' is not provided, return a 400 error
      return new Response(
        JSON.stringify({ message: "please provide place", success: false }), // Provide a meaningful error message
        { status: 400 }
      );
    }

    // Create the prompt using dynamic variables
    const prompt = ArticleGeneratorPrompt(
      title,
      place,
      country,
      state,
      longitude,
      latitude
    );

    console.log("Generated prompt:", prompt);

    // Send the prompt to Gemini API
    const response = await GeminiAPIResponse(prompt);
    

    // Ensure the response is a string and attempt to parse it into JSON
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(response);
    } catch (error) {
      console.error("Error parsing response:", error);
      return NextResponse.json(
        { message: "Failed to parse the response.", success: false },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "article generated successfully",
        data: parsedResponse,
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error during POST request:", error);
    return NextResponse.json(
      {
        message: "Error in generating blog",
        success: false,
      },
      { status: 500 }
    );
  }
}
