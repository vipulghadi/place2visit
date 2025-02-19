"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Pencil, Trash, Plus, X, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

export default function BlogEditPage() {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const params = useParams();
  const router = useRouter();
  const { slug } = params;

  useEffect(() => {
    fetchBlog();
  }, []);

  const fetchBlog = async () => {
    try {
      const response = await fetch(`/api/admin/blog/${slug}`);
      const data = await response.json();
      if (data.success) {
        setBlog(data.data);
      } else {
        toast.error(data.message);
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
      await fetch(`/api/admin/blog/${slug}`, {
        method: "DELETE",
      });
      toast.success("Blog deleted");
      router.push("/admin/blogs");
    } catch (error) {
      console.error(error);
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blog),
      });

      toast.success("Blog updated successfully");
      setEditMode(false);
      fetchBlog();
    } catch (error) {
      console.error(error);
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

  const handleDeleteSection = (index) => {
    const updatedSections = [...blog.article.sections];
    updatedSections.splice(index, 1);
    setBlog({ ...blog, article: { ...blog.article, sections: updatedSections } });
  };

  if (loading) return <p className="text-sm">Loading...</p>;
  if (!blog) return <p className="text-sm">Blog post not found</p>;

  return (
    <Card className="w-full mx-1 mt-2">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">{blog.meta_title}</CardTitle>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setEditMode(!editMode)}
          >
            <Pencil className="mr-2 h-4 w-4" />
            {editMode ? "Cancel Edit" : "Edit"}
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => setDeleteModalOpen(true)}
          >
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </Button>
          {editMode && (
            <Button variant="default" size="sm" onClick={handleEditBlog}>
              <Plus className="mr-2 h-4 w-4" />
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
              <label className="text-sm font-medium">Cover Image URL</label>
              <Input
                value={blog.article.cover_image}
                onChange={(e) =>
                  setBlog({
                    ...blog,
                    article: { ...blog.article, cover_image: e.target.value },
                  })
                }
              />
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium">Cover Image:</span>
              {blog.article.cover_image && (
                <>
                  <img
                    src={blog.article.cover_image}
                    className="h-12 w-12 rounded-md object-cover"
                    alt="Cover"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPreviewImage(blog.article.cover_image)}
                  >
                    <ImageIcon className="mr-2 h-4 w-4" />
                    Preview
                  </Button>
                </>
              )}
            </div>

            {blog.article.sections.map((section, index) => (
              <Card key={index} className="mt-4">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-lg">Section {index + 1}</CardTitle>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteSection(index)}
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
                    <label className="text-sm font-medium">Image URL</label>
                    <Input
                      value={section.image}
                      onChange={(e) =>
                        handleSectionChange(index, "image", e.target.value)
                      }
                    />
                  </div>

                  {section.image && (
                    <div className="flex items-center space-x-4">
                      <img
                        src={section.image}
                        className="h-12 w-12 rounded-md object-cover"
                        alt="Section"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPreviewImage(section.image)}
                      >
                        <ImageIcon className="mr-2 h-4 w-4" />
                        Preview
                      </Button>
                    </div>
                  )}

                  {section.subsections?.map((subsection, subIndex) => (
                    <Card key={subIndex} className="mt-4">
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Subheading</label>
                          <Input
                            value={subsection.heading}
                            onChange={(e) =>
                              handleSubsectionChange(
                                index,
                                subIndex,
                                "heading",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Subtext</label>
                          <Textarea
                            value={subsection.text}
                            onChange={(e) =>
                              handleSubsectionChange(
                                index,
                                subIndex,
                                "text",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            Subimage URL
                          </label>
                          <Input
                            value={subsection.image}
                            onChange={(e) =>
                              handleSubsectionChange(
                                index,
                                subIndex,
                                "image",
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : null}

        <Dialog open={!!previewImage} onOpenChange={() => setPreviewImage(null)}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Image Preview</DialogTitle>
            </DialogHeader>
            {previewImage && (
              <img
                src={previewImage}
                className="w-full rounded-lg object-cover"
                alt="Preview"
              />
            )}
          </DialogContent>
        </Dialog>

        <Dialog
          open={deleteModalOpen}
          onOpenChange={() => setDeleteModalOpen(false)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this blog post? This action cannot
                be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setDeleteModalOpen(false)}
              >
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDeleteBlog}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}