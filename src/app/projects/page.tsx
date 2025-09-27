"use client";
import { useState } from "react";
import { projects } from "@/data/projects";
import { ExternalLink, Github, Search } from "lucide-react";
import GlitchText from "@/components/GlitchText";
import Image from "next/image";

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter projects based on search and technology
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.shortDetail.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const regularProjects = filteredProjects;

  return (
    <div className="w-full max-w-6xl py-12">
      {/* Enhanced Header */}
      <div className="text-center mb-16">
        <GlitchText
          speed={1}
          enableShadows={true}
          enableOnHover={true}
          className="whitespace-nowrap mb-6 text-4xl md:text-5xl lg:text-6xl"
        >
          Our Projects
        </GlitchText>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Explore our collection of cutting-edge cybersecurity tools,
          educational platforms, and open-source contributions that strengthen
          digital security across various domains.
        </p>
      </div>

      {/* Search and Filter Bar */}
      <div className="rounded-xl p-6 mb-12">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 w-full lg:max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>
        </div>
      </div>

      {/* All Projects Section */}
      <section>
        <div className="flex items-center gap-3 mb-8">
          <h2 className="text-3xl font-bold text-foreground">
            All Projects
            <span className="text-sm text-muted-foreground bg-card/50 px-3 py-1 rounded-full border border-border ml-3">
              {regularProjects.length}
            </span>
          </h2>
        </div>

        {regularProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl p-12 text-center">
            <div className="text-muted-foreground text-lg">
              No projects found matching your criteria.
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

function ProjectCard({ project }: { project: (typeof projects)[0] }) {
  return (
    <a
      href={project.liveDemo || project.githubUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-xl border border-white/10 bg-black/20 backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-primary/40 hover:bg-primary/5 hover:shadow-lg"
    >
      {/* Image: edge-to-edge */}
      <div className="relative w-full h-48 overflow-hidden">
        <Image
          width={400}
          height={160}
          src={project.imageUrl}
          alt={project.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-2xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
            {project.name}
          </h3>
        </div>

        <p className="text-md text-foreground/70 mb-4 leading-relaxed line-clamp-3">
          {project.shortDetail}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 3).map((tech, idx) => (
            <span
              key={idx}
              className="px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="px-2 py-1 text-xs font-medium rounded-full bg-white/10 text-foreground/70 border border-white/10">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>

        <div className="flex gap-2">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1 bg-card hover:bg-card/70 text-foreground border border-border hover:border-primary/30 px-3 py-2 rounded-lg text-sm transition-all duration-300"
          >
            <Github className="w-3 h-3" />
            Code
          </a>
          {project.liveDemo && (
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1 bg-primary hover:bg-primary/90 text-primary-foreground px-3 py-2 rounded-lg text-sm transition-all duration-300"
            >
              <ExternalLink className="w-3 h-3" />
              Demo
            </a>
          )}
        </div>
      </div>
    </a>
  );
}
