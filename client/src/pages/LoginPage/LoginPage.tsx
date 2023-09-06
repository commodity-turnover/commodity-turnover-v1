import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import type { RootState } from '../../redux/app/store'
import { useDispatch } from 'react-redux'

import {setUser} from "../../redux/features/user/userSlice"
import styles from "./loginPage.module.scss";
import Button from "../../components/forms/Button/Button";

const LoginPage = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    axios
      .post("http://localhost:3001/login", { login, password })
      .then((res) => {
        // if(res.err) {

        // } else {
        if (res.data.login) {
          localStorage.setItem("token", res.data.token)
          dispatch(setUser(res))
          navigate("/home");

        } else {
          alert("no record exist");
        }
        // }
      });
  }

  return (
    <div className={styles.loginPage}>
      <section className={styles.container}>
        <div className={styles.loginContainer}>
          <div className={styles.formContainer}>
            <h1 className={styles.opacity}>LOGIN</h1>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="USERNAME"
                onChange={(e) => setLogin(e.target.value)}
              />
              <input
                type="password"
                placeholder="PASSWORD"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button buttonType="submit" className={styles.login}>SUBMIT</Button>
            </form>
            <div className={`${styles.registerForget} ${styles.opacity}`}>
              <Link to="/registration">REGISTER</Link>
              <Link to="/restore-password">FORGOT PASSWORD</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoginPage;
