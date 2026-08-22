"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface Stat {
  label: string;
  value: string;
}

interface StatsStripProps {
  stats: Stat[];
}

/**
 * A horizontal metrics bar with monospace numbers separated by hairlines.
 * Animates in with a stagger effect when scrolled into view.
 */
export function StatsStrip({ stats }: StatsStripProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <div
      ref={ref}
      className="w-full border-y border-border bg-[hsl(var(--surface))]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-5 flex flex-wrap items-center justify-center md:justify-between gap-6 md:gap-0">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className={`flex items-center gap-3 ${
              i < stats.length - 1
                ? "md:border-r md:border-border md:pr-8"
                : ""
            }`}
          >
            <span className="font-mono text-lg md:text-xl font-medium text-primary">
              {stat.value}
            </span>
            <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              {stat.label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
