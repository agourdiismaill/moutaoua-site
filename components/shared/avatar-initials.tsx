import { cn } from "@/lib/utils";

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

export function AvatarInitials({
  name,
  className,
  size = "md",
}: {
  name: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const sizeClass =
    size === "sm" ? "size-9 text-xs" : size === "lg" ? "size-12 text-sm" : "size-10 text-xs";

  return (
    <span
      aria-hidden
      className={cn(
        "inline-grid shrink-0 place-items-center rounded-full border-2 border-background bg-gradient-to-br from-primary/20 to-secondary/20 font-semibold text-primary",
        sizeClass,
        className
      )}
    >
      {getInitials(name)}
    </span>
  );
}
