"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Search, Globe, Plane, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
    const [search, setSearch] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        if (search.length > 2) {
            setSuggestions(
                ["Paris, France", "New York City, USA", "Tokyo, Japan", "Bali, Indonesia"]
                    .filter((place) => place.toLowerCase().includes(search.toLowerCase()))
            );
        } else {
            setSuggestions([]);
        }
    }, [search]);

    return (
        <section className="flex flex-col items-center text-center gap-10 px-6 md:px-16 bg-gray-100 mt-16 sm:h-screen">
            {/* Animated Heading */}
            <motion.h1 
                initial={{ opacity: 0, y: -20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="text-4xl md:text-7xl font-bold leading-tight mt-20"
            >
                Discover <span className="text-green-500">Amazing Places</span> Around the World
            </motion.h1>

            {/* Animated Subtext with SEO-friendly spans */}
            <motion.p
                initial={{ opacity: 0, x: -10 }} 
                animate={{ opacity: 1, x: 0 }} 
                transition={{ duration: 0.6, delay: 0.3 }}
                className="sm:text-2xl text-xl"
            >
                Explore travel guides hidden gems, and 
             must-visit places for an 
             unforgettable adventure.
            </motion.p>

            {/* Search Bar */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }} 
                transition={{ duration: 0.5, delay: 0.4 }}
                className="relative w-full flex justify-center items-center"
            >
                <input
                    type="text"
                    placeholder="Search for a place.."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="sm:w-1/2 px-4 w-full border-green-500 border text-gray-900 p-3 outline-none rounded-full shadow-lg"
                />
                <Search className="absolute right-10 text-green-600" />
                {suggestions.length > 0 && (
                    <ul className="absolute mt-2 w-full bg-white text-gray-900 shadow-lg rounded-lg overflow-hidden">
                        {suggestions.map((suggestion, index) => (
                            <li key={index} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                {suggestion}
                            </li>
                        ))}
                    </ul>
                )}
            </motion.div>

            {/* Animated SEO-friendly Spans with Icons */}
            <motion.div 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.5, delay: 0.6 }}
                className="sm:flex flex-wrap justify-center gap-4 hidden "
            >
                <span className="bg-white shadow-lg rounded-full px-4 py-2 flex items-center gap-2">
                    <MapPin className="text-green-500" /> Search any location here
                </span>
                <span className="bg-white shadow-lg rounded-full px-4 py-2 flex items-center gap-2">
                    <Globe className="text-blue-500" /> Discover the world
                </span>
                <span className="bg-white shadow-lg rounded-full px-4 py-2 flex items-center gap-2">
                    <Plane className="text-red-500" /> Find the best travel deals
                </span>
                <span className="bg-white shadow-lg rounded-full px-4 py-2 flex items-center gap-2">
                    <Compass className="text-yellow-500" /> Explore hidden destinations
                </span>
            </motion.div>
        </section>
    );
}
