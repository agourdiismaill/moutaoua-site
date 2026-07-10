import { Clock } from "lucide-react";

type ReadingTimeProps = {
  minutes: number;
  label: string;
};

export function ReadingTime({ minutes, label }: ReadingTimeProps) {
  return (
    <p className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
      <Clock className="size-4" aria-hidden />
      <span>{label.replace("{minutes}", String(minutes))}</span>
    </p>
  );
}
