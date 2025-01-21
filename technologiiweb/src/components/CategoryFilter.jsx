import React, { useState } from "react";

const CategoryFilter = ({ categories = [], onFilter }) => {
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleFilter = () => {
    onFilter(selectedCategory);
  };

  return (
    <div className="p-4 bg-base-200 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold">Filter by Category</h2>
      <div className="form-control">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="select select-bordered w-full mt-2"
        >
          <option value="">All Categories</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleFilter} className="btn btn-primary mt-4">
        Apply Filter
      </button>
    </div>
  );
};

export default CategoryFilter;
