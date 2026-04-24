"use client";

import React from "react";
import { motion, useInView, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface TimelineContentProps {
  children: React.ReactNode;
  animationNum?: number;
  timelineRef?: React.RefObject<HTMLElement | null>;
  customVariants?: Variants;
  className?: string;
  as?: React.ElementType;
}

const defaultVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
    },
  }),
};

export function TimelineContent({
  children,
  animationNum = 0,
  timelineRef,
  customVariants = defaultVariants,
  className,
  as: Component = motion.div,
}: TimelineContentProps) {
  // If timelineRef is provided, we use it for in-view detection
  // but if not, we use a local ref for this specific component
  const localRef = React.useRef(null);
  const isInView = useInView(timelineRef || localRef, { once: true, margin: "-10%" });

  return (
    <Component
      ref={localRef}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={customVariants}
      custom={animationNum}
      className={cn(className)}
    >
      {children}
    </Component>
  );
}
