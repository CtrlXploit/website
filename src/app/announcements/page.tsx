import { createClient } from "@/utils/supabase/server";
import { TextReveal } from "@/components/TextReveal";
import { SectionReveal } from "@/components/SectionReveal";
import { cookies } from "next/headers";

export const revalidate = 0;

type Announcement = {
  id: string;
  created_at: string;
  title: string;
  description: string;
  image_url: string | null;
  created_by: string | null;
  scheduled_at: string | null;
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

const formatDateShort = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
};

export default async function Announcements() {
  cookies();

  const supabase = await createClient();

  const { data: announcements, error } = await supabase
    .from("announcements")
    .select(
      `
      id,
      created_at,
      title,
      description,
      image_url,
      created_by,
      scheduled_at
      `
    )
    .lte("scheduled_at", "now()")
    .order("scheduled_at", { ascending: false });

  if (error) {
    console.error("Error fetching announcements:", error);
    return (
      <div className="w-full max-w-7xl mx-auto px-6 md:px-10 py-32 text-center min-h-screen">
        <p className="text-destructive font-mono text-sm">
          Could not fetch announcements. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col pt-24">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
        <TextReveal as="p" className="eyebrow mb-4">
          Announcements
        </TextReveal>
        <TextReveal as="h1" delay={0.1}>
          <span className="font-display text-5xl md:text-6xl lg:text-7xl italic text-foreground leading-[1.05]">
            Latest from the&nbsp;team.
          </span>
        </TextReveal>
        <TextReveal
          as="p"
          delay={0.3}
          className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed"
        >
          News, events, and updates from the Infosec division.
        </TextReveal>
      </section>

      {/* Announcements List */}
      <section className="border-t border-border">
        <div className="max-w-4xl mx-auto px-6 md:px-10 py-16 md:py-24">
          {!announcements || announcements.length === 0 ? (
            <p className="text-muted-foreground font-mono text-sm">
              No announcements yet.
            </p>
          ) : (
            <div>
              {announcements.map((announcement, i) => (
                <SectionReveal key={announcement.id} delay={i * 0.05}>
                  <article className="group border-b border-border py-8 first:pt-0 last:border-b-0">
                    {/* Image */}
                    {announcement.image_url && (
                      <div className="relative h-48 md:h-64 overflow-hidden mb-5 bg-[hsl(var(--surface))]">
                        <img
                          src={announcement.image_url}
                          alt={announcement.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    {/* Date */}
                    <span className="font-mono text-xs text-muted-foreground">
                      {formatDateShort(
                        announcement.scheduled_at || announcement.created_at
                      )}
                    </span>

                    {/* Title */}
                    <h2 className="mt-2 font-sans text-xl md:text-2xl font-medium text-foreground leading-snug">
                      {announcement.title}
                    </h2>

                    {/* Description */}
                    {announcement.description && (
                      <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-2xl">
                        {announcement.description}
                      </p>
                    )}

                    {/* Author */}
                    {announcement.created_by && (
                      <span className="mt-3 inline-block font-mono text-xs text-foreground/50">
                        by{" "}
                        <span className="text-primary">
                          @{announcement.created_by}
                        </span>
                      </span>
                    )}
                  </article>
                </SectionReveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}