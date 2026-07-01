"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { LogoMark } from "@/components/shared/logo-mark";
import { LogoComplement } from "@/components/shared/logo-complement";
import { cn } from "@/lib/utils";

const markSize = { sm: "h-8 w-8", md: "h-9 w-9", lg: "h-11 w-11" } as const;
const gapSize = { sm: 8, md: 10, lg: 12 } as const;

const ease = [0.22, 1, 0.36, 1] as const;

export function BrandLogo({
  size = "md",
  className,
  collapsed = false,
}: {
  size?: keyof typeof markSize;
  className?: string;
  /** When true, the wordmark collapses — icon stays visible (Anthropic-style). */
  collapsed?: boolean;
}) {
  const complementRef = React.useRef<HTMLSpanElement>(null);
  const [complementWidth, setComplementWidth] = React.useState(0);

  React.useLayoutEffect(() => {
    const el = complementRef.current;
    if (!el) return;

    const measure = () => setComplementWidth(el.scrollWidth);
    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [size]);

  const gap = gapSize[size];

  return (
    <motion.span
      layout
      className={cn("inline-flex items-center", className)}
      aria-label="Moutaoua"
      transition={{ duration: 0.35, ease }}
    >
      <LogoMark className={cn(markSize[size], "shrink-0")} />

      <motion.span
        className="inline-flex overflow-hidden"
        initial={false}
        animate={{
          width: collapsed ? 0 : complementWidth,
          opacity: collapsed ? 0 : 1,
          marginLeft: collapsed ? 0 : gap,
        }}
        transition={{ duration: 0.35, ease }}
        aria-hidden={collapsed}
      >
        <span ref={complementRef} className="inline-flex shrink-0">
          <LogoComplement size={size} />
        </span>
      </motion.span>
    </motion.span>
  );
}
