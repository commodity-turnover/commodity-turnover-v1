import closeBtn from "../../assets/images/closeBtn.svg";

import styles from "./modalHOC.module.scss";

const Modal = (props: any) => {
  return (
    <>
      <div className={styles.backDrop} onClick={props.handleClose}></div>
      <div className={styles.modal}>
        <div className={styles.closeIconWrapper}>
          <img
            className={styles.closeBtn}
            src={closeBtn}
            onClick={props.handleClose}
            alt="closeBtn"
          />
        </div>
        <div className={styles.modalWrapper}>{props.children}</div>
      </div>
    </>
  );
};

export default Modal;
