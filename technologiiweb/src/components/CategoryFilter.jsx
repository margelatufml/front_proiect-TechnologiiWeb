import React, { useState } from "react";

const CategoryFilter = ({ onFilter }) => {
  const [category, setCategory] = useState("");

  const handleFilter = () => {
    onFilter(category);
  };

  return (
    <div>
      <h2>Filter by Category</h2>
      <input
        type="text"
        placeholder="Enter category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <button onClick={handleFilter}>Filter</button>
    </div>
  );
};

export default CategoryFilter;
