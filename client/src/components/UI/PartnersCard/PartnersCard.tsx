import { format } from 'date-fns';

import CardHOC from '../../../shared/CardHOC/CardHOC';

import defaultFactoryImg from '../../../assets/images/factory-default-img.jpg';

import styles from './partnersCard.module.scss';

const PartnersCard = (props: any) => {
  const {
    org_name,
    email,
    phone_number,
    address,
    description,
    category,
    creationtimestamp,
  } = props.partnerData;
  const parsedDate = new Date(creationtimestamp);

  const formattedDate = format(parsedDate, 'MMMM d, yyyy');
  return (
    <CardHOC>
      <div className={styles.partnersCard}>
        <div className={styles.imgWrapper}>
          <img src={defaultFactoryImg} alt="Factory" />
        </div>
        <div className={styles.partnerContent}>
          <h2>Name: {org_name}</h2>
          <p>Email: {email}</p>
          <p>Phone: {phone_number}</p>
          <p>Address: {address}</p>
          <p>Description: {description}</p>
          <p>Creation Date: {formattedDate}</p>
        </div>
        <div className={styles.category}>{category}</div>
      </div>
    </CardHOC>
  );
};

export default PartnersCard;
