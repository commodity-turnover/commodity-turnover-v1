import { useState } from "react";

import Modal from "../../../../shared/Modals/ModalHOC";

import styles from "./updateProductModal.module.scss";
import { getAllProducts, updateProduct } from "../../../../api/API.service";

const UpdateProductModal = (props: any) => {
  const [productData, setProductData] = useState(props.selectedProductData[0]);

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
      const getProducts = await getAllProducts("", "");
      props.setProducts(getProducts);
      console.log(response);

      props.toggleModal("");
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
            type="text"
            id="name"
            placeholder="Name"
            name="name"
            value={productData.name}
            onChange={handleChange}
          />
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            placeholder="Price"
            name="price"
            value={productData.price}
            onChange={handleChange}
          />
          <label htmlFor="count">Count</label>
          <input
            type="number"
            id="count"
            placeholder="Count"
            name="product_count"
            value={productData.product_count}
            onChange={handleChange}
          />
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            placeholder="Description..."
            name="description"
            value={productData.description}
            onChange={handleChange}
          />
        </div>
        <button onClick={() => handleUpdate()}>Update</button>
      </div>
    </Modal>
  );
};

export default UpdateProductModal;
