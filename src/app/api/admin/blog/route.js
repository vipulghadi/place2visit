import connectDB from "@/lib/dbConnect";
import Blog from "@/models/blog";
import Country from "@/models/country";
import State from "@/models/state";
import Place from "@/models/place";
import { NextResponse } from "next/server";
import { uploadToS3 } from "@/lib/s3";

// Helper function to extract location name from headings (main sections) or titles (subsections)
function extractLocationFromHeadings(sections, placeFallback) {
  for (const section of sections || []) {
    // Check main section heading
    if (section.heading) {
      const headingMatch = section.heading.match(/in\s+(.+)$/i);
      if (headingMatch && headingMatch[1]) {
        return headingMatch[1].trim(); // Extract location from heading
      }
    }
    // Check subsection titles
    for (const subsection of section.subsections || []) {
      if (subsection.title) {
        const titleMatch = subsection.title.match(/in\s+(.+)$/i);
        if (titleMatch && titleMatch[1]) {
          return titleMatch[1].trim(); // Extract location from subsection title
        }
      }
    }
  }
  return placeFallback || "unknown_location"; // Fallback to place or unknown_location
}

// POST: Create a new blog with country, state, place validation and S3 image storage
export async function POST(request) {
  await connectDB();

  try {
    const data = await request.json();
    console.log("Request payload:", data);

    const {
      article,
      country: countryName = "Unknown Country",
      latitude = null,
      longitude = null,
      meta_description,
      meta_title,
      place: placeName = "Unknown Place",
      state: stateName = "Unknown State",
      tags = ["travel", "vacation", "things to do", "hidden gems", "tourist spots"],
    } = data;

    // Validation: Ensure required fields are provided
    if (!article || !article.title) {
      return NextResponse.json(
        { message: "Article title is required.", success: false },
        { status: 400 }
      );
    }

    // Step 1: Check or create Country
    let country = await Country.findOne({ name: countryName.toLowerCase() });
    if (!country) {
      country = await Country.create({
        name: countryName.toLowerCase(),
        code: countryName.slice(0, 2).toUpperCase(),
      });
    }

    // Step 2: Check or create State
    let state = await State.findOne({ name: stateName });
    if (!state) {
      state = await State.create({
        name: stateName,
        country: country._id,
      });
    }

    // Step 3: Check or create Place
    let place = await Place.findOne({ name: placeName, state: state._id });
    if (!place) {
      place = await Place.create({
        name: placeName,
        state: state._id,
        country: country._id,
        latitude: latitude || null,
        longitude: longitude || null,
      });
    }

    // Step 4: Handle image uploads to S3 with location-based folder
    const createdAt = new Date().toISOString().replace(/[-:.]/g, ""); // e.g., 20250303123456
    const baseFileName = `${placeName}${stateName}${countryName}${createdAt}`;
    const locationName = extractLocationFromHeadings(article.sections, placeName); // Extract from heading or title
    const folderPrefix = `images/${locationName}/`; // S3 folder with location

    // Process cover_images and store S3 links
    let coverImageLinks = [];
    if (article.cover_images && Array.isArray(article.cover_images) && article.cover_images.length > 0) {
      coverImageLinks = await Promise.all(
        article.cover_images.map(async (image, index) => {
          if (image && typeof image === "string" && image.length > 0) { // Check if image is a non-empty string
            const fileName = `${folderPrefix}${baseFileName}_cover_${index}.jpg`;
            const buffer = Buffer.from(image, "base64"); // Assuming base64; adjust if different
            const s3Url = await uploadToS3(buffer, fileName, "image/jpeg");
            return s3Url; // Store the S3 link
          }
          return ""; // Keep empty string if no image data
        })
      );
    }

    // Process sections and subsections, storing S3 links in images arrays
    const updatedSections = await Promise.all(
      (article.sections || []).map(async (section, sectionIndex) => {
        // Process section-level images
        let sectionImageLinks = [];
        if (section.images && Array.isArray(section.images) && section.images.length > 0) {
          sectionImageLinks = await Promise.all(
            section.images.map(async (image, imageIndex) => {
              if (image && typeof image === "string" && image.length > 0) { // Check if image is a non-empty string
                const fileName = `${folderPrefix}${baseFileName}_section_${sectionIndex}_img_${imageIndex}.jpg`;
                const buffer = Buffer.from(image, "base64");
                const s3Url = await uploadToS3(buffer, fileName, "image/jpeg");
                return s3Url; // Store the S3 link
              }
              return ""; // Keep empty string if no image data
            })
          );
        }

        // Process subsection-level images
        const updatedSubsections = await Promise.all(
          (section.subsections || []).map(async (subsection, subIndex) => {
            let subsectionImageLinks = [];
            if (subsection.images && Array.isArray(subsection.images) && subsection.images.length > 0) {
              subsectionImageLinks = await Promise.all(
                subsection.images.map(async (image, imageIndex) => {
                  if (image && typeof image === "string" && image.length > 0) { // Check if image is a non-empty string
                    const fileName = `${folderPrefix}${baseFileName}_section_${sectionIndex}_sub_${subIndex}_img_${imageIndex}.jpg`;
                    const buffer = Buffer.from(image, "base64");
                    const s3Url = await uploadToS3(buffer, fileName, "image/jpeg");
                    return s3Url; // Store the S3 link
                  }
                  return ""; // Keep empty string if no image data
                })
              );
            }
            return { ...subsection, images: subsectionImageLinks };
          })
        );

        return {
          ...section,
          images: sectionImageLinks,
          subsections: updatedSubsections,
        };
      })
    );

    // Step 5: Prepare and save blog data with S3 links
    const blogData = {
      meta_title: meta_title || article.title, // Match article.title per schema
      meta_description: meta_description || `Explore the top attractions in ${placeName}, ${stateName}, ${countryName}—your ultimate travel guide!`,
      country: country._id,
      state: state._id,
      place: place._id,
      view_count: 0,
      like_count: 0,
      tags,
      article: {
        title: article.title, // Must match provided title
        cover_images: coverImageLinks.length > 0 ? coverImageLinks : [""], // Default to [""] if no images
        sections: updatedSections,
      },
      isActive: true,
      isDeleted: false,
    };

    const newBlog = new Blog(blogData);
    await newBlog.save();

    // Step 6: Return response
    return NextResponse.json(
      {
        message: "Blog created",
        success: true,
        data: newBlog,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST Error:", error);
    if (error.code === 11000) {
      return NextResponse.json(
        { message: "A blog with this slug already exists.", success: false },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { message: "Error creating blog", error: error.message, success: false },
      { status: 500 }
    );
  }
}

// GET function remains unchanged
export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const skip = (page - 1) * limit;
    const isActive = searchParams.get("isActive");
    const isDeleted = searchParams.get("isDeleted");
    const country = searchParams.get("country");
    const state = searchParams.get("state");
    const searchQuery = searchParams.get("search");

    const filter = {};
    if (isActive !== null) filter.isActive = isActive === "true";
    if (isDeleted !== null) filter.isDeleted = isDeleted === "true";
    if (country) {
      const countryDoc = await Country.findOne({ name: { $regex: new RegExp(country, "i") } });
      if (countryDoc) filter.country = countryDoc._id;
    }
    if (state) {
      const stateDoc = await State.findOne({ name: { $regex: new RegExp(state, "i") } });
      if (stateDoc) filter.state = stateDoc._id;
    }
    if (searchQuery) filter.meta_title = { $regex: new RegExp(searchQuery, "i") };

    const blogs = await Blog.find(filter)
      .select("meta_title state country place isActive slug isDeleted")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Blog.countDocuments(filter);

    return NextResponse.json(
      {
        data: blogs,
        pagination: {
          currentPage: page,
          pageSize: limit,
          totalItems: total,
          totalPages: Math.ceil(total / limit),
          hasNext: page < Math.ceil(total / limit),
          hasPrevious: page > 1,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error fetching blogs",
        error: error.message,
      },
      { status: 500 }
    );
  }
}