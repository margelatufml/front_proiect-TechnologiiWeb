import React, { useState, useEffect } from "react";
import AlimentAPI from "../api/alimenteAPI";
import PostToSocialMedia from "./PostToSocialMedia";

const AvailableProducts = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await AlimentAPI.getAvailableProducts();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load available products.");
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Available Products</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {products.map((product) => (
          <li key={product.id_aliment}>
            <PostToSocialMedia product={product} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AvailableProducts;
