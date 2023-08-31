import { Link } from "react-router-dom";
import "./loginPage.scss";

const LoginPage = () => {
  return (
    <div className="loginPage">
      <section className="container">
        <div className="login-container">
          <div className="form-container">
            <h1 className="opacity">LOGIN</h1>
            <form>
              <input type="text" placeholder="USERNAME" />
              <input type="password" placeholder="PASSWORD" />
              <button className="opacity">SUBMIT</button>
            </form>
            <div className="register-forget opacity">
              <Link to="/registration">REGISTER</Link>
              <Link to="/restore-password">FORGOT PASSWORD</Link>
            </div>
          </div>
        </div>
        <div className="theme-btn-container"></div>
      </section>
    </div>
  );
};

export default LoginPage;
