"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { Trash, Plus, Eye, PenSquare, ImagePlus } from "lucide-react";
import BlogPreviewModal from "@/components/serverside/BlogPreviewModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import searchImages from "@/lib/google_image_search"; // Adjust path

export default function BlogEditor() {
  const [query, setQuery] = useState({
    title: "",
    place: "",
    state: "",
    country: "",
    latitude: "",
    longitude: "",
  });

  const [articleData, setArticleData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [isArticleGenerated, setIsArticleGenerated] = useState(false);
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const [imageLinks, setImageLinks] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(null);
  const [currentSubsectionIndex, setCurrentSubsectionIndex] = useState(null);
  const [error, setError] = useState(null);

  const fetchPlace = async (place) => {
    if (!place) return;
    try {
      const response = await fetch(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${place}&apiKey=6f87d12f830d49b4becaa344a30bc61b&type=city&limit=5`
      );
      const data = await response.json();
      setSuggestions(data.features || []);
    } catch (error) {
      console.log("Error fetching place suggestions:", error);
    }
  };

  const handleSelectPlace = (selectedPlace) => {
    setQuery({
      title: "",
      place: selectedPlace.properties.city || "",
      state: selectedPlace.properties.state || "",
      country: selectedPlace.properties.country || "",
      latitude: selectedPlace.properties.lat || "",
      longitude: selectedPlace.properties.lon || "",
    });
    setSuggestions([]);
  };

  const SaveBlog = async () => {
    if (!query.place || !query.state || !query.country || !articleData) {
      toast.error("Invalid operation: Missing required fields or article data");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("/api/admin/blog/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(articleData),
      });
      if (response.ok) {
        toast.success("Blog created successfully");
      } else {
        toast.error("Error creating blog");
      }
    } catch (error) {
      toast.error("Error in saving blog");
    } finally {
      setLoading(false);
    }
  };

  const fetchBlogContent = async () => {
    if (!query.place) {
      toast.error("Please enter place name");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/admin/generate-blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(query),
      });

      if (!response.ok) {
        toast.error("Error generating article");
        return;
      }

      const data = await response.json();
      setArticleData(data.data);
      console.log("Generated article:", data.data);
      toast.success("Article generated successfully!");
      setIsArticleGenerated(true);
    } catch (error) {
      toast.error("Error in generating article");
    } finally {
      setLoading(false);
    }
  };

  const handleSectionChange = (index, field, value) => {
    const updatedSections = [...articleData.article.sections];
    updatedSections[index][field] = value;
    setArticleData({
      ...articleData,
      article: { ...articleData.article, sections: updatedSections },
    });
  };

  const handleSubsectionChange = (sectionIndex, subIndex, field, value) => {
    const updatedSections = [...articleData.article.sections];
    updatedSections[sectionIndex].subsections[subIndex][field] = value;
    setArticleData({
      ...articleData,
      article: { ...articleData.article, sections: updatedSections },
    });
  };

  const addSection = () => {
    const newSection = {
      heading: "New Section",
      text: "",
      images: [],
      subsections: [],
    };
    setArticleData({
      ...articleData,
      article: {
        ...articleData.article,
        sections: [...articleData.article.sections, newSection],
      },
    });
  };

  const removeSection = (index) => {
    const updatedSections = articleData.article.sections.filter(
      (_, i) => i !== index
    );
    setArticleData({
      ...articleData,
      article: { ...articleData.article, sections: updatedSections },
    });
  };

  const addSubsection = (sectionIndex) => {
    const newSubsection = { title: "New Subsection", text: "", images: [] };
    const updatedSections = [...articleData.article.sections];
    updatedSections[sectionIndex].subsections.push(newSubsection);
    setArticleData({
      ...articleData,
      article: { ...articleData.article, sections: updatedSections },
    });
  };

  const removeSubsection = (sectionIndex, subIndex) => {
    const updatedSections = [...articleData.article.sections];
    updatedSections[sectionIndex].subsections = updatedSections[
      sectionIndex
    ].subsections.filter((_, i) => i !== subIndex);
    setArticleData({
      ...articleData,
      article: { ...articleData.article, sections: updatedSections },
    });
  };

  const addCoverImage = () => {
    const updatedCoverImages = [...articleData.article.cover_images, ""];
    setArticleData({
      ...articleData,
      article: { ...articleData.article, cover_images: updatedCoverImages },
    });
  };

  const updateCoverImage = (index, value) => {
    const updatedCoverImages = [...articleData.article.cover_images];
    updatedCoverImages[index] = value;
    setArticleData({
      ...articleData,
      article: { ...articleData.article, cover_images: updatedCoverImages },
    });
  };

  const removeCoverImage = (index) => {
    const updatedCoverImages = articleData.article.cover_images.filter(
      (_, i) => i !== index
    );
    setArticleData({
      ...articleData,
      article: { ...articleData.article, cover_images: updatedCoverImages },
    });
  };

  const addSectionImage = (sectionIndex) => {
    const updatedSections = [...articleData.article.sections];
    updatedSections[sectionIndex].images = [
      ...(updatedSections[sectionIndex].images || []),
      "",
    ];
    setArticleData({
      ...articleData,
      article: { ...articleData.article, sections: updatedSections },
    });
  };

  const updateSectionImage = (sectionIndex, imageIndex, value) => {
    const updatedSections = [...articleData.article.sections];
    updatedSections[sectionIndex].images[imageIndex] = value;
    setArticleData({
      ...articleData,
      article: { ...articleData.article, sections: updatedSections },
    });
  };

  const removeSectionImage = (sectionIndex, imageIndex) => {
    const updatedSections = [...articleData.article.sections];
    updatedSections[sectionIndex].images = updatedSections[
      sectionIndex
    ].images.filter((_, i) => i !== imageIndex);
    setArticleData({
      ...articleData,
      article: { ...articleData.article, sections: updatedSections },
    });
  };

  const addSubsectionImage = (sectionIndex, subIndex) => {
    const updatedSections = [...articleData.article.sections];
    updatedSections[sectionIndex].subsections[subIndex].images = [
      ...(updatedSections[sectionIndex].subsections[subIndex].images || []),
      "",
    ];
    setArticleData({
      ...articleData,
      article: { ...articleData.article, sections: updatedSections },
    });
  };

  const updateSubsectionImage = (sectionIndex, subIndex, imageIndex, value) => {
    const updatedSections = [...articleData.article.sections];
    updatedSections[sectionIndex].subsections[subIndex].images[imageIndex] =
      value;
    setArticleData({
      ...articleData,
      article: { ...articleData.article, sections: updatedSections },
    });
  };

  const removeSubsectionImage = (sectionIndex, subIndex, imageIndex) => {
    const updatedSections = [...articleData.article.sections];
    updatedSections[sectionIndex].subsections[subIndex].images = updatedSections[
      sectionIndex
    ].subsections[subIndex].images.filter((_, i) => i !== imageIndex);
    setArticleData({
      ...articleData,
      article: { ...articleData.article, sections: updatedSections },
    });
  };

  const handleImageSearch = async (searchQuery, sectionIndex, subIndex = null) => {
    setLoading(true);
    setError(null);
    setCurrentSectionIndex(sectionIndex);
    setCurrentSubsectionIndex(subIndex);

    const updatedSearchQuery = `${searchQuery} in ${query.place} ${query.state}`;

    try {
      const links = await searchImages(updatedSearchQuery, 15); // Fetch up to 15 images
      setImageLinks(links);
      setSelectedImages([]);
      setImageDialogOpen(true);
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

  const handleImageConfirm = () => {
    const updatedSections = [...articleData.article.sections];
    if (currentSubsectionIndex !== null) {
      updatedSections[currentSectionIndex].subsections[
        currentSubsectionIndex
      ].images = [
        ...updatedSections[currentSectionIndex].subsections[
          currentSubsectionIndex
        ].images,
        ...selectedImages,
      ];
    } else {
      updatedSections[currentSectionIndex].images = [
        ...(updatedSections[currentSectionIndex].images || []),
        ...selectedImages,
      ];
    }
    setArticleData({
      ...articleData,
      article: { ...articleData.article, sections: updatedSections },
    });
    setImageDialogOpen(false);
  };

  return (
    <div className="container mx-auto py-8">
      <Card className="mb-8 mx-2">
        <CardHeader>
          <CardTitle className="flex items-center justify-center text-2xl">
            <PenSquare className="mr-2 h-6 w-6" />
            Create Blog Post
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="relative">
              <Input
                placeholder="Enter Place"
                value={query.place}
                onChange={(e) => {
                  setQuery({ ...query, place: e.target.value });
                  fetchPlace(e.target.value);
                }}
                className="w-full"
              />
              {suggestions.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-background border rounded-md shadow-lg">
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="p-2 hover:bg-accent cursor-pointer"
                      onClick={() => handleSelectPlace(suggestion)}
                    >
                      {suggestion.properties.city}, {suggestion.properties.state},{" "}
                      {suggestion.properties.country}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <Input
              placeholder="Enter State"
              value={query.state}
              onChange={(e) => setQuery({ ...query, state: e.target.value })}
            />
            <Input
              placeholder="Enter Country"
              value={query.country}
              onChange={(e) => setQuery({ ...query, country: e.target.value })}
            />
            <Input
              placeholder="Enter Longitude"
              value={query.longitude}
              onChange={(e) => setQuery({ ...query, longitude: e.target.value })}
            />
            <Input
              placeholder="Enter Latitude"
              value={query.latitude}
              onChange={(e) => setQuery({ ...query, latitude: e.target.value })}
            />
            <Input
              placeholder="Enter Title"
              value={query.title}
              onChange={(e) => setQuery({ ...query, title: e.target.value })}
              className="w-full"
            />
          </div>

          <div className="flex gap-3">
            <Button onClick={fetchBlogContent} disabled={loading}>
              {loading ? "Generating..." : "Generate Blog Content"}
            </Button>
            {isArticleGenerated && (
              <>
                <Button onClick={SaveBlog} disabled={loading}>
                  {loading ? "Saving..." : "Save Blog"}
                </Button>
                <BlogPreviewModal data={articleData} />
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {articleData && (
        <Card className="mt-8">
          <CardHeader>
            {/* Editable article.title */}
            <Input
              placeholder="Article Title"
              value={articleData.article.title}
              onChange={(e) =>
                setArticleData({
                  ...articleData,
                  article: { ...articleData.article, title: e.target.value },
                })
              }
              className="text-xl font-semibold mb-2"
            />
            {/* Optional: Keep CardTitle for display */}
            <CardTitle>{articleData.article.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Cover Images */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Cover Images</h3>
              {articleData.article.cover_images.map((image, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <Input
                    placeholder="Cover Image URL"
                    value={image}
                    onChange={(e) => updateCoverImage(index, e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      setPreviewImage(image);
                      setModalOpen(true);
                    }}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => removeCoverImage(index)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button variant="outline" onClick={addCoverImage}>
                <ImagePlus className="h-4 w-4 mr-2" /> Add Cover Image
              </Button>
            </div>

            {/* Sections */}
            {articleData.article.sections.map((section, secIndex) => (
              <Card key={secIndex}>
                <CardContent className="p-4">
                  <div className="flex gap-4 mb-4">
                    <Input
                      placeholder="Section Heading"
                      value={section.heading}
                      onChange={(e) =>
                        handleSectionChange(secIndex, "heading", e.target.value)
                      }
                      className="flex-1"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => removeSection(secIndex)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>

                  <Textarea
                    placeholder="Section Text"
                    value={section.text}
                    onChange={(e) =>
                      handleSectionChange(secIndex, "text", e.target.value)
                    }
                    className="mb-4"
                  />

                  {/* Section Images */}
                  <div className="space-y-2 mb-4">
                    {section.images.map((image, imgIndex) => (
                      <div key={imgIndex} className="flex gap-2 items-center">
                        <Input
                          placeholder="Section Image URL"
                          value={image}
                          onChange={(e) =>
                            updateSectionImage(secIndex, imgIndex, e.target.value)
                          }
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => {
                            setPreviewImage(image);
                            setModalOpen(true);
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => removeSectionImage(secIndex, imgIndex)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      onClick={() => addSectionImage(secIndex)}
                    >
                      <ImagePlus className="h-4 w-4 mr-2" /> Add Section Image
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleImageSearch(section.heading, secIndex)}
                      className="ml-2"
                    >
                      <ImagePlus className="h-4 w-4 mr-2" /> Search Images
                    </Button>
                  </div>

                  {/* Subsections */}
                  <div className="space-y-4">
                    {section.subsections.map((sub, subIndex) => (
                      <Card key={subIndex} className="bg-accent/50">
                        <CardContent className="p-4">
                          <div className="flex gap-4 mb-4">
                            <Input
                              placeholder="Subsection Title"
                              value={sub.title}
                              onChange={(e) =>
                                handleSubsectionChange(
                                  secIndex,
                                  subIndex,
                                  "title",
                                  e.target.value
                                )
                              }
                              className="flex-1"
                            />
                            <Button
                              variant="destructive"
                              size="icon"
                              onClick={() => removeSubsection(secIndex, subIndex)}
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>

                          <Textarea
                            placeholder="Subsection Text"
                            value={sub.text}
                            onChange={(e) =>
                              handleSubsectionChange(
                                secIndex,
                                subIndex,
                                "text",
                                e.target.value
                              )
                            }
                            className="mb-4"
                          />

                          {/* Subsection Images */}
                          <div className="space-y-2">
                            {sub.images.map((image, imgIndex) => (
                              <div
                                key={imgIndex}
                                className="flex gap-2 items-center"
                              >
                                <Input
                                  placeholder="Subsection Image URL"
                                  value={image}
                                  onChange={(e) =>
                                    updateSubsectionImage(
                                      secIndex,
                                      subIndex,
                                      imgIndex,
                                      e.target.value
                                    )
                                  }
                                />
                                <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={() => {
                                    setPreviewImage(image);
                                    setModalOpen(true);
                                  }}
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="destructive"
                                  size="icon"
                                  onClick={() =>
                                    removeSubsectionImage(
                                      secIndex,
                                      subIndex,
                                      imgIndex
                                    )
                                  }
                                >
                                  <Trash className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                            <Button
                              variant="outline"
                              onClick={() => addSubsectionImage(secIndex, subIndex)}
                            >
                              <ImagePlus className="h-4 w-4 mr-2" /> Add Subsection
                              Image
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() =>
                                handleImageSearch(sub.title, secIndex, subIndex)
                              }
                              className="ml-2"
                            >
                              <ImagePlus className="h-4 w-4 mr-2" /> Search Images
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    onClick={() => addSubsection(secIndex)}
                    className="w-full mt-4"
                  >
                    Add Subsection
                  </Button>
                </CardContent>
              </Card>
            ))}

            <Button onClick={addSection} className="w-full">
              Add New Section
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Preview Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Image Preview</DialogTitle>
          </DialogHeader>
          {previewImage ? (
            <img
              src={previewImage}
              alt="Preview"
              className="w-full h-auto rounded-md"
            />
          ) : (
            <div className="flex items-center justify-center h-48 bg-accent rounded-md">
              <ImagePlus className="h-8 w-8 text-muted-foreground" />
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Image Search Dialog */}
      <Dialog open={imageDialogOpen} onOpenChange={setImageDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              Search Results for "
              {currentSubsectionIndex !== null
                ? articleData?.article.sections[currentSectionIndex]?.subsections[
                    currentSubsectionIndex
                  ]?.title
                : articleData?.article.sections[currentSectionIndex]?.heading}
              "
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4 max-h-96 overflow-y-auto">
            {error && <p className="text-red-600 mb-4">{error}</p>}
            {imageLinks.length > 0 ? (
              <ul className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {imageLinks.map((link, index) => (
                  <li key={index} className="flex flex-col items-center">
                    <img
                      src={link}
                      alt={`Result ${index + 1}`}
                      className={`w-32 h-32 object-cover rounded cursor-pointer transition-all ${
                        selectedImages.includes(link)
                          ? "border-4 border-blue-500"
                          : "border border-gray-300"
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
              <p>{loading ? "Searching..." : "No images available."}</p>
            )}
          </div>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setImageDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleImageConfirm}
              disabled={selectedImages.length === 0}
            >
              Add Selected ({selectedImages.length})
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}