import type { AIOverviewContent } from "@/lib/seo/types";
import type { BreadcrumbItem } from "@/lib/seo/types";
import { AIOverview } from "@/components/seo/ai-overview";
import { Breadcrumb } from "@/components/seo/breadcrumb";

type PageSeoShellProps = {
  breadcrumb: BreadcrumbItem[];
  overview?: AIOverviewContent;
  overviewLabels?: {
    title: string;
    what: string;
    who: string;
    benefits: string;
    topics: string;
    takeaways: string;
    readingTime: string;
  };
};

export function PageSeoShell({ breadcrumb, overview, overviewLabels }: PageSeoShellProps) {
  if (breadcrumb.length === 0 && !overview) return null;

  return (
    <section className="section-pad pt-0">
      <div className="container-max space-y-8">
        {breadcrumb.length > 0 ? <Breadcrumb items={breadcrumb} /> : null}
        {overview && overviewLabels ? (
          <AIOverview content={overview} labels={overviewLabels} />
        ) : null}
      </div>
    </section>
  );
}
