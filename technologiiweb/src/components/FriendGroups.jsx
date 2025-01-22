// src/components/FriendGroups.jsx
import React, { useState, useEffect } from "react";
import PrietenAPI from "../api/PrietenAPI";
import UtilizatorAPI from "../api/utilizatorAPI";
import FoodItemsModal from "./FoodItemsModal";

const FriendGroups = ({ userId }) => {
  const [friends, setFriends] = useState([]);
  const [userNames, setUserNames] = useState({});
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFriendId, setSelectedFriendId] = useState(null);

  useEffect(() => {
    const fetchFriendsAndUsers = async () => {
      try {
        // Fetch friends
        const friendsData = await PrietenAPI.getFriendsByUser(userId);
        setFriends(friendsData);

        // Fetch all users
        const usersData = await UtilizatorAPI.getAllUsers();

        // Create a mapping from user ID to user name
        const namesMap = {};
        usersData.forEach((user) => {
          namesMap[user.id_utilizator] = user.username;
        });
        setUserNames(namesMap);
      } catch (err) {
        console.error("Error fetching friends or users:", err);
        setError("Failed to load friends.");
      }
    };

    fetchFriendsAndUsers();

    const handleFriendAdded = () => {
      fetchFriendsAndUsers();
    };
    window.addEventListener("friendAdded", handleFriendAdded);

    return () => {
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
              <strong>
                {userNames[friend.id_prieten_utilizator] || "Unknown User"}
              </strong>{" "}
              - Tag:{" "}
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
