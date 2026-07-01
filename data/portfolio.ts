export const millenniaCreativeIds = [
  "millennia-01",
  "millennia-02",
  "millennia-03",
  "millennia-04",
  "millennia-05",
  "millennia-06",
  "millennia-07",
  "millennia-08",
  "millennia-09",
  "millennia-10",
  "millennia-11",
  "millennia-12",
  "millennia-13",
  "millennia-14",
  "millennia-15",
  "millennia-16",
  "millennia-17",
  "millennia-18",
  "millennia-19",
] as const;

export const millenniaCreativeMeta = millenniaCreativeIds.map((id) => ({
  id,
  src: `/realisations/millennia/${id}.png`,
}));
