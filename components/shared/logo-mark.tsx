import { cn } from "@/lib/utils";
import { MARK_OFFSET_X, MARK_VIEWBOX, MARK_WHITE_PATHS } from "@/lib/logo-paths";

/** Red square brush mark — source: logon.svg */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={MARK_VIEWBOX}
      className={cn("shrink-0", className)}
      aria-hidden
    >
      <g transform={`translate(${-MARK_OFFSET_X}, 0)`}>
        <rect
          x={MARK_OFFSET_X}
          width="422.67"
          height="443.82"
          rx="18.53"
          ry="18.53"
          fill="#b51636"
        />
        {MARK_WHITE_PATHS.map((d, i) => (
          <path key={i} fill="#fff" d={d} />
        ))}
      </g>
    </svg>
  );
}
