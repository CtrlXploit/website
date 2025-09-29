import { createClient } from "@/utils/supabase/server";
import GlitchText from "@/components/GlitchText";
import {
  CalendarIcon,
  UserIcon,
  DocumentTextIcon,
  DocumentIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

// This tells Next.js to cache this page and re-fetch the data from Supabase
// at most once every hour. Adjust the time (in seconds) as needed.
export const revalidate = 172800;

// Define the shape of the blog data
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

export default async function BlogPage() {
  const supabase = await createClient();

  const { data: blogs, error } = await supabase
    .from("blogs")
    .select(
      `
      id,
      created_at,
      title,
      description,
      type,
      content_url,
      author,
      tags,
      slug,
      created_by
      `
    )
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching blogs:", error);
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center flex flex-col items-center min-h-screen">
        <p className="text-red-500">
          Could not fetch blogs. Please try again later.
        </p>
      </div>
    );
  }

  if (!blogs || blogs.length === 0) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center flex flex-col items-center min-h-screen">
        <GlitchText
          speed={1}
          enableShadows={true}
          enableOnHover={true}
          className="whitespace-nowrap text-6xl md:text-7xl lg:text-8xl"
        >
          Blog & Writeups
        </GlitchText>
        <p className="text-foreground/70 mt-8">No blogs found.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto my-20 flex flex-col items-center">
      {/* Header */}
      <header className="text-center w-full mb-20">
        <GlitchText
          speed={1}
          enableShadows={true}
          enableOnHover={true}
          className="whitespace-nowrap text-6xl md:text-7xl lg:text-8xl"
        >
          Blog & Writeups
        </GlitchText>
        <p className="mt-6 text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
          Explore our CTF writeups, and technical articles from our club
          members.
        </p>
      </header>

      {/* Main Content */}
      <div className="w-full max-w-4xl mx-auto">
        <div className="space-y-8">
          {blogs.map((blog) => (
            <article
              key={blog.id}
              className="group relative block rounded-xl border border-white/10 bg-black/10 backdrop-blur-sm transition-all duration-500 hover:border-primary/40 hover:bg-primary/5 hover:shadow-lg overflow-hidden"
            >
              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          blog.type === "markdown"
                            ? "bg-green-100/10 text-green-400 border border-green-400/20"
                            : "bg-red-100/10 text-red-400 border border-red-400/20"
                        }`}
                      >
                        {blog.type === "markdown" ? (
                          <>
                            <DocumentTextIcon className="w-3 h-3 mr-1" />{" "}
                            Article
                          </>
                        ) : (
                          <>
                            <DocumentIcon className="w-3 h-3 mr-1" /> PDF
                          </>
                        )}
                      </span>
                      {blog.tags && blog.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {blog.tags.slice(0, 3).map((tag, index) => (
                            <span
                              key={index}
                              className="px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary border border-primary/20"
                            >
                              {tag}
                            </span>
                          ))}
                          {blog.tags.length > 3 && (
                            <span className="px-2 py-0.5 text-xs rounded-full bg-foreground/10 text-foreground/60">
                              +{blog.tags.length - 3} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                    <Link
                      href={`/blog/${blog.slug || blog.id}`}
                      className="block"
                    >
                      <h3 className="text-2xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                        {blog.title}
                      </h3>
                    </Link>
                  </div>
                  <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary whitespace-nowrap ml-4">
                    {formatDate(blog.created_at)}
                  </span>
                </div>

                {blog.description && (
                  <p className="text-md text-foreground/70 mb-6 leading-relaxed line-clamp-3">
                    {blog.description}
                  </p>
                )}

                {/* Metadata */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-4 text-sm text-foreground/60">
                    <div className="flex items-center">
                      <CalendarIcon className="w-4 h-4 mr-1" />
                      {formatDate(blog.created_at)}
                    </div>
                    {(blog.author || blog.created_by) && (
                      <div className="flex items-center">
                        <UserIcon className="w-4 h-4 mr-1" />
                        <span className="text-primary">
                          {blog.author || `@${blog.created_by}`}
                        </span>
                      </div>
                    )}
                  </div>

                  <Link
                    href={`/blog/${blog.slug || blog.id}`}
                    className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                  >
                    Read {blog.type === "markdown" ? "Article" : "PDF"}
                    <svg
                      className="ml-1 w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
