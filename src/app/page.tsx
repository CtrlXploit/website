import Link from "next/link";
import { FlowFieldCanvas } from "@/components/FlowFieldCanvas"; // We can keep or remove this. Let's keep it but it should look darker now.
import { TextReveal } from "@/components/TextReveal";
import { SectionReveal } from "@/components/SectionReveal";

import { TerminalAnimation } from "@/components/TerminalAnimation";
import { GlobeAnimation } from "@/components/GlobeAnimation";
import { RadarAnimation } from "@/components/RadarAnimation";


export default function Home() {
  return (
    <div className="w-full flex flex-col pt-32 selection:bg-primary/20">
      {/* ── HERO ── */}
      <section className="relative min-h-[85vh] flex items-center px-6 md:px-10 max-w-[90rem] mx-auto w-full">
        {/* Very faint background numbers/matrix could go here, or we rely on user's graphic */}
        <div className="absolute inset-0 pointer-events-none opacity-5 flex items-center justify-center overflow-hidden font-mono text-[8px] leading-none text-foreground break-all z-0 select-none">
           {/* Fallback pattern mimicking the faint background in screenshot 1 */}
           {Array.from({ length: 150 }).map((_, i) => "10010110010110101001011010101").join(" ")}
        </div>

        <div className="relative z-10 w-full flex flex-col md:flex-row justify-between items-end gap-16 pb-20">
          
          {/* Left Content */}
          <div className="max-w-xl flex flex-col">
            <TextReveal as="h1" delay={0.1} className="font-sans text-5xl md:text-6xl font-medium tracking-tight text-foreground uppercase leading-[1.1] mb-6">
              We Break Things.<br/>
              To Understand Them.
            </TextReveal>
            
            <TextReveal as="p" delay={0.3} className="font-sans text-sm md:text-base text-foreground/70 leading-relaxed mb-8 max-w-md">
              The information security division of Cyberlabs at IIT (ISM) Dhanbad. We organize workshops, compete in CTFs, and push the boundaries of cybersecurity research.
            </TextReveal>

            <TextReveal delay={0.5} className="flex gap-4">
              <Link
                href="/join-us"
                className="font-mono text-xs font-semibold bg-foreground text-background px-6 py-3 uppercase tracking-widest hover:opacity-90 transition-opacity"
              >
                Join Us
              </Link>
              <Link
                href="/about"
                className="font-mono text-xs font-semibold bg-[#1a1a1a] text-foreground px-6 py-3 uppercase tracking-widest hover:bg-[#262626] transition-colors"
              >
                Learn More
              </Link>
            </TextReveal>
          </div>

          {/* Right Stats */}
          <div className="flex flex-col gap-8 md:text-right w-full md:w-auto mt-16 md:mt-0 pb-2">
            {[
              { value: "50+", label: "CTFS PLAYED" },
              { value: "40+", label: "MEMBERS" },
              { value: "1", label: "FLAGSHIP CTF" },
            ].map((stat, i) => (
              <SectionReveal key={stat.label} delay={0.6 + (i * 0.1)} className="flex flex-col items-end md:items-start">
                <span className="font-sans text-4xl md:text-5xl font-medium text-foreground tracking-tight leading-none">{stat.value}</span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-foreground/50 mt-1">{stat.label}</span>
              </SectionReveal>
            ))}
          </div>

        </div>
      </section>


      {/* ── WHAT WE DO (Screenshot 2 Style) ── */}
      <section className="border-t border-border mt-10">
        <div className="max-w-[90rem] mx-auto px-6 md:px-10 py-32 flex flex-col md:flex-row justify-between items-start gap-16">
          <SectionReveal className="flex-1 w-full flex flex-col max-w-xl">
            <h2 className="font-sans text-xl md:text-2xl font-medium uppercase tracking-wide text-foreground mb-16">
              OFFENSE, DEFENSE, RESEARCH
            </h2>

            <div className="flex flex-col gap-12">
              {[
                {
                  title: "CTF COMPETITIONS",
                  body: "We compete in Capture The Flag competitions worldwide — binary exploitation, reverse engineering, web security, cryptography, and forensics.",
                },
                {
                  title: "PEARL CTF",
                  body: "Our flagship annual global CTF competition, featuring challenges crafted by our members and attracting teams from around the world.",
                },
                {
                  title: "RESEARCH & TRAINING",
                  body: "Weekly workshops, wargames, vulnerability research, and tool development. We share everything we learn.",
                },
              ].map((item, i) => (
                <div key={item.title} className="flex flex-col">
                  <h3 className="font-mono text-sm uppercase tracking-widest text-foreground/90 mb-4">{item.title}</h3>
                  <p className="font-sans text-sm text-foreground/60 leading-relaxed max-w-md">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </SectionReveal>

          <SectionReveal delay={0.2} className="w-full md:w-1/2 lg:w-1/3 flex flex-col items-end">
            <span className="font-mono text-xl font-medium text-foreground mb-12">01</span>
            <TerminalAnimation />
          </SectionReveal>
        </div>
      </section>



      {/* ── GLOBE SECTION (Screenshot 4 Style) ── */}
      <section className="border-t border-border">
        <div className="max-w-[90rem] mx-auto px-6 md:px-10 py-32 flex flex-col md:flex-row gap-16">
          <SectionReveal className="w-full md:w-3/5">
             <h2 className="font-sans text-xl md:text-2xl font-medium uppercase tracking-wide text-foreground mb-16 max-w-sm">
                SILENT BY NATURE. POWERFUL BY DESIGN.
             </h2>
             <div className="mt-20">
               <GlobeAnimation />
             </div>
          </SectionReveal>
          
          <SectionReveal delay={0.2} className="w-full md:w-2/5 flex flex-col gap-12">
            {[
               { id: "01", title: "BINARY EXPLOITATION", body: "Before a program executes, it is bound by memory. We teach how to manipulate that memory and hijack control flow." },
               { id: "02", title: "REVERSE ENGINEERING", body: "Deconstruct compiled applications to understand their inner workings, algorithms, and hidden vulnerabilities." },
               { id: "03", title: "WEB SECURITY", body: "The signal passes through complex web architectures. We analyze and exploit modern web applications and APIs." },
               { id: "04", title: "CRYPTOGRAPHY", body: "The clean, secure signal reaches its destination. We study the mathematical foundations of encryption and its flaws." },
            ].map(item => (
              <div key={item.id} className="flex flex-col border-l border-foreground/20 pl-6 pb-6">
                 <span className="font-mono text-sm text-foreground/40 mb-4">{item.id}</span>
                 <h3 className="font-mono text-sm uppercase tracking-widest text-foreground/90 mb-3">{item.title}</h3>
                 <p className="font-sans text-xs text-foreground/50 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </SectionReveal>
        </div>
      </section>

      {/* ── CTA SECTION (Screenshot 5 Style) ── */}
      <section className="max-w-[90rem] mx-auto px-6 md:px-10 py-32">
        <SectionReveal>
          <div className="w-full relative border border-dashed border-border py-24 px-10 md:px-20 min-h-[500px] flex flex-col justify-center overflow-hidden">
            
            <RadarAnimation />

            <div className="relative z-10 max-w-md">
              <h2 className="font-sans text-3xl md:text-4xl font-medium text-foreground leading-[1.2] tracking-tight uppercase mb-6">
                CURIOSITY IS THE ONLY PREREQUISITE.
              </h2>
              <p className="font-sans text-sm text-foreground/60 leading-relaxed mb-10 max-w-xs">
                Whether you&apos;re a complete beginner or an experienced researcher, there&apos;s a place for you here.
              </p>
              
              <div className="flex gap-4">
                <Link
                  href="/join-us"
                  className="font-mono text-xs font-semibold bg-foreground text-background px-6 py-3 uppercase tracking-widest hover:opacity-90 transition-opacity"
                >
                  Join Us
                </Link>
                <Link
                  href="/events"
                  className="font-mono text-xs font-semibold bg-[#1a1a1a] text-foreground px-6 py-3 uppercase tracking-widest hover:bg-[#262626] transition-colors"
                >
                  View Events
                </Link>
              </div>
            </div>
            
            {/* Corner crosshairs for technical feel */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-foreground/30"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-foreground/30"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-foreground/30"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-foreground/30"></div>
          </div>
        </SectionReveal>
      </section>
    </div>
  );
}
