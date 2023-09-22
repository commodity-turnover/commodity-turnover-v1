import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../components/forms/Button/Button';
import { initialFormData } from '../../constants/const';
import { signupValidations } from '../../helpers/validation';
import { registerUser } from '../../api/API.service';

import styles from './registrationPage.module.scss';

const RegistrationPage = () => {
  let isDisable = false;
  // const [file, setFile] = useState(null);
  const [formData, setFormData] = useState<any>(initialFormData);
  const [errorMessage, setErrorMessage] = useState<any>({});

  function onChange(name: string, value: string | number) {
    setFormData((prev: any) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    const { name, value } = e.target;

    onChange(name, value);
    if (name !== 'address' && name !== 'repeatPassword') {
      setErrorMessage((prev: any) => {
        return {
          ...prev,
          [name]: signupValidations[name](value),
        };
      });
    }
  }

  for (let key in formData as unknown as { [key: string]: string }) {
    if (formData[key] === '' || errorMessage[key]) isDisable = true;
  }
  // function handleFileChange(event: any) {
  //   const selectedFile = event.target.files[0];
  //   setFile(selectedFile);
  // }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const res = await registerUser(formData);
      if (res.status === 201) {
        localStorage.setItem('token', res.data.token);
        navigate('/home');
      }
    } catch (error) {
      console.error('Registration Error: ', error);
    }
  }

  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate('/home');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.registrationPage}>
      <section className={styles.container}>
        <div className={styles.loginContainer}>
          <div className={styles.formContainer}>
            <h1 className={styles.opacity}>Sign Up</h1>
            <form onSubmit={handleSubmit}>
              <label htmlFor="orgName">Organization Name *</label>
              <input
                type="text"
                id="orgName"
                name="orgName"
                onChange={handleChange}
                placeholder="ex. Degusto"
              />
              <p className={styles.errorMsg}>{errorMessage['orgName']}</p>
              <label htmlFor="username">USERNAME *</label>
              <input
                type="text"
                id="username"
                name="username"
                onChange={handleChange}
                placeholder="ex. poghos001"
              />
              <p className={styles.errorMsg}>{errorMessage['username']}</p>
              <label htmlFor="category">CATEGORY *</label>
              <select
                id="category"
                name="category"
                onChange={handleChange}
                value={formData.category}
              >
                <option value="factory">Factory</option>
                <option value="shop">Shop</option>
              </select>
              <p className={styles.errorMsg}></p>

              <label htmlFor="email">EMAIL *</label>
              <input
                id="email"
                type="text"
                name="email"
                onChange={handleChange}
                placeholder="ex. test@gmail.com *"
              />
              <p className={styles.errorMsg}>{errorMessage['email']}</p>
              <label htmlFor="phone">PHONE NUMBER *</label>
              <input
                id="phone"
                type="text"
                name="phone"
                onChange={handleChange}
                placeholder="ex. +374 33 123 456 *"
              />
              <p className={styles.errorMsg}>{errorMessage['phone']}</p>
              <label htmlFor="address">Address *</label>
              <input
                type="text"
                id="address"
                name="address"
                onChange={handleChange}
                placeholder="Ex. Yerevan, Abovyan 999 *"
              />
              <p className={styles.errorMsg}></p>
              <label htmlFor="password">PASSWORD *</label>
              <input
                id="password"
                type="password"
                name="password"
                onChange={handleChange}
                placeholder="PASSWORD *"
              />
              <p className={styles.errorMsg}>{errorMessage['password']}</p>
              <label htmlFor="repeatPassword">REPEAT PASSWORD *</label>
              <input
                type="password"
                id="repeatPassword"
                name="repeatPassword"
                placeholder="REPEAT PASSWORD *"
              />
              <p className={styles.errorMsg}></p>

              <label htmlFor="orgLogo">Add Organization Logo</label>
              {/* <input type="file" name="orgLogo" onChange={handleFileChange} /> */}
              <input type="file" name="orgLogo" />
              <p className={styles.errorMsg}></p>

              <label htmlFor="description">DESCRIPTION</label>
              <textarea
                id="description"
                name="description"
                onChange={handleChange}
                placeholder="DESCRIPTION"
              />
              <p className={styles.errorMsg}>{errorMessage['description']}</p>
              <Button buttonType="btn" type="submit" disabled={isDisable}>
                SUBMIT
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RegistrationPage;
