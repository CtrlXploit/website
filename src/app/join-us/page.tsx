import { TextReveal } from "@/components/TextReveal";
import { SectionReveal } from "@/components/SectionReveal";
import Link from "next/link";
import { Calendar, MessageCircle, ArrowRight } from "lucide-react";

export default function JoinUs() {
  const steps = [
    {
      num: "01",
      title: "Join Discord",
      body: "Our primary communication channel. Announcements, discussions, and challenge drops happen here.",
    },
    {
      num: "02",
      title: "Winter of Code",
      body: "A month-long hackathon held every December, exclusively for first-year students of IIT (ISM) Dhanbad.",
    },
    {
      num: "03",
      title: "Start Competing",
      body: "Begin with daily challenges (COTD) and wargames. Work your way up to team CTF competitions.",
    },
  ];

  return (
    <div className="w-full flex flex-col pt-24">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
        <TextReveal as="p" className="eyebrow mb-4">
          Join Us
        </TextReveal>
        <TextReveal as="h1" delay={0.1}>
          <span className="font-display text-5xl md:text-6xl lg:text-7xl italic text-foreground leading-[1.05]">
            Your curiosity is enough to&nbsp;start.
          </span>
        </TextReveal>
        <TextReveal
          as="p"
          delay={0.3}
          className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed"
        >
          No prior background is assumed. If you want to learn how systems
          work — and how they break — you belong here.
        </TextReveal>

        {/* CTAs */}
        <TextReveal delay={0.5} className="mt-10 flex flex-wrap gap-4">
          <Link
            href="https://woc.cyberlabs.club/"
            target="_blank"
            className="flex items-center gap-2 font-mono text-sm text-primary border border-primary/40 px-6 py-2.5 hover:bg-primary/10 transition-all duration-200"
          >
            <Calendar className="w-4 h-4" />
            Winter of Code
          </Link>
          <Link
            href="https://discord.gg/sMtk8ePEJB"
            target="_blank"
            className="flex items-center gap-2 font-mono text-sm text-foreground/60 border border-border px-6 py-2.5 hover:border-foreground/30 hover:text-foreground transition-all duration-200"
          >
            <MessageCircle className="w-4 h-4" />
            Join Discord
          </Link>
        </TextReveal>
      </section>

      {/* How It Works */}
      <section className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
          <SectionReveal>
            <p className="eyebrow mb-4">How It Works</p>
            <h2 className="font-display text-3xl md:text-4xl italic text-foreground mb-12">
              Three steps in.
            </h2>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
            {steps.map((step, i) => (
              <SectionReveal key={step.num} delay={i * 0.15}>
                <div className="bg-background p-8 md:p-10 h-full">
                  <span className="font-mono text-xs text-primary">
                    {step.num}
                  </span>
                  <h3 className="mt-3 font-sans text-xl font-medium text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    {step.body}
                  </p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* WOC Detail */}
      <section className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
          <SectionReveal>
            <div className="border-l-2 border-primary pl-8 md:pl-12 max-w-3xl">
              <p className="eyebrow mb-3">Primary Recruitment</p>
              <h2 className="font-display text-3xl md:text-4xl italic text-foreground">
                Winter of Code
              </h2>
              <p className="mt-4 text-foreground/70 leading-relaxed">
                Winter of Code is a{" "}
                <strong className="text-foreground">
                  one-month long hackathon
                </strong>{" "}
                held every December by Cyberlabs. It is{" "}
                <strong className="text-foreground">
                  exclusively for first-year students
                </strong>{" "}
                of IIT (ISM) Dhanbad, providing the perfect opportunity to
                dive into open source, learn new skills, and work on
                exciting projects.
              </p>
              <div className="mt-6 flex gap-4">
                <Link
                  href="https://woc.cyberlabs.club/"
                  target="_blank"
                  className="flex items-center gap-2 font-mono text-sm text-primary hover:underline"
                >
                  woc.cyberlabs.club
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}
