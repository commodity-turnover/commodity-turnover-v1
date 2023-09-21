import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../components/forms/Button/Button';
import { initialFormData } from '../../constants/const';
import { registerUser } from '../../api/API.service';

import styles from './registrationPage.module.scss';

const RegistrationPage = () => {
  const [formData, setFormData] = useState(initialFormData);
  // const [file, setFile] = useState(null);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
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
              <label htmlFor="username">USERNAME *</label>
              <input
                type="text"
                id="username"
                name="username"
                onChange={handleChange}
                placeholder="ex. poghos001"
              />

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

              <label htmlFor="email">EMAIL *</label>
              <input
                id="email"
                type="text"
                name="email"
                onChange={handleChange}
                placeholder="ex. test@gmail.com *"
              />
              <label htmlFor="phone">PHONE NUMBER *</label>
              <input
                id="phone"
                type="text"
                name="phone"
                onChange={handleChange}
                placeholder="ex. +374 33 123 456 *"
              />
              <label htmlFor="address">Address *</label>
              <input
                type="text"
                id="address"
                name="address"
                onChange={handleChange}
                placeholder="Ex. Yerevan, Abovyan 999 *"
              />
              <label htmlFor="password">PASSWORD *</label>
              <input
                id="password"
                type="password"
                name="password"
                onChange={handleChange}
                placeholder="PASSWORD *"
              />
              <label htmlFor="repeatPassword">REPEAT PASSWORD *</label>
              <input
                type="password"
                id="repeatPassword"
                name="repeatPassword"
                placeholder="REPEAT PASSWORD *"
              />
              <label htmlFor="orgLogo">Add Organization Logo</label>
              {/* <input type="file" name="orgLogo" onChange={handleFileChange} /> */}
              <input type="file" name="orgLogo" />
              <label htmlFor="description">DESCRIPTION</label>
              <textarea
                id="description"
                name="description"
                onChange={handleChange}
                placeholder="DESCRIPTION"
              />
              <Button buttonType="btn" type="submit">
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
