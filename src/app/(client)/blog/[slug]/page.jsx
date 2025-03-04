"use client"
import React from "react";
import { motion } from "framer-motion";
import {
  HelpCircle,
  Tag,
  MapPin,
  Clock,
  ChevronRight,
  Heart,
  Share2,
  Bookmark,
  MessageSquare,
  Flag,
  AlertTriangle,
} from "lucide-react";
import LeftSection from "@/components/clientside/blogpage/LeftSections";
import RightSection from "@/components/clientside/blogpage/RightSection";
// Default article data
const defaultPost = {
  meta_title: "Banaras – The Spiritual Heart of India | Travel Guide",
  meta_description:
    "Discover Banaras (Varanasi), the spiritual capital of India. Explore its ghats, temples, rich culture, and vibrant festivals in this detailed guide.",
  category: "Travel & Tourism",
  article: {
    title: "Banaras – The Spiritual Heart of India",
    cover_image:
      "https://images.unsplash.com/photo-1612779774202-68e4305b849b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    sections: [
      {
        heading: "Introduction",
        text: "Banaras, also known as Varanasi, is one of the oldest cities in the world. It is considered the spiritual capital of India, drawing millions of pilgrims and visitors each year. Its sacred ghats, temples, and bustling markets make it a destination like no other.",
      },
      {
        heading: "Why Visit Banaras?",
        subheadings: [
          {
            title: "The Ghats",
            text: "The ghats of Banaras are its most iconic feature. They are not only a part of the city's charm but also serve as places of spiritual rituals and daily life. The most famous ghat is Dashashwamedh Ghat, where visitors can experience the grand Ganga Aarti at sunset.",
            image:
              "https://images.unsplash.com/photo-1612779774202-68e4305b849b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
          {
            title: "Temples and Spirituality",
            text: "Banaras is home to more than 2,000 temples, including the Kashi Vishwanath Temple, one of the holiest Shiva temples in the world. The city is a hub for Hindu spiritual practices, with rituals that have been carried out for thousands of years.",
            image:
              "https://images.unsplash.com/photo-1612779774202-68e4305b849b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
        ],
      },
      {
        heading: "Top Attractions in Banaras",
        subheadings: [
          {
            title: "Kashi Vishwanath Temple",
            text: "A visit to the Kashi Vishwanath Temple is a must for anyone visiting Banaras. Dedicated to Lord Shiva, this temple is a significant pilgrimage site for Hindus and is known for its magnificent architecture.",
            image:
              "https://images.unsplash.com/photo-1612779774202-68e4305b849b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
          {
            title: "Sarnath",
            text: "Located just 10 km from Banaras, Sarnath is one of the most important Buddhist sites in the world. It is where Lord Buddha gave his first sermon after attaining enlightenment. The ruins of the ancient monastery and the Dhamek Stupa are remarkable sites to explore.",
            image:
              "https://images.unsplash.com/photo-1612779774202-68e4305b849b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
        ],
      },
      {
        heading: "Experiencing the Local Culture",
        text: "Banaras is a city that is deeply connected with its culture. From the lively music of the street performers to the aroma of street food wafting through the air, the city has a unique vibrance that captivates all who visit. You can enjoy local delicacies like Banarasi paan, kachori, and lassi while exploring the narrow lanes.",
      },
      {
        heading: "Best Time to Visit",
        text: "The best time to visit Banaras is during the cooler months, from October to March. This period offers pleasant weather, making it ideal for sightseeing and participating in the city's many religious festivals, such as Diwali and Maha Shivaratri.",
      },
      {
        heading: "Conclusion",
        text: "Banaras is a city that leaves a lasting impression on all who visit. With its rich spiritual heritage, historic temples, lively ghats, and welcoming atmosphere, it offers a truly unique travel experience. Whether you're seeking peace and spirituality or simply wish to immerse yourself in the city's vibrant culture, Banaras is a destination that will stay in your heart long after you've left.",
      },
    ],
  },
};

// Sample related articles
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

// Popular tags
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

// Popular places
const popularPlaces = [
  "Varanasi",
  "Rishikesh",
  "Haridwar",
  "Amritsar",
  "Bodh Gaya",
];

function BlogPage() {
  const [showReportModal, setShowReportModal] = React.useState(false);

  return (
    <div className="w-full">
      <main className="flex flex-col md:flex-row min-h-screen w-full px-4 sm:px-6 md:px-8 py-8 border-none">
<LeftSection/>
        <section className="md:w-2/4 w-full mb-8 md:mb-0">
          <motion.article
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="   overflow-hidden"
          >
            <img
              src={defaultPost.article.cover_image}
              alt={defaultPost.article.title}
              className="w-full h-64 sm:h-80 object-cover"
            />

            <div className="p-6 sm:p-8">
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {defaultPost.category}
                </span>
                <span className="mx-2">•</span>
                <span className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  8 min read
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                {defaultPost.article.title}
              </h1>

              <div className="flex items-center mb-8">
                <div className="w-10 h-10 rounded-full bg-gray-300 mr-3 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
                    alt="Author"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Maya Patel</p>
                  <p className="text-sm text-gray-500">Travel Writer</p>
                </div>
              </div>

              <div className="prose max-w-none text-gray-700 mb-8">
                {defaultPost.article.sections.map((section, index) => (
                  <div key={index} className="mb-8">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                      {section.heading}
                    </h2>

                    {section.text && <p className="mb-4">{section.text}</p>}

                    {section.subheadings &&
                      section.subheadings.map((subheading, subIndex) => (
                        <div key={subIndex} className="mt-6 mb-6">
                          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
                            {subheading.title}
                          </h3>
                          <p className="mb-4">{subheading.text}</p>
                          {subheading.image && (
                            <div className="my-4">
                              <img
                                src={subheading.image}
                                alt={subheading.title}
                                className="w-full h-auto rounded-lg"
                              />
                              <p className="text-sm text-gray-500 mt-2 italic">
                                {subheading.title} - Banaras, India
                              </p>
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                <div className="flex space-x-4">
                  <button className="flex items-center text-gray-500 hover:text-red-500">
                    <Heart className="h-5 w-5 mr-1" />
                    <span>124</span>
                  </button>
                  <button className="flex items-center text-gray-500 hover:text-blue-500">
                    <MessageSquare className="h-5 w-5 mr-1" />
                    <span>23</span>
                  </button>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={() => setShowReportModal(true)}
                    className="flex items-center text-gray-500 hover:text-amber-500"
                  >
                    <Flag className="h-5 w-5 mr-1" />
                    <span>Report Error</span>
                  </button>
                  <button className="flex items-center text-gray-500 hover:text-blue-500">
                    <Share2 className="h-5 w-5 mr-1" />
                  </button>
                  <button className="flex items-center text-gray-500 hover:text-blue-500">
                    <Bookmark className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Report Error Modal */}
            {showReportModal && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-white rounded-xl p-6 max-w-md w-full"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-gray-900">Report an Error</h3>
                    <button
                      onClick={() => setShowReportModal(false)}
                      className="text-gray-500 hover:text-gray-700 text-2xl"
                    >
                      ×
                    </button>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Error Type
                    </label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Factual Error</option>
                      <option>Spelling/Grammar</option>
                      <option>Outdated Information</option>
                      <option>Broken Link/Image</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={4}
                      placeholder="Please describe the error in detail..."
                    ></textarea>
                  </div>

                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => setShowReportModal(false)}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        alert("Thank you for your report. We'll review it shortly.");
                        setShowReportModal(false);
                      }}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Submit Report
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </motion.article>
        </section>
        <RightSection/>


      </main>
    </div>
  );
}

export default BlogPage;