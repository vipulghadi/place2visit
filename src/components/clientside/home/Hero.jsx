"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Search, Globe, Plane, Compass, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PlaceSearchBar from "../PlaceSearchBar";
import { cn } from "@/lib/utils";

export default function HeroSection() {
    const [search, setSearch] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [backgroundIndex, setBackgroundIndex] = useState(0);
    

    function handleSearch (){

    }
    const backgroundImages = [
        "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?q=80&w=1530&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1592639296346-560c37a0f711?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1627938823193-fd13c1c867dd?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1606298855672-3efb63017be8?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ];

    useEffect(() => {
        if (search.length > 2) {
            setSuggestions(
                ["Paris, France", "New York City, USA", "Tokyo, Japan", "Bali, Indonesia", "London, UK", "Rome, Italy"]
                    .filter((place) => place.toLowerCase().includes(search.toLowerCase()))
            );
        } else {
            setSuggestions([]);
        }
    }, [search]);

    useEffect(() => {
        const interval = setInterval(() => {
            setBackgroundIndex((prev) => (prev + 1) % backgroundImages.length);
        }, 15000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative flex flex-col items-center text-center gap-6 md:gap-10 px-4 md:px-16 min-h-[90vh] overflow-hidden bg-black">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 w-full h-full">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={backgroundIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                        className="absolute inset-0 w-full h-full"
                        style={{
                            backgroundImage: `url(${backgroundImages[backgroundIndex]})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}
                    />
                </AnimatePresence>
                <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
            </div>
            
            <div className="relative z-10 flex flex-col items-center justify-center h-full max-w-6xl mx-auto pt-20 md:pt-32 pb-16">
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <Badge className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 text-sm rounded-full mb-6">
                        Explore The World With Us
                    </Badge>
                </motion.div>

                {/* Animated Heading */}
                <motion.h1 
                    initial={{ opacity: 0, y: -20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
                    className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-white mb-6"
                >
                    Discover <span className="text-emerald-400">Amazing Places</span> <br className="hidden md:block" />Around the World
                </motion.h1>

                {/* Animated Subtext */}
                <motion.p
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-lg md:text-xl text-gray-200 max-w-2xl mb-8"
                >
                    Explore travel guides, hidden gems, and must-visit places for an 
                    unforgettable adventure that will create memories to last a lifetime.
                </motion.p>

                {/* Search Bar */}
                <PlaceSearchBar onSearch={handleSearch} />

                {/* Animated Feature Tags */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ duration: 0.7, delay: 0.8 }}
                    className="flex flex-wrap justify-center gap-3 max-w-3xl"
                >
                    {[
                        { icon: <MapPin className="text-emerald-400" />, text: "Search any location", color: "from-emerald-500/20 to-emerald-500/10" },
                        { icon: <Globe className="text-blue-400" />, text: "Discover the world", color: "from-blue-500/20 to-blue-500/10" },
                        { icon: <Plane className="text-purple-400" />, text: "Find travel deals", color: "from-purple-500/20 to-purple-500/10" },
                        { icon: <Compass className="text-amber-400" />, text: "Hidden destinations", color: "from-amber-500/20 to-amber-500/10" }
                    ].map((item, index) => (
                        <motion.span 
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
                            className={cn(
                                "bg-gradient-to-r backdrop-blur-md rounded-full px-4 py-2.5 flex items-center gap-2",
                                "border border-white/20 shadow-lg text-white",
                                item.color
                            )}
                        >
                            {item.icon} {item.text}
                        </motion.span>
                    ))}
                </motion.div>
                
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.3 }}
                    className="mt-10"
                >
                    <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-full px-8 py-6 text-lg font-medium">
                        Start Exploring <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                </motion.div>
            </div>
        </section>
    );
}