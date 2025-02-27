"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { Star, Quote } from "lucide-react";

export default function Testimonials() {
  const [testimonials] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      location: "New York, USA",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3",
      rating: 5,
      text: "Travel Explorer helped me discover hidden gems in Tokyo that I would have never found on my own. The detailed guides and local insights made my trip unforgettable!",
      trip: "Tokyo, Japan"
    },
    {
      id: 2,
      name: "Michael Chen",
      location: "Toronto, Canada",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3",
      rating: 5,
      text: "I was skeptical about visiting Bali during the rainy season, but the seasonal tips on Travel Explorer were spot on! Saved me from making costly mistakes and had the best vacation ever.",
      trip: "Bali, Indonesia"
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      location: "Barcelona, Spain",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3",
      rating: 4,
      text: "As a solo female traveler, safety is my priority. The safety tips and neighborhood guides for Paris were incredibly detailed and accurate. Will definitely use this site for all my future trips!",
      trip: "Paris, France"
    },
    {
      id: 4,
      name: "David Okafor",
      location: "London, UK",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3",
      rating: 5,
      text: "The local food recommendations in Pune were absolutely fantastic! I tried dishes I would have never known about and each one was better than the last. This website is a foodie's dream!",
      trip: "Pune, India"
    },
    {
      id: 5,
      name: "Aisha Patel",
      location: "Sydney, Australia",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3",
      rating: 5,
      text: "Planning a family trip to New York seemed overwhelming until I found Travel Explorer. The kid-friendly itineraries and attraction tips made our vacation stress-free and enjoyable for everyone.",
      trip: "New York, USA"
    }
  ]);

  const renderStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          size={16}
          className={`${
            i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
          }`}
        />
      ));
  };

  return (
    <div className="w-full py-16 px-6 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Travelers Say</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover how Travel Explorer has helped thousands of travelers create unforgettable experiences around the world.
          </p>
        </div>

        <Carousel className="w-full">
          <CarouselContent className="-ml-4">
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 h-full bg-white overflow-hidden">
                  <CardContent className="p-0 h-full">
                    <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 p-6 pt-8">
                      <Quote className="absolute top-4 right-4 text-white/20" size={40} />
                      <div className="flex items-center gap-4">
                        <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white">
                          <Image
                            src={testimonial.image}
                            alt={testimonial.name}
                            fill
                            sizes="64px"
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold text-white text-lg">{testimonial.name}</h3>
                          <p className="text-blue-100 text-sm">{testimonial.location}</p>
                          <div className="flex mt-1">
                            {renderStars(testimonial.rating)}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6 flex flex-col h-[calc(100%-136px)]">
                      <p className="text-gray-700 italic mb-4 flex-grow">
                        "{testimonial.text}"
                      </p>
                      <div className="mt-auto">
                        <div className="text-sm font-medium text-gray-500">
                          Trip to <span className="text-indigo-600">{testimonial.trip}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center mt-8 gap-2">
            <CarouselPrevious className="static bg-white text-indigo-800 hover:bg-indigo-50 border border-indigo-200 transform-none mx-1" />
            <CarouselNext className="static bg-white text-indigo-800 hover:bg-indigo-50 border border-indigo-200 transform-none mx-1" />
          </div>
        </Carousel>
      </div>
    </div>
  );
}