import { motion } from "motion/react";

export default function FadeText(className: string, text: string) {
  return (
    <motion.span
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      {text}
    </motion.span>
  );
}
