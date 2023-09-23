import { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../../forms/Button/Button';
import { RootState } from '../../../redux/types';
import { IUserData } from '../../../Interfaces/interfaces';
import { postActivate, updateUserData } from '../../../api/API.service';
import { setActiveData, setUser } from '../../../redux/features/user/userSlice';

import styles from './settings.module.scss';
import { updateDataValidations } from '../../../helpers/validation';

const Settings = (props: any) => {
  let isDisable = false;
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState<any>({});
  const userData = useSelector((state: RootState) => state.user.userData);
  const [updatedFormData, setUpdatedFormData] = useState<any>(
    userData || {}
  );

  const [isActiveVal, setIsActiveVal] = useState(
    userData && userData.is_active ? 'active' : 'deactive'
  );

  const handleActivateUser = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const data = e.target.value;
    setIsActiveVal(data);
    const sendData = data === 'active' ? true : false;
    await postActivate(sendData);
    // const response = await postActivate(sendData);
    // if(response.status === 201) {
    dispatch(setActiveData());
    // }
  };

  const handleDeleteAccount = () => {
    props.toggleModal('deleteAccount');
  };

  function onChange(name: string, value: string | number) {    
    setUpdatedFormData((prev: any) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  function handleChangeUpdatedData(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    const { name, value } = e.target;
    onChange(name, value);
    if (name !== 'address') {
      setErrorMessage((prev: any) => {
        return {
          ...prev,
          [name]: updateDataValidations[name](value),
        };
      });
    }
  }

  for (let key in updatedFormData as unknown as { [key: string]: string }) {
    if (updatedFormData[key] === '' || errorMessage[key]) isDisable = true;
  }  

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const response = await updateUserData(updatedFormData);
    if (response!.status === 200) {
      const userNewData = {
        login: true,
        userData: { ...userData, ...response!.data },
      };
      dispatch(setUser(userNewData));
    }
  }

  return (
    <div className={styles.settings}>
      <fieldset className={styles.activateSection}>
        <legend>Activate / Deactivate</legend>

        <div className={styles.radioBtnWrapper}>
          <label
            htmlFor="active"
            className={isActiveVal === 'active' ? styles.isActive : undefined}
          >
            Activate
          </label>
          <input
            id="active"
            type="radio"
            value="active"
            name="is_active"
            onChange={handleActivateUser}
            checked={isActiveVal === 'active'}
          />
          <label
            htmlFor="deactive"
            className={isActiveVal === 'deactive' ? styles.isActive : undefined}
          >
            Deactivate
          </label>
          <input
            type="radio"
            id="deactive"
            value="deactive"
            name="is_active"
            onChange={handleActivateUser}
            checked={isActiveVal === 'deactive'}
            className={isActiveVal && styles.isActive}
          />
        </div>
      </fieldset>
      <fieldset>
        <legend>Update User data</legend>
        <div>
          <Accordion defaultActiveKey="">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Change user data</Accordion.Header>
              <Accordion.Body>
                <form
                  onSubmit={handleSubmit}
                  className={styles.updateUserDataForm}
                >
                  <label htmlFor="orgName">Organization Name</label>
                  <input
                    type="text"
                    id="orgName"
                    name="orgName"
                    placeholder="ex. Degusto"
                    value={updatedFormData.org_name}
                    onChange={handleChangeUpdatedData}
                  />
                  <p className={styles.errorMsg}>{errorMessage['orgName']}</p>
                  <label htmlFor="username">USERNAME</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="ex. poghos001"
                    value={updatedFormData.username}
                    onChange={handleChangeUpdatedData}
                  />
                  <p className={styles.errorMsg}>{errorMessage['username']}</p>
                  <label htmlFor="email">EMAIL</label>
                  <input
                    id="email"
                    type="text"
                    name="email"
                    value={updatedFormData.email}
                    placeholder="ex. test@gmail.com *"
                    onChange={handleChangeUpdatedData}
                  />
                  <p className={styles.errorMsg}>{errorMessage['email']}</p>
                  <label htmlFor="phone_number">PHONE NUMBER</label>
                  <input
                    id="phone_number"
                    type="text"
                    name="phone_number"
                    onChange={handleChangeUpdatedData}
                    placeholder="ex. +374 33 123 456 *"
                    value={updatedFormData.phone_number}
                  />
                  <p className={styles.errorMsg}>{errorMessage['phone_number']}</p>
                  <label htmlFor="address">Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={updatedFormData.address}
                    onChange={handleChangeUpdatedData}
                    placeholder="Ex. Yerevan, Abovyan 999 *"
                  />
                  <p className={styles.errorMsg}>{errorMessage['address']}</p>
                  <label htmlFor="description">DESCRIPTION</label>
                  <textarea
                    id="description"
                    name="description"
                    placeholder="DESCRIPTION"
                    onChange={handleChangeUpdatedData}
                    value={updatedFormData.description}
                  />
                  <p className={styles.errorMsg}>{errorMessage['description']}</p>
                  <Button buttonType="btn" type="submit" disabled={isDisable}>
                    SUBMIT
                  </Button>
                </form>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Change password</Accordion.Header>
              <Accordion.Body>
                <form
                  onSubmit={handleSubmit}
                  className={styles.updateUserDataForm}
                >
                  <label htmlFor="oldPass">Old Password</label>
                  <input
                    id="oldPass"
                    name="oldPass"
                    type="password"
                    placeholder="123456"
                    onChange={handleChangeUpdatedData}
                  />
                  <label htmlFor="newPass">New Password</label>
                  <input
                    id="newPass"
                    name="newPass"
                    type="password"
                    placeholder="654321"
                    onChange={handleChangeUpdatedData}
                  />
                  <label htmlFor="newPassRepeat">Repeat new Password</label>
                  <input
                    type="password"
                    id="newPassRepeat"
                    placeholder="654321"
                    name="newPassRepeat"
                    onChange={handleChangeUpdatedData}
                  />
                  <Button buttonType="btn" type="submit">
                    SUBMIT
                  </Button>
                </form>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </fieldset>
      <fieldset className={styles.deleteAccount}>
        <legend>Delete Account</legend>
        <div>
          <button onClick={handleDeleteAccount}>Delete Account</button>
        </div>
      </fieldset>
    </div>
  );
};

export default Settings;
