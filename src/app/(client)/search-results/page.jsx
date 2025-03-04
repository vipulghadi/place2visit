"use client"
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Clock, ArrowLeft, ArrowRight } from 'lucide-react';
import PlaceSearchBar from '@/components/clientside/PlaceSeachBar';
import BlogOverviewCard from '@/components/clientside/BlogOverviewCard';

// Dummy data for places
const dummyPlaces = [
  {
    id: 1,
    name: "Beautiful Paris Adventure",
    slug: "paris-adventure",
    category: "City",
    readTime: "5 min read",
    description: "Discover the magic of Paris through its iconic landmarks, hidden cafes, and charming neighborhoods.",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=1000",
    date: "Feb 15, 2024"
  },
  {
    id: 2,
    name: "Tokyo Night Life",
    slug: "tokyo-night-life",
    category: "Urban",
    readTime: "7 min read",
    description: "Experience the vibrant nightlife of Tokyo, from neon-lit streets to traditional izakayas.",
    image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&q=80&w=1000",
    date: "Feb 14, 2024"
  },
  {
    id: 3,
    name: "New York City Guide",
    slug: "nyc-guide",
    category: "City",
    readTime: "6 min read",
    description: "Your ultimate guide to exploring the Big Apple, from Manhattan to Brooklyn.",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=1000",
    date: "Feb 13, 2024"
  },
  // Add more dummy data as needed
];



const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ArrowLeft className="h-5 w-5" />
      </button>
      
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-10 h-10 rounded-lg ${
            currentPage === page
              ? "bg-blue-500 text-white"
              : "hover:bg-gray-100"
          }`}
        >
          {page}
        </button>
      ))}
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ArrowRight className="h-5 w-5" />
      </button>
    </div>
  );
};

function SearchResults() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredPlaces, setFilteredPlaces] = useState(dummyPlaces);
  const placesPerPage = 6;

  useEffect(() => {
    // Get search parameters from URL
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('query') || "";
    const type = urlParams.get('type') || "";
    
    setSearchQuery(query);
    
    // Filter places based on search query and type
    const filtered = dummyPlaces.filter(place => {
      const matchesQuery = place.name.toLowerCase().includes(query.toLowerCase()) ||
                          place.description.toLowerCase().includes(query.toLowerCase());
      const matchesType = !type || place.category.toLowerCase() === type.toLowerCase();
      return matchesQuery && matchesType;
    });
    
    setFilteredPlaces(filtered);
    setCurrentPage(1);
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = dummyPlaces.filter(place =>
      place.name.toLowerCase().includes(query.toLowerCase()) ||
      place.description.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPlaces(filtered);
    setCurrentPage(1);
    
    // Update URL with search query
    const newUrl = new URL(window.location);
    newUrl.searchParams.set('query', query);
    window.history.pushState({}, '', newUrl);
  };

  // Calculate pagination
  const totalPages = Math.ceil(filteredPlaces.length / placesPerPage);
  const startIndex = (currentPage - 1) * placesPerPage;
  const endIndex = startIndex + placesPerPage;
  const currentPlaces = filteredPlaces.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="container mx-auto px-4">
        <PlaceSearchBar onSearch={handleSearch} initialQuery={searchQuery} />
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {searchQuery ? `Search Results for "${searchQuery}"` : "All Destinations"}
          </h1>
          <p className="text-gray-600">
            {filteredPlaces.length} {filteredPlaces.length === 1 ? 'result' : 'results'} found
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentPlaces.map((place) => (
            <BlogOverviewCard key={place.id} place={place} />
          ))}
        </div>

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
}

export default SearchResults;