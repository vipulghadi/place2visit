// app/api/country/route.js
import connectDB from "@/lib/dbConnect";
import Country from "@/models/country";
import { NextResponse } from "next/server";

// GET: Fetch paginated list of countries
export async function GET(request) {
  await connectDB();
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get("limit")) || 10;

  try {
    const total = await Country.countDocuments({ isActive: true });
    const countries = await Country.find({ isActive: true })
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    const response = {
      data: countries,
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
      message: "Countries found",
      success: true,
    });
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json(
      { message: "Error fetching countries", success: false },
      { status: 500 }
    );
  }
}

// POST: Create a new country
export async function POST(request) {
  await connectDB();
  try {
    const { name, code, isActive } = await request.json();

    // Validation
    if (!name) {
      return NextResponse.json(
        { message: "Name is required", success: false },
        { status: 400 }
      );
    }

    const country = await Country.create({
      name: name.toLowerCase(), // Ensure lowercase per schema
      code,
      isActive: isActive !== undefined ? isActive : true, // Default to true
    });

    return NextResponse.json(
      { data: country, message: "Country created successfully", success: true },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST Error:", error);
    if (error.code === 11000) { // Duplicate key error
      return NextResponse.json(
        { message: "Country with this name or code already exists", success: false },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { message: "Error creating country", success: false },
      { status: 500 }
    );
  }
}