import connectDB from "@/lib/dbConnect";
import Blog from "@/models/blog";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { slug } = params; 

  try {
    await connectDB();
    const blog = await Blog.findOne({ slug })      
    .populate("country", "name")
    .populate("state", "name")
    .populate("place", "name");

    if (!blog) {
      return  NextResponse.json(
        {
          success: false,
          message: "Blog not found",
          data: null,
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Blog fetched successfully",
        data: blog,
      },
      { status: 200 }
    );
  } catch (error) {
    return  NextResponse.json(
      {
        success: false,
        message: error.message,
        data: null,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  const { slug } = params; // ✅ No need to await params

  try {
    await connectDB();
    const blog = await Blog.findOneAndDelete({ slug });

    if (!blog) {
      return NextResponse.json(
        {
          success: false,
          message: "Blog not found",
          data: null,
        },
        { status: 404 }
      );
    }

    return  NextResponse.json(
    {
        success: true,
        message: "Blog deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Internal server error",
        data: null,
      }),
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  const { slug } = params; // ✅ No need to await params

  try {
    const body = await req.json(); // ✅ Fix: Parse request body
    await connectDB();
    const blog = await Blog.findOneAndUpdate({ slug }, body, { new: true });

    if (!blog) {
      return NextResponse(
        {
          success: false,
          message: "Blog not found",
          data: null,
        },
        { status: 404 }
      );
    }

    return  NextResponse.json(
      {
        success: true,
        message: "Blog updated successfully",
        data: blog,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
        data: null,
      },
      { status: 500 }
    );
  }
}
