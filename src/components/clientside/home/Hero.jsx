"use client";

import { Search } from 'lucide-react';
import { useState, useEffect } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

export default function Hero() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [nextImageIndex, setNextImageIndex] = useState(1);
  const [openSuggestions, setOpenSuggestions] = useState(false);

  // Array of background image URLs
  const backgroundImages = [
    "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3",
    "https://plus.unsplash.com/premium_photo-1661919589683-f11880119fb7?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1595928607828-6fdaee9c0942?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1498307833015-e7b400441eb8?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1618805714320-f8825019c1be?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3",
  ];

  const destinations = [
    { id: 1, name: "Banaras, India" },
    { id: 2, name: "Kyoto, Japan" },
    { id: 3, name: "Santorini, Greece" },
    { id: 4, name: "Machu Picchu, Peru" },
    { id: 5, name: "Paris, France" },
    { id: 6, name: "New York, USA" },
    { id: 7, name: "Sydney, Australia" },
  ];

  // Enhanced image transition effect
  useEffect(() => {
    const interval = setInterval(() => {
      setNextImageIndex((currentImageIndex + 1) % backgroundImages.length);
      setTimeout(() => {
        setCurrentImageIndex(nextImageIndex);
      }, 1000); // Delay to sync with animation
    }, 10000);

    return () => clearInterval(interval);
  }, [currentImageIndex, nextImageIndex]);

  const handleSearch = (e) => {
    e.preventDefault();
    alert(`Searching for: ${searchTerm}`);
    setOpenSuggestions(false);
  };

  const filteredDestinations = destinations.filter((destination) =>
    destination.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <header className="relative h-[600px] flex items-center justify-center text-white overflow-hidden">
      {/* Background Images with Slide Effect */}
      <div className="absolute inset-0 z-10">
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out
              ${index === currentImageIndex ? 'opacity-100 translate-x-0' : 
                index === nextImageIndex ? 'opacity-0 translate-x-full' : 'opacity-0 -translate-x-full'}`}
          >
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/60 z-20" />
            
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat w-full h-full transform scale-105"
              style={{
                backgroundImage: `url('${image}')`,
                animation: index === currentImageIndex ? 'scale 10s infinite alternate' : 'none'
              }}
            />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
          Your Ultimate Travel Guides
        </h1>
        <p className="text-xl mb-8 animate-slide-up delay-200">
          Discover Articles on Amazing Places Around the Globe
        </p>
        <form onSubmit={handleSearch} className="animate-slide-up delay-300">
          <div className="flex max-w-xl mx-auto relative">
            <Command className="w-full rounded-l-full overflow-visible">
              <CommandInput
                placeholder="Search destinations..."
                value={searchTerm}
                onValueChange={(value) => {
                  setSearchTerm(value);
                  setOpenSuggestions(value.length > 0);
                }}
                className="flex-1 px-6 py-3 rounded-l-full font-medium text-foreground"
                onFocus={() => setOpenSuggestions(searchTerm.length > 0)}
                onBlur={() => setTimeout(() => setOpenSuggestions(false), 200)}
              />
              {openSuggestions && (
                <CommandList className="absolute top-full mt-3 left-0 w-full bg-background text-foreground rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  <CommandEmpty>No destinations found.</CommandEmpty>
                  <CommandGroup>
                    {filteredDestinations.map((destination) => (
                      <CommandItem
                        key={destination.id}
                        value={destination.name}
                        onSelect={(selectedValue) => {
                          setSearchTerm(selectedValue);
                          setOpenSuggestions(false);
                          alert(`Selected: ${selectedValue}`);
                        }}
                        className="px-4 py-2 hover:bg-accent cursor-pointer"
                      >
                        {destination.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              )}
            </Command>
            <button
              type="submit"
              className="bg-primary hover:bg-primary/90 px-6 py-3 rounded-r-full transition-colors"
            >
              <Search className="h-6 w-6" />
            </button>
          </div>
        </form>
      </div>
    </header>
  );
}
