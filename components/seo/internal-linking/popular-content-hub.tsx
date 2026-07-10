import { RelatedLinks } from "@/components/seo/related-links";
import { RelatedPosts } from "@/components/seo/related-posts";
import { loadContentLabelSources } from "@/components/seo/internal-linking/load-labels";
import {
  nodeToBlogPost,
  nodesToLinks,
} from "@/lib/seo/content-labels";
import { resolveLatest, resolvePopular } from "@/lib/seo/resolve-related";

type PopularContentHubProps = {
  locale: string;
};

export async function PopularContentHub({ locale }: PopularContentHubProps) {
  const sources = await loadContentLabelSources(locale);
  const popularArticles = resolvePopular("blog", 3);
  const latestArticles = resolveLatest("blog", 3);
  const popularGuides = resolvePopular("guide", 2);
  const resources = resolvePopular("resource", 4);

  return (
    <div className="space-y-2">
      {popularArticles.length > 0 && (
        <RelatedPosts
          title={sources.internalLinking("sidebar.popularArticles")}
          posts={popularArticles.map((n) => nodeToBlogPost(n, sources))}
        />
      )}
      {latestArticles.length > 0 && (
        <RelatedPosts
          title={sources.internalLinking("sidebar.latestArticles")}
          posts={latestArticles.map((n) => nodeToBlogPost(n, sources))}
        />
      )}
      {popularGuides.length > 0 && (
        <RelatedLinks
          title={sources.internalLinking("sidebar.popularGuides")}
          links={nodesToLinks(popularGuides, sources)}
        />
      )}
      {resources.length > 0 && (
        <RelatedLinks
          title={sources.internalLinking("sections.relatedResources")}
          links={nodesToLinks(resources, sources)}
        />
      )}
    </div>
  );
}
