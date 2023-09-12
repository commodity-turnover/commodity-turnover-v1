import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { initialFormData } from "../../constants/const";
import Button from "../../components/forms/Button/Button";

import styles from './registrationPage.module.scss'

const RegistrationPage = () => {
  const [formData, setFormData] = useState(initialFormData);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }

  function handleSubmit(e:React. FormEvent<HTMLFormElement>) {
    e.preventDefault();
    axios.post('http://localhost:3001/registration', formData).then(res => {
      if(res.status === 201) {
        localStorage.setItem("token", res.data.token)
        navigate("/home")
      }
    }).catch(error => {
      console.error("Registreation Error: ", error);
    });
  }

  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  
  useEffect(() => {    
    if (token) {
      navigate("/home")
    }
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
                placeholder="ex. Degusto"
                name="orgName"
                id="orgName"
                onChange={handleChange}
              />
              <label htmlFor="orgName">USERNAME *</label>
              <input
                type="text"
                placeholder="ex. poghos001"
                name="username"
                onChange={handleChange}
              />

              <label htmlFor="category">CATEGORY *</label>
              <select
                name="category"
                id="category"
                onChange={handleChange}
                value={formData.category}
              >
                <option value="factory">Factory</option>
                <option value="shop">Shop</option>
              </select>

              <label htmlFor="orgName">EMAIL *</label>
              <input
                type="text"
                placeholder="ex. test@gmail.com *"
                name="email"
                onChange={handleChange}
              />
              <label htmlFor="orgName">PHONE NUMBER *</label>
              <input
                type="text"
                placeholder="ex. +374 33 123 456 *"
                name="phone"
                onChange={handleChange}
              />
              <label htmlFor="address">Address *</label>
              <input
                type="text"
                placeholder="Ex. Yerevan, Abovyan 999 *"
                name="address"
                onChange={handleChange}
              />
              <label htmlFor="orgName">PASSWORD *</label>
              <input
                type="password"
                placeholder="PASSWORD *"
                name="password"
                onChange={handleChange}
              />
              <label htmlFor="orgName">REPEAT PASSWORD *</label>
              <input type="password" placeholder="REPEAT PASSWORD *" />
              <label htmlFor="orgName">DESCRIPTION</label>
              <textarea placeholder="DESCRIPTION" name="description" onChange={handleChange}/>
              <Button buttonType="btn" type="submit">SUBMIT</Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RegistrationPage;
