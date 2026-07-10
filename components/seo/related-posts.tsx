import { Link } from "@/i18n/routing";
import { ArrowUpRight } from "lucide-react";

type RelatedPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
};

type RelatedPostsProps = {
  title: string;
  posts: RelatedPost[];
  basePath?: string;
};

export function RelatedPosts({ title, posts, basePath = "/blog" }: RelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <section className="section-pad pt-0" aria-labelledby="related-posts-heading">
      <div className="container-max">
        <h2 id="related-posts-heading" className="mb-6 text-2xl font-semibold tracking-tight">
          {title}
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`${basePath}/${post.slug}`}
              className="group rounded-2xl border border-border bg-card p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:border-primary/30"
            >
              <p className="text-xs font-medium uppercase tracking-wide text-primary">{post.category}</p>
              <h3 className="mt-2 font-semibold leading-snug tracking-tight">{post.title}</h3>
              <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{post.excerpt}</p>
              <ArrowUpRight className="mt-4 size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
