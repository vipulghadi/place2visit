import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Place from "@/models/place";
import State from "@/models/state";
import Country from "@/models/country";
import dbConnect from "@/lib/dbConnect";

export async function GET(request) {
  try {
    // Connect to MongoDB if not already connected
    dbConnect();
    

    // Get query parameter
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query");

    if (!query) {
      return NextResponse.json(
        { message: "Query parameter is required.",success:false },
        { status: 400 }
      );
    }

    // Define search filter using case-insensitive regex
    const searchFilter = { name: { $regex: new RegExp(query, "i") } };

    // Perform searches in all models
    const places = await Place.find(searchFilter).limit(5).select("_id name");
    const states = await State.find(searchFilter).limit(5).select("_id name");
    const countries = await Country.find(searchFilter).limit(5).select("_id name");

    // Combine results
    const results = [
      ...places.map((p) => ({ type: "place", ...p.toObject() })),
      ...states.map((s) => ({ type: "state", ...s.toObject() })),
      ...countries.map((c) => ({ type: "country", ...c.toObject() })),
    ];

    // Sort results based on relevance (if needed)
    results.sort((a, b) => a.name.localeCompare(b.name)); // Optional sorting

    return NextResponse.json({
      success: true,
      data: results.slice(0, 5), // Ensure only top 5 results
    });
  } catch (error) {
    console.error("Error searching places:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
