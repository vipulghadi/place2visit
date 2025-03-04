// components/ImageSearch.js
"use client";

import React, { useState } from "react";
import searchImages from "@/lib/google_image_search"; // Adjust path
import { Button } from "@/components/ui/button"; // Shadcn Button
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"; // Shadcn Dialog

const ImageSearch = () => {
  const [query, setQuery] = useState("");
  const [numImages, setNumImages] = useState("");
  const [imageLinks, setImageLinks] = useState([]); // All fetched images
  const [selectedImages, setSelectedImages] = useState([]); // Selected images
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false); // Dialog state

  const handleSearch = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const num = parseInt(numImages, 10);
      if (isNaN(num) || num <= 0) {
        throw new Error("Please enter a valid number of images.");
      }

      const links = await searchImages(query, num);
      setImageLinks(links);
      setSelectedImages([]); // Reset selected images
      setDialogOpen(true); // Open dialog with results
    } catch (err) {
      setError(err.message);
      setImageLinks([]);
    } finally {
      setLoading(false);
    }
  };

  const handleImageSelect = (link) => {
    setSelectedImages((prev) =>
      prev.includes(link) ? prev.filter((img) => img !== link) : [...prev, link]
    );
  };

  const handleConfirm = () => {
    console.log("Selected Images Array:", selectedImages); // Log or use the array as needed
    setDialogOpen(false); // Close dialog
    // Here you can return or use selectedImages as needed (e.g., pass to parent via prop)
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Image Search</h1>
      <form onSubmit={handleSearch} className="space-y-4">
        <div>
          <label htmlFor="query" className="block text-sm font-medium text-gray-700">
            Search Query
          </label>
          <input
            id="query"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g., Malvan fort"
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
        </div>
        <div>
          <label htmlFor="numImages" className="block text-sm font-medium text-gray-700">
            Number of Images
          </label>
          <input
            id="numImages"
            type="number"
            value={numImages}
            onChange={(e) => setNumImages(e.target.value)}
            placeholder="e.g., 5"
            min="1"
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-400"
          disabled={loading || !query || !numImages}
        >
          {loading ? "Generating..." : "Generate Images"}
        </Button>
      </form>

      {error && <p className="mt-4 text-red-600">{error}</p>}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Image Results for "{query}"</DialogTitle>
          </DialogHeader>
          <div className="mt-4 max-h-96 overflow-y-auto">
            {imageLinks.length > 0 ? (
              <ul className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {imageLinks.map((link, index) => (
                  <li key={index} className="flex flex-col items-center">
                    <img
                      src={link}
                      alt={`Result ${index + 1}`}
                      className={`w-32 h-32 object-cover rounded cursor-pointer transition-all ${
                        selectedImages.includes(link) ? "border-4 border-blue-500" : "border border-gray-300"
                      }`}
                      onClick={() => handleImageSelect(link)}
                    />
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 text-blue-600 hover:underline text-sm"
                    >
                      Image {index + 1}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No images available.</p>
            )}
          </div>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirm} disabled={selectedImages.length === 0}>
              Confirm Selection ({selectedImages.length})
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {selectedImages.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Selected Images</h2>
          <ul className="space-y-2">
            {selectedImages.map((link, index) => (
              <li key={index} className="text-blue-600">{link}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ImageSearch;