import type { TTalk } from "./talksService.types";
import type { TTalks } from "./talksService.types";
import type { TTalksWithSlugsAndThunmbnails } from "./talksService.types";

const { PUBLIC_API_URL_FOR_TALKS }: any = import.meta.env;

const createSlugFromTitle = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/(\d)\/(\d)/g, "$1-$2")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
};
export const getYouTubeVideoId = (url: string) => {
  const regex =
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/.*v=([^&]*)|(?:https?:\/\/)?youtu\.be\/([^?]*)/;
  const match = url?.match(regex);
  return match && (match[1] || match[2]) ? match[1] || match[2] : null;
};

export const fetchAllTalks = async (): Promise<
  TTalksWithSlugsAndThunmbnails[] | null
> => {
  const apiResponse = await fetch(PUBLIC_API_URL_FOR_TALKS);
  const talksData = await apiResponse.json();
  const talksWithSlugsAndVideos = talksData.map((talk: TTalks) => {
    const videoId = getYouTubeVideoId(talk.link);
    const thumbnailUrl = videoId
      ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
      : null;

    return {
      ...talk,

      slug: createSlugFromTitle(talk.title),
      videoId,
      thumbnailUrl,
    };
  });
  return talksWithSlugsAndVideos;
};

export const fetchTalkById = async (
  talkId: string
): Promise<TTalk[] | null> => {
  const response = await fetch(`${PUBLIC_API_URL_FOR_TALKS}/${talkId}`);

  return await response.json();
};

export const fetchTalkSummary = async (
  talkId: string
): Promise<TTalk | null> => {
  const response = await fetch(`${PUBLIC_API_URL_FOR_TALKS}`, {
    method: "POST",
    body: JSON.stringify({
      id: talkId,
    }),
  });
  return await response.json();
};
