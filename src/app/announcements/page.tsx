import { createClient } from "@/utils/supabase/server";
import GlitchText from "@/components/GlitchText";
import { CalendarIcon, UserIcon } from "@heroicons/react/24/outline";

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

export default async function Announcements() {
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
    .lte('scheduled_at', new Date().toISOString())
    .order("scheduled_at", { ascending: false });

  if (error) {
    console.error("Error fetching announcements:", error);
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center flex flex-col items-center min-h-screen">
        <p className="text-red-500">
          Could not fetch announcements. Please try again later.
        </p>
      </div>
    );
  }

  if (!announcements || announcements.length === 0) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center flex flex-col items-center min-h-screen">
        <GlitchText
          speed={1}
          enableShadows={true}
          enableOnHover={true}
          className="whitespace-nowrap text-6xl md:text-7xl lg:text-8xl"
        >
          Announcements
        </GlitchText>
        <p className="text-foreground/70 mt-8">No announcements found.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto my-20 flex flex-col items-center">
      <header className="text-center w-full mb-20">
        <GlitchText
          speed={1}
          enableShadows={true}
          enableOnHover={true}
          className="whitespace-nowrap text-6xl md:text-7xl lg:text-8xl"
        >
          Announcements
        </GlitchText>
        <p className="mt-6 text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
          Stay updated with the latest news, events, and important information
          from our community.
        </p>
      </header>

      <div className="w-full max-w-4xl mx-auto">
        <div className="space-y-8">
          {announcements.map((announcement) => (
            <article
              key={announcement.id}
              className="group relative block rounded-xl border border-white/10 bg-black/10 backdrop-blur-sm transition-all duration-500 hover:border-primary/40 hover:bg-primary/5 hover:shadow-lg overflow-hidden"
            >
              {announcement.image_url && (
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={announcement.image_url}
                    alt={announcement.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
              )}

              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-2xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                    {announcement.title}
                  </h3>
                  {announcement.scheduled_at && (
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary whitespace-nowrap ml-4">
                      {new Date(announcement.scheduled_at).toLocaleDateString()}
                    </span>
                  )}
                </div>

                {announcement.description && (
                  <p className="text-md text-foreground/70 mb-6 leading-relaxed">
                    {announcement.description}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-4 text-sm text-foreground/60">
                  <div className="flex items-center">
                    <CalendarIcon className="w-4 h-4 mr-1" />
                    {formatDate(announcement.scheduled_at || announcement.created_at)}
                  </div>
                  {announcement.created_by && (
                    <div className="flex items-center">
                      <UserIcon className="w-4 h-4 mr-1" />
                      <span className="text-primary">
                        @{announcement.created_by}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}