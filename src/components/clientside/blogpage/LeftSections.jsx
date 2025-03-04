import React from "react";
import { motion } from "framer-motion";
import { MapPin, ChevronRight } from "lucide-react";

// Popular places data
const popularPlaces = [
  "Varanasi",
  "Rishikesh",
  "Haridwar",
  "Amritsar",
  "Bodh Gaya",
];

const LeftSection= () => {
  return (
    <section className="md:w-1/4 w-full mb-8 md:mb-0">
      <div className="space-y-8">
        {/* About Place2Visit */}


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

export default LeftSection;