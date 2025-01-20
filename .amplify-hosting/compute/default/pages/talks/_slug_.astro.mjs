import { c as createComponent, r as renderTemplate, m as maybeRenderHead, a as renderComponent, b as createAstro } from '../../chunks/astro/server_BCiH2_Ul.mjs';
export { renderers } from '../../renderers.mjs';

const __vite_import_meta_env__ = {"ASSETS_PREFIX": undefined, "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "SITE": undefined, "SSR": true};
const { PUBLIC_API_URL_FOR_TALKS } = Object.assign(__vite_import_meta_env__, {});
const createSlugFromTitle = (title) => {
  return title.toLowerCase().replace(/(\d)\/(\d)/g, "$1-$2").replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-");
};
const getYouTubeVideoId = (url) => {
  const regex = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/.*v=([^&]*)|(?:https?:\/\/)?youtu\.be\/([^?]*)/;
  const match = url?.match(regex);
  return match && (match[1] || match[2]) ? match[1] || match[2] : null;
};
const fetchAllTalks = async () => {
  const apiResponse = await fetch(PUBLIC_API_URL_FOR_TALKS);
  const talksData = await apiResponse.json();
  const talksWithSlugsAndVideos = talksData.map((talk) => {
    const videoId = getYouTubeVideoId(talk.link);
    const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : null;
    return {
      ...talk,
      slug: createSlugFromTitle(talk.title),
      videoId,
      thumbnailUrl
    };
  });
  return talksWithSlugsAndVideos;
};
const fetchTalkById = async (talkId) => {
  const response = await fetch(`${PUBLIC_API_URL_FOR_TALKS}/${talkId}`);
  return await response.json();
};

const $$Astro = createAstro();
const prerender = false;
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  const talks = await fetchAllTalks();
  const page = talks?.find((page2) => page2.slug === slug);
  const { videoId, title } = page;
  const response = await fetchTalkById(videoId ?? "");
  const talkData = response?.[0];
  return renderTemplate`${maybeRenderHead()}<div class="event_mainWrapper"> ${renderComponent($$result, "TalksLayout", null, { "client:only": "react", "talk": talkData, "videoId": videoId, "client:component-hydration": "only", "client:component-path": "/Users/mohammedkhan/Work/astro-hybrid/src/components/TalksLayout", "client:component-export": "default" })} </div>`;
}, "/Users/mohammedkhan/Work/astro-hybrid/src/pages/talks/[slug].astro", undefined);

const $$file = "/Users/mohammedkhan/Work/astro-hybrid/src/pages/talks/[slug].astro";
const $$url = "/talks/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
