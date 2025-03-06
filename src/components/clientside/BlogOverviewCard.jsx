"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Clock, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DEFAULT_BLOG_IMAGE } from "@/lib/constant";

function BlogOverviewCard({ place }) {
    return (
      <Link href={`/blogs/${place.slug}`}>
        <Card className="overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300 h-full group">
          <CardContent className="p-0">
            <div className="relative w-full h-48 overflow-hidden">
              <Image
                src={place.article.cover_images[0] || DEFAULT_BLOG_IMAGE}
                alt={`${place.meta_title}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
              />
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
  
            <div className="p-5">
              <div className="flex items-center justify-between mb-3">
                <Badge variant="outline" className="text-xs font-medium text-blue-700 bg-blue-50 border-blue-100 capitalize">
                  {place.place.name}
                </Badge>
                <div className="flex items-center text-gray-500 text-xs">
                  <Clock size={12} className="mr-1" />
                  5 min read
                </div>
              </div>
  
              <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-700 transition-colors">
                {place.meta_title}
              </h3>
  
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {place.meta_description}
              </p>
              <div className="flex flex-wrap gap-2">
              {place.tags.slice(0, 5).map((tag, index) => (
                <Badge key={index} className="text-xs font-medium hover:bg-red-50 bg-gray-100 text-black capitalize">
                  {tag}
                </Badge>
              ))}
            </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    );
  }
  

export default BlogOverviewCard