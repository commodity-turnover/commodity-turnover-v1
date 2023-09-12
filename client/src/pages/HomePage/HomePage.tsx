import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import UpdateProductModal from "../../components/UI/Modals/UpdateProductModal/UpdateProductModal";
import ProductDetailModal from "../../components/UI/Modals/ProductDetailModal/ProductDetailModal";
import AddProductModal from "../../components/UI/Modals/AddProductModal/AddProductModal";
import TabAction from "../../components/UI/TabAction/TabAction";
import { getUser } from "../../api/API.service";

import defaultFactoryImg from "../../assets/images/factory-default-img.jpg";

import styles from "./homePage.module.scss";
import { setUser } from "../../redux/features/user/userSlice";
import { RootState } from "../../redux/types";

const HomePage = () => {
  const [selectedProductData, setSelectedProductData] = useState(null);
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [tabContent, setTabContent] = useState("news");
  const [isOpenModal, setIsOpenModal] = useState("");
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  const userData = useSelector((state: RootState) => state.user.userData);

  function handleTab(tabVal: string) {
    setTabContent(tabVal);
  }

  function toggleModal(val: string) {
    setIsOpenModal(val);
  }

  useEffect(() => {
    async function fetchUserData() {
      const userLoginData = await getUser();
      dispatch(setUser(userLoginData));
    }
    fetchUserData();
  }, []);

  return (
    <div className={styles.homePage}>
      <aside className={styles.leftSide}>
        {userData && (
          <ul>
            <li>
              <img src={defaultFactoryImg} alt="Factory img" />
            </li>
            <li>
              <strong>Organisation: </strong> {userData.username}
            </li>
            <li>
              <strong>Email: </strong> {userData.email}
            </li>
            <li>
              <strong>Phone number: </strong> {userData.phone_number}
            </li>
            <li>
              <strong>Address: </strong> {userData.address}
            </li>
          </ul>
        )}
      </aside>
      <div className={styles.mainContent}>
        <div className={styles.ads}>NEWS / ADS</div>
        <div className={styles.subContent}>
          <nav className={styles.tabBar}>
            <ul>
              <li
                onClick={() => handleTab("news")}
                className={
                  tabContent === "news" ? styles.selectedTab : undefined
                }
              >
                News |
              </li>
              <li
                onClick={() => handleTab("products")}
                className={
                  tabContent === "products" ? styles.selectedTab : undefined
                }
              >
                My Products |
              </li>
              <li
                onClick={() => handleTab("orders")}
                className={
                  tabContent === "orders" ? styles.selectedTab : undefined
                }
              >
                Orders |
              </li>
              <li
                onClick={() => handleTab("s_products")}
                className={
                  tabContent === "s_products" ? styles.selectedTab : undefined
                }
              >
                Search Products |
              </li>
              <li
                onClick={() => handleTab("s_partners")}
                className={
                  tabContent === "s_partners" ? styles.selectedTab : undefined
                }
              >
                Search Partners |
              </li>
              <li
                onClick={() => handleTab("settings")}
                className={
                  tabContent === "settings" ? styles.selectedTab : undefined
                }
              >
                Settings
              </li>
            </ul>
          </nav>
          <div>
            <TabAction
              tabName={tabContent}
              toggleModal={toggleModal}
              products={products}
              setProducts={setProducts}
              setSelectedProductData={setSelectedProductData}
              setLoadingProduct={setLoadingProduct}
            />
          </div>
          <div></div>
        </div>
      </div>

      {isOpenModal === "add" && (
        <AddProductModal setProducts={setProducts} toggleModal={toggleModal} />
      )}
      {isOpenModal === "view" && loadingProduct === false && (
        <ProductDetailModal
          isOpenModal={isOpenModal}
          toggleModal={toggleModal}
          loadingProduct={loadingProduct}
          selectedProductData={selectedProductData}
        />
      )}
      {isOpenModal === "update" && (
        <UpdateProductModal
          toggleModal={toggleModal}
          setProducts={setProducts}
          selectedProductData={selectedProductData}
        />
      )}
    </div>
  );
};

export default HomePage;
