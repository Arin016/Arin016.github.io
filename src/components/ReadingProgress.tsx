"use client";
import { motion, useScroll, useSpring } from "framer-motion";

export default function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed left-0 top-14 z-40 h-[2px] w-full origin-left bg-green-400"
      aria-hidden
    />
  );
}
