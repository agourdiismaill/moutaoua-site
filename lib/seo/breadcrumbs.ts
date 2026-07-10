import type { ContentType } from "@/data/content-graph";
import type { BreadcrumbItem } from "@/lib/seo/types";

export type BreadcrumbLabels = {
  home: string;
  services: string;
  blog: string;
  guides: string;
  caseStudies: string;
  compare: string;
  current: string;
};

export function buildContentBreadcrumb(
  type: ContentType,
  labels: BreadcrumbLabels
): BreadcrumbItem[] {
  const home: BreadcrumbItem = { label: labels.home, href: "/" };

  switch (type) {
    case "service":
      return [home, { label: labels.services, href: "/services" }, { label: labels.current }];
    case "blog":
      return [home, { label: labels.blog, href: "/blog" }, { label: labels.current }];
    case "guide":
      return [home, { label: labels.guides, href: "/blog" }, { label: labels.current }];
    case "case-study":
      return [
        home,
        { label: labels.caseStudies, href: "/case-studies" },
        { label: labels.current },
      ];
    case "comparison":
      return [home, { label: labels.compare, href: "/blog" }, { label: labels.current }];
    default:
      return [home, { label: labels.current }];
  }
}
