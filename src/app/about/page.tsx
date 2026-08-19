import { createClient } from "@/utils/supabase/server";
import { TextReveal } from "@/components/TextReveal";
import { SectionReveal } from "@/components/SectionReveal";
import { Trophy, Zap, Users, Crown } from "lucide-react";

export const revalidate = 172800;

type Level = {
  id: string;
  name: string;
  color: string;
  border_color: string;
  icon: string;
};

type Member = {
  id: string;
  username: string;
  created_at: string;
  levels: Level | null;
};

const iconMap: Record<string, JSX.Element> = {
  trophy: <Trophy className="w-4 h-4" />,
  zap: <Zap className="w-4 h-4" />,
  users: <Users className="w-4 h-4" />,
  crown: <Crown className="w-4 h-4" />,
};

function getIcon(iconName: string | undefined): JSX.Element {
  if (!iconName) return <Users className="w-4 h-4" />;
  const cleanIconName = iconName.toLowerCase().replace(/[^\w]/g, "");
  return iconMap[cleanIconName] || <Users className="w-4 h-4" />;
}

export default async function AboutPage() {
  const supabase = await createClient();

  const { data: members, error } = await supabase
    .from("members")
    .select(
      `
      id,
      username,
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
    console.error("Error fetching members:", error);
    return (
      <div className="w-full max-w-7xl mx-auto px-6 md:px-10 py-32 text-center min-h-screen">
        <p className="text-destructive font-mono text-sm">
          Could not fetch team members. Please try again later.
        </p>
      </div>
    );
  }

  // Group members by level
  const membersByLevel = (members || []).reduce(
    (acc, member) => {
      const levelName = member.levels?.name || "Member";
      if (!acc[levelName]) {
        acc[levelName] = {
          levelInfo: member.levels,
          members: [],
        };
      }
      acc[levelName].members.push(member);
      return acc;
    },
    {} as Record<string, { levelInfo: Level | null; members: Member[] }>
  );

  const levelGroups = Object.entries(membersByLevel);

  return (
    <div className="w-full flex flex-col pt-24">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
        <TextReveal as="p" className="eyebrow mb-4">
          The Team
        </TextReveal>
        <TextReveal as="h1" delay={0.1}>
          <span className="font-display text-5xl md:text-6xl lg:text-7xl italic text-foreground leading-[1.05]">
            People behind the&nbsp;exploits.
          </span>
        </TextReveal>
        <TextReveal
          as="p"
          delay={0.3}
          className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed"
        >
          Meet the researchers, competitors, and builders who make up
          Infosec at Cyberlabs. Every skill level, one shared curiosity.
        </TextReveal>
      </section>

      {/* Member Directory */}
      <section className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
          {(!members || members.length === 0) ? (
            <p className="text-muted-foreground">No team members found.</p>
          ) : (
            <div className="space-y-16">
              {levelGroups.map(
                ([levelName, { levelInfo, members: levelMembers }], groupIndex) => (
                  <SectionReveal key={levelName} delay={groupIndex * 0.1}>
                    {/* Level Header */}
                    <div className="flex items-center gap-3 mb-6">
                      <span className={levelInfo?.color || "text-foreground"}>
                        {getIcon(levelInfo?.icon)}
                      </span>
                      <h2
                        className={`font-sans text-xl font-medium ${
                          levelInfo?.color || "text-foreground"
                        }`}
                      >
                        {levelName}
                      </h2>
                      <span className="font-mono text-xs text-muted-foreground ml-auto">
                        {levelMembers.length}{" "}
                        {levelMembers.length === 1 ? "member" : "members"}
                      </span>
                    </div>

                    {/* Member Table */}
                    <div className="border border-border">
                      {/* Table Header */}
                      <div className="hidden md:grid grid-cols-[1fr_auto_auto] gap-4 px-5 py-3 bg-[hsl(var(--surface))] border-b border-border">
                        <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                          Username
                        </span>
                        <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground w-32 text-right">
                          Role
                        </span>
                        <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground w-28 text-right">
                          Joined
                        </span>
                      </div>

                      {/* Table Rows */}
                      {levelMembers.map((member) => (
                        <div
                          key={member.id}
                          className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-2 md:gap-4 px-5 py-3.5 border-b border-border last:border-b-0 hover:bg-[hsl(var(--surface))] transition-colors duration-150 group"
                        >
                          <span className="font-sans text-sm text-foreground group-hover:text-primary transition-colors duration-150">
                            {member.username}
                          </span>
                          <span
                            className={`font-mono text-xs w-32 text-right ${
                              levelInfo?.color || "text-muted-foreground"
                            }`}
                          >
                            {levelName}
                          </span>
                          <span className="font-mono text-xs text-muted-foreground w-28 text-right">
                            {new Date(member.created_at).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                              }
                            )}
                          </span>
                        </div>
                      ))}
                    </div>
                  </SectionReveal>
                )
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
