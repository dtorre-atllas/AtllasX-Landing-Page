import { motion, useScroll } from "motion/react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#5372ea] to-[#7a63eb] origin-left z-[100]"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
