"use client";

import { motion, useScroll, useSpring } from "framer-motion";

import { useReducedMotion } from "@/hooks/use-reduced-motion";


export function ScrollProgress() {
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smoothed = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 40,
    restDelta: 0.001,
  });

  return (
    <div className="fixed inset-x-0 top-0 z-40 h-[2px] bg-border/40" aria-hidden="true">
      <motion.div
        className="h-full origin-left bg-accent shadow-[0_0_6px_1px] shadow-accent/50"
        style={{ scaleX: reducedMotion ? scrollYProgress : smoothed }}
      />
    </div>
  );
}