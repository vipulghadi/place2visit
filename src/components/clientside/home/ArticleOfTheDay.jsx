"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
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
      className="w-full bg-gradient-to-b from-white to-gray-50 py-16 px-4 md:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <Badge className="bg-purple-100 text-purple-800 mb-3">FEATURED CONTENT</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Article of the Day
            </h2>
            <p className="text-gray-600 max-w-2xl">
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
          <Card className="overflow-hidden border-none shadow-xl">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Image Section */}
              <div className="relative w-full h-[300px] md:h-auto overflow-hidden group">
                <Image
                  src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=1420&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Article of the day"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent md:bg-gradient-to-b"></div>
                
                <div className="absolute top-6 left-6 z-10">
                  <Badge className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-none px-4 py-1.5">
                    Article of the Day
                  </Badge>
                </div>
                
                <div className="absolute bottom-6 left-6 right-6 md:hidden z-10">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    The Future of Travel: Sustainable Tourism in 2025
                  </h3>
                  <div className="flex items-center space-x-4 text-sm text-white/90">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>May 18, 2024</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>8 min read</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="bg-white p-8 md:p-12 flex flex-col justify-between">
                <div className="space-y-6">
                  <div className="hidden md:block">
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>May 18, 2024</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>8 min read</span>
                      </div>
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-3">
                      The Future of Travel: Sustainable Tourism in 2025
                    </h3>
                  </div>
                  
                  <CardDescription className="text-base text-gray-600 leading-relaxed">
                    Explore how sustainable tourism is reshaping the travel industry. From carbon-neutral accommodations to community-based experiences, discover how you can make a positive impact while exploring the world's most beautiful destinations.
                  </CardDescription>
                  
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="bg-gray-100">Sustainable Travel</Badge>
                    <Badge variant="secondary" className="bg-gray-100">Eco Tourism</Badge>
                    <Badge variant="secondary" className="bg-gray-100">Future Trends</Badge>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden">
                      <Image 
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3" 
                        alt="Author" 
                        fill 
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Emma Rodriguez</p>
                      <p className="text-sm text-gray-500">Travel Journalist</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-between">
                  <div className="flex space-x-2">
                    <Button variant="outline" size="icon" className="rounded-full">
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full">
                      <Bookmark className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                  <Link href="/article/sustainable-tourism-2025">
                    <Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-6">
                      Read Full Article <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}


export default ArticleOfTheDay;