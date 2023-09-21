import { useEffect, useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

import { getPartners } from '../../../api/API.service';
import PartnersCard from '../PartnersCard/PartnersCard';

import styles from './searchPartners.module.scss';

const SearchPartners = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const getPartnersData = await getPartners();
        setPartners(getPartnersData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchPartners();
  }, []);

  if (loading) {
    return (
      <div className={styles.loader}>
        <ClipLoader color="#36d7b7" size={100} />
      </div>
    );
  }

  return (
    <div className={styles.searchPartners}>
      {partners.map((p: any) => {
        return <PartnersCard key={p.user_id} partnerData={p} />;
      })}
    </div>
  );
};

export default SearchPartners;
