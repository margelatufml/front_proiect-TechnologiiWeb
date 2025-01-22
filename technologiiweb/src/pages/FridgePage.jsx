// src/pages/FridgePage.jsx
import React, { useState, useEffect } from "react";
import AlimentAPI from "../api/alimenteAPI";
import NavBar from "../components/Navbar";
import FridgeWithAlerts from "../components/FridgeWithAlerts";
import AddAliment from "../components/AddAliment";
import ShareAvailableAlimente from "../components/ShareAvailableAlimente";
import { useUserContext } from "../context/UserContext";

const FridgePage = () => {
  const { user } = useUserContext();

  const [alimente, setAlimente] = useState([]);
  const [alerts, setAlerts] = useState([]);

  // 1) This "refreshKey" will be passed to ShareAvailableAlimente
  const [refreshKey, setRefreshKey] = useState(0);

  // ---------------------------
  // Safely fetch alimente and alerts
  // ---------------------------
  const fetchData = async () => {
    if (!user || !user.id_utilizator) return;

    try {
      const alimenteData = await AlimentAPI.getAlimenteByUser(
        user.id_utilizator
      );
      setAlimente(alimenteData);

      const alertsData = await AlimentAPI.getAlerts(user.id_utilizator);
      setAlerts(alertsData.map((alert) => alert.id_aliment));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // On component mount or if user changes, refetch
  useEffect(() => {
    fetchData();
  }, [user]);

  // ---------------------------
  // Add a new aliment
  // ---------------------------
  const handleAddAliment = (newAliment) => {
    setAlimente((prev) => [...prev, newAliment]);
    fetchData();

    // 2) After updating the fridge, bump refreshKey so ShareAvailableAlimente re-fetches
    setRefreshKey((prevKey) => prevKey + 1);
  };

  // ---------------------------
  // Toggle disponibil for an aliment
  // ---------------------------
  const handleToggleDisponibil = async (updatedAliment) => {
    try {
      const toggledResponse = await AlimentAPI.toggleDisponibil(
        updatedAliment.id_aliment
      );
      const toggledAliment = toggledResponse.aliment || toggledResponse;

      // Update state
      setAlimente((prev) =>
        prev.map((a) =>
          a.id_aliment === toggledAliment.id_aliment ? toggledAliment : a
        )
      );

      // Refetch alerts
      fetchData();

      // 3) Also bump refreshKey so the share component re-fetches
      setRefreshKey((prevKey) => prevKey + 1);
    } catch (error) {
      console.error("Error toggling disponibil:", error);
    }
  };

  // ---------------------------
  // Render fallback if user is null or missing ID
  // ---------------------------
  if (!user) {
    return (
      <div>
        <NavBar />
        <p>Loading user data...</p>
      </div>
    );
  }

  if (!user.id_utilizator) {
    return (
      <div>
        <NavBar />
        <p>No valid user ID found. Please re-login.</p>
      </div>
    );
  }

  // ---------------------------
  // Main render
  // ---------------------------
  return (
    <div>
      <NavBar />
      <AddAliment userId={user.id_utilizator} onAdd={handleAddAliment} />
      <FridgeWithAlerts
        alimente={alimente}
        alerts={alerts}
        onToggleDisponibil={handleToggleDisponibil}
      />

      {/* 4) Pass refreshKey to ShareAvailableAlimente */}
      <ShareAvailableAlimente refreshKey={refreshKey} />
    </div>
  );
};

export default FridgePage;
