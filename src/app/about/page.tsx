import { Users, Star, Trophy, Shield } from "lucide-react";
import React from "react";

import GlitchText from "@/components/GlitchText";

export default function Members() {
  const levels = {
    root: [
      "TheAlpha",
      "begula03",
      "SRPG",
      "Al13n",
      "hidden_truth",
      "Masrt",
      "naughtyb0y.",
      "v1per",
    ],
    moderator: [
      "4darsh",
      "e4stw1nd",
      "s4ych33se",
      "kannaya",
      "izmelucifer17",
      "Pr0meth3u5",
      "n0tsane",
    ],
    "sys-admin": [
      "bond@james",
      "SPYD3R",
      "_a.p.d_",
      "Cypher",
      "Ace_",
      "ethereum",
      "von",
      "H3lios",
      "samarth471",
      "extreme_substance",
      "_zafeiri",
    ],
    club: [
      "iamgreedy",
      "armoredvortex",
      "AMRyan",
      "MiracleInvoker",
      "bhanu_praharsha",
      "cool_enough",
      "este",
      "Krißhn@",
      "Prisha",
      "parallax_79",
      "the_tenth_spear",
      "venomesh",
    ],
  };

  const levelDetails: Record<
    string,
    {
      name: string;
      icon: JSX.Element;
      color: string;
      borderColor: string;
      gridSpan: string;
    }
  > = {
    root: {
      name: "Root",
      icon: <Shield className="w-6 h-6 text-[#0defd5]" />,
      color: "text-[#0defd5]",
      borderColor: "border-[#0defd5]",
      gridSpan: "lg:col-span-3",
    },
    "sys-admin": {
      name: "Sys-Admin",
      icon: <Star className="w-6 h-6 text-[#db1d5e]" />,
      color: "text-[#db1d5e]",
      borderColor: "border-[#db1d5e]",
      gridSpan: "lg:col-span-2",
    },
    moderator: {
      name: "Moderator",
      icon: <Trophy className="w-6 h-6 text-[#924afa]" />,
      color: "text-[#924afa]",
      borderColor: "border-[#924afa]",
      gridSpan: "lg:col-span-1",
    },
    club: {
      name: "Club",
      icon: <Users className="w-6 h-6 text-[#f1a123]" />,
      color: "text-[#f1a123]",
      borderColor: "border-[#f1a123]",
      gridSpan: "lg:col-span-3",
    },
  };

  // Define the order for the dynamic grid layout
  const levelOrder = ["root", "sys-admin", "moderator", "club"];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center flex flex-col items-center">
      {/* Header */}
      <div className="flex flex-col justify-center items-center w-full relative mb-16">
        <div className="relative z-10">
          <GlitchText
            speed={1}
            enableShadows={true}
            enableOnHover={true}
            className="whitespace-nowrap mb-8"
          >
            Members
          </GlitchText>
        </div>
      </div>

      {/* Members Grid with a dynamic masonry-style layout */}
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8">
        {levelOrder.map((levelKey) => {
          const levelInfo = levelDetails[levelKey];
          const members = levels[levelKey as keyof typeof levels];
          return (
            <div
              key={levelKey}
              className={`glass rounded-xl p-6 flex flex-col border border-transparent/10 hover:border-opacity-30 ${levelInfo.borderColor} transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-2xl ${levelInfo.gridSpan}`}
            >
              <div className="flex items-center gap-3 mb-6">
                {levelInfo.icon}
                <h2
                  className={`text-2xl md:text-3xl font-bold ${levelInfo.color}`}
                >
                  {levelInfo.name}
                </h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {members.map((username) => (
                  <span
                    key={username}
                    className="bg-primary/5 text-foreground/90 px-3 py-1.5 rounded-full text-sm font-medium glass-subtle"
                  >
                    {username}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
