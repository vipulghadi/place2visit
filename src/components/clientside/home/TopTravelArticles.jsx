"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Clock, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import BlogOverviewCard from "../BlogOverviewCard";
import { BASE_URL } from "@/lib/constant";


export default function TopPlacesToVisitNow() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    // Simulate fetching top places (replace with real API call)
    const fetchPlaces = async () => {
        try{

            const response = await fetch(`${BASE_URL}/api/client/top-travel-articles`);
            const data = await response.json();
            setPlaces(data.data);
        }
        catch(error){
            console.error(error);
            toast.error("Error in fetching")
        }


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
              <BlogOverviewCard place={place} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
