// src/components/FridgeWithAlerts.jsx
import React, { useState, useEffect } from "react";
import CategoryFilter from "./CategoryFilter";
import AlimentAPI from "../api/alimenteAPI";

const FridgeWithAlerts = ({ alimente = [], alerts = [], onUpdate }) => {
  const [filteredAlimente, setFilteredAlimente] = useState(alimente);
  const [deletingId, setDeletingId] = useState(null); // To manage deletion state
  const [error, setError] = useState(""); // To display any errors

  const categories = ["Lactate", "Legume", "Fructe", "Muraturi", "Dulciuri"];

  const handleFilter = (category) => {
    if (!category) {
      setFilteredAlimente(alimente);
    } else {
      setFilteredAlimente(
        alimente.filter((item) => item.categorie === category)
      );
    }
  };

  useEffect(() => {
    setFilteredAlimente(alimente);
  }, [alimente]);

  const toggleDisponibil = async (id) => {
    try {
      const response = await AlimentAPI.toggleDisponibil(id);
      const updatedAliment = response.aliment;

      // Update the local state immediately
      setFilteredAlimente((prev) =>
        prev.map((item) =>
          item.id_aliment === updatedAliment.id_aliment
            ? { ...item, disponibil: updatedAliment.disponibil }
            : item
        )
      );

      if (onUpdate) {
        onUpdate();
      }
    } catch (error) {
      console.error("Error toggling disponibil:", error);
      alert("Error updating item availability.");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this aliment?"
    );
    if (!confirmDelete) return;

    try {
      setDeletingId(id);
      await AlimentAPI.deleteAliment(id);

      // Remove the deleted aliment from the local state
      setFilteredAlimente((prev) =>
        prev.filter((item) => item.id_aliment !== id)
      );

      if (onUpdate) {
        onUpdate();
      }
    } catch (error) {
      console.error("Error deleting aliment:", error);
      setError("Failed to delete the aliment.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="p-4 bg-base-200 rounded-lg shadow-lg">
      <CategoryFilter categories={categories} onFilter={handleFilter} />
      <h2 className="text-xl font-bold mt-6">Fridge List</h2>
      {error && <p className="text-error mt-2">{error}</p>}
      {filteredAlimente.length > 0 ? (
        <ul className="space-y-4 mt-4">
          {filteredAlimente.map((item) => (
            <li
              key={item.id_aliment}
              className="p-3 bg-base-100 rounded-lg shadow-md flex justify-between items-center"
            >
              <span>
                {item.continut} - {item.categorie} (Exp:{" "}
                {new Date(item.data_expirare).toLocaleDateString()})
              </span>
              <div className="flex items-center space-x-2">
                {alerts.includes(item.id_aliment) ? (
                  <button className="btn btn-error btn-sm">
                    Expires soon!
                  </button>
                ) : (
                  <span className="text-success">Available</span>
                )}
                <span className="text-sm">
                  {item.disponibil
                    ? "Disponibil pentru claim!"
                    : "Nu este disponibil pentru claim!"}
                </span>
                <button
                  onClick={() => toggleDisponibil(item.id_aliment)}
                  className={`btn btn-sm ${
                    item.disponibil ? "btn-warning" : "btn-primary"
                  }`}
                >
                  {item.disponibil
                    ? "Mark as Unavailable"
                    : "Mark as Available"}
                </button>
                <button
                  onClick={() => handleDelete(item.id_aliment)}
                  className={`btn btn-sm btn-error ${
                    deletingId === item.id_aliment ? "loading" : ""
                  }`}
                  disabled={deletingId === item.id_aliment}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-error mt-4">No items match the selected category!</p>
      )}
    </div>
  );
};

export default FridgeWithAlerts;
