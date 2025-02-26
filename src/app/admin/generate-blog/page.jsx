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
} from "@/components/ui/dialog";

export default function BlogEditor() {
  const [query, setQuery] = useState({
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

  const fetchPlace = async (place) => {
    if (!place) return;
    try {
      const response = await fetch(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${place}&apiKey=6f87d12f830d49b4becaa344a30bc61b&type=city&limit=5`
      );
      const data = await response.json();
      setSuggestions(data.features || []);
    } catch (error) {
      console.error("Error fetching place suggestions:", error);
    }
  };

  const handleSelectPlace = (selectedPlace) => {
    setQuery({
      place: selectedPlace.properties.city || "",
      state: selectedPlace.properties.state || "",
      country: selectedPlace.properties.country || "",
      latitude: selectedPlace.properties.lat || "",
      longitude: selectedPlace.properties.lon || "",
    });
    setSuggestions([]);
  };

  const SaveBlog = async () => {
    if (!query.place || !query.state || !query.country) {
      toast.error("Invalid operation");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("/api/admin/blog/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({

          ...articleData,
        }),
      });
      if (response.ok) {
        toast.success("Blog created successfully");
      } else {
        toast.error("Error creating blog");
      }
    } catch (error) {
      toast.error("Error in saving blog");
      console.error("Error saving blog:", error);
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
        throw new Error("Error generating article");
      }

      const data = await response.json();
      setArticleData(data.data);
      console.log(articleData);
      
      toast.success("Article generated successfully!");
      setIsArticleGenerated(true);
    } catch (error) {
      console.error(error);
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
      image: "",
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
    const newSubsection = { title: "New Subsection", text: "", image: "" };
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

  return (
    <div className="container mx-auto py-8">
      <Card className="mb-8  mx-2">
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
          </div>
          
          <div className="flex gap-3">
            <Button
              onClick={fetchBlogContent}
              disabled={loading}
            >
              {loading ? "Generating..." : "Generate Blog Content"}
            </Button>
            
            {isArticleGenerated && (
              <>
                <Button
                  onClick={SaveBlog}
                  disabled={loading}
                >
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
            <CardTitle>{articleData.article.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
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

                  <div className="flex gap-2 mb-4">
                    <Input
                      placeholder="Image URL"
                      value={section.image}
                      onChange={(e) =>
                        handleSectionChange(secIndex, "image", e.target.value)
                      }
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setModalOpen(true)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>

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

                          <div className="flex gap-2">
                            <Input
                              placeholder="Subsection Image URL"
                              value={sub.image}
                              onChange={(e) =>
                                handleSubsectionChange(
                                  secIndex,
                                  subIndex,
                                  "image",
                                  e.target.value
                                )
                              }
                            />
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => setModalOpen(true)}
                            >
                              <Eye className="h-4 w-4" />
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
    </div>
  );
}