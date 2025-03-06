import { NextResponse } from "next/server";
import connectDB from "@/lib/dbConnect";
import Blog from "@/models/blog";
// import Place from "@/models/place"
// import State from "@/models/state"; 
// import Country from "@/models/country";

export async function GET() {
  try {
    await connectDB();

    // ✅ Fetch latest 10 blogs and populate place, state, and country details
    const blogs = await Blog.find()
      .sort({ createdAt: -1 }) // Sort by most recent
      .limit(8)
      .populate("country", "name")
      .populate("state", "name")
      .populate("place", "name")
      .select("slug title article.cover_images meta_title meta_description tags ")

    // ✅ Format response

    return NextResponse.json(
      {
        data: blogs,
        message: "Top articles to read now",
        success: true
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error fetching top articles:", error);
    return NextResponse.json(
      {
        message: "Server error",
        success: false
      },
      { status: 500 }
    );
  }
}
