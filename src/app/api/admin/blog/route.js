import connectDB from "@/lib/dbConnect";
import Blog from "@/models/blog";
import Country from "@/models/country";
import State from "@/models/state";
import Place from "@/models/place";
import { NextResponse } from "next/server";
import { uploadToS3 } from "@/lib/s3";
import fetch from "node-fetch";

// Helper function to extract location name from headings (main sections) or titles (subsections)
function extractLocationFromHeadings(sections, placeFallback) {
  for (const section of sections || []) {
    if (section.heading) {
      const headingMatch = section.heading.match(/in\s+(.+)$/i);
      if (headingMatch && headingMatch[1]) {
        return headingMatch[1].trim();
      }
    }
    for (const subsection of section.subsections || []) {
      if (subsection.title) {
        const titleMatch = subsection.title.match(/in\s+(.+)$/i);
        if (titleMatch && titleMatch[1]) {
          return titleMatch[1].trim();
        }
      }
    }
  }
  return placeFallback || "unknown_location";
}

// Helper function to download an image from a URL and return a Buffer
async function downloadImage(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch image: ${response.statusText}`);
    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer);
  } catch (error) {
    console.error(`Error downloading image from ${url}:`, error);
    return null;
  }
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

    if (!article || !article.title) {
      return NextResponse.json(
        { message: "Article title is required.", success: false },
        { status: 400 }
      );
    }

    let country = await Country.findOne({ name: countryName.toLowerCase() });
    if (!country) {
      country = await Country.create({
        name: countryName.toLowerCase(),
        code: countryName.slice(0, 2).toUpperCase(),
      });
    }

    let state = await State.findOne({ name: stateName, country: country._id });
    if (!state) {
      state = await State.create({
        name: stateName,
        country: country._id,
      });
    }

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

    const createdAt = new Date().toISOString().replace(/[-:.]/g, "");
    const baseFileName = `${placeName}-${stateName}-${countryName}-${createdAt}`.replace(/\s+/g, "-").toLowerCase();
    const folderPrefix = `images/${countryName}/${stateName}/${placeName}/`.toLowerCase();

    // Process cover_images
    let coverImageLinks = [];
    if (article.cover_images?.length > 0) {
      coverImageLinks = await Promise.all(
        article.cover_images.map(async (imageUrl, index) => {
          if (imageUrl && typeof imageUrl === "string" && imageUrl.length > 0) {
            const buffer = await downloadImage(imageUrl);
            if (!buffer) return "";
            const fileName = `${folderPrefix}-cover-${index}.jpg`;
            console.log(`Uploading cover image ${index}:`, { fileName, bufferLength: buffer.length }); // Debug
            try {
              const s3Url = await uploadToS3(buffer, fileName, "image/jpeg"); // Correct order
              return s3Url;
            } catch (uploadError) {
              console.error(`Failed to upload cover image ${index}:`, uploadError);
              return "";
            }
          }
          return "";
        })
      );
    }

    // Process sections and subsections
    const updatedSections = await Promise.all(
      (article.sections || []).map(async (section, sectionIndex) => {
        let sectionImageLinks = [];
        if (section.images?.length > 0) {
          sectionImageLinks = await Promise.all(
            section.images.map(async (imageUrl, imageIndex) => {
              if (imageUrl && typeof imageUrl === "string" && imageUrl.length > 0) {
                const buffer = await downloadImage(imageUrl);
                if (!buffer) return "";
                const fileName = `${folderPrefix}${section.heading}-${sectionIndex}-img-${imageIndex}.jpg`;
                console.log(`Uploading section ${sectionIndex} image ${imageIndex}:`, { fileName, bufferLength: buffer.length }); // Debug
                try {
                  const s3Url = await uploadToS3(buffer, fileName, "image/jpeg"); // Correct order
                  return s3Url;
                } catch (uploadError) {
                  console.error(`Failed to upload section ${sectionIndex} image ${imageIndex}:`, uploadError);
                  return "";
                }
              }
              return "";
            })
          );
        }

        const updatedSubsections = await Promise.all(
          (section.subsections || []).map(async (subsection, subIndex) => {
            let subsectionImageLinks = [];
            if (subsection.images?.length > 0) {
              subsectionImageLinks = await Promise.all(
                subsection.images.map(async (imageUrl, imageIndex) => {
                  if (imageUrl && typeof imageUrl === "string" && imageUrl.length > 0) {
                    const buffer = await downloadImage(imageUrl);
                    if (!buffer) return "";
                    const fileName = `${folderPrefix}${subsection.title}-${sectionIndex}-sub-${subIndex}-img-${imageIndex}.jpg`;
                    console.log(`Uploading subsection ${subIndex} image ${imageIndex}:`, { fileName, bufferLength: buffer.length }); // Debug
                    try {
                      const s3Url = await uploadToS3(buffer, fileName, "image/jpeg"); // Correct order
                      return s3Url;
                    } catch (uploadError) {
                      console.error(`Failed to upload subsection ${subIndex} image ${imageIndex}:`, uploadError);
                      return "";
                    }
                  }
                  return "";
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

    const blogData = {
      meta_title: meta_title || article.title,
      meta_description: meta_description || `Explore the top attractions in ${placeName}, ${stateName}, ${countryName}—your ultimate travel guide!`,
      country: country._id,
      state: state._id,
      place: place._id,
      view_count: 0,
      like_count: 0,
      tags,
      article: {
        title: article.title,
        cover_images: coverImageLinks.length > 0 ? coverImageLinks : [""],
        sections: updatedSections,
      },
      isActive: true,
      isDeleted: false,
    };

    const newBlog = new Blog(blogData);
    await newBlog.save();

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

// GET function (unchanged)
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