// app/api/blog/route.js
import connectDB from "@/lib/dbConnect";
import Blog from "@/models/blog";
import Country from "@/models/country";
import State from "@/models/state";
import Place from "@/models/place";
import { NextResponse } from "next/server";

// GET: Fetch paginated blogs or a single blog by ID
export async function GET(request) {
  try {
    await connectDB();


    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const skip = (page - 1) * limit;
    const isActive = searchParams.get("isActive");
    const isDeleted = searchParams.get("isDeleted");
    const country = searchParams.get("country");
    const state = searchParams.get("state");
    const searchQuery = searchParams.get("search");



    // Build filter object for paginated fetch
    const filter = {};
    if (isActive !== null) {
      filter.isActive = isActive === "true";
    }
    if (isDeleted !== null) {
      filter.isDeleted = isDeleted === "true";
    }
    if (country) {
      const countryDoc = await Country.findOne({ name: { $regex: new RegExp(country, "i") } });
      if (countryDoc) filter.country = countryDoc._id;
    }
    if (state) {
      const stateDoc = await State.findOne({ name: { $regex: new RegExp(state, "i") } });
      if (stateDoc) filter.state = stateDoc._id;
    }
    if (searchQuery) {
      filter.meta_title = { $regex: new RegExp(searchQuery, "i") };
    }

    // Fetch filtered and paginated blogs
    const blogs = await Blog.find(filter)
      .select("meta_title state country place isActive  slug isDeleted ")

      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Blog.countDocuments(filter);

    // Return paginated response in the specified format
    return NextResponse.json(
      {
        data: blogs,
        pagination: {
          currentPage: page,
          pageSize: limit,
          totalItems: total,
          totalPages: Math.ceil(total / limit),
          hasNext: page < Math.ceil(total / limit),
          hasPrevious: page > 1,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error fetching blogs",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// POST: Create a new blog with country, state, and place validation
export async function POST(request) {
  await connectDB();

  try {
    const data = await request.json();
    console.log("Request payload:", data);

    const {
      article,
      country: countryName,
      latitude,
      longitude,
      meta_description,
      meta_title,
      place: placeName,
      state: stateName,
    } = data;

    // Validation: Ensure required fields are provided
    if (!placeName) {
      return NextResponse.json(
        { message: "Place is required.", success: false },
        { status: 400 }
      );
    }
    if (!stateName) {
      return NextResponse.json(
        { message: "State is required.", success: false },
        { status: 400 }
      );
    }
    if (!countryName) {
      return NextResponse.json(
        { message: "Country is required.", success: false },
        { status: 400 }
      );
    }
    if (!article || !article.title) {
      return NextResponse.json(
        { message: "Article title is required.", success: false },
        { status: 400 }
      );
    }

    // Step 1: Check or create Country
    let country = await Country.findOne({ name: countryName.toLowerCase() });
    if (!country) {
      country = await Country.create({
        name: countryName.toLowerCase(),
        code: countryName.slice(0, 2).toUpperCase(),
      });
      console.log("Created new country:", country);
    }
    console.log(stateName);
    
    // Step 2: Check or create State
    let state = await State.findOne({ name: stateName});
    console.log(state);
    
    if (!state) {
      state = await State.create({
        name: stateName,
        country: country._id,
      });
      console.log("Created new state:", state);
    }

    // Step 3: Check or create Place
    let place = await Place.findOne({ name: placeName, state: state._id });
    if (!place) {
      place = await Place.create({
        name: placeName,
        state: state._id,
        country: country._id,
        latitude: latitude || null,
        longitude: longitude || null,
      });
      console.log("Created new place:", place);
    }

    // Step 4: Prepare and save blog data
    const blogData = {
      meta_title: meta_title || article.title,
      meta_description: meta_description || `A guide to ${placeName}, ${stateName}, ${countryName}`,
      country: country._id,
      state: state._id,
      place: place._id,
      latitude: latitude || place.latitude,
      longitude: longitude || place.longitude,
      total_views: 0,
      article: {
        title: article.title,
        cover_image: article.cover_image || "",
        sections: article.sections || [],
      },
      isActive: true,
      isDeleted: false,
    };

    const newBlog = new Blog(blogData);
    await newBlog.save();

    // Step 5: Return response
    return NextResponse.json(
      {
        message: "Blog created",
        success: true,
        data: newBlog,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST Error:", error);
    console.log(error);
    
    if (error.code === 11000) {
      return NextResponse.json(
        { message: "A blog with this slug already exists.", success: false },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { message: "Error creating blog", error: error.message, success: false },
      { status: 500 }
    );
  }
}