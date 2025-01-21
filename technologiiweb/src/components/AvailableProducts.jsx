import React, { useState, useEffect } from "react";
import AlimentAPI from "../api/alimenteAPI";
import PostToSocialMedia from "./ShareAvailableAlimente";

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
    <div className="p-6 bg-base-200 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold">Available Products</h2>

      {error && <p className="text-error">{error}</p>}

      <ul className="space-y-4">
        {products.map((product) => (
          <li
            key={product.id_aliment}
            className="p-4 bg-base-100 rounded-lg shadow-md"
          >
            <PostToSocialMedia product={product} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AvailableProducts;
