import { BlogCard } from "@/components/clientside/BlogCard";

const posts = [
  {
    slug: "ultimate-guide-to-santorini",
    title: "Ultimate Guide to Santorini",
    excerpt: "Discover the magic of Santorini's white-washed buildings, stunning sunsets, and hidden gems...",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80"
  },
  {
    slug: "exploring-bali-temples",
    title: "Exploring Bali's Hidden Temples",
    excerpt: "Journey through Bali's most sacred and secluded temples, away from the tourist crowds...",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80"
  },
  {
    slug: "hiking-machu-picchu",
    title: "Hiking Machu Picchu",
    excerpt: "A complete guide to preparing for and experiencing the iconic Inca Trail...",
    image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&w=800&q=80"
  }
];

export default function Blog() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-12 fade-in">Travel Stories & Guides</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <BlogCard key={post.slug} {...post}  />
        ))}
      </div>
    </main>
  );
}