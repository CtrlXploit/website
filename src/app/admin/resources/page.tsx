// app/admin/resources/page.tsx
import GlitchText from "@/components/GlitchText";
import { createClient } from "@/utils/supabase/server";
import ResourceList from "./ResourceList";

export const revalidate = 0;

export default async function ResourcesPage() {
  const supabase = await createClient();

  const { data: resources, error } = await supabase
    .from("resources")
    .select(
      `
      id,
      heading,
      description,
      category,
      link,
      created_at
    `
    )
    .order("created_at", { ascending: true });

  if (error) {
    console.error(error);
    return (
      <div className="w-full max-w-6xl mx-auto py-16 text-center">
        <p className="text-red-500">Failed to fetch resources.</p>
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
        Resources
      </GlitchText>
      <p className="text-foreground/70 text-lg mb-12 text-center max-w-2xl">
        Manage resources for the club. Add, edit, or remove resources as needed.
      </p>

      <ResourceList initialResources={resources || []} />
    </div>
  );
}
