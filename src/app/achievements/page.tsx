import { createClient } from "@/utils/supabase/server";
import { TextReveal } from "@/components/TextReveal";
import { SectionReveal } from "@/components/SectionReveal";

export const revalidate = 172800;

type Achievement = {
  id: number;
  title: string;
  img_url: string;
  description: string;
};

export default async function Achievements() {
  const supabase = await createClient();

  const { data: achievements, error } = await supabase
    .from("achievements")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error("Error fetching achievements:", error);
    return (
      <div className="w-full max-w-7xl mx-auto px-6 md:px-10 py-32 text-center min-h-screen">
        <p className="text-destructive font-mono text-sm">
          Could not fetch achievements. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col pt-24">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
        <TextReveal as="p" className="eyebrow mb-4">
          Achievements
        </TextReveal>
        <TextReveal as="h1" delay={0.1}>
          <span className="font-display text-5xl md:text-6xl lg:text-7xl italic text-foreground leading-[1.05]">
            Proof of work.
          </span>
        </TextReveal>
        <TextReveal
          as="p"
          delay={0.3}
          className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed"
        >
          Notable placements, wins, and milestones from our competitions
          and research.
        </TextReveal>
      </section>

      {/* Achievements Grid */}
      <section className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
          {!achievements || achievements.length === 0 ? (
            <p className="text-muted-foreground font-mono text-sm">
              No achievements found.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
              {achievements.map((achievement, i) => (
                <SectionReveal key={achievement.id} delay={i * 0.08}>
                  <div className="bg-background group flex flex-col h-full">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden bg-[hsl(var(--surface))]">
                      <img
                        src={achievement.img_url}
                        alt={achievement.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="font-sans text-lg font-medium text-foreground group-hover:text-primary transition-colors duration-200">
                        {achievement.title}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                        {achievement.description}
                      </p>
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
