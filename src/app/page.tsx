import { FlowFieldCanvas } from "@/components/FlowFieldCanvas";
import { TextReveal } from "@/components/TextReveal";
import { StatsStrip } from "@/components/StatsStrip";
import { SectionReveal } from "@/components/SectionReveal";
import Link from "next/link";

const stats = [
  { label: "CTFs Played", value: "50+" },
  { label: "Flagship CTF", value: "Pearl CTF" },
  { label: "Members", value: "40+" },
  { label: "Division of", value: "Cyberlabs" },
];

export default function Home() {
  return (
    <div className="w-full flex flex-col">
      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Flow field background */}
        <FlowFieldCanvas />

        {/* Gradient overlay for text readability */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 30%, hsl(240 6% 4%) 80%)",
          }}
        />

        {/* Hero content */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-10 text-center flex flex-col items-center">
          {/* Eyebrow */}
          <TextReveal
            as="p"
            className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-8"
          >
            Information Security @ Cyberlabs
          </TextReveal>

          {/* Main headline */}
          <TextReveal as="h1" delay={0.2}>
            <span className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl italic leading-[1.05] text-foreground">
              We break things
            </span>
            <br />
            <span className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl italic leading-[1.05] text-foreground/70">
              to understand them.
            </span>
          </TextReveal>

          {/* Subtitle */}
          <TextReveal
            as="p"
            delay={0.5}
            className="mt-8 font-sans text-lg md:text-xl text-foreground/50 max-w-xl leading-relaxed"
          >
            The information security division of Cyberlabs at IIT&nbsp;(ISM)
            Dhanbad. We organize workshops, compete in CTFs, and push the
            boundaries of cybersecurity research.
          </TextReveal>

          {/* CTAs */}
          <TextReveal delay={0.7} className="mt-10 flex gap-4">
            <Link
              href="/join-us"
              className="font-mono text-sm text-primary border border-primary/40 px-6 py-2.5 hover:bg-primary/10 transition-all duration-200"
            >
              Join Us →
            </Link>
            <Link
              href="/about"
              className="font-mono text-sm text-foreground/60 border border-border px-6 py-2.5 hover:border-foreground/30 hover:text-foreground transition-all duration-200"
            >
              Learn More
            </Link>
          </TextReveal>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-pulse">
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Scroll
          </span>
          <div className="w-px h-8 bg-gradient-to-b from-muted-foreground/50 to-transparent" />
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <StatsStrip stats={stats} />

      {/* ── WHAT WE DO ── */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32">
        <SectionReveal>
          <p className="eyebrow mb-4">What We Do</p>
          <h2 className="font-display text-4xl md:text-5xl italic text-foreground leading-tight max-w-3xl">
            Offense, defense, and everything the spec sheet
            doesn&apos;t&nbsp;mention.
          </h2>
        </SectionReveal>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
          {[
            {
              title: "CTF Competitions",
              body: "We compete in Capture The Flag competitions worldwide — binary exploitation, reverse engineering, web security, cryptography, and forensics.",
            },
            {
              title: "Pearl CTF",
              body: "Our flagship annual global CTF competition, featuring challenges crafted by our members and attracting teams from around the world.",
            },
            {
              title: "Research & Training",
              body: "Weekly workshops, wargames, vulnerability research, and tool development. We share everything we learn.",
            },
          ].map((item, i) => (
            <SectionReveal key={item.title} delay={i * 0.15}>
              <div className="bg-background p-8 md:p-10 h-full">
                <span className="font-mono text-xs text-primary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-sans text-xl font-medium text-foreground">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {item.body}
                </p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </section>

      {/* ── CTA SECTION ── */}
      <section className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <SectionReveal>
            <p className="eyebrow mb-4">Get Involved</p>
            <h2 className="font-display text-4xl md:text-5xl italic text-foreground leading-tight max-w-lg">
              Curiosity is the only prerequisite.
            </h2>
            <p className="mt-4 text-muted-foreground max-w-md leading-relaxed">
              Whether you&apos;re a complete beginner or an experienced
              researcher, there&apos;s a place for you here.
            </p>
          </SectionReveal>
          <SectionReveal delay={0.2} className="flex gap-4 flex-shrink-0">
            <Link
              href="/join-us"
              className="font-mono text-sm text-primary border border-primary/40 px-6 py-2.5 hover:bg-primary/10 transition-all duration-200"
            >
              Join Us →
            </Link>
            <Link
              href="/events"
              className="font-mono text-sm text-foreground/60 border border-border px-6 py-2.5 hover:border-foreground/30 hover:text-foreground transition-all duration-200"
            >
              View Events
            </Link>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}
