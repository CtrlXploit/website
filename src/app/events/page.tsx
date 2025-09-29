"use client";
import {
  Calendar,
  Trophy,
  DollarSign,
  Users,
  Clock,
  Target,
  Zap,
  Medal,
  Gamepad2,
} from "lucide-react";
import GlitchText from "@/components/GlitchText";

export default function EventsPage() {
  const mainEvent = {
    name: "Pearl CTF",
    type: "Jeopardy Style CTF",
    organizer: "CyberLabs, IIT (ISM) Dhanbad",
    description:
      "Pearl CTF is our flagship global cybersecurity competition, featuring challenges from various categories including Web exploitation, Pwn, Forensics, Reverse Engineering, Cryptography, and more.",
    prizePool: "1000",
    website: "https://pearlctf.in/",
    status: "Annual Global Event",
    categories: [
      "Web Exploitation",
      "Pwn",
      "Forensics",
      "Reverse Engineering",
      "Cryptography",
      "Misc",
    ],
    icon: <Trophy className="w-8 h-8" />,
    color: "text-emerald-400",
    borderColor: "border-emerald-400/30 hover:border-emerald-400/60",
    bgColor: "bg-emerald-400/5",
  };

  const otherEvents = [
    {
      name: "COTD",
      type: "Daily Challenge",
      description:
        "Challenge of the Day - A daily cybersecurity challenge event specifically designed for first-year students to build their skills progressively.",
      target: "First Year Students",
      frequency: "Daily",
      icon: <Calendar className="w-6 h-6" />,
      color: "text-purple-400",
      borderColor: "border-purple-400/30 hover:border-purple-400/60",
      bgColor: "bg-purple-400/5",
    },
    {
      name: "Unixit",
      type: "Wargame",
      description:
        "An interactive wargaming platform designed to introduce first-year students to practical cybersecurity scenarios and hands-on learning.",
      target: "First Year Students",
      format: "Interactive Learning",
      icon: <Gamepad2 className="w-6 h-6" />,
      color: "text-rose-400",
      borderColor: "border-rose-400/30 hover:border-rose-400/60",
      bgColor: "bg-rose-400/5",
    },
    {
      name: "Ascension Arcade",
      type: "Wargame",
      description:
        "An advanced wargaming platform featuring progressive challenges that test and enhance cybersecurity skills across multiple difficulty levels.",
      target: "All Students",
      format: "Progressive Challenges",
      icon: <Target className="w-6 h-6" />,
      color: "text-amber-400",
      borderColor: "border-amber-400/30 hover:border-amber-400/60",
      bgColor: "bg-amber-400/5",
    },
    {
      name: "WOC",
      type: "Hackathon & Recruitment",
      description:
        "Winter of Code - A month-long intensive hackathon and recruitment contest designed specifically for first-year students to showcase their skills and join our community.",
      target: "First Year Students",
      duration: "1 Month",
      icon: <Zap className="w-6 h-6" />,
      color: "text-blue-400",
      borderColor: "border-blue-400/30 hover:border-blue-400/60",
      bgColor: "bg-blue-400/5",
    },
  ];

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
            Our Events
          </GlitchText>
          <p className="text-lg text-foreground/70 max-w-3xl mx-auto leading-relaxed">
            Discover our cybersecurity events, competitions, and learning
            platforms designed to challenge, educate, and build the next
            generation of security professionals.
          </p>
        </div>
      </div>

      {/* Main Event - Pearl CTF */}
      <section className="w-full mb-16">
        <div className="flex items-center gap-3 mb-8">
          <Medal className="w-8 h-8 text-emerald-400" />
          <h2 className="text-3xl font-bold text-foreground">Flagship Event</h2>
        </div>

        <div
          className={`group relative ${mainEvent.bgColor} backdrop-blur-sm border-2 ${mainEvent.borderColor} rounded-2xl p-8 transition-all duration-500 hover:bg-black/30`}
        >
          {/* Header */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 mb-6">
            <div
              className={`${mainEvent.color} transition-transform duration-300 group-hover:scale-110`}
            >
              {mainEvent.icon}
            </div>
            <div className="flex-1 text-left">
              <div className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-4 mb-2">
                <h3 className={`text-4xl font-bold ${mainEvent.color}`}>
                  {mainEvent.name}
                </h3>
                <span className="bg-emerald-400/20 text-emerald-400 px-3 py-1 rounded-full text-sm font-medium border border-emerald-400/30">
                  {mainEvent.status}
                </span>
              </div>
              <p className="text-foreground/80 text-lg mb-2">
                {mainEvent.type}
              </p>
              <p className="text-foreground/60">{mainEvent.organizer}</p>
            </div>
            <div className="flex flex-col gap-2 text-right">
              <div className="flex items-center gap-2 bg-emerald-400/10 text-emerald-400 px-4 py-2 rounded-lg">
                <DollarSign className="w-5 h-5" />
                <span className="font-bold text-lg">{mainEvent.prizePool}</span>
              </div>
              <a
                href={mainEvent.website}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-400 hover:bg-emerald-500 text-black px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105"
              >
                Visit Website
              </a>
            </div>
          </div>

          {/* Description */}
          <div className="text-left mb-6">
            <p className="text-foreground/80 text-lg leading-relaxed">
              {mainEvent.description}
            </p>
          </div>

          {/* Categories */}
          <div className="text-left">
            <h4 className="text-foreground font-semibold mb-3">
              Challenge Categories:
            </h4>
            <div className="flex flex-wrap gap-2">
              {mainEvent.categories.map((category, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-emerald-400/10 text-emerald-400 text-sm rounded-lg border border-emerald-400/20"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Other Events */}
      <section className="w-full">
        <div className="flex items-center gap-3 mb-8">
          <Calendar className="w-8 h-8 text-primary" />
          <h2 className="text-3xl font-bold text-foreground">Regular Events</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {otherEvents.map((event, index) => (
            <div
              key={event.name}
              className={`group relative ${event.bgColor} backdrop-blur-sm border-2 ${event.borderColor} rounded-2xl p-6 transition-all duration-500 hover:bg-black/30`}
              style={{
                animationDelay: `${index * 150}ms`,
                animation: "fadeInUp 0.6s ease-out forwards",
              }}
            >
              {/* Header */}
              <div className="flex items-start gap-4 mb-4">
                <div
                  className={`${event.color} transition-transform duration-300 group-hover:scale-110`}
                >
                  {event.icon}
                </div>
                <div className="flex-1 text-left">
                  <h3 className={`text-2xl font-bold ${event.color} mb-1`}>
                    {event.name}
                  </h3>
                  <p className="text-foreground/80 font-medium">{event.type}</p>
                </div>
              </div>

              {/* Description */}
              <div className="text-left mb-4">
                <p className="text-foreground/70 leading-relaxed">
                  {event.description}
                </p>
              </div>

              {/* Event Details */}
              <div className="flex flex-wrap gap-2 text-left">
                {event.target && (
                  <div className="flex items-center gap-2 bg-white/5 text-foreground/80 px-3 py-1 rounded-lg text-sm">
                    <Users className="w-4 h-4" />
                    {event.target}
                  </div>
                )}
                {event.frequency && (
                  <div className="flex items-center gap-2 bg-white/5 text-foreground/80 px-3 py-1 rounded-lg text-sm">
                    <Clock className="w-4 h-4" />
                    {event.frequency}
                  </div>
                )}
                {event.duration && (
                  <div className="flex items-center gap-2 bg-white/5 text-foreground/80 px-3 py-1 rounded-lg text-sm">
                    <Clock className="w-4 h-4" />
                    {event.duration}
                  </div>
                )}
                {event.format && (
                  <div className="flex items-center gap-2 bg-white/5 text-foreground/80 px-3 py-1 rounded-lg text-sm">
                    <Target className="w-4 h-4" />
                    {event.format}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="w-full mt-16">
        <div className="glass rounded-2xl p-8 text-center border-2 border-primary/30 hover:border-primary/60 transition-all duration-500">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Ready to Join the Action?
          </h3>
          <p className="text-foreground/70 mb-6 max-w-2xl mx-auto">
            Whether you&apos;re a beginner looking to learn or an expert ready
            to compete, we have events designed for every skill level. Join
            CyberLabs and be part of the cybersecurity community!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/join-us"
              className="bg-card hover:bg-card/70 text-foreground border border-border hover:border-primary/30 px-6 py-3 rounded-lg font-medium transition-all duration-300"
            >
              Join Us!
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
