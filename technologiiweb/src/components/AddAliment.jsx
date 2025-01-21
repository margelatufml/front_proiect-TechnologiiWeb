import React, { useState } from "react";
import AlimentAPI from "../api/alimenteAPI";

const AddAliment = ({ userId, onAdd }) => {
  const [categorie, setCategorie] = useState("");
  const [continut, setContinut] = useState("");
  const [dataExpirare, setDataExpirare] = useState("");
  const [disponibil, setDisponibil] = useState(true); // Checkbox state

  const categories = [
    "Lactate",
    "Legume",
    "Fructe",
    "Mancare",
    "Muraturi",
    "Dulciuri",
  ];

  const formatDateToDDMMYYYY = (date) => {
    const [year, month, day] = date.split("-");
    return `${day}-${month}-${year}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newAliment = {
      id_utilizator: userId,
      categorie: categorie.trim(),
      continut: continut.trim(),
      data_expirare: formatDateToDDMMYYYY(dataExpirare),
      disponibil,
    };

    try {
      const addedAliment = await AlimentAPI.createAliment(newAliment);
      onAdd(addedAliment); // Notify parent to update alimente
      setCategorie("");
      setContinut("");
      setDataExpirare("");
      setDisponibil(true);
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || error.message || "An error occurred.";
      alert(`Error adding aliment: ${errorMessage}`);
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
        <select
          value={categorie}
          onChange={(e) => setCategorie(e.target.value)}
          className="select select-bordered w-full"
          required
        >
          <option value="" disabled>
            Select a category
          </option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
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

      <div className="form-control flex items-center">
        <label className="label cursor-pointer">
          <input
            type="checkbox"
            checked={disponibil}
            onChange={(e) => setDisponibil(e.target.checked)}
            className="checkbox checkbox-primary"
          />
          <span className="label-text ml-2">Disponibil</span>
        </label>
      </div>

      <button type="submit" className="btn btn-primary w-full">
        Add Aliment
      </button>
    </form>
  );
};

export default AddAliment;
