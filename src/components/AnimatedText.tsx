"use client";

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedTextProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export function AnimatedText({ children, className, as = 'div' }: AnimatedTextProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const Tag = as;

  const variants = {
    hidden: { filter: 'blur(10px)', opacity: 0 },
    visible: { filter: 'blur(0px)', opacity: 1 },
  };

  return (
    <Tag ref={ref} className={cn(className)}>
      <motion.span
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={variants}
        transition={{ duration: 0.7, delay: 0.2 }}
        style={{ display: 'inline-block' }}
      >
        {children}
      </motion.span>
    </Tag>
  );
}
