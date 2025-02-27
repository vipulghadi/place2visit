"use client"; // Required for client-side interactivity with Carousel
import React, { useState, useEffect } from "react";
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
import { ArrowRight, BookOpen } from "lucide-react";

export default function TopPlacesToVisitNow() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    // Simulate fetching top places (replace with real API call)
    const fetchPlaces = async () => {
      const dummyData = [
        {
          name: "Pune, India",
          image: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          slug: "top-10-unmissable-places-in-pune",
          description: "Discover historical forts and vibrant .",
        },
        {
          name: "Paris, France",
          image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1473&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          slug: "best-attractions-in-paris",
          description: "Romantic streets and iconic landmarks.",
        },
        {
          name: "Tokyo, Japan",
          image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          slug: "ultimate-tokyo-travel-guide",
          description: "A blend of tradition and futuristic vibes.",
        },
        {
          name: "New York, USA",
          image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          slug: "top-new-york-attractions",
          description: "The city that never sleeps has it all.",
        },
        {
          name: "Bali, Indonesia",
          image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1438&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          slug: "ultimate-bali-travel-guide",
          description: "Paradise beaches and spiritual retreats.",
        },
      ];
      setPlaces(dummyData);
    };
    fetchPlaces();
  }, []);

  return (
    <div className="w-full  mb-5 px-6 bg-gradient-to-r from-indigo-50 to-purple-50 py-8">
      <Carousel className="sm:w-[90%] w-[95%] mx-auto">
        <h2 className="font-semibold sm:text-2xl text-2xl text-left mb-8 ">
          Top Travel Articles to Read Right Now
        </h2>
        <CarouselContent className="-ml-2">
          {places.map((place, index) => (
            <CarouselItem
              key={index}
              className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 pl-2"
            >
              <Card className="border-none overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-0">
                  <div className="relative w-full h-48 overflow-hidden">
                    <Image
                      src={place.image}
                      alt={`${place.name} travel guide`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-cover rounded-t-lg group-hover:scale-110 transition-transform duration-700 ease-in-out"
                    />
                  </div>
                  <div className="p-4 bg-white">
                    <div className="flex items-center mb-2">
                      <BookOpen size={16} className="text-indigo-500 mr-2" />
                      <span className="text-xs font-medium text-indigo-500">TRAVEL GUIDE</span>
                    </div>
                    <h3 className="text-lg font-semibold text-black group-hover:text-indigo-600 transition-colors duration-300">
                      {place.name}
                    </h3>
                    <p className="text-sm text-gray-600 mt-2 line-clamp-2 group-hover:text-gray-800 transition-colors duration-300">
                      {place.description}
                    </p>
                    <Link
                      href={`/blogs/${place.slug}`}
                      className="mt-4 inline-flex items-center text-black  font-medium text-sm group-hover:translate-x-1 transition-transform duration-300 bg-green-600 px-3 py-2 rounded-md text-white"
                    >
                      Read Article
                      <ArrowRight size={16} className="ml-1" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="bg-white text-indigo-800 hover:bg-indigo-100 border-none shadow-md" />
        <CarouselNext className="bg-white text-indigo-800 hover:bg-indigo-100 border-none shadow-md" />
      </Carousel>
    </div>
  );
}