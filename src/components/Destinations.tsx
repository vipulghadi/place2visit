import Image from "next/image";
import Link from "next/link";

const destinations = [
  {
    title: "Santorini, Greece",
    description: "Beautiful white-washed buildings and stunning sunsets",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80",
    slug: "ultimate-guide-to-santorini"
  },
  {
    title: "Bali, Indonesia",
    description: "Tropical paradise with rich culture and beaches",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
    slug: "exploring-bali-temples"
  },
  {
    title: "Machu Picchu, Peru",
    description: "Ancient Incan citadel in the Andes Mountains",
    image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&w=800&q=80",
    slug: "hiking-machu-picchu"
  },
  {
    title: "Santorini, Greece",
    description: "Beautiful white-washed buildings and stunning sunsets",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80",
    slug: "ultimate-guide-to-santorini"
  },
  {
    title: "Bali, Indonesia",
    description: "Tropical paradise with rich culture and beaches",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
    slug: "exploring-bali-temples"
  },
  {
    title: "Machu Picchu, Peru",
    description: "Ancient Incan citadel in the Andes Mountains",
    image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&w=800&q=80",
    slug: "hiking-machu-picchu"
  }
];

export default function Destinations() {
  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-12">Popular Destinations</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {destinations.map((destination) => (
          <div
            key={destination.slug}
            className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:-translate-y-1 fade-in"
          >
            <div className="relative h-48">
              <Image
                src={destination.image}
                alt={destination.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{destination.title}</h3>
              <p className="text-gray-600 mb-4">{destination.description}</p>
              <Link
                href={`/blog/${destination.slug}`}
                className="text-green-600 hover:text-green-700 font-medium"
              >
                Explore More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}