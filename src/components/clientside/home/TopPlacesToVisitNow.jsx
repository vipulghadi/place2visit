"use client";

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
import { ArrowRight, BookOpen } from 'lucide-react';

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
          description: "Discover historical forts and vibrant culture.",
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
    <div className="w-full mb-5 px-6 bg-muted py-8">
      <Carousel className="w-[95%] sm:w-[90%] mx-auto">
        <h2 className="font-semibold text-2xl sm:text-2xl text-left mb-8">
          Top Travel Articles to Read Right Now
        </h2>
        <CarouselContent className="-ml-2">
          {places.map((place, index) => (
            <CarouselItem
              key={index}
              className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 pl-2"
            >
              <Card className="overflow-hidden hover:shadow-md transition-all duration-300 group">
                <CardContent className="p-0">
                  <div className="relative w-full h-48 overflow-hidden">
                    <Image
                      src={place.image || "/placeholder.svg"}
                      alt={`${place.name} travel guide`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-500 ease-in-out"
                    />
                  </div>
                  <div className="p-4 bg-card">
                    <div className="flex items-center mb-2">
                      <BookOpen size={16} className="text-primary mr-2" />
                      <span className="text-xs font-medium text-primary">TRAVEL GUIDE</span>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                      {place.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                      {place.description}
                    </p>
                    <Link
                      href={`/blogs/${place.slug}`}
                      className="mt-4 inline-flex items-center text-sm font-medium bg-primary text-primary-foreground px-3 py-2 rounded-md hover:bg-primary/90 transition-colors duration-200"
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
        <CarouselPrevious className="bg-background text-foreground hover:bg-muted border-border shadow-sm" />
        <CarouselNext className="bg-background text-foreground hover:bg-muted border-border shadow-sm" />
      </Carousel>
    </div>
  );
}
