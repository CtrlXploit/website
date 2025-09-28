// app/admin/members/page.tsx
import GlitchText from "@/components/GlitchText";
import { createClient } from "@/utils/supabase/server";
import MemberList from "./MemberList";

export const revalidate = 0;

export default async function MembersPage() {
  const supabase = await createClient();

  const { data: members, error } = await supabase
    .from("members")
    .select(
      `
      id,
      username,
      level,
      created_at,
      levels (
        id,
        name,
        color,
        border_color,
        icon
      )
    `
    )
    .order("created_at", { ascending: true });

  if (error) {
    console.error(error);
    return (
      <div className="w-full max-w-6xl mx-auto py-16 text-center">
        <p className="text-red-500">Failed to fetch members.</p>
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
        Members
      </GlitchText>
      <p className="text-foreground/70 text-lg mb-12 text-center max-w-2xl">
        Manage members of the club. Add, edit, or remove users as needed.
      </p>

      <MemberList initialMembers={members || []} />
    </div>
  );
}
