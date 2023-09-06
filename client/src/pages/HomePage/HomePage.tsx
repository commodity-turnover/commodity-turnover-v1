import { useEffect, useState } from "react";
import { RootState } from "../../redux/types";
import styles from "./homePage.module.scss";
import { useSelector } from "react-redux";
import axios from "axios";
import UserActionComponent from "../../components/UI/UserActionComponent/UserActionComponent";
// import axios from 'axios'

const HomePage = () => {
  const { org_name, username, email, phone_number, address } = useSelector(
    (state: RootState) => state.user.userData
  );
  const [tabContent, setTabContent] = useState("orders");


  

  function handleTab(tabVal: string) {
    setTabContent(tabVal);
  }

  return (
    <div className={styles.homePage}>
      <aside className={styles.leftSide}>
        <ul>
          <li>
            <strong>Username: </strong> {org_name}
          </li>
          <li>
            <strong>Organisation: </strong> {username}
          </li>
          <li>
            <strong>Email: </strong> {email}
          </li>
          <li>
            <strong>Phone number: </strong> {phone_number}
          </li>
          <li>
            <strong>Address: </strong> {address}
          </li>
        </ul>
      </aside>
      <div className={styles.mainContent}>
        <div className={styles.ads}>NEWS / ADS</div>
        <div className={styles.subContent}>
          <nav>
            <ul>
              <li onClick={() => handleTab("orders")}>Orders |</li>
              <li onClick={() => handleTab("products")}>Products |</li>
              <li onClick={() => handleTab("s_products")}>Search Products |</li>
              <li onClick={() => handleTab("s_partners")}>Search Partners |</li>
              <li onClick={() => handleTab("settings")}>Settings</li>
            </ul>
          </nav>
          <div>
            <UserActionComponent tabName={tabContent} />
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
