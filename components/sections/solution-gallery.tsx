import { Gallery } from "@/components/shared/lightbox";
import type { LightboxImage } from "@/components/shared/lightbox";

type SolutionGalleryProps = {
  title: string;
  images: LightboxImage[];
};

export function SolutionGallery({ title, images }: SolutionGalleryProps) {
  if (images.length === 0) return null;

  return (
    <section className="section-pad pt-0" aria-label={title}>
      <div className="container-max space-y-8">
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        <Gallery images={images} />
      </div>
    </section>
  );
}

export function buildSolutionGalleryImages(
  screenshots: { src: string; alt: string }[]
): LightboxImage[] {
  return screenshots.map((shot) => ({
    src: shot.src,
    alt: shot.alt,
  }));
}
