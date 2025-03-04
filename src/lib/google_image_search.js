// lib/searchImages.js
import axios from "axios";

// Replace with your actual credentials (update these with valid values)
const API_KEY = "AIzaSyCIzbDNkNnia37iqVZruH92hlLco1Ns3iE"; // From Google Cloud Console
const CSE_ID = "b2db9a137fdf54a7a"; // From Programmable Search Engine

async function searchImages(query, numImages) {
  // Input validation
  if (!query || typeof query !== "string" || query.trim() === "") {
    throw new Error("Query must be a non-empty string.");
  }
  if (!numImages || !Number.isInteger(numImages) || numImages <= 0) {
    throw new Error("Number of images must be a positive integer.");
  }

  try {
    // Construct the API URL
    const url = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(
      query
    )}&cx=${CSE_ID}&key=${API_KEY}&searchType=image&num=${Math.min(numImages, 10)}`;

    // Make the API request
    const response = await axios.get(url, {
      headers: {
        "User-Agent": "Next.js Image Search App",
      },
    });
    const data = response.data;

    // Handle no results
    if (!data.items || data.items.length === 0) {
      console.warn(`No images found for query: "${query}"`);
      return [];
    }

    // Extract and return image links
    const imageLinks = data.items.map((item) => item.link);
    console.log(`Found ${imageLinks.length} images for query "${query}":`, imageLinks);
    return imageLinks.slice(0, numImages);
  } catch (error) {
    // Detailed error logging
    if (error.response) {
      console.error("API Error:", {
        status: error.response.status,
        message: error.response.data.error?.message || "Unknown error",
        details: error.response.data.error?.details || "No additional details",
      });
    } else {
      console.error("Error during image search:", error.message);
    }
    throw error; // Re-throw to let the component handle it
  }
}

export default searchImages;