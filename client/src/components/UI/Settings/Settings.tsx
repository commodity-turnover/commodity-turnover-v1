import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../../redux/types";
import { postActivate } from "../../../api/API.service";
import { setActiveData } from "../../../redux/features/user/userSlice";

import styles from "./settings.module.scss";

const Settings = () => {
  const dispatch = useDispatch();
  const isActiveUser = useSelector(
    (state: RootState) => state.user.userData?.is_active
  );

  const [isActiveVal, setIsActiveVal] = useState(
    isActiveUser ? "active" : "deactive"
  );

  const handleActivateUser = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const data = e.target.value;
    setIsActiveVal(data);
    const sendData = data === "active" ? true : false;
    await postActivate(sendData);
    // const response = await postActivate(sendData);
    // if(response.status === 201) {
    dispatch(setActiveData());
    // }
  };

  console.log(isActiveVal);

  return (
    <div className={styles.settings}>
      <fieldset>
        <legend>Activate / Deactivate</legend>

        {/* <div className={styles.radioBtnWrapper}> */}
          <label
            htmlFor="active"
            className={isActiveVal === "active" ? styles.isActive : undefined}
          >
            Activate
          </label>
          <input
            type="radio"
            id="active"
            value="active"
            name="is_active"
            checked={isActiveVal === "active"}
            onChange={handleActivateUser}
          />
          <label
            htmlFor="deactive"
            className={isActiveVal === "deactive" ? styles.isActive : undefined}
          >
            Deactivate
          </label>
          <input
            type="radio"
            id="deactive"
            value="deactive"
            name="is_active"
            checked={isActiveVal === "deactive"}
            onChange={handleActivateUser}
            className={isActiveVal && styles.isActive}
          />
        {/* </div> */}
      </fieldset>
    </div>
  );
};

export default Settings;
