import { NextResponse } from "next/server";
import connectDB from "@/lib/dbConnect";
import Blog from "@/models/blog";

export async function GET() {
  try {
    await connectDB();

    // ✅ Fetch the latest created article and populate place details
    const blog = await Blog.findOne()
      .sort({ createdAt: -1 }) // Sort by newest
      .populate("place", "name state country");

    if (!blog) {
      return NextResponse.json(
        { message: "No articles found", success: false },
        { status: 404 }
      );
    }

    // ✅ Format response
    const article = {
      cover_image: blog.article.cover_images || [],
      title: blog.article.title,
      place_name: blog.place?.name || "Unknown",
      state: blog.place?.state || "Unknown",
      country: blog.place?.country || "Unknown",
      first_section: blog.article.sections?.[0]?.text || "No content available",
    };

    return NextResponse.json(
      { data: article, message: "Latest article fetched", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching latest article:", error);
    return NextResponse.json(
      { message: "Server error", success: false },
      { status: 500 }
    );
  }
}
