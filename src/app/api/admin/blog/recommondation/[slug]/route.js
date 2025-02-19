import connectDB from "@/lib/dbConnect";
import Blog from "@/models/blog";

export async function RecommendedBlogs(req, { params }) {
  try {
    await connectDB();

    const { slug } = params;

    // Find the blog with the given slug
    const blog = await Blog.findOne({ slug });

    if (!blog) {
      return new Response(JSON.stringify({ 
        message: "Blog not found" ,
        success:false,
        data:null
    }), {
        status: 404,
      });
    }

    const { latitude, longitude } = blog;

    // Find the top 3 closest blogs based on latitude and longitude
    const closestBlogs = await Blog.find({
      _id: { $ne: blog._id }, // Exclude the current blog
      isActive: true,
      isDeleted: false,
    })
      .sort({
        $expr: {
          $add: [
            { $pow: [{ $subtract: ["$latitude", latitude] }, 2] },
            { $pow: [{ $subtract: ["$longitude", longitude] }, 2] },
          ],
        },
      })
      .limit(3);

    return new Response(JSON.stringify(
        {
            message: "Recommended Blogs",
            success: true,
            data: closestBlogs
        }
        , { status: 200 }));
  }
  catch (error) {
    console.error("Error fetching recommended blogs:", error);
    return new Response(JSON.stringify({ 
        message: "Internal Server Error",
        success:false,
        data:null
     }), {
      status: 500,
    });
  }
}
