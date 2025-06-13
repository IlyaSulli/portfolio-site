import { motion } from "motion/react";

import { SpinnerIcon } from "@/components/icons";

export default function ScrollingTitle() {
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
        <span className="text-9xl font-medium text-[color:var(--secondary)] mx-8">
          Software Developer
        </span>
        <motion.div
          animate={{ rotate: 360 }}
          initial={{ rotate: 0 }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        >
          <SpinnerIcon className="h-9xl w-9xl" />
        </motion.div>
        <span className="text-9xl font-medium text-[color:var(--secondary)] mx-8">
          Software Developer
        </span>
        <motion.div
          animate={{ rotate: 360 }}
          initial={{ rotate: 0 }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        >
          <SpinnerIcon className="h-9xl w-9xl" />
        </motion.div>
      </motion.div>
    </div>
  );
}
