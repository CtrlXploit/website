import GlitchText from "@/components/GlitchText";
import { createClient } from "@/utils/supabase/server";
import ProjectList from "./ProjectList";

export const revalidate = 0;

export default async function ProjectsPage() {
  const supabase = await createClient();

  const { data: projects, error } = await supabase
    .from("projects")
    .select(
      `
      id,
      name,
      short_detail,
      image_url,
      github_url,
      live_demo,
      technologies
    `
    )
    .order("name", { ascending: true });

  if (error) {
    console.error(error);
    return (
      <div className="w-full max-w-6xl mx-auto py-16 text-center">
        <p className="text-red-500">Failed to fetch projects.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col items-center min-h-screen">
      <GlitchText
        speed={1}
        enableShadows
        enableOnHover
        className="whitespace-nowrap mb-8 text-3xl md:text-5xl"
      >
        Projects
      </GlitchText>
      <p className="text-foreground/70 text-lg mb-12 text-center max-w-2xl">
        Manage the club's projects. Add, edit, or remove project entries.
      </p>

      <ProjectList initialProjects={projects || []} />
    </div>
  );
}