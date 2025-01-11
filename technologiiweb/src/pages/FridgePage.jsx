import React, { useState, useEffect } from "react";
import FridgeList from "../components/FridgeList";
import AddAliment from "../components/AddAliment";
import CategoryFilter from "../components/CategoryFilter";
import AlimentAPI from "../api/alimenteAPI";

const FridgePage = ({ userId }) => {
  const [alimente, setAlimente] = useState([]);
  const [filteredAlimente, setFilteredAlimente] = useState([]);

  useEffect(() => {
    const fetchAlimente = async () => {
      try {
        const data = await AlimentAPI.getAlimenteByUser(userId);
        setAlimente(data);
        setFilteredAlimente(data);
      } catch (error) {
        console.error("Error fetching alimente:", error);
      }
    };

    fetchAlimente();
  }, [userId]);

  const handleAddAliment = (newAliment) => {
    setAlimente((prev) => [...prev, newAliment]);
    setFilteredAlimente((prev) => [...prev, newAliment]);
  };

  const handleFilterCategory = async (category) => {
    try {
      const data = await AlimentAPI.getAlimenteByCategory(userId, category);
      setFilteredAlimente(data);
    } catch (error) {
      console.error("Error filtering alimente by category:", error);
    }
  };

  return (
    <div>
      <h1>My Fridge</h1>
      <AddAliment userId={userId} onAdd={handleAddAliment} />
      <CategoryFilter onFilter={handleFilterCategory} />
      <FridgeList alimente={filteredAlimente} />
    </div>
  );
};

export default FridgePage;
