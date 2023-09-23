import { NavLink, Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../redux/types';
import { getUser } from '../../api/API.service';
import { setUser } from '../../redux/features/user/userSlice';
import defaultFactoryImg from '../../assets/images/factory-default-img.jpg';
import AddProductModal from '../../components/UI/Modals/AddProductModal/AddProductModal';
import UpdateProductModal from '../../components/UI/Modals/UpdateProductModal/UpdateProductModal';
import ProductDetailModal from '../../components/UI/Modals/ProductDetailModal/ProductDetailModal';
import DeleteAccountModal from '../../components/UI/Modals/DeleteAccountModal/DeleteAccountModal';

import styles from './homePage.module.scss';

const HomePage = (props: any) => {
  const dispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.user.userData);

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
        <div className={styles.userInfoWrapper}>
          {userData && (
            <ul>
              <li>
                <img src={defaultFactoryImg} alt="Factory img" />
              </li>
              <li>
                <strong>Organisation: </strong> {userData.org_name}
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
        </div>
        <div className={styles.linkWrapper}>
            <ul>
              <li>
                <NavLink
                  to="/home/"
                  className={({ isActive, isPending }) =>
                    isPending ? 'pending' : isActive ? styles.active : ''
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/home/orders"
                  className={({ isActive, isPending }) =>
                    isPending ? 'pending' : isActive ? styles.active : ''
                  }
                >
                  Orders
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/home/messages"
                  className={({ isActive }) => (isActive ? styles.active : '')}
                >
                  Messages
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/home/analytics"
                  className={({ isActive }) => (isActive ? styles.active : '')}
                >
                  Analytics
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/home/nodes"
                  className={({ isActive }) => (isActive ? styles.active : '')}
                >
                  Nodes
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/home/history"
                  className={({ isActive }) => (isActive ? styles.active : '')}
                >
                  History
                </NavLink>
              </li>
            </ul>
        </div>
      </aside>

      <Outlet />

      {props.isOpenModal === 'add' && (
        <AddProductModal
          setProducts={props.setProducts}
          toggleModal={props.toggleModal}
        />
      )}
      {props.isOpenModal === 'view' && props.loadingProduct === false && (
        <ProductDetailModal
          isOpenModal={props.isOpenModal}
          toggleModal={props.toggleModal}
          loadingProduct={props.loadingProduct}
          selectedProductData={props.selectedProductData}
        />
      )}
      {props.isOpenModal === 'update' && (
        <UpdateProductModal
          toggleModal={props.toggleModal}
          setProducts={props.setProducts}
          selectedProductData={props.selectedProductData}
        />
      )}
      {props.isOpenModal === 'deleteAccount' && (
        <DeleteAccountModal toggleModal={props.toggleModal} />
      )}
    </div>
  );
};

export default HomePage;
