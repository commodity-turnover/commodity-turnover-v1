import product_default_img from "../../../assets/images/product/default_product.png";

import { deleteProduct, getProduct } from "../../../api/API.service";

import styles from "./product.module.scss";
import CardHOC from "../../../shared/CardHOC/CardHOC";

const Product = (props: any) => {
  const { product_id, name, price, product_count } = props.productData;

  const handleGetProduct = async (product_id: any) => {
    try {
      const productData = await getProduct(product_id);
      props.setSelectedProductData(productData);
      props.setLoadingProduct(false);
      props.toggleModal("view");
    } catch (error) {
      console.log("Error getting product", error);
    }
  };

  const handleUpdateProduct = async (product_id: any) => {
    try {
      const productData = await getProduct(product_id);
      props.setSelectedProductData(productData);
      props.toggleModal("update");
    } catch (error) {
      console.error("Error product [delete]", error);
    }
  };

  const handleDeleteProduct = async (product_id: any) => {
    try {
      deleteProduct(product_id);
      props.setProducts((prev:any) => {
        return prev.filter((product:any) => product.product_id !== product_id)
      })
    } catch (error) {
      console.error("Error product [delete]", error);
    }
  };

  return (
    <CardHOC>

    <div className={styles.product}>
      <div className={styles.productImgWrapper}>
        <img src={product_default_img} alt="default_product" />
      </div>
      <div className={styles.productContent}>
        <div className={styles.productInfoWrapper}>
          <h2>Model: {name}</h2>
          <p>Price: $ {price}</p>
          <p>Count: {product_count}</p>
        </div>
        <div className={styles.btnWrapper}>
          <button
            onClick={() => {
              handleGetProduct(product_id);
            }}
          >
            View
          </button>
          <button onClick={() => handleUpdateProduct(product_id)}>Update</button>
          <button onClick={() => handleDeleteProduct(product_id)}>
            Delete
          </button>
        </div>
      </div>
    </div>
    </CardHOC>
  );
};

export default Product;
