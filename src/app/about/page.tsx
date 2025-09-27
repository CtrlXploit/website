"use client";
import React from "react";
import GlitchText from "@/components/GlitchText";
import { levels, levelDetails, levelOrder } from "@/data/members";

export default function Members() {
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
