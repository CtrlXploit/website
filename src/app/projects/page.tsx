import { createClient } from "@/utils/supabase/server";
import { TextReveal } from "@/components/TextReveal";
import { SectionReveal } from "@/components/SectionReveal";
import { ArrowUpRightIcon, CodeBracketIcon } from "@heroicons/react/24/outline";

export const revalidate = 172800;

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
      <div className="w-full max-w-7xl mx-auto px-6 md:px-10 py-32 text-center min-h-screen">
        <p className="text-destructive font-mono text-sm">
          Could not fetch projects. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col pt-24">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
        <TextReveal as="p" className="eyebrow mb-4">
          Projects
        </TextReveal>
        <TextReveal as="h1" delay={0.1}>
          <span className="font-display text-5xl md:text-6xl lg:text-7xl italic text-foreground leading-[1.05]">
            Tools we&apos;ve built, problems we&apos;ve&nbsp;solved.
          </span>
        </TextReveal>
        <TextReveal
          as="p"
          delay={0.3}
          className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed"
        >
          Open-source security tools, research utilities, and competition
          infrastructure developed by our members.
        </TextReveal>
      </section>

      {/* Projects Grid */}
      <section className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
          {!projects || projects.length === 0 ? (
            <p className="text-muted-foreground font-mono text-sm">
              No projects found.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
              {projects.map((project, i) => (
                <SectionReveal key={project.id} delay={i * 0.08}>
                  <div className="bg-background group flex flex-col h-full">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden bg-[hsl(var(--surface))]">
                      <img
                        src={project.image_url}
                        alt={project.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="font-sans text-lg font-medium text-foreground group-hover:text-primary transition-colors duration-200">
                        {project.name}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed flex-1">
                        {project.short_detail}
                      </p>

                      {/* Tech stack — comma separated, not pills */}
                      <p className="mt-4 font-mono text-xs text-foreground/40">
                        {project.technologies.join(", ")}
                      </p>

                      {/* Actions */}
                      <div className="mt-4 flex gap-3">
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 font-mono text-xs text-foreground/50 hover:text-primary transition-colors duration-200"
                        >
                          <CodeBracketIcon className="w-3.5 h-3.5" />
                          Code
                        </a>
                        {project.live_demo && (
                          <a
                            href={project.live_demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 font-mono text-xs text-foreground/50 hover:text-primary transition-colors duration-200"
                          >
                            <ArrowUpRightIcon className="w-3.5 h-3.5" />
                            Demo
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </SectionReveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
