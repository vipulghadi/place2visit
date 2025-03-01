import { NextResponse } from "next/server";
import connectDB from "@/lib/dbConnect";
import Blog from "@/models/blog";
import Place from "@/models/place";
import { getDistance } from "geolib";

export async function GET(request) {
  try {
    await connectDB();
    
    // ✅ Extract ID from query parameters
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({
        message: "Blog ID is required",
        success: false
      }, { status: 400 });
    }

    console.log("Blog ID:", id);

    // Fetch the blog and populate the place reference
    const blog = await Blog.findById(id).populate("place");

    if (!blog || !blog.place) {
      return NextResponse.json({
        message: "Blog or place not found",
        success: false
      }, { status: 404 });
    }

    // Extract coordinates from the place linked to the blog
    const { latitude, longitude } = blog.place;

    if (!latitude || !longitude) {
      return NextResponse.json({ 
        message: "Coordinates not found",
        success: false
      }, { status: 400 });
    }

    // Fetch all places and calculate distances
    const places = await Place.find();
    const nearbyPlaces = places
      .map((p) => ({
        ...p.toObject(),
        distance: getDistance(
          { latitude, longitude },
          { latitude: p.latitude, longitude: p.longitude }
        ),
      }))
      .sort((a, b) => a.distance - b.distance) // Sort by closest
      .slice(0, 10); // Get top 10 closest places

    // Fetch blogs associated with these places
    const placeIds = nearbyPlaces.map(p => p._id);
    const blogs = await Blog.find({ place: { $in: placeIds } }).select("_id place slug");

    // ✅ Use a Map to avoid duplicate place names
    const uniqueBlogLinks = new Map();

    blogs.forEach(blog => {
      const placeName = nearbyPlaces.find(p => p._id.toString() === blog.place.toString())?.name || "Unknown";

      if (!uniqueBlogLinks.has(placeName)) {
        uniqueBlogLinks.set(placeName, { place_name: placeName, blog_slug: blog.slug });
      }
    });

    return NextResponse.json(
      { 
        data: Array.from(uniqueBlogLinks.values()), // Convert Map to Array
        message: "ok",
        success: true
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error fetching blog:", error);
    return NextResponse.json({ 
      message: "Server error",
      success: false 
    }, { status: 500 });
  }
}
