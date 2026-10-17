import { getPublicSupabase } from "@/utils/supabase/public";
import GlitchText from "@/components/GlitchText";

export const revalidate = 86400;

type Achievement = {
  id: number;
  title: string;
  result?: string;
  rank?: string;
  img_url: string;
  description: string;
};

const getBadgeClasses = (rank?: string) => {
  const base =
    "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shrink-0 border";
  switch (rank) {
    case "1st":
      return `${base} bg-amber-400/20 text-amber-400 border-amber-400/30`;
    case "2nd":
      return `${base} bg-blue-400/20 text-blue-400 border-blue-400/30`;
    case "3rd":
      return `${base} bg-orange-500/20 text-orange-500 border-orange-500/30`;
    case "Special":
    default:
      return `${base} bg-emerald-400/20 text-emerald-400 border-emerald-400/30`;
  }
};

export default async function AchievementsPage() {
  const supabase = getPublicSupabase();
  let achievements: Achievement[] = [];
  let error: string | null = null;

  if (supabase) {
    const { data, error: fetchError } = await supabase
      .from("achievements")
      .select("*")
      .order("id", { ascending: true });

    if (fetchError) {
      console.error("Error fetching achievements:", fetchError);
      error = "Could not fetch achievements. Please try again later.";
    } else {
      achievements = data || [];
    }
  }

  if (error) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center flex flex-col items-center min-h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (achievements.length === 0) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center flex flex-col items-center min-h-screen">
        <GlitchText
          speed={1}
          enableShadows={true}
          enableOnHover={true}
          className="whitespace-nowrap text-6xl md:text-7xl lg:text-8xl"
        >
          Achievements
        </GlitchText>
        <p className="text-red-500 mt-8">No achievements found in database.</p>
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
          Achievements
        </GlitchText>
        <p className="mt-6 text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
          Achievements of our club.
        </p>
      </header>

      {/* Achievements Grid */}
      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className="group relative rounded-xl border border-white/10 bg-black/10 backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-primary/40 hover:bg-primary/5 hover:shadow-lg hover:-translate-y-2"
            >
              {/* Achievement Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={
                    achievement.img_url ||
                    "https://via.placeholder.com/400x200?text=No+Image"
                  }
                  alt={achievement.title}
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>

              {/* Achievement Content */}
              <div className="p-6">
                <div className="mb-4">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-2">
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                      {achievement.title}
                    </h3>
                    {achievement.result && (
                      <span className={getBadgeClasses(achievement.rank)}>
                        {achievement.result}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-foreground/70 leading-relaxed">
                    {achievement.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
