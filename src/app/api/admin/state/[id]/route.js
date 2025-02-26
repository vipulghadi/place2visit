// app/api/state/[id]/route.js
import connectDB from "@/lib/dbConnect";
import State from "@/models/state";
import Country from "@/models/country";
import { NextResponse } from "next/server";

// GET: Fetch a single state by ID
export async function GET(request, { params }) {
  await connectDB();
  const { id } = params;

  try {
    const state = await State.findById(id).populate("country", "name");
    if (!state) {
      return NextResponse.json(
        { message: "State not found", success: false },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { data: state, message: "State found", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json(
      { message: "Error fetching state", success: false },
      { status: 500 }
    );
  }
}

// PUT: Update a state by ID
export async function PUT(request, { params }) {
  await connectDB();
  const { id } = params;

  try {
    const { name, country, isActive } = await request.json();

    // If country is provided, validate it
    if (country) {
      const countryExists = await Country.findById(country);
      if (!countryExists) {
        return NextResponse.json(
          { message: "Referenced country not found", success: false },
          { status: 404 }
        );
      }
    }

    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (country !== undefined) updateData.country = country;
    if (isActive !== undefined) updateData.isActive = isActive;

    const state = await State.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).populate("country", "name");

    if (!state) {
      return NextResponse.json(
        { message: "State not found", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { data: state, message: "State updated successfully", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("PUT Error:", error);
    if (error.code === 11000) {
      return NextResponse.json(
        { message: "State with this name and country already exists", success: false },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { message: "Error updating state", success: false },
      { status: 500 }
    );
  }
}

// DELETE: Delete a state by ID
export async function DELETE(request, { params }) {
  await connectDB();
  const { id } = params;
  try {
    const state = await State.findByIdAndDelete(id);
    if (!state) {
      return NextResponse.json(
        { message: "State not found", success: false },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "State deleted successfully", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json(
      { message: "Error deleting state", success: false },
      { status: 500 }
    );
  }
}