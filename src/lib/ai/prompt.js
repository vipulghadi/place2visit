export default function ArticleGeneratorPrompt(place, state, country, longitude, latitude) {
    return `
Generate a detailed travel guide for ${place}. The response should be structured in JSON format, containing the following fields:

1. meta_title: A compelling, eye-catching, and SEO-friendly title for the travel guide, same as the article title, dynamically chosen from exciting variations like "Top X Unmissable Places in ${place}" (where X is optional), "Best Attractions You Can’t Miss," "Ultimate Travel Spots in ${place}," or similar catchy phrases.
2. meta_description: A short meta description optimized for search engines.
3. category: The category of the blog (e.g., "Travel & Tourism").
4. country: ${country || "Unknown Country"}
5. state: ${state || "Unknown State"}
6. place: ${place || "Unknown Place"}
7. latitude: ${latitude || "Unknown Latitude"}
8. longitude: ${longitude || "Unknown Longitude"}
9.tags:related tags for this article,it should be in forma of ["a","b","c"] eg. and minimum 5 Tags
10. Make sure that image must bearray of emoty string: [""].
11. The article should be structured as follows:
- title: The title of the article, same as meta_title, dynamically chosen from eye-catching and SEO-friendly variations like "Top X Unmissable Places in ${place}" (where X is optional), "Best Attractions You Can’t Miss," "Ultimate Travel Spots in ${place}," or similar exciting phrases.
- cover_image: A suggested cover image (if applicable).
- sections: A list of sections, each containing:
  - heading: The main heading of the section.
  - text: Descriptive text providing information about ${place || "this location"}.
  - image: Must be an empty string.
  - subsections (optional): A list of subtopics, each containing:
    - title: The title of the subtopic.
    - text: The corresponding description.
    - image: Must be an  array of empty string.

Ensure the language is simple and engaging, suitable for tourists. Provide information on major attractions, cultural highlights, cuisine, best time to visit, and any unique experiences. The article should cover a minimum of 5 and a maximum of 15 top attractions. The total word count should be between 1000 and 1500 words. Generate the JSON response in the given format only. Use SEO-friendly and catchy phrases like "unmissable attractions," "ultimate places to visit," "hidden gems," or similar in the title and text.

Example JSON response (title will vary dynamically):
{
  "meta_title": "Best Attractions You Can’t Miss in ${place}",
  "meta_description": "Discover the most exciting spots in ${place || "this destination"}, ${state || "Unknown State"}, ${country || "Unknown Country"}. Unmissable attractions and more await!",
  "category": "Travel & Tourism",
  "country": "${country || "Unknown Country"}",
  "state": "${state || "Unknown State"}",
  "place": "${place || "Unknown Place"}",
  "latitude": ${latitude || null},
  "longitude": ${longitude || null},
  "tags":["tag1","tag2","tag3","tag4","tag5",]
  "article": {
    "title": "Best Attractions You Can’t Miss in ${place}",
    "cover_images": [""],
    "sections": [
      {
        "heading": "Introduction",
        "text": "${place || "This destination"} is packed with jaw-dropping attractions, vibrant culture, and experiences you’ll never forget.",
        "images": [""],
        "subsections": []
      },
      {
        "heading": "Top Attractions in ${place || "this destination"}",
        "images": [""],
        "subsections": [
          {
            "title": "Attraction 1",
            "text": "Description of the first unmissable attraction in ${place || "this destination"}.",
            "images": [""]
          },
          {
            "title": "Attraction 2",
            "text": "Description of the second must-visit spot in ${place || "this destination"}.",
            "images": [""]
          }
        ]
      },
      {
        "heading": "Best Time to Visit",
        "text": "Plan your adventure to ${place || "this destination"} during the perfect seasons for an unforgettable trip.",
        "images": [""],
        "subsections": []
      },
      {
        "heading": "Conclusion",
        "text": "${place || "This destination"} is a dream destination filled with incredible sights and unique adventures.",
        "images": [""],
        "subsections": []
      }
    ]
  }
}
Possible title variations include: "Top 10 Unmissable Places in ${place}", "Ultimate Travel Spots in ${place}", "Best Hidden Gems You’ll Love in ${place}", or similar dynamic and catchy options.
    `;
}