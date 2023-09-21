import { useState } from 'react';

import { createProduct, getAllProducts } from '../../../../api/API.service';
import { initialProductData } from '../../../../constants/const';
import Modal from '../../../../shared/Modals/ModalHOC';

import styles from './addProductModal.module.scss';

const AddProductModal = (props: any) => {
  const [productData, setProductData] = useState(initialProductData);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    setProductData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }

  const handleSubmit = async () => {
    try {
      const createdProduct = await createProduct(productData);
      const getProducts = await getAllProducts('', '');
      props.setProducts(getProducts);
      console.log('Product created:', createdProduct);
      props.toggleModal('');
    } catch (error) {
      console.error('Error creating product', error);
    }
  };

  return (
    <Modal handleClose={props.toggleModal}>
      <div className={styles.addProductModal}>
        <h2>Add product</h2>
        <div className={styles.inputWrapper}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Name"
            onChange={handleChange}
          />
          <label htmlFor="price">Price</label>
          <input
            id="price"
            name="price"
            type="number"
            placeholder="Price"
            onChange={handleChange}
          />
          <label htmlFor="count">Count</label>
          <input
            id="count"
            type="number"
            placeholder="Count"
            name="product_count"
            onChange={handleChange}
          />
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            placeholder="Description..."
            onChange={handleChange}
          />
        </div>
        <button onClick={handleSubmit}>Add</button>
      </div>
    </Modal>
  );
};

export default AddProductModal;
