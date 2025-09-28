import { createClient } from "@/utils/supabase/server";
import GlitchText from "@/components/GlitchText";
import { ArrowUpRightIcon, CodeBracketIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

// Cache this page and re-fetch data at most once every hour
export const revalidate = 3600;

// Define the Project type to match your Supabase table
type Project = {
  id: number;
  name: string;
  short_detail: string;
  image_url: string;
  github_url: string;
  live_demo: string | null;
  technologies: string[];
};

export default async function Projects() {
  const supabase = await createClient();

  const { data: projects, error } = await supabase
    .from("projects")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error("Error fetching projects:", error);
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center flex flex-col items-center min-h-screen">
        <p className="text-red-500">
          Could not fetch projects. Please try again later.
        </p>
      </div>
    );
  }

  if (!projects || projects.length === 0) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center flex flex-col items-center min-h-screen">
        <GlitchText
          speed={1}
          enableShadows={true}
          enableOnHover={true}
          className="whitespace-nowrap text-6xl md:text-7xl lg:text-8xl"
        >
          Projects
        </GlitchText>
        <p className="text-red-500 mt-8">No projects found in database.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto my-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      {/* Header */}
      <header className="text-center w-full mb-20">
        <GlitchText
          speed={1}
          enableShadows={true}
          enableOnHover={true}
          className="whitespace-nowrap text-6xl md:text-7xl lg:text-8xl"
        >
          Projects
        </GlitchText>
        <p className="mt-6 text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
          Projects made by the members of our division.
        </p>
      </header>

      {/* Projects Grid */}
      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group relative rounded-xl border border-white/10 bg-black/10 backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-primary/40 hover:bg-primary/5 hover:shadow-lg hover:-translate-y-2"
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={project.image_url}
                  alt={project.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>

              {/* Project Content */}
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300 mb-2">
                    {project.name}
                  </h3>
                  <p className="text-sm text-foreground/70 leading-relaxed">
                    {project.short_detail}
                  </p>
                </div>

                {/* Technologies */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs font-medium rounded-md bg-primary/10 text-primary border border-primary/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-foreground bg-white/5 border border-white/10 rounded-md hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                  >
                    <CodeBracketIcon className="w-4 h-4" />
                    Code
                  </a>
                  {project.live_demo && (
                    <a
                      href={project.live_demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90 transition-all duration-300"
                    >
                      <ArrowUpRightIcon className="w-4 h-4" />
                      Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
