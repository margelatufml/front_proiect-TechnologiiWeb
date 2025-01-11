import React from "react";

const FridgeList = ({ alimente }) => {
  if (alimente.length === 0) {
    return <p>No items in your fridge yet!</p>;
  }

  return (
    <div>
      <h2>Fridge List</h2>
      <ul>
        {alimente.map((aliment) => (
          <li key={aliment.id_aliment}>
            {aliment.continut} - {aliment.categorie} (Exp:{" "}
            {new Date(aliment.data_expirare).toLocaleDateString()})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FridgeList;
