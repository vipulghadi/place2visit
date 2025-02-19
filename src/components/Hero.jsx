"use client";

import { Search } from "lucide-react";
import { useState } from "react";

export default function Hero() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    // In a real application, this would trigger a search
    alert(`Searching for: ${searchTerm}`);
  };

  return (
    <header className="relative h-[600px] flex items-center justify-center text-white">
      <div
        className="absolute inset-0 bg-black/50 z-10"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=2000&q=80')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundBlendMode: "darken",
        }}
      />
      
      <div className="relative z-20 text-center px-4 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 fade-in">
          Discover Your Next Adventure
        </h1>
        <p className="text-xl mb-8 slide-up">
          Explore the world's most beautiful destinations
        </p>
        <form onSubmit={handleSearch} className="slide-up">
          <div className="flex max-w-xl mx-auto">
            <input
              type="text"
              placeholder="Search destinations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-6 py-3 rounded-l-full text-gray-900"
            />
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