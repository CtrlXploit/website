"use client";

import { useState, useEffect } from "react";
import GlitchText from "@/components/GlitchText";
import { createClient } from "@/utils/supabase/client";

export default function AdminBlogsPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<"markdown" | "pdf">("markdown");
  const [contentUrl, setContentUrl] = useState("");
  const [author, setAuthor] = useState("");
  const [tags, setTags] = useState("");
  const [published, setPublished] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  const supabase = createClient();

  useEffect(() => {
    const getUsername = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("username")
          .eq("id", user.id)
          .single();
        setUsername(profile?.username || null);
        setAuthor(profile?.username || "");
      }
    };
    getUsername();
  }, [supabase]);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const validateUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !description.trim() || !contentUrl.trim()) {
      setMessage({
        type: "error",
        text: "Title, description, and content URL are required",
      });
      return;
    }

    if (!validateUrl(contentUrl)) {
      setMessage({
        type: "error",
        text: "Please enter a valid URL for the content",
      });
      return;
    }

    if (!username) {
      setMessage({ type: "error", text: "User authentication error" });
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    try {
      const slug = generateSlug(title);
      const tagsArray = tags
        ? tags
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag)
        : [];

      const { error } = await supabase.from("blogs").insert([
        {
          title: title.trim(),
          description: description.trim(),
          type: type,
          content_url: contentUrl.trim(),
          author: author.trim() || null,
          tags: tagsArray.length > 0 ? tagsArray : null,
          slug: slug,
          published: published,
          created_by: username,
        },
      ]);

      if (error) throw error;

      setMessage({
        type: "success",
        text: "Blog post created successfully!",
      });

      // Reset form
      setTitle("");
      setDescription("");
      setType("markdown");
      setContentUrl("");
      setAuthor("");
      setTags("");
      setPublished(true);
    } catch (error) {
      setMessage({
        type: "error",
        text:
          error instanceof Error ? error.message : "Failed to create blog post",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col items-center min-h-screen">
      <GlitchText
        speed={1}
        enableShadows
        enableOnHover
        className="whitespace-nowrap mb-8 text-3xl md:text-5xl"
      >
        Blog Management
      </GlitchText>
      <p className="text-foreground/70 text-lg mb-12 text-center max-w-2xl">
        Add new blog posts and writeups to share with the community. Support
        both Markdown articles and PDF documents.
      </p>

      <div className="w-full max-w-2xl bg-card border rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-6">Create New Blog Post</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-2">
              Title *
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter blog post title"
              required
              className="w-full px-3 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium mb-2"
            >
              Description *
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of the blog post"
              required
              rows={4}
              className="w-full px-3 py-2 border border-input bg-background rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label htmlFor="type" className="block text-sm font-medium mb-2">
              Content Type *
            </label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value as "markdown" | "pdf")}
              className="w-full px-3 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="markdown">Markdown Article</option>
              <option value="pdf">PDF Document</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="contentUrl"
              className="block text-sm font-medium mb-2"
            >
              Content URL *
            </label>
            <input
              id="contentUrl"
              type="url"
              value={contentUrl}
              onChange={(e) => setContentUrl(e.target.value)}
              placeholder={
                type === "markdown"
                  ? "https://raw.githubusercontent.com/username/repo/main/article.md"
                  : "https://example.com/document.pdf"
              }
              required
              className="w-full px-3 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <p className="text-sm text-foreground/60 mt-1">
              {type === "markdown"
                ? "URL to the markdown file (e.g., GitHub raw link, CDN, etc.)"
                : "URL to the PDF file"}
            </p>
          </div>

          <div>
            <label htmlFor="tags" className="block text-sm font-medium mb-2">
              Tags
            </label>
            <input
              id="tags"
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="web security, ctf, malware, reverse engineering"
              className="w-full px-3 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <p className="text-sm text-foreground/60 mt-1">
              Separate multiple tags with commas
            </p>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="published"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
              className="h-4 w-4 text-primary focus:ring-primary border-input rounded"
            />
            <label
              htmlFor="published"
              className="ml-2 block text-sm text-foreground"
            >
              Publish immediately
            </label>
          </div>

          {message && (
            <div
              className={`p-4 rounded-md ${
                message.type === "success"
                  ? "bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                  : "bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-400"
              }`}
            >
              {message.text}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-md hover:bg-secondary hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Creating..." : "Create Blog Post"}
          </button>
        </form>
      </div>
    </div>
  );
}
