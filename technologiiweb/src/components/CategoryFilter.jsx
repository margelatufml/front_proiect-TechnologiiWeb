import React, { useState } from "react";

const CategoryFilter = ({ onFilter }) => {
  const [category, setCategory] = useState("");

  const handleFilter = () => {
    onFilter(category);
  };

  return (
    <div className="p-4 bg-base-200 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold">Filter by Category</h2>
      <div className="form-control">
        <input
          type="text"
          placeholder="Enter category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="input input-bordered w-full mt-2"
        />
      </div>
      <button onClick={handleFilter} className="btn btn-primary mt-4">
        Filter
      </button>
    </div>
  );
};

export default CategoryFilter;
