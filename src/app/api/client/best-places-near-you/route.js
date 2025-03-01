import { NextResponse } from "next/server";
import connectDB from "@/lib/dbConnect";
import Blog from "@/models/blog";
import Place from "@/models/place";
import { getDistance } from "geolib";

export async function GET(request) {
  try {
    await connectDB();

    // ✅ Extract query parameters
    const { searchParams } = new URL(request.url);
    const latitude = parseFloat(searchParams.get("latitude"));
    const longitude = parseFloat(searchParams.get("longitude"));

    // ✅ Fetch all places
    let places = await Place.find().select("name state country images latitude longitude");

    if (!places.length) {
      return NextResponse.json({ message: "No places found", success: false }, { status: 404 });
    }

    let filteredPlaces;

    if (!isNaN(latitude) && !isNaN(longitude)) {
      // ✅ If latitude & longitude are provided, sort by distance
      filteredPlaces = places
        .map(place => ({
          ...place.toObject(),
          distance: getDistance(
            { latitude, longitude },
            { latitude: place.latitude, longitude: place.longitude }
          ),
        }))
        .sort((a, b) => a.distance - b.distance) // Sort by closest
        .slice(0, 10); // Get top 10 closest places
    } else {
      // ✅ If no coordinates provided, pick 10 random places
      filteredPlaces = places.sort(() => 0.5 - Math.random()).slice(0, 10);
    }

    // ✅ Get place IDs
    const placeIds = filteredPlaces.map(place => place._id);

    // ✅ Fetch articles for these places
    const blogs = await Blog.find({ place: { $in: placeIds } })
      .populate("place", "name state country images")
      .select("article.title place article.cover_images");

    // ✅ Format response
    const articles = blogs.map(blog => ({
      title: blog.article.title,
      place_name: blog.place?.name || "Unknown",
      state: blog.place?.state || "Unknown",
      country: blog.place?.country || "Unknown",
      images: blog.article.cover_images || []
    }));

    return NextResponse.json(
      {
        data: articles,
        message: "Best place articles near you",
        success: true
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error fetching places:", error);
    return NextResponse.json({ message: "Server error", success: false }, { status: 500 });
  }
}
