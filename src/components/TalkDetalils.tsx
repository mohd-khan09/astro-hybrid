import ReactMarkdown from "react-markdown";
import "../styles/webinarDetails.css";
import "../styles/talkDetails.css";

import { useState } from "react";
import { fetchTalkSummary } from "../services/talks";

interface TalkDetailsProps {
  data: {
    talkBody: string | null;
    talkName: string;
    talkId: string;
  };
}
const TalkDetails = ({ data }: TalkDetailsProps) => {
  const { talkBody, talkName, talkId } = data;
  const [summary, setSummary] = useState<string | null>(talkBody);
  const [isLoading, setIsLoading] = useState(false);

  const fetcthSummary = async () => {
    try {
      setIsLoading(true);
      const response = await fetchTalkSummary(talkId);

      if (response) {
        setSummary(response?.summary);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="webinar-details" className="webinarDetails talkDetails">
      <div className="containar width">
        <div className="text_containar">
          <article>
            <h1 className="typo__heading2 --font-36">{talkName}</h1>
          </article>
          <section className="webinar-markdown">
            <div className="blogBody">
              {summary ? (
                <ReactMarkdown>{summary}</ReactMarkdown>
              ) : (
                <button
                  type="button"
                  className="new-btn reqSummary"
                  onClick={fetcthSummary}
                >
                  {isLoading ? "Fetching Summary..." : "Request Summary"}
                </button>
              )}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
};

export default TalkDetails;
