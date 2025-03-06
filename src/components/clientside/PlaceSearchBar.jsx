"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin } from "lucide-react";
import { BASE_URL } from "@/lib/constant";

const PlaceSearchBar = ({ onSearch, initialQuery = "" }) => {
  const [search, setSearch] = useState(initialQuery);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Sync search state with initialQuery when it changes
  useEffect(() => {
    setSearch(initialQuery);
  }, [initialQuery]);

  // Function to fetch suggestions from API
  const fetchSuggestions = async (query) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `${BASE_URL}/api/client/search-suggestions?query=${query}`
      );
      const data = await response.json();

      if (data.success) {
        setSuggestions(data.data || []);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
    }
    setLoading(false);
  };

  // Debounced suggestion fetching
  const debounceFetchSuggestions = (value) => {
    clearTimeout(debounceFetchSuggestions.timeoutId); // Clear previous timeout
    debounceFetchSuggestions.timeoutId = setTimeout(() => {
      fetchSuggestions(value);
    }, 300);
  };

  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    debounceFetchSuggestions(value); // Fetch suggestions with debounce
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    const query = suggestion.name;
    setSearch(query);
    setSuggestions([]); // Clear suggestions
    onSearch(query); // Notify parent component
    router.push(
      `/search-results?query=${encodeURIComponent(query)}&type=${encodeURIComponent(
        suggestion.type
      )}`
    );
  };

  // Handle Enter key press or manual search
  const handleSearch = () => {
    if (search.trim() === "") return;

    const encodedQuery = encodeURIComponent(search);
    onSearch(search); // Notify parent component
    setSuggestions([]); // Clear suggestions
    router.push(`/search-results?query=${encodedQuery}&type=place`);
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
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
          value={search.toUpperCase()}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          className="w-full px-6 py-4 pr-14 text-gray-900 bg-white/95 backdrop-blur-sm outline-none rounded-full shadow-lg border-2 border-emerald-500/30 focus:border-emerald-500 placeholder-gray-500 text-sm sm:text-base transition-all duration-300"
        />
        <button
          onClick={handleSearch}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-emerald-500 text-white p-2 rounded-full hover:bg-emerald-600 transition-colors duration-200"
        >
          <Search className="h-5 w-5" />
        </button>
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
                {suggestion.name.toUpperCase()}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      {loading && (
        <div className="absolute top-full mt-2 w-full text-center text-gray-500">
          Loading...
        </div>
      )}
    </motion.div>
  );
};

export default PlaceSearchBar;