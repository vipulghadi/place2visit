import Image from "next/image";
import { BlogCard } from "@/components/BlogCard";
import Head from "next/head";  // Importing the correct Head component

// Static content for default fallback when no matching post is found
const defaultPost = {
  meta_title: "Banaras – The Spiritual Heart of India | Travel Guide",
  meta_description: "Discover Banaras (Varanasi), the spiritual capital of India. Explore its ghats, temples, rich culture, and vibrant festivals in this detailed guide.",
  category: "Travel & Tourism",
  article: {
    title: "Banaras – The Spiritual Heart of India",
    cover_image: "https://images.unsplash.com/photo-1612779774202-68e4305b849b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    sections: [
      {
        heading: "Introduction",
        text: "Banaras, also known as Varanasi, is one of the oldest cities in the world. It is considered the spiritual capital of India, drawing millions of pilgrims and visitors each year. Its sacred ghats, temples, and bustling markets make it a destination like no other."
      },
      {
        heading: "Why Visit Banaras?",
        subheadings: [
          {
            title: "The Ghats",
            text: "The ghats of Banaras are its most iconic feature. They are not only a part of the city's charm but also serve as places of spiritual rituals and daily life. The most famous ghat is Dashashwamedh Ghat, where visitors can experience the grand Ganga Aarti at sunset.",
        image: "https://images.unsplash.com/photo-1612779774202-68e4305b849b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          },
          {
            title: "Temples and Spirituality",
            text: "Banaras is home to more than 2,000 temples, including the Kashi Vishwanath Temple, one of the holiest Shiva temples in the world. The city is a hub for Hindu spiritual practices, with rituals that have been carried out for thousands of years.",
            image: "https://images.unsplash.com/photo-1612779774202-68e4305b849b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
        ]
      },
      {
        heading: "Top Attractions in Banaras",
        subheadings: [
          {
            title: "Kashi Vishwanath Temple",
            text: "A visit to the Kashi Vishwanath Temple is a must for anyone visiting Banaras. Dedicated to Lord Shiva, this temple is a significant pilgrimage site for Hindus and is known for its magnificent architecture.",
                image: "https://images.unsplash.com/photo-1612779774202-68e4305b849b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          },
          {
            title: "Sarnath",
            text: "Located just 10 km from Banaras, Sarnath is one of the most important Buddhist sites in the world. It is where Lord Buddha gave his first sermon after attaining enlightenment. The ruins of the ancient monastery and the Dhamek Stupa are remarkable sites to explore.",
            image: "https://images.unsplash.com/photo-1612779774202-68e4305b849b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
        ]
      },
      {
        heading: "Experiencing the Local Culture",
        text: "Banaras is a city that is deeply connected with its culture. From the lively music of the street performers to the aroma of street food wafting through the air, the city has a unique vibrance that captivates all who visit. You can enjoy local delicacies like Banarasi paan, kachori, and lassi while exploring the narrow lanes."
      },
      {
        heading: "Best Time to Visit",
        text: "The best time to visit Banaras is during the cooler months, from October to March. This period offers pleasant weather, making it ideal for sightseeing and participating in the city’s many religious festivals, such as Diwali and Maha Shivaratri."
      },
      {
        heading: "Conclusion",
        text: "Banaras is a city that leaves a lasting impression on all who visit. With its rich spiritual heritage, historic temples, lively ghats, and welcoming atmosphere, it offers a truly unique travel experience. Whether you're seeking peace and spirituality or simply wish to immerse yourself in the city's vibrant culture, Banaras is a destination that will stay in your heart long after you've left."
      }
    ]
  }
};

const relatedPosts = [
  {
    slug: "exploring-bali-temples",
    title: "Exploring Bali's Hidden Temples",
    excerpt: "Journey through Bali's most sacred and secluded temples...",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80"
  },
  {
    slug: "hiking-machu-picchu",
    title: "Hiking Machu Picchu",
    excerpt: "A complete guide to preparing for and experiencing the Inca Trail...",
    image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&w=800&q=80"
  }
];

export default function BlogPost({ params }) {
  const post = defaultPost;

  return (
    <article className="max-w-3xl mx-auto px-4 py-16">
      {/* Meta Tags */}
      <Head>
        <title>{post.meta_title}</title>
        <meta name="description" content={post.meta_description} />
      </Head>

      {/* Article Header */}
      <header className="mb-8 fade-in mt-10">
        <h1 className="text-4xl font-bold mb-4">{post.article.title}</h1>
        <div className="text-gray-600">{post.category}</div>
      </header>

      {/* Cover Image */}
      <div className="relative w-full h-96">
        <Image
          src={post.article.cover_image}
          alt={post.article.title}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>

      {/* Article Content */}
      {post.article.sections.map((section, index) => (
        <div key={index} className="mb-12">
          <h2 className="text-2xl font-bold mb-4 mt-4">{section.heading}</h2>
          <p className="mb-6">{section.text}</p>
          {section.subheadings && section.subheadings.map((sub, subIndex) => (
            <div key={subIndex} className="mb-10">
              <h3 className="text-xl font-semibold">{sub.title}</h3>
              <p className="mt-2 mb-2">{sub.text}</p>
              {sub.image && (
                <div className="relative w-full h-64">
                  <Image
                    src={sub.image}
                    alt={sub.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg mt-4"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      ))}

      {/* Related Posts */}
      <section className="mt-16 pt-8 border-t">
        <h2 className="text-2xl font-bold mb-8">Related Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {relatedPosts.map((post) => (
            <BlogCard key={post.slug} {...post} />
          ))}
        </div>
      </section>
    </article>
  );
}
