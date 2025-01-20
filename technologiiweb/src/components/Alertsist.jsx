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
        setAlerts([]); // Ensure `alerts` is defined even if the API call fails
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

  return (
    <div className="p-6 bg-base-200 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold">Expiring Products</h2>

      {error && <p className="text-error">{error}</p>}

      {alerts.length > 0 ? (
        <ul className="space-y-4">
          {alerts.map((alert) => (
            <li
              key={alert.id_aliment}
              className="flex justify-between items-center p-4 bg-base-100 rounded-lg shadow-md"
            >
              <span>
                {alert.continut} (Exp:{" "}
                {new Date(alert.data_expirare).toLocaleDateString()})
              </span>
              <button
                onClick={() => handleMarkAsAvailable(alert.id_aliment)}
                className="btn btn-outline btn-sm"
              >
                Mark as Available
              </button>
            </li>
          ))}
        </ul>
      ) : (
        !error && <p>No expiring products available at the moment.</p>
      )}
    </div>
  );
};

export default AlertsList;
