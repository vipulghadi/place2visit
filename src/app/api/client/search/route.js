import { NextResponse } from "next/server";
import connectDB from "@/lib/dbConnect";
import Blog from "@/models/blog";
// import Place from "@/models/place";

export async function GET(request) {
  try {
    await connectDB();

    // ✅ Extract search query
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query")?.trim() || "";

    if (!query) {
      return NextResponse.json(
        { message: "Search query is required", success: false },
        { status: 400 }
      );
    }

    // ✅ Search in articles and places
    const blogs = await Blog.find({
      $or: [
        { "article.title": { $regex: query, $options: "i" } }, // Search in title
        { "place.name": { $regex: query, $options: "i" } }, // Search in place name
        { "place.state": { $regex: query, $options: "i" } }, // Search in state name
      ],
    })
      .populate("place", "name state country") // Get place details
      .select("article.title place") // Select only required fields
      .limit(5); // Return only 5 results

    // ✅ Format response
    const results = blogs.map((blog) => ({
      title: blog.article.title,
      place_name: blog.place?.name || "Unknown",
    }));

    return NextResponse.json(
      {
        data: results,
        message: "Search results",
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error searching articles:", error);
    return NextResponse.json(
      { message: "Server error", success: false },
      { status: 500 }
    );
  }
}
