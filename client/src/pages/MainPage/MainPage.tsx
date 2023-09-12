import { useNavigate } from "react-router-dom";
import styles from "./mainPage.module.scss";
import { useEffect } from "react";

const MainPage = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  
  useEffect(() => {    
    if (token) {
      navigate("/home")
    }
  }, []);

  return (
    <div className={styles.mainPage}>
      <div>Main page</div>
    </div>
  );
};

export default MainPage;
