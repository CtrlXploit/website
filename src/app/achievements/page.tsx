"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import GlitchText from "@/components/GlitchText";
import { ArrowUpRightIcon, CodeBracketIcon } from "@heroicons/react/24/outline";
// import Image from "next/image";

type Achievement = {
  id: number;
  title: string;
  img_url: string;
  description: string;
};

export default function Achievments() {
  const supabase = createClient();
  const [achievements, setAchievements] = useState<Achievement[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch projects on mount
  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const { data, error } = await supabase
          .from("achievements")
          .select("*")
          .order("id", { ascending: true });
        if (error) throw error;
        setAchievements(data || []);
      } catch (err: any) {
        console.error("Error fetching achievements:", err);
        setError("Could not fetch achievements. Please try again later.");
      }
    };
    fetchAchievements();
  }, [supabase]);

  if (error) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center flex flex-col items-center min-h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!achievements) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center flex flex-col items-center min-h-screen">
        <p>Loading achievements...</p>
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

  // Add this right before your final return statement
  console.log("Supabase Data:", achievements);

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
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={achievement.img_url}
                  alt={achievement.title}
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>

              {/* Project Content */}
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300 mb-2">
                    {achievement.title}
                  </h3>
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
