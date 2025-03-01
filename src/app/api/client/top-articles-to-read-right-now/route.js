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
      .limit(10)
      .populate({
        path: "place",
        populate: [
          { path: "state", select: "name" }, 
          { path: "country", select: "name" }
        ]
      });

    // ✅ Format response
    const articles = blogs.map(blog => ({
      cover_image: blog.article.cover_images || [], // Fallback image array
      title: blog.article.title,
      place_name: blog.place?.name || "Unknown",
      state: blog.place?.state?.name || "Unknown",
      country: blog.place?.country?.name || "Unknown"
    }));

    return NextResponse.json(
      {
        data: articles,
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
