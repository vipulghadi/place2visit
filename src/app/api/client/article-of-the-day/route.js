import { NextResponse } from "next/server";
import connectDB from "@/lib/dbConnect";
import Blog from "@/models/blog";
import Country from "@/models/country";
import Place from "@/models/place";
import State from "@/models/state";
export async function GET() {
  try {

    await connectDB();

    
    const blog = await Blog.findOne()
      .sort({ createdAt: -1 }) // Sort by newest
      .populate("country", "name")
      .populate("state", "name")
      .populate("place", "name");

    if (!blog) {
      return NextResponse.json(
        { message: "No articles found", success: false },
        { status: 404 }
      );
    }

    // ✅ Defensive checks before accessing nested properties
    const articleData = blog.article || {};

    const article = {
      cover_image: articleData.cover_images || [],
      meta_title: blog.meta_title || "No title",
      meta_description: blog.meta_description || "No description",
      createdAt: blog.createdAt,
      title: articleData.title || "Untitled",
      place_name: blog.place?.name || "Unknown",
      state_name: blog.state?.name || "Unknown",
      country_name: blog.country?.name || "Unknown",
      first_section: articleData.sections?.[0]?.text || "No content available",
      tags: blog.tags || [],
      slug: blog.slug || "",
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
