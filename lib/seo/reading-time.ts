const WORDS_PER_MINUTE = 200;

export function estimateReadingTime(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

export function estimateReadingTimeFromParts(parts: string[]): number {
  return estimateReadingTime(parts.join(" "));
}
