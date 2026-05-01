import { type HTMLMotionProps, motion } from "motion/react";
import type { ReactNode } from "react";

interface AnimatedSectionProps extends HTMLMotionProps<"section"> {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
}

export function AnimatedSection({
  children,
  delay = 0,
  direction = "up",
  className = "",
  ...props
}: AnimatedSectionProps) {
  const directionMap = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { y: 0, x: -40 },
    right: { y: 0, x: 40 },
    none: { y: 0, x: 0 },
  };

  const initial = { opacity: 0, ...directionMap[direction] };
  const animate = { opacity: 1, y: 0, x: 0 };

  return (
    <motion.section
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.4, 0, 0.2, 1] }}
      className={className}
      {...props}
    >
      {children}
    </motion.section>
  );
}

interface AnimatedDivProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
}

export function AnimatedDiv({
  children,
  delay = 0,
  direction = "up",
  className = "",
  ...props
}: AnimatedDivProps) {
  const directionMap = {
    up: { y: 30, x: 0 },
    down: { y: -30, x: 0 },
    left: { y: 0, x: -30 },
    right: { y: 0, x: 30 },
    none: { y: 0, x: 0 },
  };

  const initial = { opacity: 0, ...directionMap[direction] };
  const animate = { opacity: 1, y: 0, x: 0 };

  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.4, 0, 0.2, 1] }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
