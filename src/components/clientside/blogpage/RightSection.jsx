import React from "react";
import { motion } from "framer-motion";
import { Tag, AlertTriangle, MapPin, ChevronRight } from "lucide-react";


// Sample related articles data
const relatedArticles = [
  {
    id: 1,
    title: "The Sacred River Ganges: A Journey Through India's Lifeline",
    image:
      "https://images.unsplash.com/photo-1583267746897-2cf415887172?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    date: "March 10, 2025",
    readTime: "6 min read",
  },
  {
    id: 2,
    title: "5 Ancient Temples in India You Must Visit",
    image:
      "https://images.unsplash.com/photo-1555400038-63f5ba517a47?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    date: "March 5, 2025",
    readTime: "5 min read",
  },
  {
    id: 3,
    title: "Exploring Rishikesh: India's Yoga Capital",
    image:
      "https://images.unsplash.com/photo-1604881988758-f76ad2f7aac1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1771&q=80",
    date: "February 28, 2025",
    readTime: "7 min read",
  },
  {
    id: 4,
    title: "India on a Budget: Travel Tips and Tricks",
    image:
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    date: "February 20, 2025",
    readTime: "8 min read",
  },
];

// Popular tags data
const popularTags = [
  "India",
  "Spirituality",
  "Temples",
  "Culture",
  "History",
  "Ganges",
  "Pilgrimage",
  "Architecture",
  "Food",
  "Festivals",
];

const popularPlaces = [
    "Varanasi",
    "Rishikesh",
    "Haridwar",
    "Amritsar",
    "Bodh Gaya",
  ];

const RightSection = () => {
  return (
    <section className="md:w-1/4 w-full">
      <div className="space-y-8">
        {/* Related Articles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-md p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Related Articles</h3>
            
          </div>

          <div className="space-y-4">
            {relatedArticles.map((article) => (
              <motion.a
                key={article.id}
                href="#"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: article.id * 0.1 }}
                className="flex items-start space-x-3 group"
              >
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                />
                <div>
                  <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {article.title}
                  </h4>
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <span>{article.date}</span>
                    <span className="mx-1">•</span>
                    <span>{article.readTime}</span>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Popular Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl shadow-md p-6"
        >
          <div className="flex items-center mb-4">
            <Tag className="h-5 w-5 text-blue-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-800">Popular Tags</h3>
          </div>

          <div className="flex flex-wrap gap-2">
            {popularTags.map((tag, index) => (
              <motion.a
                key={index}
                href="#"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm px-3 py-1 rounded-full transition-colors"
              >
                {tag}
              </motion.a>
            ))}
          </div>
        </motion.div>

                {/* Newsletter */}
                <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white rounded-xl shadow-md p-6 sm:block hidden"
              >
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Newsletter</h3>
                <p className="text-gray-600 mb-4">
                  Subscribe to our newsletter for the latest travel updates and exclusive content.
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                    Subscribe
                  </button>
                </div>
              </motion.div>
      
              {/* Popular Places */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-xl shadow-md p-6"
              >
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Popular Places</h3>
                <div className="space-y-2">
                  {popularPlaces.map((place, index) => (
                    <a
                      key={index}
                      href="#"
                      className="flex items-center p-2 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <MapPin className="h-4 w-4 text-blue-600 mr-2" />
                      <span className="text-gray-700">{place}</span>
                    </a>
                  ))}
                </div>
              </motion.div>



      </div>
    </section>
  );
};

export default RightSection;