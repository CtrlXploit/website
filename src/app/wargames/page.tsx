import { TextReveal } from "@/components/TextReveal";
import Link from "next/link";

export default function Page() {
  return (
    <div className="w-full flex flex-col pt-24">
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24 min-h-[60vh] flex flex-col justify-center">
        <TextReveal as="p" className="eyebrow mb-4">
          Wargames
        </TextReveal>
        <TextReveal as="h1" delay={0.1}>
          <span className="font-display text-5xl md:text-6xl lg:text-7xl italic text-foreground leading-[1.05]">
            Coming soon.
          </span>
        </TextReveal>
        <TextReveal
          as="p"
          delay={0.3}
          className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed"
        >
          Our wargaming platform is under development. In the meantime,
          check out our events and daily challenges.
        </TextReveal>
        <TextReveal delay={0.5} className="mt-8 flex gap-4">
          <Link
            href="/events"
            className="font-mono text-sm text-primary border border-primary/40 px-6 py-2.5 hover:bg-primary/10 transition-all duration-200"
          >
            View Events →
          </Link>
          <Link
            href="/"
            className="font-mono text-sm text-foreground/60 border border-border px-6 py-2.5 hover:border-foreground/30 hover:text-foreground transition-all duration-200"
          >
            Home
          </Link>
        </TextReveal>
      </section>
    </div>
  );
}
