import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { loginUser } from '../../api/API.service';
import Button from '../../components/forms/Button/Button';

import styles from './loginPage.module.scss';

const LoginPage = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const res = await loginUser({ login, password });
    if (res!.data.login) {
      localStorage.setItem('token', res!.data.token);
      navigate('/home');
    } else {
      alert('no record exist');
    }
  }

  useEffect(() => {
    if (token) {
      navigate('/home');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
              <Button buttonType="submit" className={styles.login}>
                SUBMIT
              </Button>
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
