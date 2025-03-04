"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Navigation, Heart, Locate } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

function NearYou() {
  const [places, setPlaces] = useState([]);
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState(null);

  useEffect(() => {
    // Simulate fetching top places (replace with real API call)
    const fetchPlaces = async () => {
      const dummyData = [
        {
          name: "Pune, India",
          image: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          slug: "top-10-unmissable-places-in-pune",
          description: "Discover historical forts and vibrant culture.",
          distance: "2.5 km",
          rating: 4.7,
        },
        {
          name: "Paris, France",
          image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1473&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          slug: "best-attractions-in-paris",
          description: "Romantic streets and iconic landmarks.",
          distance: "8,500 km",
          rating: 4.9,
        },
        {
          name: "Tokyo, Japan",
          image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          slug: "ultimate-tokyo-travel-guide",
          description: "A blend of tradition and futuristic vibes.",
          distance: "7,800 km",
          rating: 4.8,
        },
        {
          name: "New York, USA",
          image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          slug: "top-new-york-attractions",
          description: "The city that never sleeps has it all.",
          distance: "12,000 km",
          rating: 4.6,
        },
        {
          name: "Bali, Indonesia",
          image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1438&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          slug: "ultimate-bali-travel-guide",
          description: "Paradise beaches and spiritual retreats.",
          distance: "6,200 km",
          rating: 4.9,
        },
      ];
      setPlaces(dummyData);
    };
    fetchPlaces();
  }, []);

  // Function to get user's location
  const getUserLocation = () => {
    if (navigator.geolocation) {
      setLocationLoading(true);
      setLocationError(null);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log(`User Location - Latitude: ${latitude}, Longitude: ${longitude}`);
          setLocationLoading(false);
          // Optionally, update places with real distances here if you have lat/lng data
        },
        (error) => {
          setLocationError("Unable to retrieve location. Please allow location access.");
          setLocationLoading(false);
          console.error("Geolocation error:", error);
        }
      );
    } else {
      setLocationError("Geolocation is not supported by your browser.");
    }
  };

  // Animation variants for the button
  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95 },
    loading: {
      rotate: [0, 360],
      transition: { duration: 1, repeat: Infinity, ease: "linear" },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="w-full py-16 px-4 md:px-8 bg-gradient-to-b from-emerald-50 to-white"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <Badge className="bg-emerald-100 text-emerald-800 mb-3">NEARBY DESTINATIONS</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Explore Places Near You
            </h2>
            <p className="text-gray-600 max-w-2xl">
              Discover amazing destinations within your reach and plan your next adventure today.
            </p>
          </div>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              animate={locationLoading ? "loading" : ""}
            >
              <Button
                onClick={getUserLocation}
                className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-4 py-2 flex items-center"
                disabled={locationLoading}
              >
                <Locate className="h-4 w-4 mr-2" />
                {locationLoading ? "Locating..." : "Find My Location"}
              </Button>
            </motion.div>
            <Link href="/all-near-by-destinations" className="text-emerald-600 font-medium hover:text-emerald-700 transition-colors">
              View all destinations →
            </Link>
          </div>
        </div>

        {locationError && (
          <p className="text-red-600 text-sm mb-4">{locationError}</p>
        )}

        <Carousel className="w-full">
          <CarouselContent className="-ml-4">
            {places.map((place, index) => (
              <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link href={`/guides/${place.slug}`}>
                    <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 group">
                      <CardContent className="p-0">
                        <div className="relative h-64 w-full overflow-hidden">
                          <Image
                            src={place.image}
                            alt={`${place.name} travel guide`}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                          <div className="absolute top-4 right-4 flex space-x-2">
                            <span className="bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-medium px-2.5 py-1 rounded-full flex items-center">
                              <Navigation className="h-3 w-3 mr-1 text-emerald-600" />
                              {place.distance}
                            </span>
                            <span className="bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-medium px-2.5 py-1 rounded-full flex items-center">
                              ★ {place.rating}
                            </span>
                          </div>
                          <div className="absolute bottom-0 left-0 p-5 w-full">
                            <div className="flex items-center mb-2">
                              <MapPin size={16} className="text-emerald-400 mr-1.5" />
                              <h3 className="text-xl font-bold text-white">{place.name}</h3>
                            </div>
                            <p className="text-sm text-gray-200 mb-3 line-clamp-2">{place.description}</p>
                            <div className="flex justify-between items-center">
                              <span className="text-xs text-white/80 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
                                Popular destination
                              </span>
                              <button className="text-white hover:text-pink-400 transition-colors">
                                <Heart size={18} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-end gap-2 mt-6">
            <CarouselPrevious className="static bg-white text-emerald-700 border border-emerald-200 hover:bg-emerald-50 transform-none translate-y-0 mr-2" />
            <CarouselNext className="static bg-white text-emerald-700 border border-emerald-200 hover:bg-emerald-50 transform-none translate-y-0" />
          </div>
        </Carousel>
      </div>
    </motion.div>
  );
}

export default NearYou;