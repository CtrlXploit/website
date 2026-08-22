"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface TextRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
}

/**
 * Reveals text with a smooth clip-path mask sweeping left-to-right.
 * Replaces GlitchText with a refined, editorial animation.
 */
export function TextReveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
}: TextRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <Tag ref={ref} className={className}>
      <motion.span
        initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
        animate={
          isInView
            ? { clipPath: "inset(0 0% 0 0)", opacity: 1 }
            : { clipPath: "inset(0 100% 0 0)", opacity: 0 }
        }
        transition={{
          duration: 0.8,
          delay,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        style={{ display: "inline-block" }}
      >
        {children}
      </motion.span>
    </Tag>
  );
}
