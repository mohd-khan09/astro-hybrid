import styles from "../styles/Card.module.css";
import { Image } from "./Image";

interface Props {
  title: string;

  varient: "carousel" | "latest" | "post";
  image: string;
  url?: string;
  imageAlt: string;
  blogItemNumber?: number;
}

const TalksCard = (props: Props) => {
  const { title, varient, image, imageAlt, url, blogItemNumber = 1 } = props;

  function applyStyles() {
    if (varient === "carousel") {
      return styles.card_Xl;
    }

    if (varient === "latest") {
      return styles.card_Xl;
    }

    if (varient === "post") {
      return styles.card_Xl;
    }
    return styles.card_L;
  }

  return (
    <div
      className={`${applyStyles()} ${
        varient === "latest" && styles.card_recent
      } ${varient === "post" && styles.card_talk}`}
    >
      <div className={styles.desktop}>
        <section
          className={`${styles.card_Picture_Wrap} ${
            varient === "latest" && styles.card_latest
          }`}
        >
          <a href={`${url}/`}>
            <Image
              src={image || "test"}
              alt={imageAlt}
              imgHeight="100%"
              imgWidth="100%"
              lazyLoading={blogItemNumber < 3 ? false : true}
            />
          </a>
        </section>
        <section
          className={
            varient === "carousel" || "post"
              ? styles.card_bodyXl
              : styles.card_body
          }
        >
          <div
            className={
              varient === "carousel" || "post"
                ? styles.description_containerXl
                : styles.description_container
            }
          >
            <div
              className={`typo__heading4 ${styles.description} ${styles.font} ${
                varient == "post" && `${styles.post_text}`
              }`}
            >
              <a href={`${url}/`}>
                <p>{title}</p>
              </a>
            </div>
            <p
              className={`typo__perTitle ${styles.color_darkGreyBlue} ${styles.blog_date}`}
            >
              'Video not available'
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};
export default TalksCard;
