export const legalDocuments = ["privacy", "terms", "cookies"] as const;
export type LegalDocument = (typeof legalDocuments)[number];

export function isLegalDocument(value: string): value is LegalDocument {
  return legalDocuments.includes(value as LegalDocument);
}

export const legalPaths: Record<LegalDocument, string> = {
  privacy: "/legal/privacy",
  terms: "/legal/terms",
  cookies: "/legal/cookies",
};
