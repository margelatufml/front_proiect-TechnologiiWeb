import React, { useState, useEffect } from "react";
import PrietenAPI from "../api/PrietenAPI";
import FoodItemsModal from "./FoodItemsModal";

const FriendGroups = ({ userId }) => {
  const [friends, setFriends] = useState([]);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFriendId, setSelectedFriendId] = useState(null);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const data = await PrietenAPI.getFriendsByUser(userId);
        setFriends(data);
      } catch (err) {
        console.error("Error fetching friends:", err);
        setError("Failed to load friends.");
      }
    };

    fetchFriends();
    const handleFriendAdded = () => {
      fetchFriends();
    };
    window.addEventListener("friendAdded", handleFriendAdded);

    return () => {
      // Cleanup the event listener
      window.removeEventListener("friendAdded", handleFriendAdded);
    };
  }, [userId]);

  const openModal = (friendId) => {
    setSelectedFriendId(friendId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedFriendId(null);
    setIsModalOpen(false);
  };

  const handleDeleteFriend = async (friendId) => {
    try {
      await PrietenAPI.deleteFriend(friendId);
      setFriends((prevFriends) =>
        prevFriends.filter((friend) => friend.id_prietenie !== friendId)
      );
    } catch (err) {
      console.error("Error deleting friend:", err);
      setError("Failed to delete friend.");
    }
  };

  const handleUpdateTag = async (friendId, newTag) => {
    try {
      await PrietenAPI.updateFriendLabel(userId, {
        id_prieten_utilizator: friendId,
        eticheta_prieten: newTag,
      });
      setFriends((prevFriends) =>
        prevFriends.map((friend) =>
          friend.id_prieten_utilizator === friendId
            ? { ...friend, eticheta_prieten: newTag }
            : friend
        )
      );
    } catch (err) {
      console.error("Error updating tag:", err);
      setError("Failed to update tag.");
    }
  };

  return (
    <div className="p-4 bg-base-200 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold">Manage Friends</h2>
      {error && <p className="text-error">{error}</p>}
      <ul className="space-y-4 mt-4">
        {friends.map((friend) => (
          <li
            key={friend.id_prietenie}
            className="p-4 bg-base-100 rounded-lg shadow-md flex justify-between items-center"
          >
            <span>
              Friend ID: {friend.id_prieten_utilizator} - Tag:{" "}
              <input
                type="text"
                value={friend.eticheta_prieten}
                onChange={(e) =>
                  handleUpdateTag(friend.id_prieten_utilizator, e.target.value)
                }
                className="input input-bordered w-48"
              />
            </span>
            <div className="space-x-2">
              <button
                onClick={() => openModal(friend.id_prieten_utilizator)}
                className="btn btn-outline btn-primary"
              >
                View Food Items
              </button>
              <button
                onClick={() => handleDeleteFriend(friend.id_prietenie)}
                className="btn btn-outline btn-error"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      {isModalOpen && (
        <FoodItemsModal
          friendId={selectedFriendId}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default FriendGroups;
