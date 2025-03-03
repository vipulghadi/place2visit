export default function ArticleGeneratorPrompt(title, place, state, country, longitude, latitude) {
    return `
Generate a detailed travel guide for ${place}. The response should be structured in JSON format, containing the following fields:

1. **meta_title**: This should be **exactly** the same as the provided \`${title}\`. If \`${title}\` is empty or missing, generate a compelling, SEO-friendly alternative using phrases like "Top X Unmissable Places in ${place}" (where X is optional), "Best Attractions You Can’t Miss," or "Ultimate Travel Spots in ${place}."
2. **meta_description**: A short, engaging, SEO-optimized summary of the article.
3. **category**: "Travel & Tourism"
4. **country**: "${country || "Unknown Country"}"
5. **state**: "${state || "Unknown State"}"
6. **place**: "${place || "Unknown Place"}"
7. **latitude**: ${latitude || null}
8. **longitude**: ${longitude || null}
9. **tags**: An array of at least **five** relevant SEO-friendly tags, formatted like ["tag1", "tag2", "tag3", "tag4", "tag5"].
10. **cover_images**: An array containing only empty strings: [""].
11. **article**:
    - **title**: This must be **exactly** the same as \`${title}\`, unless empty, in which case generate an SEO-friendly alternative.
    - **cover_images**: [""] (Array of empty strings)
    - **sections**: A structured breakdown of the article, containing:
      - **heading**: The main heading of each section.
      - **text**: Detailed, engaging content about ${place || "this location"}.
      - **images**: [""] (Array of empty strings)
      - **subsections** (optional):
        - **title**: The subtopic’s title.
        - **text**: The corresponding description.
        - **images**: [""] (Array of empty strings).

### **Content Requirements:**
- Ensure the **title** is either **exactly** \`${title}\` or, if unavailable, a catchy SEO-optimized version.
- Write in an **engaging and tourist-friendly style**.
- Cover at least **5 attractions**, but no more than **15**.
- Word count should be between **1000-1500 words**.
- Include **cultural highlights, local cuisine, best times to visit, and unique experiences**.
- Use SEO-friendly and catchy phrases like **"hidden gems," "must-visit places," "ultimate travel spots,"** etc.

### **Example JSON Response:**
\`\`\`json
{
  "meta_title": "${title}",
  "meta_description": "Explore the top attractions in ${place}, ${state}, ${country}—your ultimate travel guide!",
  "category": "Travel & Tourism",
  "country": "${country || "Unknown Country"}",
  "state": "${state || "Unknown State"}",
  "place": "${place || "Unknown Place"}",
  "latitude": ${latitude || null},
  "longitude": ${longitude || null},
  "tags": ["travel", "vacation", "things to do", "hidden gems", "tourist spots"],
  "article": {
    "title": "${title}",
    "cover_images": [],
    "sections": [
      {
        "heading": "Introduction",
        "text": "${place} is packed with breathtaking landscapes, cultural hotspots, and unique experiences.",
        "images": [""],
        "subsections": []
      },
      {
        "heading": "Top Attractions in ${place}",
        "images": [],
        "subsections": [
          {
            "title": "Attraction 1",
            "text": "A must-visit location in ${place} that offers unforgettable experiences.",
            "images": []
          },
          {
            "title": "Attraction 2",
            "text": "Another incredible spot to explore when visiting ${place}.",
            "images": []
          }
        ]
      },
      {
        "heading": "Best Time to Visit",
        "text": "Plan your trip during the best seasons to fully enjoy ${place}.",
        "images": [],
        "subsections": []
      },
      {
        "heading": "Conclusion",
        "text": "${place} is a dream destination filled with unforgettable adventures.",
        "images": [],
        "subsections": []
      }
    ]
  }
}
\`\`\`
    `;
}
