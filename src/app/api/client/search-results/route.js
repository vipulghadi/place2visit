import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Blog from "@/models/blog";
import Country from "@/models/country";
import State from "@/models/state";
import Place from "@/models/place";

export async function GET(request) {
  try {
    // Connect to MongoDB if not already connected
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI);
    }

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const query = searchParams.get("query");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    // Validate type parameter
    const validTypes = ["place", "state", "country"];
    if (type && !validTypes.includes(type)) {
      return NextResponse.json(
        { message: "Invalid type parameter. Must be place, state, or country",success:false },
        { status: 400 }
      );
    }

    // Build query object
    const blogQuery = {
      isActive: true,
      isDeleted: false,
    };

    // Handle type and query parameters
    if (type && query) {
      let model;
      if (type === "place") model = Place;
      else if (type === "state") model = State;
      else if (type === "country") model = Country;

      const reference = await model.findOne({
        name: { $regex: new RegExp(query, "i") },
      }).select("_id");

      if (!reference) {
        return NextResponse.json(
          { message: `No ${type} found with name matching "${query}"`,success:false },
          { status: 404 }
        );
      }

      blogQuery[type] = reference._id;
    }

    // Calculate pagination values
    const skip = (page - 1) * limit;

    // Fetch blogs with proper population
    const blogs = await Blog.find(blogQuery)
      .populate("country", "name")
      .populate("state", "name")
      .populate("place", "name")
      .select("slug title article.cover_images meta_title meta_description tags ")
      .skip(skip)
      .limit(limit)
      .lean(); // Improve performance

    // Get total count for pagination
    const totalBlogs = await Blog.countDocuments(blogQuery);
    const totalPages = Math.ceil(totalBlogs / limit);

    return NextResponse.json({
      success: true,
      data: blogs,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems: totalBlogs,
        itemsPerPage: limit,
      },
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
