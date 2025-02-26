// app/api/state/route.js
import connectDB from "@/lib/dbConnect";
import State from "@/models/state";
import Country from "@/models/country";
import { NextResponse } from "next/server";

// GET: Fetch paginated list of states
export async function GET(request) {
  await connectDB();
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get("limit")) || 10;

  try {
    const total = await State.countDocuments({ isActive: true });
    const states = await State.find({ isActive: true })
      .populate("country", "name") // Populate country details
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    const response = {
      data: states,
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
      message: "States found",
      success: true,
    });
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json(
      { message: "Error fetching states", success: false },
      { status: 500 }
    );
  }
}

// POST: Create a new state
export async function POST(request) {
  await connectDB();
  try {
    const { name, country, isActive } = await request.json();
    console.log(name,country);
    
    // Validation
    if (!name) {
      return NextResponse.json(
        { message: "Name is required", success: false },
        { status: 400 }
      );
    }


    // Check if country exists
    if (country){
        const countryExists = await Country.findById(country);
    if (!countryExists) {
      return NextResponse.json(
        { message: "Referenced country not found", success: false },
        { status: 404 }
      );
    }
    }
    

    const state = await State.create({
      name,
      country,
      isActive: isActive !== undefined ? isActive : true, // Default to true
    });

    return NextResponse.json(
      { data: state, message: "State created successfully", success: true },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST Error:", error);
    if (error.code === 11000) { // Duplicate key error
      return NextResponse.json(
        { message: "State with this name and country already exists", success: false },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { message: "Error creating state", success: false },
      { status: 500 }
    );
  }
}