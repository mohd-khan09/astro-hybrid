// import React from "react";
import type { TTalk } from "../services/talks/talksService.types";
import "../styles/talksLayout.css";
import "../styles/event.css";
import TalkDetails from "./TalkDetalils";
interface TalksLayoutProps {
  talk: TTalk | undefined;
}
export const youtubeParser = (url: string) => {
  const regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[7].length == 11 ? match[7] : false;
};
export const getYouTubeVideoId = (url: string) => {
  const regex =
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/.*v=([^&]*)|(?:https?:\/\/)?youtu\.be\/([^?]*)/;
  const match = url?.match(regex);
  return match && (match[1] || match[2]) ? match[1] || match[2] : null;
};

const TalksLayout: React.FC<TalksLayoutProps> = ({ talk }) => {
  if (!talk) {
    return (
      <div className="noTalkFound ">
        <h1 className="typo__heading2 --font-36">
          Sorry, the requested talk could not be found
        </h1>
        <p className="typo__small --font-16">
          It looks like the talk you're looking for doesn't exist or the video
          is unavailable at the moment. Please return to the homepage to explore
          other talks.
        </p>
      </div>
    );
  }
  const videoId = getYouTubeVideoId(talk.link);
  const youtubeUrl = talk?.link ? youtubeParser(talk?.link) : false;
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  const talkBody = talk?.summary ?? "";
  const talkName = talk?.title ?? "";

  return (
    <section className="eventView pastEvent">
      <div
        className={
          youtubeUrl ? "youtube preview-container" : "thumb preview-container"
        }
      >
        {youtubeUrl ? (
          <div className="iframe-container">
            <iframe
              className="yt-iframe"
              src={`https://www.youtube.com/embed/${youtubeUrl}?&muted=1&autoplay=1`}
              title="YouTube video player"
            />
          </div>
        ) : (
          <div className="image-container">
            <img className="deskIm" src={thumbnailUrl} alt={talk?.title} />
            <img className="mobIm" src={thumbnailUrl} alt={talk?.title} />
          </div>
        )}
      </div>
      <div className="container">
        <div className="contentContainer talksContentContainer">
          <TalkDetails
            data={{ talkBody: talkBody, talkName: talkName, talkId: videoId }}
          />
        </div>
      </div>
    </section>
  );
};

export default TalksLayout;
