// app/api/place/[id]/route.js
import connectDB from "@/lib/dbConnect";
import Place from "@/models/place";
import State from "@/models/state";
import Country from "@/models/country";
import { NextResponse } from "next/server";

// GET: Fetch a single place by ID
export async function GET(request, { params }) {
  await connectDB();
  const { id } = params;

  try {
    const place = await Place.findById(id).populate("state country");
    if (!place) {
      return NextResponse.json(
        { message: "Place not found", success: false },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { data: place, message: "Place found", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json(
      { message: "Error fetching place", success: false },
      { status: 500 }
    );
  }
}

// PUT: Update a place by ID
export async function PUT(request, { params }) {
  await connectDB();
  const { id } = params;

  try {
    const { name, state, country, latitude, longitude, isActive } = await request.json();

    // If state or country is provided, validate them
    if (state || country) {
      const stateExists = state ? await State.findById(state).populate("country") : null;
      const countryExists = country ? await Country.findById(country) : null;

      if (state && !stateExists) {
        return NextResponse.json(
          { message: "Referenced state not found", success: false },
          { status: 404 }
        );
      }
      if (country && !countryExists) {
        return NextResponse.json(
          { message: "Referenced country not found", success: false },
          { status: 404 }
        );
      }
      if (state && country && stateExists.country.toString() !== country) {
        return NextResponse.json(
          { message: "State does not belong to the provided country", success: false },
          { status: 400 }
        );
      }
    }

    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (state !== undefined) updateData.state = state;
    if (country !== undefined) updateData.country = country;
    if (latitude !== undefined) updateData.latitude = latitude;
    if (longitude !== undefined) updateData.longitude = longitude;
    if (isActive !== undefined) updateData.isActive = isActive;

    const place = await Place.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).populate("state country");

    if (!place) {
      return NextResponse.json(
        { message: "Place not found", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { data: place, message: "Place updated successfully", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("PUT Error:", error);
    if (error.code === 11000) {
      return NextResponse.json(
        { message: "Place with this name and state already exists", success: false },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { message: "Error updating place", success: false },
      { status: 500 }
    );
  }
}

// DELETE: Delete a place by ID
export async function DELETE(request, { params }) {
  await connectDB();
  const { id } = params;

  try {
    const place = await Place.findByIdAndDelete(id);
    if (!place) {
      return NextResponse.json(
        { message: "Place not found", success: false },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "Place deleted successfully", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json(
      { message: "Error deleting place", success: false },
      { status: 500 }
    );
  }
}