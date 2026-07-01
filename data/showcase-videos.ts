/**
 * Vidéos Millennia (reels Instagram, format portrait 9:16).
 * Titres traduits via messages/{locale}/showcase.json
 */
export interface ReelVideo {
  id: string;
  src: string;
  title: string;
}

export const VIDEO_COUNT = 61;

export const reelMeta = Array.from({ length: VIDEO_COUNT }, (_, i) => {
  const n = String(i + 1).padStart(2, "0");
  return {
    id: `reel-${n}`,
    src: `/videos/millennia/video-${n}.mp4`,
    index: i + 1,
  };
});
