import React, { useState, useEffect } from "react";
import AlimentAPI from "../api/alimenteAPI";

const AlertsList = ({ userId }) => {
  const [alerts, setAlerts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const data = await AlimentAPI.getAlerts(userId);
        setAlerts(data);
      } catch (err) {
        setError("No expiring products found or an error occurred.");
        console.error("Error fetching alerts:", err);
      }
    };

    fetchAlerts();
  }, [userId]);

  const handleMarkAsAvailable = async (id) => {
    try {
      await AlimentAPI.markAsAvailable(id);
      setAlerts((prevAlerts) =>
        prevAlerts.filter((alert) => alert.id_aliment !== id)
      );
    } catch (err) {
      console.error("Error marking product as available:", err);
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Expiring Products</h2>
      <ul>
        {alerts.map((alert) => (
          <li key={alert.id_aliment}>
            {alert.continut} (Exp:{" "}
            {new Date(alert.data_expirare).toLocaleDateString()})
            <button onClick={() => handleMarkAsAvailable(alert.id_aliment)}>
              Mark as Available
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlertsList;
