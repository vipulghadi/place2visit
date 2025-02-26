"use client";

import { useState, useEffect } from "react";
import { Search, Power, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { toast } from "react-hot-toast";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

function BlogManagementDashboard() {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [activeFilter, setActiveFilter] = useState("all");
  const [deletedFilter, setDeletedFilter] = useState("all");
  const limit = 5;

  const handleDeleteBlog = async (slug) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/blog/${slug}`, {
        method: "DELETE",
      });
      if (response.ok) {
        toast.success("Blog deleted successfully");
        fetchBlogs();
      } else {
        const errorData = await response.json();
        const errorMessage = errorData.message || "Failed to delete blog";
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to delete blog");
    } finally {
      setLoading(false);
    }
  };

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        search,
      });

      // Only add isActive if it's explicitly set to "true" or "false"
      if (activeFilter !== "all") {
        queryParams.append("isActive", activeFilter);
      }

      // Only add isDeleted if it's explicitly set to "true" or "false"
      if (deletedFilter !== "all") {
        queryParams.append("isDeleted", deletedFilter);
      }

      const response = await fetch(`/api/admin/blog?${queryParams}`);
      const data = await response.json();
      

      if (data) {
        setBlogs(data.data);
        setTotalPages(data.totalPages);
      } else {
        console.error(data.message);
        toast.error(data.message || "Failed to fetch blogs");
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
      toast.error("Failed to fetch blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [page, search, activeFilter, deletedFilter]);

  const handleToggleActive = async (blogId) => {
    const blog = blogs.find((b) => b._id === blogId);
    if (!blog) return;

    try {
      const response = await fetch(`/api/admin/blog/${blogId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isActive: !blog.isActive,
        }),
      });

      if (response.ok) {
        setBlogs(blogs.map((b) =>
          b._id === blogId ? { ...b, isActive: !b.isActive } : b
        ));
        toast.success(`Blog ${blog.isActive ? "deactivated" : "activated"} successfully`);
      } else {
        const errorData = await response.json();
        const errorMessage = errorData.message || "Failed to update blog status";
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error("Error updating blog status:", error);
      toast.error(error.message || "Failed to update blog status");
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Card>
          <CardHeader className="border-b">
            <CardTitle className="text-2xl flex items-center gap-2">
              📚 Blog Management Dashboard
            </CardTitle>
          </CardHeader>

          <CardContent className="p-6 space-y-4">
            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search blog titles..."
                  className="pl-10"
                />
              </div>

              <Select value={activeFilter} onValueChange={setActiveFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Active Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Active Status</SelectItem>
                  <SelectItem value="true">Active</SelectItem>
                  <SelectItem value="false">Inactive</SelectItem>
                </SelectContent>
              </Select>

              <Select value={deletedFilter} onValueChange={setDeletedFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Delete Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Delete Status</SelectItem>
                  <SelectItem value="true">Deleted</SelectItem>
                  <SelectItem value="false">Not Deleted</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              {loading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Active Status</TableHead>
                      <TableHead>Delete Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {blogs.length > 0 ? (
                      blogs.map((blog) => (
                        <TableRow key={blog._id}>
                          <TableCell>
                            <Link
                              href={`/admin/blogs/${blog.slug}`}
                              className="hover:underline"
                            >
                              {blog.meta_title}
                            </Link>
                          </TableCell>
                          <TableCell>
                            <Badge variant={blog.isActive ? "success" : "destructive"}>
                              {blog.isActive ? "Active" : "Inactive"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={blog.isDeleted ? "destructive" : "success"}>
                              {blog.isDeleted ? "Deleted" : "Not Deleted"}
                            </Badge>
                          </TableCell>
                          <TableCell className="space-x-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleToggleActive(blog._id)}
                              disabled={blog.isDeleted}
                            >
                              <Power size={18} />
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDeleteBlog(blog.slug)}
                              disabled={blog.isDeleted}
                            >
                              Delete
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center h-24">
                          No blogs found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              )}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between px-4 py-3 border-t">
              <div className="text-sm text-muted-foreground">
                Page <span className="font-medium">{page}</span> of{" "}
                <span className="font-medium">{totalPages}</span>
              </div>
              <div className="space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  disabled={page === 1}
                >
                  <ChevronLeft size={18} />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={page === totalPages}
                >
                  <ChevronRight size={18} />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default BlogManagementDashboard;