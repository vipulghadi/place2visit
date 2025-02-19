export default function ArticleGeneratorPrompt( place, state, country, longitude, latitude ) {
    return `
Generate a detailed travel guide for ${place}. The response should be structured in JSON format, containing the following fields:

1. **meta_title**: A compelling SEO-friendly title for the travel guide.
2. **meta_description**: A short meta description optimized for search engines.
3. **category**: The category of the blog (e.g., "Travel & Tourism").
4. **country**: ${country || "Unknown Country"}
5. **state**: ${state || "Unknown State"}
6. **place**: ${place || "Unknown Place"}
7. **latitude**: ${latitude || "Unknown Latitude"}
8. **longitude**: ${longitude || "Unknown Longitude"}

9.**make sure that image must be: ""
10.The **article** should be structured as follows:
- **title**: The title of the article.
- **cover_image**: A suggested cover image (if applicable).
- **sections**: A list of sections, each containing:
  - **heading**: The main heading of the section.
  - **text**: Descriptive text providing information about ${place || "this location"}.
  - **image**: Boolean indicating whether an image is needed.
  - **subsections** (optional): A list of subtopics, each containing:
    - **title**: The title of the subtopic.
    - **text**: The corresponding description.
    - **image**: must be emprty string
Please genrate seo friendly response
Ensure the language is simple and engaging, suitable for tourists. Provide information on major attractions, cultural highlights, cuisine, best time to visit, and any unique experiences. The article should cover a **minimum of 5 and a maximum of 15 top attractions**. The total **word count should be between 1000 and 1500 words. make sure that genrate json response for given format only**.
Please generate Response in Simple English ALso DOnt use any Symbols like * in response please.
11.Make sure that the title of the blog should be eye catching and seo Friendly like top place ot top attraction etc.
Example JSON response:
{
"title":"Top 10 places to visit in ${place}.
  "meta_title": "Best Places to visit in ${ place}",
  "meta_description": "Discover ${place || "this destination"}, located in ${state || "Unknown State"}, ${country || "Unknown Country"}. Explore its famous attractions, cultural highlights, and more!",
  "category": "Travel & Tourism",
  "country": "${country || "Unknown Country"}",
  "state": "${state || "Unknown State"}",
  "place": "${place || "Unknown Place"}",
  "latitude": ${latitude || null},
  "longitude": ${longitude || null},
 
  "article": {
    "title": "${"Top 10 visting places in  " + place} or attractions",
    "cover_image": "",
    "sections": [
      {
        "heading": "Introduction",
        "text": "${place || "This destination"} is known for its breathtaking attractions, rich culture, and unique experiences.",
        "image":"",
        "subsections": []
      },
      {
        "heading": "Top Attractions in ${place || "this destination"}",
        "image": "",
        "subsections": [
          {
            "title": "Attraction 1",
            "text": "Description of the first attraction.",
                "image": "",
          },
          {
            "title": "Attraction 2",
            "text": "Description of the second attraction.",
            "image": "",
        ]
      },
      {
        "heading": "Best Time to Visit",
        "text": "The best time to visit ${place || "this destination"} is during the most pleasant seasons for tourism.",
            "image": "",
            "subsections": []
      },
      {
        "heading": "Conclusion",
        "text": "${place || "This destination"} is an amazing place to visit, offering unique cultural experiences and beautiful sights.",
        "image": "",
        "subsections": []
      }
    ]
  }
}
    `;
}
