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
import { MapPin } from "lucide-react";

function NearYou() {
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
    <div className="w-full mt-16 px-6 bg-orange-50 py-4 mb-5">
      <Carousel className="sm:w-[90%] w-[95%] mx-auto">
        <h2 className="font-semibold sm:text-2xl text-2xl text-left mb-8">
          Find the Best Spots Near You to Visit Today
        </h2>
        <CarouselContent className="-ml-2">
          {places.map((place, index) => (
            <CarouselItem
              key={index}
              className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/3"
            >
              <Link href={`/guides/${place.slug}`}>
                <Card className="border-none hover:shadow-lg transition-shadow duration-300 overflow-hidden bg-inherit">
                  <CardContent className="p-0 relative h-64 group">
                    <div className="absolute inset-0 w-full h-full">
                      <Image
                        src={place.image}
                        alt={`${place.name} travel guide`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover rounded-lg group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent rounded-lg"></div>
                    </div>
                    
                    <div className="absolute bottom-0 left-0 p-4 w-full text-white">
                      <div className="flex items-center mb-1">
                        <MapPin size={16} className="mr-1" />
                        <h3 className="text-lg font-semibold">{place.name}</h3>
                      </div>
                      <p className="text-sm text-gray-200 line-clamp-2">{place.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="bg-white/80 text-black hover:bg-white" />
        <CarouselNext className="bg-white/80 text-black hover:bg-white" />
      </Carousel>
    </div>
  );
}

export default NearYou;