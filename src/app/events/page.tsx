"use client";

import { TextReveal } from "@/components/TextReveal";
import { SectionReveal } from "@/components/SectionReveal";
import { useState } from "react";
import {
  Calendar,
  Trophy,
  Users,
  Clock,
  Target,
  Zap,
  Gamepad2,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";

interface EventDetail {
  name: string;
  type: string;
  description: string;
  target?: string;
  frequency?: string;
  duration?: string;
  format?: string;
  icon: React.ReactNode;
}

function ExpandableEvent({ event, index }: { event: EventDetail; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-border last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full grid grid-cols-[1fr_auto_auto_auto_32px] gap-4 items-center px-5 py-4 text-left hover:bg-[hsl(var(--surface))] transition-colors duration-150 group"
      >
        <span className="font-sans text-sm font-medium text-foreground group-hover:text-primary transition-colors">
          {event.name}
        </span>
        <span className="font-mono text-xs text-muted-foreground hidden md:block w-40 text-right">
          {event.type}
        </span>
        <span className="font-mono text-xs text-muted-foreground hidden md:block w-28 text-right">
          {event.target || "—"}
        </span>
        <span className="font-mono text-xs text-muted-foreground hidden md:block w-28 text-right">
          {event.frequency || event.duration || event.format || "—"}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="px-5 pb-5 pt-1">
          <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
            {event.description}
          </p>
          <div className="flex flex-wrap gap-4 mt-3 md:hidden">
            {event.target && (
              <span className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
                <Users className="w-3 h-3" /> {event.target}
              </span>
            )}
            {(event.frequency || event.duration) && (
              <span className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
                <Clock className="w-3 h-3" /> {event.frequency || event.duration}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function EventsPage() {
  const mainEvent = {
    name: "Pearl CTF",
    type: "Jeopardy Style CTF",
    organizer: "CyberLabs, IIT (ISM) Dhanbad",
    description:
      "Pearl CTF is our flagship global cybersecurity competition, featuring challenges from various categories including Web exploitation, Pwn, Forensics, Reverse Engineering, Cryptography, and more.",
    prizePool: "$1000",
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
  };

  const otherEvents: EventDetail[] = [
    {
      name: "COTD",
      type: "Daily Challenge",
      description:
        "Challenge of the Day — A daily cybersecurity challenge event specifically designed for first-year students to build their skills progressively.",
      target: "First Years",
      frequency: "Daily",
      icon: <Calendar className="w-4 h-4" />,
    },
    {
      name: "Unixit",
      type: "Wargame",
      description:
        "An interactive wargaming platform designed to introduce first-year students to practical cybersecurity scenarios and hands-on learning.",
      target: "First Years",
      format: "Interactive",
      icon: <Gamepad2 className="w-4 h-4" />,
    },
    {
      name: "Ascension Arcade",
      type: "Wargame",
      description:
        "An advanced wargaming platform featuring progressive challenges that test and enhance cybersecurity skills across multiple difficulty levels.",
      target: "All Students",
      format: "Progressive",
      icon: <Target className="w-4 h-4" />,
    },
    {
      name: "WOC",
      type: "Hackathon & Recruitment",
      description:
        "Winter of Code — A month-long intensive hackathon and recruitment contest designed specifically for first-year students to showcase their skills and join our community.",
      target: "First Years",
      duration: "1 Month",
      icon: <Zap className="w-4 h-4" />,
    },
  ];

  return (
    <div className="w-full flex flex-col pt-24">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
        <TextReveal as="p" className="eyebrow mb-4">
          Events
        </TextReveal>
        <TextReveal as="h1" delay={0.1}>
          <span className="font-display text-5xl md:text-6xl lg:text-7xl italic text-foreground leading-[1.05]">
            Competitions, workshops, and&nbsp;wargames.
          </span>
        </TextReveal>
        <TextReveal
          as="p"
          delay={0.3}
          className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed"
        >
          From daily challenges to global CTFs — events designed for every
          skill level.
        </TextReveal>
      </section>

      {/* Pearl CTF — Flagship */}
      <section className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
          <SectionReveal>
            <p className="eyebrow mb-8">Flagship Event</p>
            <div className="border-l-2 border-primary pl-8 md:pl-12">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Trophy className="w-5 h-5 text-primary" />
                    <span className="font-mono text-xs text-primary uppercase tracking-wider">
                      {mainEvent.status}
                    </span>
                  </div>
                  <h2 className="font-display text-4xl md:text-5xl italic text-foreground">
                    {mainEvent.name}
                  </h2>
                  <p className="mt-1 font-mono text-sm text-muted-foreground">
                    {mainEvent.type} · {mainEvent.organizer}
                  </p>
                  <p className="mt-4 text-foreground/70 leading-relaxed max-w-xl">
                    {mainEvent.description}
                  </p>
                  <p className="mt-4 font-mono text-sm text-muted-foreground">
                    Categories:{" "}
                    <span className="text-foreground/60">
                      {mainEvent.categories.join(", ")}
                    </span>
                  </p>
                </div>
                <div className="flex flex-col gap-3 flex-shrink-0">
                  <div className="font-mono text-sm text-primary border border-primary/30 px-4 py-2 text-center">
                    Prize Pool: {mainEvent.prizePool}
                  </div>
                  <a
                    href={mainEvent.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-sm text-foreground/60 border border-border px-4 py-2 text-center hover:border-foreground/30 hover:text-foreground transition-all duration-200"
                  >
                    pearlctf.in →
                  </a>
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Regular Events — Tabular */}
      <section className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
          <SectionReveal>
            <p className="eyebrow mb-8">Regular Events</p>

            <div className="border border-border">
              {/* Table Header */}
              <div className="hidden md:grid grid-cols-[1fr_auto_auto_auto_32px] gap-4 items-center px-5 py-3 bg-[hsl(var(--surface))] border-b border-border">
                <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  Event
                </span>
                <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground w-40 text-right">
                  Type
                </span>
                <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground w-28 text-right">
                  Target
                </span>
                <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground w-28 text-right">
                  Format
                </span>
                <span className="w-4" />
              </div>

              {/* Event Rows */}
              {otherEvents.map((event, i) => (
                <ExpandableEvent key={event.name} event={event} index={i} />
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <SectionReveal>
            <h2 className="font-display text-3xl md:text-4xl italic text-foreground">
              Ready to compete?
            </h2>
            <p className="mt-3 text-muted-foreground max-w-md">
              No prior experience required. Start with daily challenges and
              work your way up to global competitions.
            </p>
          </SectionReveal>
          <SectionReveal delay={0.2}>
            <Link
              href="/join-us"
              className="font-mono text-sm text-primary border border-primary/40 px-6 py-2.5 hover:bg-primary/10 transition-all duration-200"
            >
              Join Us →
            </Link>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}
