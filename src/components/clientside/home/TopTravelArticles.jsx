"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Clock, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function TopPlacesToVisitNow() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    // Simulate fetching top places (replace with real API call)
    const fetchPlaces = async () => {
      const dummyData = [
        {
          name: "The Ultimate Guide to Pune's Historical Forts",
          image: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          slug: "top-10-unmissable-places-in-pune",
          description: "Discover the rich history and architectural marvels of Pune's ancient fortifications.",
          category: "history",
          readTime: "8 min",
          author: "Priya Sharma",
          date: "May 15, 2024",
        },
        {
          name: "Paris After Dark: A Night Tour Guide",
          image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1473&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          slug: "best-attractions-in-paris",
          description: "Experience the magic of the City of Lights when the sun goes down.",
          category: "nightlife",
          readTime: "6 min",
          author: "Jean Dupont",
          date: "April 28, 2024",
        },
        {
          name: "Tokyo's Hidden Food Alleys: Local Favorites",
          image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          slug: "ultimate-tokyo-travel-guide",
          description: "Venture beyond the tourist spots to discover authentic Japanese cuisine.",
          category: "food",
          readTime: "10 min",
          author: "Hiro Tanaka",
          date: "May 3, 2024",
        },
        {
          name: "New York on a Budget: Free Attractions Guide",
          image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          slug: "top-new-york-attractions",
          description: "Experience the best of NYC without breaking the bank.",
          category: "budget",
          readTime: "7 min",
          author: "Sarah Johnson",
          date: "May 10, 2024",
        },
        {
          name: "Bali's Sacred Temples: A Spiritual Journey",
          image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1438&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          slug: "ultimate-bali-travel-guide",
          description: "Explore the island's most sacred and beautiful temples.",
          category: "culture",
          readTime: "9 min",
          author: "Made Wijaya",
          date: "April 22, 2024",
        },
      ];
      setPlaces(dummyData);
    };
    fetchPlaces();
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="w-full py-16 px-4 md:px-8 bg-white"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <Badge className="bg-blue-100 text-blue-800 mb-3">TRENDING ARTICLES</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Top Travel Articles
            </h2>
            <p className="text-gray-600 max-w-2xl">
              Discover our most popular travel guides and insider tips from around the world.
            </p>
          </div>
         
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {places.map((place, index) => (
            <motion.div key={index} variants={item}>
              <Link href={`/blogs/${place.slug}`}>
                <Card className="overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300 h-full group">
                  <CardContent className="p-0">
                    <div className="relative w-full h-48 overflow-hidden">
                      <Image
                        src={place.image || "/placeholder.svg"}
                        alt={`${place.name} travel guide`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                      />
                      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    <div className="p-5">
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant="outline" className="text-xs font-medium text-blue-700 bg-blue-50 border-blue-100 capitalize">
                          {place.category}
                        </Badge>
                        <div className="flex items-center text-gray-500 text-xs">
                          <Clock size={12} className="mr-1" />
                          {place.readTime}
                        </div>
                      </div>

                      <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-700 transition-colors">
                        {place.name}
                      </h3>

                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {place.description}
                      </p>

                      <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
                        <div className="flex items-center">
                          
                         
                        </div>
                        <span className="text-xs text-gray-500">{place.date}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>


      </div>
    </motion.div>
  );
}