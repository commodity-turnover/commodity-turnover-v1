import axios from "axios";
import { useEffect, useState } from "react";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return;
      }

      const response = await axios.get("http://localhost:3001/products", {
        headers: {
          "access-token": token,
        },
      });

      console.log(response);
      

      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log(products);

  return (
    <div>
      <h1>Products xxx</h1>
    </div>
  );
};

export default Products;
