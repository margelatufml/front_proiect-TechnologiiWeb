import React, { useState, useEffect } from "react";
import AlimentAPI from "../api/alimenteAPI";

const FoodItemsModal = ({ friendId, isOpen, onClose }) => {
  const [foodItems, setFoodItems] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!friendId) return;

    const fetchFoodItems = async () => {
      try {
        const data = await AlimentAPI.getAlimenteByUser(friendId); // Fetch food items for the specific friend
        setFoodItems(data);
      } catch (err) {
        setError("Error fetching food items. Please try again.");
        console.error("Error fetching food items:", err);
      }
    };

    fetchFoodItems();
  }, [friendId]);

  const handleClaim = async (id) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user.id_utilizator;
      await AlimentAPI.claimAliment(id, userId);
      setFoodItems((prevItems) =>
        prevItems.map((item) =>
          item.id_aliment === id
            ? {
                ...item,
                disponibil: item.disponibil - 1,
                id_utilizator: userId,
              }
            : item
        )
      );
    } catch (err) {
      console.error("Error claiming item:", err);
      setError("Failed to claim the item. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-4xl">
        <h2 className="text-2xl font-bold mb-4">Food Items for Friend</h2>
        {error && <p className="text-error mb-4">{error}</p>}
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Item</th>
                <th>Category</th>
                <th>Expires</th>
                <th>Disponibil</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {foodItems.map((item) => (
                <tr key={item.id_aliment}>
                  <td>{item.continut}</td>
                  <td>{item.categorie}</td>
                  <td>{new Date(item.data_expirare).toLocaleDateString()}</td>
                  <td>{item.disponibil}</td>
                  <td>
                    {item.disponibil > 0 ? (
                      <button
                        onClick={() => handleClaim(item.id_aliment)}
                        className="btn btn-primary btn-sm"
                      >
                        Claim
                      </button>
                    ) : (
                      <span className="text-error">Not Available</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="modal-action">
          <button onClick={onClose} className="btn">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodItemsModal;
