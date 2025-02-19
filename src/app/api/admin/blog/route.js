import connectDB from "@/lib/dbConnect";
import Blog from "@/models/blog";

export async function GET(req) {
  try {
    await connectDB();

    // Extract query parameters
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const skip = (page - 1) * limit;
    const isActive = searchParams.get("isActive"); 
    const isDeleted = searchParams.get("isDeleted");
    const country = searchParams.get("country"); 
    const state = searchParams.get("state"); 
    const searchQuery = searchParams.get("search"); 

    // Build filter object
    const filter = {};
    if (isActive !== null) {
      filter.isActive = isActive === "true"; 
    }
    if (isDeleted !== null) {
      filter.isDeleted = isDeleted === "true";
    }
    if (country) {
      filter.country = { $regex: new RegExp(country, "i") };
    }
    if (state) {
      filter.state = { $regex: new RegExp(state, "i") };
    }
    if (searchQuery) {
      filter.meta_title = { $regex: new RegExp(searchQuery, "i") };
    }

    // Fetch filtered and paginated blogs with only required fields
    const blogs = await Blog.find(filter)
      .select("meta_title state country place isActive isDeleted slug")
      .skip(skip)
      .limit(limit);

    const totalBlogs = await Blog.countDocuments(filter);

    return new Response(
      JSON.stringify({
        success: true,
        page,
        limit,
        totalBlogs,
        totalPages: Math.ceil(totalBlogs / limit),
        blogs,
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "Error fetching blogs",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}
