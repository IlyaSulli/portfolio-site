import { ReactNode, useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";

interface SplitHeadingProps {
  size: "lg" | "md" | "sm";
  heading: string;
  subheading?: string;
  children: ReactNode;
}

const sizeToClass = {
  lg: "text-3xl",
  md: "text-2xl",
  sm: "text-xl",
};

export default function SplitHeading({
  size,
  heading,
  subheading,
  children,
}: SplitHeadingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState(0);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Calculate the sticky range based on container and content heights
  useEffect(() => {
    if (containerRef.current && contentRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const contentRect = contentRef.current.getBoundingClientRect();

      setContainerHeight(
        Math.max(0, contentRect.height - containerRect.height),
      );
    }
  }, [children]);

  // Transform scroll progress to Y position for sticky effect
  const y = useTransform(scrollYProgress, [0, 1], [0, containerHeight]);

  return (
    <div
      ref={containerRef}
      className="flex flex-col md:flex-row w-full my-8 sm:my-16 py-4 relative"
    >
      <div className="md:w-2/5 lg:w-1/2 pr-16">
        <div className="md:sticky md:top-0">
          <motion.div className="flex flex-col py-8 md:-my-8" style={{ y }}>
            <span className={`${sizeToClass[size]} font-semibold`}>
              {heading}
            </span>
            <span className="text-sm font-normal pt-2">
              {subheading?.toUpperCase()}
            </span>
          </motion.div>
        </div>
      </div>
      <div ref={contentRef} className="w-1/1 md:w-3/5 lg:w-1/2">
        {children}
      </div>
    </div>
  );
}
