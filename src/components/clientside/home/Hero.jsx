"use client";

import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"; // Adjust path based on your setup

export default function Hero() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [openSuggestions, setOpenSuggestions] = useState(false);

  // Array of 5 background image URLs
  const backgroundImages = [
    "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3", // Mountain
    "https://plus.unsplash.com/premium_photo-1661919589683-f11880119fb7?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Beach
    "https://images.unsplash.com/photo-1595928607828-6fdaee9c0942?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // City
    "https://images.unsplash.com/photo-1498307833015-e7b400441eb8?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3", // Forest
    "https://images.unsplash.com/photo-1618805714320-f8825019c1be?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Desert
  ];

  // Sample list of destinations for suggestions
  const destinations = [
    { id: 1, name: "Banaras, India" },
    { id: 2, name: "Kyoto, Japan" },
    { id: 3, name: "Santorini, Greece" },
    { id: 4, name: "Machu Picchu, Peru" },
    { id: 5, name: "Paris, France" },
    { id: 6, name: "New York, USA" },
    { id: 7, name: "Sydney, Australia" },
  ];

  // Change image every 10 seconds with smooth crossfade
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 10000); // Change every 10 seconds

    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  const handleSearch = (e) => {
    e.preventDefault();
    alert(`Searching for: ${searchTerm}`);
    setOpenSuggestions(false); // Close suggestions on submit
  };

  // Filter destinations based on search term
  const filteredDestinations = destinations.filter((destination) =>
    destination.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <header className="relative h-[600px] flex items-center justify-center text-white overflow-hidden">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-10">
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            className="absolute inset-0 bg-black/70 transition-opacity duration-2000 ease-in-out overflow-hidden w-full"
            style={{
              backgroundImage: `url('${image}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundBlendMode: "darken",
              opacity: index === currentImageIndex ? 1 : 0,
              zIndex: index === currentImageIndex ? 10 : 0,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 fade-in">
        Your Ultimate Travel Guides
        </h1>
        <p className="text-xl mb-8 slide-up">
        Discover Articles on Amazing Places Around the Globe
        </p>
        <form onSubmit={handleSearch} className="slide-up">
          <div className="flex max-w-xl mx-auto relative">
            <Command className="w-full  p-2 rounded-l-full">
              <CommandInput
                placeholder="Search destinations..."
                value={searchTerm}
                onValueChange={(value) => {
                  setSearchTerm(value);
                  setOpenSuggestions(value.length > 0); // Show suggestions when typing
                }}
                className="flex-1 px-6 py-3 rounded-l-full font-semibold text-black "
                onFocus={() => setOpenSuggestions(searchTerm.length > 0)}
                onBlur={() => setTimeout(() => setOpenSuggestions(false), 200)} // Delay to allow clicking suggestions
              />
              {openSuggestions && (
                <CommandList className="absolute top-full mt-3 left-0 w-full bg-white text-gray-900 rounded-2xl shadow-lg max-h-60 overflow-y-auto">
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
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
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
              className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-r-full transition-colors"
            >
              <Search className="h-6 w-6" />
            </button>
          </div>
        </form>
      </div>
    </header>
  );
}