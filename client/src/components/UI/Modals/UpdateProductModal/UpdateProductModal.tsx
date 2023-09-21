import { useState } from 'react';

import Modal from '../../../../shared/Modals/ModalHOC';
import { getAllProducts, updateProduct } from '../../../../api/API.service';

import styles from './updateProductModal.module.scss';

const UpdateProductModal = (props: any) => {
  const [productData, setProductData] = useState(props.selectedProductData);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    setProductData((prev: any) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }

  const handleUpdate = async () => {
    try {
      const response = await updateProduct(productData);
      const getProducts = await getAllProducts('', '');
      props.setProducts(getProducts);
      console.log(response);

      props.toggleModal('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal handleClose={props.toggleModal}>
      <div className={styles.updateProductModal}>
        <h2>Update product</h2>
        <div className={styles.inputWrapper}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Name"
            onChange={handleChange}
            value={productData.name}
          />
          <label htmlFor="price">Price</label>
          <input
            id="price"
            name="price"
            type="number"
            placeholder="Price"
            onChange={handleChange}
            value={productData.price}
          />
          <label htmlFor="count">Count</label>
          <input
            id="count"
            type="number"
            placeholder="Count"
            name="product_count"
            onChange={handleChange}
            value={productData.product_count}
          />
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            onChange={handleChange}
            placeholder="Description..."
            value={productData.description}
          />
        </div>
        <button onClick={() => handleUpdate()}>Update</button>
      </div>
    </Modal>
  );
};

export default UpdateProductModal;
