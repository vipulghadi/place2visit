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
function NearYou() {
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
    <div className="w-full  mt-16  px-6  bg-orange-50 py-4 mb-5">
      
      <Carousel className="sm:w-[90%] w-[95%]  mx-auto">
      <h2 className="font-semibold sm:text-2xl text-2xl  text-left mb-8">
      Find the Best Spots Near You to Visit Today
      </h2>
        <CarouselContent className="-ml-2">
          {places.map((place, index) => (
            <CarouselItem
              key={index}
              className=" basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/3"
            >
              <div className="">
                <Card className="border-purple-300 hover:shadow-lg hover:shadow-purple-200 transition-shadow border-none bg-inherit">
                  <CardContent className="p-0 border-none bg-inherit">
                    <div className="relative w-full h-52 mb-4">
                      <Image
                        src={place.image}
                        alt={`${place.name} travel guide`}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg"
                      />
                    </div>
                    <h3 className="text-lg font-semibold text-black">
                      {place.name}
                    </h3>

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
  )
}

export default NearYou