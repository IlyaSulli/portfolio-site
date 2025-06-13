"use client";
import { motion, useAnimationFrame, useMotionValue } from "motion/react";
import { useRef } from "react";

export default function ScrollingTitle() {
  const phrases = [
    "Software Developer",
    "App Developer",
    "UI Designer",
    "Web Developer",
    "Frontend Developer",
    "UX Designer",
    "Mobile Developer",
  ];
  const longPhrases = Array(2).fill(phrases).flat();

  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);

  useAnimationFrame((t, delta) => {
    const container = containerRef.current;

    if (!container) return;

    const velocity = 0.1; // 100px /sec

    const prev = x.get();
    const next: number = prev - delta * velocity;
    const resetAt: number = -container.scrollWidth / 2; // scroll back when 1 loop is out

    x.set(next <= resetAt ? 0 : next);
  });

  return (
    <div className="relative w-full overflow-hidden py-4">
      <motion.div
        ref={containerRef}
        className="flex whitespace-nowrap"
        style={{ x, willChange: "transform" }}
      >
        {longPhrases.map((phrase, index) => (
          <div key={index} className="flex items-center mx-8">
            <span className="text-9xl font-medium text-[color:var(--secondary)]">
              {phrase}
            </span>
            <motion.span
              animate={{ rotate: 360 }}
              className="origin-center text-9xl font-medium text-primary flex items-center ml-16"
              initial={{ rotate: 0 }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            >
              ✱
            </motion.span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
