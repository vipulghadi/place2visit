"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import PlaceSearchBar from "@/components/clientside/PlaceSearchBar";
import BlogOverviewCard from "@/components/clientside/BlogOverviewCard";
import { BASE_URL } from "@/lib/constant";

// Pagination Component
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
          className={`w-10 h-10 rounded-lg  cursor-pointer ${
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
        className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        <ArrowRight className="h-5 w-5" />
      </button>
    </div>
  );
};

// Main SearchResults Component
function SearchResults() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const placesPerPage = 6;

  // Fetch places with pagination
  const fetchPlaces = async (query = "", type = "", page = 1) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${BASE_URL}/api/client/search-results?query=${encodeURIComponent(
          query
        )}&type=${encodeURIComponent(type)}&page=${page}&limit=${placesPerPage}`
      );
      const data = await response.json();

      if (response.ok && data.success) {
        setPlaces(data.data || []);
        setTotalPages(data.pagination.totalPages || 1); // Assuming API returns totalPages
      } else {
        setPlaces([]);
        setError(data.message || "Failed to fetch places");
      }
    } catch (err) {
      console.error("Error fetching places:", err);
      setPlaces([]);
      setError("An error occurred while fetching places");
    } finally {
      setLoading(false);
    }
  };

  // Sync state with URL query params and fetch data
  useEffect(() => {
    const query = searchParams.get("query") || "";
    const type = searchParams.get("type") || "";
    setSearchQuery(query);
    fetchPlaces(query, type, 1);
    setCurrentPage(1);
  }, [searchParams]);

  // Handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    fetchPlaces(searchQuery, "", newPage);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="container mx-auto px-4">
        <PlaceSearchBar onSearch={(query) => fetchPlaces(query, "", 1)} initialQuery={searchQuery} />

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {searchQuery ? `Search Results for "${searchQuery}"` : "All Destinations"}
          </h1>
          <p className="text-gray-600">
            {loading ? "Loading..." : error ? error : `${places.length} results found`}
          </p>
        </div>

        {loading ? (
          <div className="text-center text-gray-500">Loading places...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {places.map((place) => (
              <BlogOverviewCard key={place.slug} place={place} />
            ))}
          </div>
        )}

        {totalPages > 1 && !loading && !error && (
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        )}
      </div>
    </div>
  );
}

export default SearchResults;
