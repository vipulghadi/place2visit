"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Pencil, Trash, Plus, X, ImageIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function BlogEditPage() {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);
  const params = useParams();
  const router = useRouter();
  const { slug } = params;

  useEffect(() => {
    fetchBlog();
  }, []);

  const fetchBlog = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/blog/${slug}`);
      const data = await response.json();
      if (data.success) {
        setBlog(data.data);
      } else {
        toast.error(data.message || "Failed to fetch blog post");
      }
    } catch (error) {
      toast.error("Failed to fetch blog post");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBlog = async () => {
    setLoading(true);
    try {
      await fetch(`/api/admin/blog/${slug}`, { method: "DELETE" });
      toast.success("Blog deleted");
      router.push("/admin/blogs");
    } catch (error) {
      toast.error("Error deleting blog");
    } finally {
      setLoading(false);
    }
  };

  const handleEditBlog = async () => {
    setLoading(true);
    try {
      await fetch(`/api/admin/blog/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blog),
      });
      toast.success("Blog updated successfully");
      setEditMode(false);
      fetchBlog();
    } catch (error) {
      toast.error("Error updating blog");
    } finally {
      setLoading(false);
    }
  };

  const handleSectionChange = (index, field, value) => {
    const updatedSections = [...blog.article.sections];
    updatedSections[index] = { ...updatedSections[index], [field]: value };
    setBlog({ ...blog, article: { ...blog.article, sections: updatedSections } });
  };

  const handleSubsectionChange = (sectionIndex, subIndex, field, value) => {
    const updatedSections = [...blog.article.sections];
    updatedSections[sectionIndex].subsections[subIndex] = {
      ...updatedSections[sectionIndex].subsections[subIndex],
      [field]: value,
    };
    setBlog({ ...blog, article: { ...blog.article, sections: updatedSections } });
  };

  const handleAddSection = () => {
    const newSection = {
      heading: "",
      text: "",
      images: [""],
      subsections: [],
    };
    setBlog({
      ...blog,
      article: {
        ...blog.article,
        sections: [...blog.article.sections, newSection],
      },
    });
  };

  const handleRemoveSection = (index) => {
    const updatedSections = blog.article.sections.filter((_, i) => i !== index);
    setBlog({ ...blog, article: { ...blog.article, sections: updatedSections } });
  };

  const handleAddSubsection = (sectionIndex) => {
    const updatedSections = [...blog.article.sections];
    updatedSections[sectionIndex].subsections.push({
      title: "",
      text: "",
      images: [""],
    });
    setBlog({ ...blog, article: { ...blog.article, sections: updatedSections } });
  };

  const handleRemoveSubsection = (sectionIndex, subIndex) => {
    const updatedSections = [...blog.article.sections];
    updatedSections[sectionIndex].subsections = updatedSections[
      sectionIndex
    ].subsections.filter((_, i) => i !== subIndex);
    setBlog({ ...blog, article: { ...blog.article, sections: updatedSections } });
  };

  const handleAddImage = (type, index = null, subIndex = null) => {
    if (type === "cover") {
      setBlog({
        ...blog,
        article: {
          ...blog.article,
          cover_images: [...blog.article.cover_images, ""],
        },
      });
    } else if (type === "section") {
      const updatedSections = [...blog.article.sections];
      updatedSections[index].images = [...updatedSections[index].images, ""];
      setBlog({ ...blog, article: { ...blog.article, sections: updatedSections } });
    } else if (type === "subsection") {
      const updatedSections = [...blog.article.sections];
      updatedSections[index].subsections[subIndex].images = [
        ...updatedSections[index].subsections[subIndex].images,
        "",
      ];
      setBlog({ ...blog, article: { ...blog.article, sections: updatedSections } });
    }
  };

  const handleRemoveImage = (type, imgIndex, index = null, subIndex = null) => {
    if (type === "cover") {
      const updatedImages = blog.article.cover_images.filter((_, i) => i !== imgIndex);
      setBlog({
        ...blog,
        article: { ...blog.article, cover_images: updatedImages },
      });
    } else if (type === "section") {
      const updatedSections = [...blog.article.sections];
      updatedSections[index].images = updatedSections[index].images.filter(
        (_, i) => i !== imgIndex
      );
      setBlog({ ...blog, article: { ...blog.article, sections: updatedSections } });
    } else if (type === "subsection") {
      const updatedSections = [...blog.article.sections];
      updatedSections[index].subsections[subIndex].images = updatedSections[
        index
      ].subsections[subIndex].images.filter((_, i) => i !== imgIndex);
      setBlog({ ...blog, article: { ...blog.article, sections: updatedSections } });
    }
  };

  const handleImageChange = (type, imgIndex, value, index = null, subIndex = null) => {
    if (type === "cover") {
      const updatedImages = [...blog.article.cover_images];
      updatedImages[imgIndex] = value;
      setBlog({
        ...blog,
        article: { ...blog.article, cover_images: updatedImages },
      });
    } else if (type === "section") {
      const updatedSections = [...blog.article.sections];
      updatedSections[index].images[imgIndex] = value;
      setBlog({ ...blog, article: { ...blog.article, sections: updatedSections } });
    } else if (type === "subsection") {
      const updatedSections = [...blog.article.sections];
      updatedSections[index].subsections[subIndex].images[imgIndex] = value;
      setBlog({ ...blog, article: { ...blog.article, sections: updatedSections } });
    }
  };

  if (loading) return <p className="text-sm">Loading...</p>;
  if (!blog) return <p className="text-sm">Blog post not found</p>;

  return (
    <Card className="w-full mx-1 mt-2">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">{blog.meta_title}</CardTitle>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={() => setEditMode(!editMode)}>
            <Pencil className="mr-2 h-4 w-4" />
            {editMode ? "Cancel Edit" : "Edit"}
          </Button>
          <Button variant="destructive" size="sm" onClick={() => setDeleteModalOpen(true)}>
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </Button>
          {editMode && (
            <Button variant="default" size="sm" onClick={handleEditBlog}>
              Save
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent>
        {editMode ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Meta Title</label>
              <Input
                value={blog.meta_title}
                onChange={(e) => setBlog({ ...blog, meta_title: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Cover Images</label>
              {blog.article.cover_images.map((img, imgIndex) => (
                <div key={imgIndex} className="flex items-center space-x-2">
                  <Input
                    value={img}
                    onChange={(e) =>
                      handleImageChange("cover", imgIndex, e.target.value)
                    }
                    placeholder="Enter image URL"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPreviewImages([img].filter(Boolean))}
                    disabled={!img}
                  >
                    <ImageIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleRemoveImage("cover", imgIndex)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleAddImage("cover")}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Cover Image
              </Button>
            </div>

            {blog.article.sections.map((section, index) => (
              <Card key={index} className="mt-4">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">Section {index + 1}</CardTitle>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleRemoveSection(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Heading</label>
                    <Input
                      value={section.heading}
                      onChange={(e) =>
                        handleSectionChange(index, "heading", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Text</label>
                    <Textarea
                      value={section.text}
                      onChange={(e) =>
                        handleSectionChange(index, "text", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Images</label>
                    {section.images.map((img, imgIndex) => (
                      <div key={imgIndex} className="flex items-center space-x-2">
                        <Input
                          value={img}
                          onChange={(e) =>
                            handleImageChange("section", imgIndex, e.target.value, index)
                          }
                          placeholder="Enter image URL"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setPreviewImages([img].filter(Boolean))}
                          disabled={!img}
                        >
                          <ImageIcon className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleRemoveImage("section", imgIndex, index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleAddImage("section", index)}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add Section Image
                    </Button>
                  </div>

                  {section.subsections?.map((subsection, subIndex) => (
                    <Card key={subIndex} className="mt-4">
                      <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-md">
                          Subsection {subIndex + 1}
                        </CardTitle>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleRemoveSubsection(index, subIndex)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Subheading</label>
                          <Input
                            value={subsection.title}
                            onChange={(e) =>
                              handleSubsectionChange(index, subIndex, "title", e.target.value)
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Subtext</label>
                          <Textarea
                            value={subsection.text}
                            onChange={(e) =>
                              handleSubsectionChange(index, subIndex, "text", e.target.value)
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Subimages</label>
                          {subsection.images.map((img, imgIndex) => (
                            <div key={imgIndex} className="flex items-center space-x-2">
                              <Input
                                value={img}
                                onChange={(e) =>
                                  handleImageChange(
                                    "subsection",
                                    imgIndex,
                                    e.target.value,
                                    index,
                                    subIndex
                                  )
                                }
                                placeholder="Enter image URL"
                              />
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setPreviewImages([img].filter(Boolean))}
                                disabled={!img}
                              >
                                <ImageIcon className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() =>
                                  handleRemoveImage("subsection", imgIndex, index, subIndex)
                                }
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleAddImage("subsection", index, subIndex)}
                          >
                            <Plus className="mr-2 h-4 w-4" />
                            Add Subimage
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleAddSubsection(index)}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Subsection
                  </Button>
                </CardContent>
              </Card>
            ))}
            <Button variant="outline" size="sm" onClick={handleAddSection}>
              <Plus className="mr-2 h-4 w-4" />
              Add Section
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <h2>{blog.article.title}</h2>
            <p>{blog.meta_description}</p>
            {blog.article.sections.map((section, index) => (
              <div key={index}>
                <h3>{section.heading}</h3>
                <p>{section.text}</p>
                {section.subsections.map((subsection, subIndex) => (
                  <div key={subIndex}>
                    <h4>{subsection.title}</h4>
                    <p>{subsection.text}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        <Dialog open={previewImages.length > 0} onOpenChange={() => setPreviewImages([])}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Image Previews</DialogTitle>
            </DialogHeader>
            {previewImages.map((img, idx) => (
              <img
                key={idx}
                src={img || "/placeholder.svg"}
                className="w-full rounded-lg object-cover mb-2"
                alt={`Preview ${idx + 1}`}
              />
            ))}
          </DialogContent>
        </Dialog>

        <Dialog open={deleteModalOpen} onOpenChange={() => setDeleteModalOpen(false)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
              <p>Are you sure you want to delete this blog post? This action cannot be undone.</p>
            </DialogHeader>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setDeleteModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDeleteBlog}>
                Delete
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
