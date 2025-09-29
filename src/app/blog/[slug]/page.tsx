import { createClient } from "@/utils/supabase/server";
import {
  CalendarIcon,
  UserIcon,
  DocumentTextIcon,
  DocumentIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { notFound } from "next/navigation";
import MarkdownRenderer from "@/components/MarkdownRenderer";

export const revalidate = 0;

type Blog = {
  id: string;
  created_at: string;
  title: string;
  description: string;
  type: "markdown" | "pdf";
  content_url: string;
  author: string | null;
  tags: string[] | null;
  slug: string | null;
  created_by: string | null;
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
};

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  console.log("Fetching blog with slug:", slug); // Debug log

  const { data: blog, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  console.log("Blog query result:", { blog, error }); // Debug log

  if (error || !blog) {
    console.log("Blog not found, calling notFound()"); // Debug log
    notFound();
  }

  return (
    <div className="w-full max-w-7xl mx-auto my-20 px-4 sm:px-6 lg:px-8">
      {/* Back button */}
      <div className="mb-8">
        <Link
          href="/blog"
          className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Back to blogs
        </Link>
      </div>

      {/* Blog header */}
      <header className="mb-12 max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              blog.type === "markdown"
                ? "bg-green-100/10 text-green-400 border border-green-400/20"
                : "bg-red-100/10 text-red-400 border border-red-400/20"
            }`}
          >
            {blog.type === "markdown" ? (
              <>
                <DocumentTextIcon className="w-4 h-4 mr-2" /> Article
              </>
            ) : (
              <>
                <DocumentIcon className="w-4 h-4 mr-2" /> PDF Document
              </>
            )}
          </span>
          <span className="text-sm text-foreground/60">
            {formatDate(blog.created_at)}
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
          {blog.title}
        </h1>

        {blog.description && (
          <p className="text-xl text-foreground/80 mb-6 leading-relaxed">
            {blog.description}
          </p>
        )}

        {/* Metadata */}
        <div className="flex flex-wrap items-center gap-6 text-sm text-foreground/60 border-t border-white/10 pt-6">
          <div className="flex items-center">
            <CalendarIcon className="w-4 h-4 mr-2" />
            Published on {formatDate(blog.created_at)}
          </div>
          {(blog.author || blog.created_by) && (
            <div className="flex items-center">
              <UserIcon className="w-4 h-4 mr-2" />
              <span className="text-primary">
                {blog.author || `@${blog.created_by}`}
              </span>
            </div>
          )}
        </div>

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {blog.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 text-sm rounded-full bg-primary/10 text-primary border border-primary/20"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto">
        <div className="rounded-xl border border-white/10 bg-black/5 backdrop-blur-sm overflow-hidden">
          {blog.type === "markdown" ? (
            <div className="p-2 sm:p-6 lg:p-8">
              <MarkdownRenderer contentUrl={blog.content_url} />
            </div>
          ) : (
            <div className="p-4 sm:p-6 lg:p-8 text-center">
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">PDF Document</h2>
                <p className="text-foreground/70 mb-6">
                  View the PDF document below or open it in a new tab for better
                  reading experience.
                </p>
              </div>

              {/* PDF Viewer */}
              <div className="mb-8 rounded-lg overflow-hidden border border-white/20">
                <div className="relative w-full" style={{ paddingTop: "140%" }}>
                  <iframe
                    src={`https://docs.google.com/viewer?url=${encodeURIComponent(
                      blog.content_url
                    )}&embedded=true`}
                    className="absolute top-0 left-0 w-full h-full"
                    style={{ border: "none" }}
                  />
                </div>

                {/* Mobile fallback */}
                <div className="sm:hidden mt-4">
                  <p className="text-foreground/70 text-sm mb-2">
                    PDF preview may not display well on mobile. Open it in a new
                    tab for a better experience
                  </p>
                </div>
              </div>

              {/* Download/Open button */}
              <a
                href={blog.content_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
              >
                <DocumentIcon className="w-5 h-5 mr-2" />
                Open PDF in New Tab
              </a>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
