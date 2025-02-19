import connectDB from "@/lib/dbConnect";
import Blog from "@/models/blog";

export async function POST(req) {
  const data= await req.json();

  try {
    await connectDB();

    const newBlog = new Blog(data
    );

    await newBlog.save();
    return new Response(JSON.stringify({ message: "Blog created", data: newBlog }), { status: 201 });
    
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error creating blog", error: error.message }), { status: 500 });
  }
}
