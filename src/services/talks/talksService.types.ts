export type TTalks = {
  title: string;
  link: string;
};
export type TTalksWithSlugsAndThunmbnails = {
  title: string;
  link: string;
  slug: string;
  videoId: string | null | undefined;
  thumbnailUrl: string | null;
};

export type TTalk = {
  transcript: string | null;
  summary: string | null;
} & TTalks;
