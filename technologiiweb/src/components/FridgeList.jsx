import React from "react";

const FridgeList = ({ alimente }) => {
  if (alimente.length === 0) {
    return <p className="text-error">No items in your fridge yet!</p>;
  }

  return (
    <div className="p-4 bg-base-200 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold">Fridge List</h2>
      <ul className="space-y-2 mt-4">
        {alimente.map((aliment) => (
          <li
            key={aliment.id_aliment}
            className="p-3 bg-base-100 rounded-lg shadow-md"
          >
            {aliment.continut} - {aliment.categorie} (Exp:{" "}
            {new Date(aliment.data_expirare).toLocaleDateString()})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FridgeList;
