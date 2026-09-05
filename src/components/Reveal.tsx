"use client";
import { motion, useReducedMotion } from "framer-motion";
import { type MouseEvent, type ReactNode } from "react";

export default function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SpotGrid({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty(
      "--mx",
      `${(((e.clientX - r.left) / r.width) * 100).toFixed(1)}%`
    );
    el.style.setProperty(
      "--my",
      `${(((e.clientY - r.top) / r.height) * 100).toFixed(1)}%`
    );
  };
  return (
    <div onMouseMove={onMove} className={`spot-grid ${className}`}>
      {children}
    </div>
  );
}
