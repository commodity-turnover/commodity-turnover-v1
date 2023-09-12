import { format } from "date-fns";

import newsDefaultImg from "../../../assets/images/news-default.png";

import styles from "./newsBlock.module.scss";

const NewsBlock = (props: any) => {

  const parsedDate = new Date(props.newsData.creationtimestamp);

  const formattedDate = format(parsedDate, "hh:mm:ss / MMMM d, yyyy");
  return (
    <div className={styles.newsBlock}>
      <div className={styles.newsTitle}>
        <h2>{props.newsData.news_title}</h2>
      </div>
      <div className={styles.newsImgWrapper}>
        <img src={newsDefaultImg} alt="News" />
      </div>
      <div className={styles.newsContent}>
        <p>{props.newsData.news_content}</p>
        <p></p>
      </div>
      <div className={styles.creationDate}>
        <p>{formattedDate}</p>
      </div>
    </div>
  );
};

export default NewsBlock;
