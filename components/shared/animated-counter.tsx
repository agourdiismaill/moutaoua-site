"use client";

import * as React from "react";
import {
  useInView,
  useMotionValue,
  useSpring,
  motion,
} from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
  duration?: number;
}

/** Counts up from 0 to `value` when scrolled into view. */
export function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  className,
  duration = 1.8,
}: AnimatedCounterProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, {
    duration: duration * 1000,
    bounce: 0,
  });
  const [display, setDisplay] = React.useState("0");

  React.useEffect(() => {
    if (inView) motionValue.set(value);
  }, [inView, value, motionValue]);

  React.useEffect(() => {
    const unsub = spring.on("change", (latest) => {
      setDisplay(
        new Intl.NumberFormat("fr-FR", {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        }).format(latest)
      );
    });
    return () => unsub();
  }, [spring, decimals]);

  return (
    <motion.span ref={ref} className={className} aria-label={`${prefix}${value}${suffix}`}>
      {prefix}
      {display}
      {suffix}
    </motion.span>
  );
}
