import { createClient } from "@/utils/supabase/server";
import { TextReveal } from "@/components/TextReveal";
import { SectionReveal } from "@/components/SectionReveal";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";

export const revalidate = 3600;

type Resource = {
  id: string;
  created_at: string;
  heading: string;
  description: string;
  category: string;
  link: string;
};

const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
};

export default async function Resources() {
  const supabase = await createClient();

  const { data: resources, error } = await supabase
    .from("resources")
    .select(
      `
      id,
      created_at,
      heading,
      description,
      link,
      category
      `
    )
    .order("category", { ascending: true });

  if (error) {
    console.error("Error fetching resources:", error);
    return (
      <div className="w-full max-w-7xl mx-auto px-6 md:px-10 py-32 text-center min-h-screen">
        <p className="text-destructive font-mono text-sm">
          Could not fetch resources. Please try again later.
        </p>
      </div>
    );
  }

  if (!resources || resources.length === 0) {
    return (
      <div className="w-full flex flex-col pt-24">
        <section className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
          <TextReveal as="h1">
            <span className="font-display text-5xl md:text-6xl italic text-foreground">
              Resources
            </span>
          </TextReveal>
          <p className="mt-6 text-muted-foreground">No resources found.</p>
        </section>
      </div>
    );
  }

  // Group resources by category
  const groupedResources: Record<string, typeof resources> = {};
  resources.forEach((resource) => {
    const { category } = resource;
    if (!groupedResources[category]) {
      groupedResources[category] = [];
    }
    groupedResources[category].push(resource);
  });

  const categories = Object.keys(groupedResources);

  return (
    <div className="w-full flex flex-col pt-24">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
        <TextReveal as="p" className="eyebrow mb-4">
          Resources
        </TextReveal>
        <TextReveal as="h1" delay={0.1}>
          <span className="font-display text-5xl md:text-6xl lg:text-7xl italic text-foreground leading-[1.05]">
            Start here, go&nbsp;anywhere.
          </span>
        </TextReveal>
        <TextReveal
          as="p"
          delay={0.3}
          className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed"
        >
          Curated resources to get you started and advance in information
          security.
        </TextReveal>
      </section>

      {/* Layout: Sidebar + Content */}
      <section className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24 flex flex-col md:flex-row gap-12">
          {/* Sidebar */}
          <aside className="md:w-1/4 flex-shrink-0">
            <div className="sticky top-24 border border-border p-5">
              <h3 className="eyebrow mb-4">Categories</h3>
              <nav>
                <ul className="space-y-2">
                  {categories.map((category) => (
                    <li key={category}>
                      <a
                        href={`#${slugify(category)}`}
                        className="flex items-center text-sm text-foreground/60 hover:text-primary transition-all duration-200 hover:translate-x-1"
                      >
                        <span className="mr-2 font-mono text-primary text-xs">
                          #
                        </span>
                        {category}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="md:w-3/4">
            <div className="space-y-16">
              {Object.entries(groupedResources).map(
                ([category, items], groupIndex) => (
                  <SectionReveal
                    key={category}
                    delay={groupIndex * 0.1}
                  >
                    <section
                      id={slugify(category)}
                      className="scroll-mt-28"
                    >
                      <h2 className="font-display text-2xl md:text-3xl italic text-foreground mb-1">
                        {category}
                      </h2>
                      <div className="w-16 h-px bg-primary mb-8" />

                      <div className="space-y-0 border border-border">
                        {items.map((res) => (
                          <a
                            key={res.link}
                            href={res.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group block px-5 py-4 border-b border-border last:border-b-0 hover:bg-[hsl(var(--surface))] transition-colors duration-150"
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <h3 className="font-sans text-base font-medium text-foreground group-hover:text-primary transition-colors duration-200">
                                  {res.heading}
                                </h3>
                                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                                  {res.description}
                                </p>
                              </div>
                              <ArrowUpRightIcon className="w-4 h-4 text-muted-foreground group-hover:text-primary flex-shrink-0 mt-1 transition-colors duration-200" />
                            </div>
                          </a>
                        ))}
                      </div>
                    </section>
                  </SectionReveal>
                )
              )}
            </div>
          </main>
        </div>
      </section>
    </div>
  );
}
