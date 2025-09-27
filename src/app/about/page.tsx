"use client";
import { Users, Trophy, Crown, Zap } from "lucide-react";
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
    }
  > = {
    root: {
      name: "Root",
      icon: <Crown className="w-6 h-6" />,
      color: "text-emerald-400",
      borderColor: "border-emerald-400/30 hover:border-emerald-400/60",
    },
    moderator: {
      name: "Moderator",
      icon: <Trophy className="w-6 h-6" />,
      color: "text-purple-400",
      borderColor: "border-purple-400/30 hover:border-purple-400/60",
    },
    "sys-admin": {
      name: "Sys-Admin",
      icon: <Zap className="w-6 h-6" />,
      color: "text-rose-400",
      borderColor: "border-rose-400/30 hover:border-rose-400/60",
    },
    club: {
      name: "Club",
      icon: <Users className="w-6 h-6" />,
      color: "text-amber-400",
      borderColor: "border-amber-400/30 hover:border-amber-400/60",
    },
  };

  const levelOrder = ["root", "moderator", "sys-admin", "club"];

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
            Meet the talented individuals behind CtrlXploit, organized by their
            roles and expertise levels
          </p>
        </div>
      </div>

      {/* Members Grid */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
        {levelOrder.map((levelKey, index) => {
          const levelInfo = levelDetails[levelKey];
          const members = levels[levelKey as keyof typeof levels];
          return (
            <div
              key={levelKey}
              className={`group relative bg-black/5 backdrop-blur-sm border-2 ${levelInfo.borderColor} rounded-2xl p-8 transition-all duration-500 hover:bg-black/30`}
              style={{
                animationDelay: `${index * 150}ms`,
                animation: "fadeInUp 0.6s ease-out forwards",
              }}
            >
              {/* Header */}
              <div className="flex items-center gap-4 mb-6">
                <div
                  className={`${levelInfo.color} transition-transform duration-300 group-hover:scale-110`}
                >
                  {levelInfo.icon}
                </div>
                <div className="text-left">
                  <h2 className={`text-2xl font-bold ${levelInfo.color}`}>
                    {levelInfo.name}
                  </h2>
                </div>
                <div className="ml-auto">
                  <span className="text-foreground/60 bg-white/5 px-3 py-1 rounded-full text-sm font-medium">
                    {members.length}
                  </span>
                </div>
              </div>

              {/* Members */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {members.map((username, memberIndex) => (
                  <div
                    key={username}
                    className="group/member relative bg-white/5 backdrop-blur-sm hover:bg-white/10 border border-white/5 hover:border-white/10 px-4 py-3 rounded-xl transition-all duration-300 cursor-pointer"
                    style={{
                      animationDelay: `${index * 150 + memberIndex * 50}ms`,
                      animation: "slideInFromBottom 0.4s ease-out forwards",
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${levelInfo.color.replace(
                          "text-",
                          "bg-"
                        )} opacity-60 group-hover/member:opacity-100 transition-opacity`}
                      />
                      <span className="text-foreground/90 group-hover/member:text-foreground text-sm font-medium truncate">
                        {username}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
