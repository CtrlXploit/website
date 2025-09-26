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
    const { category } = resource; // now TypeScript knows resource is a Resource
    if (!groupedResources[category]) {
      groupedResources[category] = [];
    }
    groupedResources[category].push(resource);
  });

  const categories = Object.keys(groupedResources);

  return (
    // This is the new parent container that creates the overall box
    <div className="w-full max-w-7xl mx-auto my-16 bg-[#0b0b0b] border border-white/10 rounded-2xl p-8 md:p-12">
      {/* The original content starts here, with padding removed as it's now on the parent */}
      <div className="w-full">
        {/* Header */}
        <header className="text-center w-full relative mb-16">
          <GlitchText
            speed={1}
            enableShadows={true}
            enableOnHover={true}
            className="whitespace-nowrap mb-6 text-6xl md:text-7xl lg:text-8xl"
          >
            Resources
          </GlitchText>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
            Curated Collection of resources to get you started and help you
            advance in the field of Information Security.
          </p>
        </header>

        {/* Documentation Layout */}
        <div className="w-full flex flex-col md:flex-row gap-12">
          {/* Sidebar */}
          <aside className="md:w-1/4">
            <div className="sticky top-24 p-6 bg-black/20 border border-white/10 rounded-xl shadow-lg backdrop-blur-sm">
              <h3 className="text-xl font-bold text-primary mb-5">
                Categories
              </h3>
              <nav>
                <ul className="space-y-3">
                  {categories.map((category) => (
                    <li key={category}>
                      <a
                        href={`#${slugify(category)}`}
                        className="flex items-center text-lg text-foreground/70 hover:text-primary transition-all duration-300 transform hover:translate-x-1"
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
            <div className="space-y-16">
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
                        className="group relative block bg-gradient-to-br from-black/10 to-black/5 border border-white/10 rounded-xl p-6 w-full text-left transition-all duration-500 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-br before:from-primary/20 before:to-transparent before:opacity-0 group-hover:before:opacity-100 before:transition-opacity before:duration-500"
                      >
                        <div className="relative z-10">
                          <div className="flex items-start justify-between mb-3">
                            <h3
                              className={`text-2xl font-semibold ${"text-foreground"} group-hover:text-primary transition-colors duration-300`}
                            >
                              {res.title}
                            </h3>
                            <span
                              className={`px-3 py-1 text-xs font-medium rounded-full ml-4 opacity-80`}
                            >
                              {res.category}
                            </span>
                          </div>
                          <p className="text-md text-foreground/70 mb-4 leading-relaxed">
                            {res.description}
                          </p>
                          <span className="flex items-center text-primary group-hover:text-white transition-colors duration-300 text-sm">
                            Learn More{" "}
                            <ArrowUpRightIcon className="ml-1 w-4 h-4" />
                          </span>
                        </div>
                      </a>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
