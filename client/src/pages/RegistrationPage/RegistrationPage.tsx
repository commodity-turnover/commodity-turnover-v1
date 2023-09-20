import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { initialFormData } from "../../constants/const";
import Button from "../../components/forms/Button/Button";

import styles from './registrationPage.module.scss'

const RegistrationPage = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [file, setFile] = useState(null)

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }

  function handleFileChange(event:any) {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

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
            <form onSubmit={handleSubmit} encType="m">
              <label htmlFor="orgName">Organization Name *</label>
              <input
                type="text"
                placeholder="ex. Degusto"
                name="orgName"
                id="orgName"
                onChange={handleChange}
              />
              <label htmlFor="username">USERNAME *</label>
              <input
                type="text"
                placeholder="ex. poghos001"
                id="username"
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

              <label htmlFor="email">EMAIL *</label>
              <input
                type="text"
                placeholder="ex. test@gmail.com *"
                id="email"
                name="email"
                onChange={handleChange}
              />
              <label htmlFor="phone">PHONE NUMBER *</label>
              <input
                type="text"
                placeholder="ex. +374 33 123 456 *"
                id="phone"
                name="phone"
                onChange={handleChange}
              />
              <label htmlFor="address">Address *</label>
              <input
                type="text"
                placeholder="Ex. Yerevan, Abovyan 999 *"
                id="address"
                name="address"
                onChange={handleChange}
              />
              <label htmlFor="password">PASSWORD *</label>
              <input
                type="password"
                id="password"
                placeholder="PASSWORD *"
                name="password"
                onChange={handleChange}
              />
              <label htmlFor="repeatPassword">REPEAT PASSWORD *</label>
              <input type="password" id="repeatPassword" name="repeatPassword" placeholder="REPEAT PASSWORD *" />
              <label htmlFor="orgLogo">Add Organization Logo</label>
              <input type="file" name="orgLogo" onChange={handleFileChange} />
              <label htmlFor="description">DESCRIPTION</label>
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
