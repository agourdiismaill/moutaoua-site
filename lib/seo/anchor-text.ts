import type { ContentType } from "@/data/content-graph";

function hashString(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function pickAnchorText(
  href: string,
  locale: string,
  variants: string[],
  title: string
): string {
  if (variants.length === 0) return title;
  const index = hashString(`${href}:${locale}`) % variants.length;
  return variants[index].replace(/\{title\}/g, title);
}

export type AnchorVariantKey = ContentType | "resource" | "comparison";

export function getAnchorVariants(
  type: AnchorVariantKey,
  anchors: Record<string, string[]>
): string[] {
  return anchors[type] ?? anchors.default ?? ["{title}"];
}
