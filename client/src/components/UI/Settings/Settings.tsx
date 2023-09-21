import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Accordion from 'react-bootstrap/Accordion';

import { RootState } from '../../../redux/types';
import { postActivate, updateUserData } from '../../../api/API.service';
import { setActiveData, setUser } from '../../../redux/features/user/userSlice';

import styles from './settings.module.scss';
import Button from '../../forms/Button/Button';
import { IUserData } from '../../../Interfaces/interfaces';

const Settings = (props: any) => {
  const dispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.user.userData);
  const [updatedFormData, setUpdatedFormData] = useState<IUserData>(
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

  function handleChangeUpdatedData(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    setUpdatedFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
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
            type="radio"
            id="active"
            value="active"
            name="is_active"
            checked={isActiveVal === 'active'}
            onChange={handleActivateUser}
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
            checked={isActiveVal === 'deactive'}
            onChange={handleActivateUser}
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
                    placeholder="ex. Degusto"
                    name="org_name"
                    id="orgName"
                    onChange={handleChangeUpdatedData}
                    value={updatedFormData.org_name}
                  />
                  <label htmlFor="username">USERNAME</label>
                  <input
                    type="text"
                    placeholder="ex. poghos001"
                    id="username"
                    name="username"
                    onChange={handleChangeUpdatedData}
                    value={updatedFormData.username}
                  />
                  <label htmlFor="email">EMAIL</label>
                  <input
                    type="text"
                    placeholder="ex. test@gmail.com *"
                    id="email"
                    name="email"
                    onChange={handleChangeUpdatedData}
                    value={updatedFormData.email}
                  />
                  <label htmlFor="phone">PHONE NUMBER</label>
                  <input
                    type="text"
                    placeholder="ex. +374 33 123 456 *"
                    id="phone"
                    name="phone_number"
                    onChange={handleChangeUpdatedData}
                    value={updatedFormData.phone_number}
                  />
                  <label htmlFor="address">Address</label>
                  <input
                    type="text"
                    placeholder="Ex. Yerevan, Abovyan 999 *"
                    id="address"
                    name="address"
                    onChange={handleChangeUpdatedData}
                    value={updatedFormData.address}
                  />
                  <label htmlFor="description">DESCRIPTION</label>
                  <textarea
                    placeholder="DESCRIPTION"
                    name="description"
                    id="description"
                    onChange={handleChangeUpdatedData}
                    value={updatedFormData.description}
                  />
                  <Button buttonType="btn" type="submit">
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
                    type="password"
                    placeholder="123456"
                    name="oldPass"
                    id="oldPass"
                    onChange={handleChangeUpdatedData}
                  />
                  <label htmlFor="newPass">New Password</label>
                  <input
                    type="password"
                    placeholder="654321"
                    name="newPass"
                    id="newPass"
                    onChange={handleChangeUpdatedData}
                  />
                  <label htmlFor="newPassRepeat">Repeat new Password</label>
                  <input
                    type="password"
                    placeholder="654321"
                    name="newPassRepeat"
                    id="newPassRepeat"
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
