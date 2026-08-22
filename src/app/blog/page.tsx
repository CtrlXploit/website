import { createClient } from "@/utils/supabase/server";
import { TextReveal } from "@/components/TextReveal";
import { SectionReveal } from "@/components/SectionReveal";
import Link from "next/link";

export const revalidate = 172800;

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

const formatDateShort = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
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
      <div className="w-full max-w-7xl mx-auto px-6 md:px-10 py-32 text-center min-h-screen">
        <p className="text-destructive font-mono text-sm">
          Could not fetch blogs. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col pt-24">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
        <TextReveal as="p" className="eyebrow mb-4">
          Blog & Writeups
        </TextReveal>
        <TextReveal as="h1" delay={0.1}>
          <span className="font-display text-5xl md:text-6xl lg:text-7xl italic text-foreground leading-[1.05]">
            What we&apos;ve learned, written&nbsp;down.
          </span>
        </TextReveal>
        <TextReveal
          as="p"
          delay={0.3}
          className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed"
        >
          CTF writeups, vulnerability research, and technical articles from
          our members.
        </TextReveal>
      </section>

      {/* Blog Index */}
      <section className="border-t border-border">
        <div className="max-w-4xl mx-auto px-6 md:px-10 py-16 md:py-24">
          {!blogs || blogs.length === 0 ? (
            <p className="text-muted-foreground font-mono text-sm">
              No posts yet. Check back soon.
            </p>
          ) : (
            <div>
              {blogs.map((blog, i) => (
                <SectionReveal key={blog.id} delay={i * 0.05}>
                  <article className="group border-b border-border py-8 first:pt-0 last:border-b-0">
                    {/* Date + Type */}
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-mono text-xs text-muted-foreground">
                        {formatDateShort(blog.created_at)}
                      </span>
                      <span className="font-mono text-[11px] uppercase tracking-wider text-primary">
                        {blog.type === "markdown" ? "Article" : "PDF"}
                      </span>
                    </div>

                    {/* Title */}
                    <Link
                      href={`/blog/${blog.slug || blog.id}`}
                      className="block"
                    >
                      <h2 className="font-sans text-xl md:text-2xl font-medium text-foreground group-hover:text-primary transition-colors duration-200 leading-snug">
                        {blog.title}
                      </h2>
                    </Link>

                    {/* Description */}
                    {blog.description && (
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-3 max-w-2xl">
                        {blog.description}
                      </p>
                    )}

                    {/* Meta row */}
                    <div className="mt-3 flex flex-wrap items-center gap-4">
                      {(blog.author || blog.created_by) && (
                        <span className="font-mono text-xs text-foreground/50">
                          by{" "}
                          <span className="text-primary">
                            {blog.author || `@${blog.created_by}`}
                          </span>
                        </span>
                      )}
                      {blog.tags && blog.tags.length > 0 && (
                        <span className="font-mono text-xs text-muted-foreground">
                          {blog.tags.join(", ")}
                        </span>
                      )}
                      <Link
                        href={`/blog/${blog.slug || blog.id}`}
                        className="ml-auto font-mono text-xs text-foreground/40 hover:text-primary transition-colors duration-200"
                      >
                        Read →
                      </Link>
                    </div>
                  </article>
                </SectionReveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
