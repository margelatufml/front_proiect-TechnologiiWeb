import React, { useState } from "react";
import AlimentAPI from "../api/alimenteAPI";

const AddAliment = ({ userId, onAdd }) => {
  const [categorie, setCategorie] = useState("");
  const [continut, setContinut] = useState("");
  const [dataExpirare, setDataExpirare] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newAliment = {
      id_utilizator: userId,
      categorie,
      continut,
      data_expirare: dataExpirare,
      disponibil: true,
    };

    try {
      const addedAliment = await AlimentAPI.addAliment(newAliment);
      onAdd(addedAliment); // Updatează lista în pagină
    } catch (error) {
      console.error("Error adding aliment:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Aliment</h2>
      <div>
        <label>Categorie:</label>
        <input
          type="text"
          value={categorie}
          onChange={(e) => setCategorie(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Conținut:</label>
        <input
          type="text"
          value={continut}
          onChange={(e) => setContinut(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Data Expirării:</label>
        <input
          type="date"
          value={dataExpirare}
          onChange={(e) => setDataExpirare(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add</button>
    </form>
  );
};

export default AddAliment;
