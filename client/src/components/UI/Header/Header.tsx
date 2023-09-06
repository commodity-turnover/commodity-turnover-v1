import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { clearUser } from "../../../redux/features/user/userSlice";
import { RootState } from "../../../redux/types";
import Button from "../../forms/Button/Button";

import styles from "./header.module.scss";

const Header = () => {
  const isLogin = useSelector((state: RootState) => state.user.login);
  const username = useSelector(
    (state: RootState) => state.user.userData?.username
  );
  const dispatch = useDispatch();

  function logout() {
    localStorage.setItem("token", "");
    dispatch(clearUser());
  }

  const btnWrapper = isLogin ? (
    <>
      <Link to="/">
        <Button buttonType="btn" onClick={logout}>
          Logout
        </Button>
      </Link>
    </>
  ) : (
    <>
      <Link to="/login">
        <Button buttonType="btn">Login</Button>
      </Link>
      <Link to="/registration">
        <Button buttonType="btn">SignUp</Button>
      </Link>
    </>
  );

  return (
    <header className={styles.header}>
      <div>logo</div>
      <div className={styles.headerContent}>
        {isLogin ? username : null}
        <div className={styles.btnWrapper}>{btnWrapper}</div>
      </div>
    </header>
  );
};

export default Header;
