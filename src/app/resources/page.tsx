"use client";
import React from "react";
import GlitchText from "@/components/GlitchText";
import { resources } from "@/data/resources";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";

// Helper function to create URL-friendly slugs
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

export default function Resources() {
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
    <div className="w-full max-w-7xl mx-auto my-20 flex flex-col items-center">
      {/* Header */}
      <header className="text-center w-full mb-20">
        <GlitchText
          speed={1}
          enableShadows={true}
          enableOnHover={true}
          className="whitespace-nowrap text-6xl md:text-7xl lg:text-8xl"
        >
          Resources
        </GlitchText>
        <p className="mt-6 text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
          Curated collection of resources to get you started and help you
          advance in the field of Information Security.
        </p>
      </header>

      {/* Layout */}
      <div className="w-full flex flex-col md:flex-row gap-12">
        {/* Sidebar */}
        <aside className="md:w-1/4">
          <div className="sticky top-24 p-6 rounded-xl border border-white/10 bg-black/20 backdrop-blur-sm shadow-lg">
            <h3 className="text-xl font-bold text-primary mb-5">Categories</h3>
            <nav>
              <ul className="space-y-3">
                {categories.map((category) => (
                  <li key={category}>
                    <a
                      href={`#${slugify(category)}`}
                      className="flex items-center text-lg text-foreground/70 hover:text-primary transition-all duration-300 hover:translate-x-1"
                    >
                      <span className="mr-2 text-primary">#</span> {category}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="md:w-3/4">
          <div className="space-y-20">
            {Object.entries(groupedResources).map(([category, items]) => (
              <section
                key={category}
                id={slugify(category)}
                className="scroll-mt-28"
              >
                <h2 className="text-3xl font-bold text-white mb-8 relative pb-4">
                  {category}
                  <span className="absolute left-0 bottom-0 w-20 h-1 bg-gradient-to-r from-primary to-transparent rounded-full"></span>
                </h2>
                <div className="space-y-8">
                  {items.map((res) => (
                    <a
                      key={res.link}
                      href={res.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative block rounded-xl border border-white/10 bg-black/10 backdrop-blur-sm p-6 transition-all duration-500 hover:border-primary/40 hover:bg-primary/5 hover:shadow-lg"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-2xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                          {res.title}
                        </h3>
                        <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                          {res.category}
                        </span>
                      </div>
                      <p className="text-md text-foreground/70 mb-4 leading-relaxed">
                        {res.description}
                      </p>
                      <span className="flex items-center text-primary group-hover:text-white transition-colors duration-300 text-sm">
                        Learn More <ArrowUpRightIcon className="ml-1 w-4 h-4" />
                      </span>
                    </a>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
