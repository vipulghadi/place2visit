import Image from "next/image";
import Link from "next/link";



export function BlogCard({ slug, title, excerpt, image }) {
  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:-translate-y-1 fade-in">
      <div className="relative h-48">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-gray-600 mb-4">{excerpt}</p>
        <Link
          href={`/blog/${slug}`}
          className="text-green-600 hover:text-green-700 font-medium"
        >
          Read More
        </Link>
      </div>
    </article>
  );
}