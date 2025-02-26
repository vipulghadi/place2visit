// app/api/place/route.js
import connectDB from "@/lib/dbConnect";
import Place from "@/models/place";
import State from "@/models/state";
import Country from "@/models/country";
import { NextResponse } from "next/server";

// GET: Fetch paginated list of places
export async function GET(request) {
  await connectDB();
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get("limit")) || 10;

  try {
    const total = await Place.countDocuments({ isActive: true });
    const places = await Place.find({ isActive: true })
      .populate("state country") // Populate state and country details
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    const response = {
      data: places,
      pagination: {
        currentPage: page,
        pageSize: limit,
        totalItems: total,
        totalPages: Math.ceil(total / limit),
        hasNext: page < Math.ceil(total / limit),
        hasPrevious: page > 1,
      },
    };

    return NextResponse.json({
      ...response,
      message: "Places found",
      success: true,
    });
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json(
      { message: "Error fetching places", success: false },
      { status: 500 }
    );
  }
}

// POST: Create a new place
export async function POST(request) {
  await connectDB();
  try {
    const { name, state, country, latitude, longitude, isActive } = await request.json();

    // Validation
    if (!name) {
      return NextResponse.json(
        { message: "Name is required", success: false },
        { status: 400 }
      );
    }
    if (state) {
        const stateExists = await State.findById(state).populate("country");
        if (!stateExists) {
            return NextResponse.json(
              { message: "Referenced state not found", success: false },
              { status: 404 }
            );
          }
     
    }

    if (country) {
        const countryExists = await Country.findById(country);
        if (!countryExists) {
            return NextResponse.json(
              { message: "Referenced country not found", success: false },
              { status: 404 }
            );
          }
     
    }


    const place = await Place.create({
      name,
      state,
      country,
      latitude,
      longitude,
      isActive: isActive !== undefined ? isActive : true, // Default to true
    });

    return NextResponse.json(
      { data: place, message: "Place created successfully", success: true },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST Error:", error);
    if (error.code === 11000) { // Duplicate key error
      return NextResponse.json(
        { message: "Place with this name and state already exists", success: false },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { message: "Error creating place", success: false },
      { status: 500 }
    );
  }
}