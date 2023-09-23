import { useState } from 'react';

import CarouselComponent from '../../components/UI/CarouselComponent/CarouselComponent';
import styles from './userPage.module.scss';
import TabAction from '../../components/UI/TabAction/TabAction';

const UserPage = (props: any) => {
  const [tabContent, setTabContent] = useState('news');

  function handleTab(tabVal: string) {
    setTabContent(tabVal);
  }

  return (
    <div className={`main-content ${styles.userPage}`}>
      <div className={styles.ads}>
        <CarouselComponent />
      </div>
      <div className={styles.subContent}>
        <nav className={styles.tabBar}>
          <ul>
            <li
              onClick={() => handleTab('news')}
              className={tabContent === 'news' ? styles.selectedTab : undefined}
            >
              News |
            </li>
            <li
              onClick={() => handleTab('products')}
              className={
                tabContent === 'products' ? styles.selectedTab : undefined
              }
            >
              My Products |
            </li>
            <li
              onClick={() => handleTab('orders')}
              className={
                tabContent === 'orders' ? styles.selectedTab : undefined
              }
            >
              Orders |
            </li>
            <li
              onClick={() => handleTab('s_products')}
              className={
                tabContent === 's_products' ? styles.selectedTab : undefined
              }
            >
              Search Products |
            </li>
            <li
              onClick={() => handleTab('s_partners')}
              className={
                tabContent === 's_partners' ? styles.selectedTab : undefined
              }
            >
              Search Partners |
            </li>
            <li
              onClick={() => handleTab('settings')}
              className={
                tabContent === 'settings' ? styles.selectedTab : undefined
              }
            >
              Settings
            </li>
          </ul>
        </nav>
        <div>
          <TabAction
            products={props.products}
            tabName={tabContent}
            toggleModal={props.toggleModal}
            setProducts={props.setProducts}
            setLoadingProduct={props.setLoadingProduct}
            setSelectedProductData={props.setSelectedProductData}
          />
        </div>
      </div>
    </div>
  );
};

export default UserPage;
