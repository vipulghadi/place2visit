"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin } from "lucide-react";

const PlaceSearchBar = ({ onSearch }) => {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // Dummy suggestions data (replace with real API call if needed)
  const possibleSuggestions = [
    "Pune, India",
    "Paris, France",
    "Tokyo, Japan",
    "New York, USA",
    "Bali, Indonesia",
    "London, UK",
    "Sydney, Australia",
  ];

  // Handle input change and generate suggestions
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    // Filter suggestions based on input
    if (value.trim() === "") {
      setSuggestions([]);
    } else {
      const filteredSuggestions = possibleSuggestions.filter((item) =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
      console.log("Suggestions for input:", value, "are:", filteredSuggestions);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setSearch(suggestion);
    setSuggestions([]);
    console.log("Selected suggestion:", suggestion);
    if (onSearch) onSearch(suggestion); // Call optional parent callback
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && search.trim() !== "") {
      setSuggestions([]);
      console.log("Search submitted:", search);
      if (onSearch) onSearch(search);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="relative w-full max-w-2xl flex justify-center items-center mb-8 mx-auto"
    >
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Where would you like to go?"
          value={search}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          className="w-full px-6 py-4 pr-14 text-gray-900 bg-white/95 backdrop-blur-sm outline-none rounded-full shadow-lg border-2 border-emerald-500/30 focus:border-emerald-500 placeholder-gray-500 text-sm sm:text-base transition-all duration-300"
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 bg-emerald-500 text-white p-2 rounded-full hover:bg-emerald-600 transition-colors duration-200">
          <Search className="h-5 w-5" />
        </div>
      </div>

      <AnimatePresence>
        {suggestions.length > 0 && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full mt-2 w-full bg-white text-gray-900 shadow-xl rounded-xl overflow-hidden z-50 max-h-64 overflow-y-auto border border-gray-100"
          >
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="px-6 py-3 hover:bg-emerald-50 cursor-pointer flex items-center border-b border-gray-100 last:border-none transition-colors duration-200 text-sm sm:text-base"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <MapPin className="text-emerald-500 mr-3 h-4 w-4" />
                {suggestion}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default PlaceSearchBar;