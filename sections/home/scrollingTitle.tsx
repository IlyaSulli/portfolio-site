"use client";
import { wrap, motion, useMotionValue, useAnimationFrame } from "motion/react";
import { useRef, useEffect } from "react";
import { fontDisplay } from "@/config/fonts";

export default function ScrollingTitle() {
  const phrases = [
    "Product Designer",
    "Software Engineer",
    "Graphic Designer",
  ];
  const longPhrases = Array(2).fill(phrases).flat();

  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);

  const lastScrollY = useRef(0);
  const scrollVelocity = useRef(0);
  const lastTimestamp = useRef(performance.now());

  // Track scroll velocity over time
  useEffect(() => {
    let animationFrameId: number;

    const updateScrollVelocity = () => {
      const currentY = window.scrollY;
      const now = performance.now();
      const dt = now - lastTimestamp.current;

      const dy = currentY - lastScrollY.current;
      const MAX_VELOCITY = 1; // px/ms cap

      if (dt > 0) {
        const v = Math.max(-MAX_VELOCITY, Math.min(MAX_VELOCITY, dy / dt));

        scrollVelocity.current = v;
      }

      lastScrollY.current = currentY;
      lastTimestamp.current = now;

      animationFrameId = requestAnimationFrame(updateScrollVelocity);
    };

    animationFrameId = requestAnimationFrame(updateScrollVelocity);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // Animate horizontal scroll
  useAnimationFrame((_, delta) => {
    const container = containerRef.current;

    if (!container) return;

    const baseVelocity = 0.05;
    const scrollInfluence = scrollVelocity.current * 1.1;

    scrollVelocity.current *= 0.9;

    const totalVelocity = baseVelocity + scrollInfluence;
    const prev = x.get();
    const next = prev - delta * totalVelocity;

    // Use modulo for seamless looping
    const width = container.scrollWidth / 2;

    const wrappedX = wrap(-width, 0, next);

    x.set(wrappedX);
  });

  return (
    <div className={`${fontDisplay.className} relative w-full overflow-hidden py-4 z-10`}>
      <motion.div
        ref={containerRef}
        className="flex whitespace-nowrap"
        style={{ x, willChange: "transform" }}
      >
        {longPhrases.map((phrase, index) => (
          <div key={index} className="flex items-center mx-8">
            <span className="text-7xl md:text-8xl lg:text-9xl font-black text-[color:var(--secondary)]">
              {phrase}
            </span>
            <motion.span
              animate={{ rotate: 360 }}
              className="origin-center text-7xl md:text-8xl lg:text-9xl font-black text-primary flex items-center ml-16"
              initial={{ rotate: 0 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              ✱
            </motion.span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
