import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

import { getAllProducts } from "../../../api/API.service";
import Product from "../Product/Product";

import styles from "./products.module.scss";

const Products = (props: any) => {
  const [sortType, setSortType] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const {
    setSelectedProductData,
    setLoadingProduct,
    setProducts,
    toggleModal,
    products,
  } = props;

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortType(event.target.value);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getAllProducts(searchQuery, sortType);
        setProducts(productsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [searchQuery, sortType, setProducts]);

  if (loading) {
    return (
      <div className={styles.loader}>
        <ClipLoader color="#36d7b7" size={100} />
      </div>
    );
  }

  return (
    <div className={styles.products}>
      <h1>Products</h1>
      <div className={styles.products_setting}>
        <div className={styles.addProduct}>
          <button
            onClick={() => {
              toggleModal("add");
            }}
          ></button>
        </div>
        <select
          name="sort"
          id="sort"
          value={sortType}
          onChange={handleSelectChange}
        >
          <option value="" disabled>
            Sort by...
          </option>
          <option value="lastDateAsc">Old Date</option>
          <option value="lastDateDesc">Last Date</option>
          <option value="nameAsc">Name (Ascending)</option>{" "}
          {/* from down to top - աճող*/}
          <option value="nameDesc">Name (Descending)</option>
          <option value="priceAsc">Price (Ascending)</option>
          <option value="priceDesc">Price (Descending)</option>
        </select>
        <input
          type="text"
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search item..."
        />
      </div>
      <div className={styles.products_content}>
        {products.map((product: any) => {
          return (
            <Product
              productData={product}
              key={product.product_id}
              setProducts={setProducts}
              toggleModal={toggleModal}
              setLoadingProduct={setLoadingProduct}
              setSelectedProductData={setSelectedProductData}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Products;
