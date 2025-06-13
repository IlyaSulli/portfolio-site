import { motion } from "motion/react";

import { SpinnerIcon } from "@/components/icons";

export default function ScrollingTitle() {
  const scrollingSection = (
    <>
      <span className="text-9xl font-medium text-[color:var(--secondary)] mx-8">
        Software Developer
      </span>
      <motion.div
        animate={{ rotate: 360 }}
        className="origin-center"
        initial={{ rotate: 0 }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
      >
        <SpinnerIcon className="text-9xl text-primary" />
      </motion.div>
    </>
  );

  return (
    <div className="relative w-full overflow-hidden py-4">
      <motion.div
        animate={{ x: ["0%", "-100%"] }}
        className="flex items-center whitespace-nowrap"
        style={{ willChange: "transform" }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: 20,
          ease: "linear",
        }}
      >
        <div className="flex">
          {scrollingSection}
          {scrollingSection}
        </div>
      </motion.div>
    </div>
  );
}
