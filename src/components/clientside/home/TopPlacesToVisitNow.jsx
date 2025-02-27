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

export default function TopPlacesToVisitNow() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    // Simulate fetching top places (replace with real API call)
    const fetchPlaces = async () => {
      const dummyData = [
        {
          name: "Pune, India",
          image: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Replace with real image
          slug: "top-10-unmissable-places-in-pune",
          description: "Discover historical forts and vibrant culture.",
        },
        {
          name: "Paris, France",
          image: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          slug: "best-attractions-in-paris",
          description: "Romantic streets and iconic landmar.",
        },
        {
          name: "Tokyo, Japan",
          image: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          slug: "ultimate-tokyo-travel-guide",
          description: "A blend of tradition and futuristic vibes.",
        },
        {
          name: "New York, USA",
          image: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          slug: "top-new-york-attractions",
          description: "The city that never sleeps has it all.",
        },
        {
            name: "Tokyo, Japan",
            image: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            slug: "ultimate-tokyo-travel-guide",
            description: "A blend of tradition and futuristic vibes.",
          },
      ];
      setPlaces(dummyData);
    };
    fetchPlaces();
  }, []);

  return (
    <div className="w-full  mt-16 mb-5 px-6 ">
      
      <Carousel className="sm:w-[90%] w-[95%]  mx-auto">
      <h2 className="font-semibold sm:text-2xl text-2xl  text-left mb-8">
        Top places to visit right now
      </h2>
        <CarouselContent className="-ml-2">
          {places.map((place, index) => (
            <CarouselItem
              key={index}
              className=" basis-1/2 sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
            >
              <div className="">
                <Card className="border-purple-300 hover:shadow-lg hover:shadow-purple-200 transition-shadow border-none">
                  <CardContent className="p-0 border-none">
                    <div className="relative w-full h-48 mb-4">
                      <Image
                        src={place.image}
                        alt={`${place.name} travel guide`}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg"
                      />
                    </div>
                    <h3 className="text-lg font-semibold text-purple-700">
                      {place.name}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">{place.description}</p>
                    <Link
                      href={`/blogs/${place.slug}`}
                      className="mt-3 inline-block text-purple-600 hover:text-purple-800 font-medium"
                    >
                      Explore Now
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="bg-gray-200 text-black hover:bg-gray-300" />
        <CarouselNext className="bg-gray-200 text-black hover:bg-gray-300"/>
      </Carousel>
    </div>
  );
}