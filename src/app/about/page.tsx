import { getPublicSupabase } from "@/utils/supabase/public";
import GlitchText from "@/components/GlitchText";
import { Trophy, Zap, Users, Crown } from "lucide-react";

// Cache for 24 hours, refreshed on-demand when admin updates members
export const revalidate = 86400;

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
  levels: Level | Level[] | null;
};

function getLevelInfo(levels: Level | Level[] | null | undefined): Level | null {
  if (!levels) return null;
  return Array.isArray(levels) ? levels[0] || null : levels;
}

// Icon mapping for database icon names
const iconMap: Record<string, JSX.Element> = {
  trophy: <Trophy className="w-8 h-8" />,
  zap: <Zap className="w-8 h-8" />,
  users: <Users className="w-8 h-8" />,
  crown: <Crown className="w-8 h-8" />,
};

// Function to get icon component from database string
function getIcon(iconName: string | undefined): JSX.Element {
  if (!iconName) return <Users className="w-8 h-8" />;

  const cleanIconName = iconName.toLowerCase().replace(/[^\w]/g, "");
  return iconMap[cleanIconName] || <Users className="w-8 h-8" />;
}

export default async function AboutPage() {
  const supabase = getPublicSupabase();
  let members: any[] = [];

  if (supabase) {
    const { data, error } = await supabase
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
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center flex flex-col items-center min-h-screen">
          <p className="text-red-500">
            Could not fetch team members. Please try again later.
          </p>
        </div>
      );
    }
    members = data || [];
  }

  if (members.length === 0) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center flex flex-col items-center min-h-screen">
        <GlitchText
          speed={1}
          enableShadows={true}
          enableOnHover={true}
          className="whitespace-nowrap mb-6"
        >
          Our Team
        </GlitchText>
        <p>No team members found.</p>
      </div>
    );
  }

  // Group members by their level
  const membersByLevel = members.reduce((acc, member) => {
    const levelInfo = getLevelInfo(member.levels);
    const levelName = levelInfo?.name || "Member";
    if (!acc[levelName]) {
      acc[levelName] = {
        levelInfo,
        members: [],
      };
    }
    acc[levelName].members.push(member);
    return acc;
  }, {} as Record<string, { levelInfo: Level | null; members: Member[] }>);

  // Convert to array and sort by level order (you might want to add an order field to your levels table)
  const levelGroups = Object.entries(membersByLevel);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center flex flex-col items-center min-h-screen">
      {/* Header */}
      <div className="flex flex-col justify-center items-center w-full relative mb-16">
        <div className="relative z-10">
          <GlitchText
            speed={1}
            enableShadows={true}
            enableOnHover={true}
            className="whitespace-nowrap mb-6"
          >
            Our Team
          </GlitchText>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Meet the talented individuals in our Club.
          </p>
        </div>
      </div>

      {/* Members Grid */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
        {levelGroups.map(
          ([levelName, { levelInfo, members: levelMembers }], index) => {
            return (
              <div
                key={levelName}
                className={`group relative bg-black/5 backdrop-blur-sm border-2 ${
                  levelInfo?.border_color || "border-gray-200"
                } rounded-2xl p-8 transition-all duration-500 hover:bg-black/30`}
                style={{
                  animationDelay: `${index * 150}ms`,
                  animation: "fadeInUp 0.6s ease-out forwards",
                }}
              >
                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className={`transition-transform duration-300 group-hover:scale-110 ${
                      levelInfo?.color || "text-gray-600"
                    }`}
                  >
                    {getIcon(levelInfo?.icon)}
                  </div>
                  <div className="text-left">
                    <h2
                      className={`text-2xl font-bold ${
                        levelInfo?.color || "text-gray-600"
                      }`}
                    >
                      {levelName}
                    </h2>
                  </div>
                  <div className="ml-auto">
                    <span className="text-foreground/60 bg-white/5 px-3 py-1 rounded-full text-sm font-medium">
                      {levelMembers.length}
                    </span>
                  </div>
                </div>

                {/* Members */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {levelMembers.map((member, memberIndex) => (
                    <div
                      key={member.id}
                      className="group/member relative bg-white/5 backdrop-blur-sm hover:bg-white/10 border border-white/5 hover:border-white/10 px-4 py-3 rounded-xl transition-all duration-300 cursor-pointer"
                      style={{
                        animationDelay: `${index * 150 + memberIndex * 50}ms`,
                        animation: "slideInFromBottom 0.4s ease-out forwards",
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-foreground/90 group-hover/member:text-foreground text-sm font-medium truncate">
                          {member.username}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}
