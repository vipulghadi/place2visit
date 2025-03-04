"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Share2, Bookmark, ArrowRight, Heart } from "lucide-react";
import Link from "next/link";

function ArticleOfTheDay() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="w-full bg-gradient-to-b from-white to-gray-50 py-12 px-4 sm:px-6 md:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <Badge className="bg-purple-100 text-purple-800 mb-3">FEATURED CONTENT</Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Article of the Day
            </h2>
            <p className="text-gray-600 text-sm sm:text-base max-w-2xl">
              Our editors' handpicked selection to inspire your next adventure.
            </p>
          </div>
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Card className="overflow-hidden border-none shadow-xl flex flex-col md:flex-row">
            {/* Image Section */}
            <div className="relative w-full h-64 sm:h-72 md:h-[400px] md:w-1/2 overflow-hidden group">
              <Image
                src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=1420&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Article of the day"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:bg-gradient-to-r" />
              <div className="absolute top-4 left-4 z-10">
                <Badge className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-none px-3 py-1 text-xs sm:text-sm">
                  Article of the Day
                </Badge>
              </div>
            </div>

            {/* Content Section */}
            <div className="w-full md:w-1/2 bg-white p-6 sm:p-8 md:p-10 flex flex-col justify-between">
              <div className="space-y-4">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  The Future of Travel: Sustainable Tourism in 2025
                </h3>
                <div className="flex items-center space-x-4 text-xs sm:text-sm text-gray-500">
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                    <span>May 18, 2024</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                    <span>8 min read</span>
                  </div>
                </div>
                <CardDescription className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Explore how sustainable tourism is reshaping the travel industry. From carbon-neutral accommodations to community-based experiences, discover how you can make a positive impact while exploring the world's most beautiful destinations.
                </CardDescription>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-gray-100 text-xs sm:text-sm">Sustainable Travel</Badge>
                  <Badge variant="secondary" className="bg-gray-100 text-xs sm:text-sm">Eco Tourism</Badge>
                  <Badge variant="secondary" className="bg-gray-100 text-xs sm:text-sm">Future Trends</Badge>
                </div>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex space-x-2">
                  <Button variant="outline" size="icon" className="rounded-full h-8 w-8 sm:h-10 sm:w-10">
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full h-8 w-8 sm:h-10 sm:w-10">
                    <Bookmark className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full h-8 w-8 sm:h-10 sm:w-10">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
                <Link href="/article/sustainable-tourism-2025">
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-4 py-2 sm:px-6 sm:py-2 w-full sm:w-auto text-sm sm:text-base">
                    Read Full Article <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default ArticleOfTheDay;