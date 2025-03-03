export default function ArticleGeneratorPrompt(
    title,
    place,
    state,
    country,
    longitude,
    latitude
  ) {
    return `
  Generate a detailed travel guide for ${place}. The response must be in valid JSON format, containing the following fields:
  
  ### JSON Structure:
  {
    "meta_title": "${title || `Top Attractions in ${place}`}",
    "meta_description": "A captivating travel guide featuring the best experiences in ${place}, ${state}, ${country}.",
    "category": "Travel & Tourism",
    "country": "${country || "Unknown Country"}",
    "state": "${state || "Unknown State"}",
    "place": "${place || "Unknown Place"}",
    "latitude": ${latitude || null},
    "longitude": ${longitude || null},
    "tags": ["travel", "vacation", "things to do", "hidden gems", "tourist spots"],
    "cover_images": [],
    "article": {
      "title": "${title || `Explore ${place}: A Complete Travel Guide`}",
      "cover_images": [],
      "sections": [
        {
          "heading": "Introduction",
          "text": "${place} is a must-visit destination, offering breathtaking landscapes, cultural richness, and unforgettable experiences.",
          "images": [],
          "subsections": []
        },
        {
          "heading": "Top Attractions in ${place}",
          "images": [],
          "subsections": [
            {
              "title": "Attraction 1",
              "text": "A must-visit location in ${place} known for its unique charm.",
              "images": []
            },
            {
              "title": "Attraction 2",
              "text": "Another incredible spot offering great experiences in ${place}.",
              "images": []
            }
          ]
        },
        {
          "heading": "Local Cuisine",
          "text": "Explore the delicious food and specialties unique to ${place}.",
          "images": [],
          "subsections": []
        },
        {
          "heading": "Best Time to Visit",
          "text": "Plan your trip during the best seasons to fully enjoy ${place}.",
          "images": [],
          "subsections": []
        },
        {
          "heading": "Travel Tips & Practical Information",
          "text": "Essential advice on transportation, safety, local customs, language, and currency for visitors to ${place}.",
          "images": [],
          "subsections": []
        },
        {
          "heading": "Conclusion",
          "text": "A visit to ${place} promises incredible adventures, rich history, and unforgettable memories.",
          "images": [],
          "subsections": []
        }
      ]
    }
  }
  
  ### Response Requirements:
  - The response must be a valid JSON with no extra syntax or formatting issues.
  - The meta_title should exactly match "${title}", or generate an SEO-friendly alternative if missing.
  - The article should be engaging, informative, and tourist-friendly.
  - Cover at least 5 attractions, but no more than 15.
  - Include cultural highlights, local food, travel tips, and seasonal recommendations.
  - Ensure word count is between 1000-1500 words.
  - Do not include unnecessary punctuation or formatting that prevents valid JSON conversion.
  `;
  }