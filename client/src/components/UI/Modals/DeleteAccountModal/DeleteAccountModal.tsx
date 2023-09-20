import { useDispatch } from 'react-redux';

import Modal from '../../../../shared/Modals/ModalHOC';
import { deleteAccount } from '../../../../api/API.service';
import { clearUser } from '../../../../redux/features/user/userSlice';

import styles from './deleteAccountModal.module.scss';
import { useNavigate } from 'react-router-dom';

const DeleteAccountModal = (props: any) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleDeleteAccount() {
    const response = deleteAccount();
    localStorage.setItem('token', '');
    dispatch(clearUser());
    navigate('/');

    console.log(response);
    
  }

  function handleCancelDeletingAccount() {
    props.toggleModal('');
  }

  return (
    <Modal handleClose={props.toggleModal}>
      <div className={styles.deleteAccountModal}>
        <h2>Are you sure for deleting account?</h2>
        <div className={styles.btnWrapper}>
          <button onClick={handleDeleteAccount}>Yes</button>
          <button onClick={handleCancelDeletingAccount}>No</button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteAccountModal;
