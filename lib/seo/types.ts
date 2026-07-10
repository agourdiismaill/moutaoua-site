export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export type AIOverviewContent = {
  what: string;
  who: string;
  benefits: string[];
  topics: string[];
  takeaways: string[];
  readingTimeMinutes?: number;
};

export type ServicePageContent = {
  slug: string;
  overview: AIOverviewContent;
  problem: string;
  solution: string;
  howItWorks: string[];
  industries: string[];
  faqs: { question: string; answer: string }[];
};

export type RelatedLink = {
  title: string;
  description: string;
  href: string;
};
