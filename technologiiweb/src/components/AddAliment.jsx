import React, { useState } from "react";
import AlimentAPI from "../api/alimenteAPI";

const AddAliment = ({ userId, onAdd }) => {
  const [categorie, setCategorie] = useState("");
  const [continut, setContinut] = useState("");
  const [dataExpirare, setDataExpirare] = useState("");

  // Format date to DD-MM-YYYY
  const formatDateToDDMMYYYY = (date) => {
    const [year, month, day] = date.split("-");
    return `${day}-${month}-${year}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure all fields are properly formatted
    const newAliment = {
      id_utilizator: userId,
      categorie: categorie.trim(), // Remove any extra spaces
      continut: continut.trim(), // Remove any extra spaces
      data_expirare: formatDateToDDMMYYYY(dataExpirare), // Format date
      disponibil: true, // Explicitly ensure it’s a boolean
    };

    try {
      console.log("Sending payload:", newAliment);
      const addedAliment = await AlimentAPI.createAliment(newAliment);
      onAdd(addedAliment); // Update the list on the page
    } catch (error) {
      console.error("Error adding aliment:", error.response?.data || error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 p-6 bg-base-200 rounded-lg shadow-lg w-full max-w-lg mx-auto"
    >
      <h2 className="text-2xl font-bold text-center">Add Aliment</h2>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Categorie:</span>
        </label>
        <input
          type="text"
          value={categorie}
          onChange={(e) => setCategorie(e.target.value)}
          placeholder="Enter category"
          className="input input-bordered w-full"
          required
        />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Conținut:</span>
        </label>
        <input
          type="text"
          value={continut}
          onChange={(e) => setContinut(e.target.value)}
          placeholder="Enter content"
          className="input input-bordered w-full"
          required
        />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Data Expirării:</span>
        </label>
        <input
          type="date"
          value={dataExpirare}
          onChange={(e) => setDataExpirare(e.target.value)}
          className="input input-bordered w-full"
          required
        />
      </div>

      <button type="submit" className="btn btn-primary w-full">
        Add Aliment
      </button>
    </form>
  );
};

export default AddAliment;
