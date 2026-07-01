import { cn } from "@/lib/utils";
import {
  ARABIC_PATHS,
  COMPLEMENT_VIEWBOX,
  LATIN_PATHS,
} from "@/lib/logo-paths";

/** Arabic + Latin wordmark — source: logon.svg */
const sizeStyles = {
  sm: "h-8 w-auto",
  md: "h-9 w-auto",
  lg: "h-11 w-auto",
} as const;

export function LogoComplement({
  size = "md",
  className,
}: {
  size?: keyof typeof sizeStyles;
  className?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={COMPLEMENT_VIEWBOX}
      preserveAspectRatio="xMinYMid meet"
      className={cn(
        "block shrink-0 text-[#181818] dark:text-white",
        sizeStyles[size],
        className
      )}
      aria-hidden
    >
      {ARABIC_PATHS.map((d, i) => (
        <path key={`ar-${i}`} fill="currentColor" d={d} />
      ))}
      {LATIN_PATHS.map((d, i) => (
        <path key={`la-${i}`} fill="currentColor" d={d} />
      ))}
    </svg>
  );
}
