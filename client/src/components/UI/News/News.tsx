import { useEffect, useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

import { getNewsData } from '../../../api/API.service';
import NewsBlock from '../NewsBlock/NewsBlock';

import styles from './news.module.scss';

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      const newsData = await getNewsData();
      setNews(newsData);
    }
    fetchNews();
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className={styles.loader}>
        <ClipLoader color="#36d7b7" size={100} />
      </div>
    );
  }

  return (
    <div>
      {news.map((n: any) => (
        <NewsBlock key={n.news_id} newsData={n} />
      ))}
    </div>
  );
};

export default News;
