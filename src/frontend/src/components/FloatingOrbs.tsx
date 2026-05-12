import { motion } from "motion/react";

const orbs = [
  {
    id: 1,
    size: 400,
    x: "10%",
    y: "5%",
    color: "oklch(0.68 0.28 300 / 0.12)",
    duration: 14,
  },
  {
    id: 2,
    size: 300,
    x: "70%",
    y: "15%",
    color: "oklch(0.72 0.22 195 / 0.10)",
    duration: 18,
  },
  {
    id: 3,
    size: 250,
    x: "50%",
    y: "55%",
    color: "oklch(0.68 0.28 300 / 0.08)",
    duration: 22,
  },
  {
    id: 4,
    size: 200,
    x: "80%",
    y: "70%",
    color: "oklch(0.72 0.22 195 / 0.09)",
    duration: 16,
  },
];

interface FloatingOrbsProps {
  className?: string;
}

export function FloatingOrbs({ className = "" }: FloatingOrbsProps) {
  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {orbs.map((orb, i) => (
        <motion.div
          key={orb.id}
          className="absolute rounded-full blur-3xl"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            background: orb.color,
            transform: "translate(-50%, -50%)",
          }}
          animate={{
            x: [0, 30 * (i % 2 === 0 ? 1 : -1), -20, 0],
            y: [0, -20, 15, 0],
            scale: [1, 1.05, 0.97, 1],
          }}
          transition={{
            duration: orb.duration,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: i * 2,
          }}
        />
      ))}
    </div>
  );
}
