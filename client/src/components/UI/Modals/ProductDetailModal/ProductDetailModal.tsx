import { format } from 'date-fns';

import ClipLoader from "react-spinners/ClipLoader";

import defaultProductImg from "../../../../assets/images/product/default_product.png";

import styles from "./productDetailModal.module.scss";

const ProductDetailModal = (props: any) => {
  function handleClose() {
    props.toggleModal("");
  }

  const parsedDate = new Date(props.selectedProductData.creationtimestamp);
  
  const formattedDate = format(parsedDate, "MMMM d, yyyy");


  return (
    <>
      <div className={styles.backDrop} onClick={handleClose}></div>
      <div
        className={
          props.isOpenModal === "view"
            ? `${styles.productDetailModal} animate__animated animate__fadeInRight`
            : "animate__animated animate__fadeOutRight"
        }
      >
        {props.loadingProduct ? (
          <div className={styles.loader}>
            <ClipLoader color="#36d7b7" size={100} />
        </div>
        ) : (
          <>
            <h2>{props.selectedProductData.name}</h2>
            <img src={defaultProductImg} alt="Product Img" />
            <p><strong>Price:</strong> ${props.selectedProductData.price}</p>
            <p><strong>Product Count:</strong> {props.selectedProductData.product_count}</p>
            <p><strong>Description:</strong> {props.selectedProductData.description}</p>
            <p><strong>Creation Date:</strong> {formattedDate}</p>
          </>
        )}
      </div>
    </>
  );
};

export default ProductDetailModal;
