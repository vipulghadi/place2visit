// app/api/country/[id]/route.js
import connectDB from "@/lib/dbConnect";
import Country from "@/models/country";
import { NextResponse } from "next/server";

// GET: Fetch a single country by ID
export async function GET(request, { params }) {
  await connectDB();
  const { id } = params;

  try {
    const country = await Country.findById(id);
    if (!country) {
      return NextResponse.json(
        { message: "Country not found", success: false },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { data: country, message: "Country found", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json(
      { message: "Error fetching country", success: false },
      { status: 500 }
    );
  }
}

// PUT: Update a country by ID
export async function PUT(request, { params }) {
  await connectDB();
  const { id } = params;

  try {
    const { name, code, isActive } = await request.json();

    const updateData = {};
    if (name !== undefined) updateData.name = name.toLowerCase(); // Ensure lowercase per schema
    if (code !== undefined) updateData.code = code;
    if (isActive !== undefined) updateData.isActive = isActive;

    const country = await Country.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!country) {
      return NextResponse.json(
        { message: "Country not found", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { data: country, message: "Country updated successfully", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("PUT Error:", error);
    if (error.code === 11000) {
      return NextResponse.json(
        { message: "Country with this name or code already exists", success: false },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { message: "Error updating country", success: false },
      { status: 500 }
    );
  }
}

// DELETE: Delete a country by ID
export async function DELETE(request, { params }) {
  await connectDB();
  const { id } = params;

  try {
    const country = await Country.findByIdAndDelete(id);
    if (!country) {
      return NextResponse.json(
        { message: "Country not found", success: false },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "Country deleted successfully", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json(
      { message: "Error deleting country", success: false },
      { status: 500 }
    );
  }
}