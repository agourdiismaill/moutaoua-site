/**
 * Vidéos Millennia (reels Instagram, format portrait 9:16).
 * Titres traduits via messages/{locale}/showcase.json
 */
export interface ReelVideo {
  id: string;
  src: string;
  poster: string;
  title: string;
}

export const VIDEO_COUNT = 61;
const POSTER_COUNT = 19;

export const reelMeta = Array.from({ length: VIDEO_COUNT }, (_, i) => {
  const n = String(i + 1).padStart(2, "0");
  const posterN = String((i % POSTER_COUNT) + 1).padStart(2, "0");
  return {
    id: `reel-${n}`,
    src: `/videos/millennia/video-${n}.mp4`,
    poster: `/realisations/millennia/millennia-${posterN}.png`,
    index: i + 1,
  };
});
