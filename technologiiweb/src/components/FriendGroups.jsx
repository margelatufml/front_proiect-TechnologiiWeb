import React, { useState, useEffect } from "react";
import PrietenAPI from "../api/prietenAPI";

const FriendGroups = ({ userId }) => {
  const [friends, setFriends] = useState([]);
  const [newFriend, setNewFriend] = useState({
    id_prieten_utilizator: "",
    eticheta_prieten: "",
  });
  const [error, setError] = useState("");

  // Fetch all friends for the user
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
  }, [userId]);

  // Add a new friend
  const handleAddFriend = async (e) => {
    e.preventDefault();
    try {
      const addedFriend = await PrietenAPI.addFriend({
        id_utilizator: userId,
        ...newFriend,
      });
      setFriends((prev) => [...prev, addedFriend]);
      setNewFriend({ id_prieten_utilizator: "", eticheta_prieten: "" });
    } catch (err) {
      console.error("Error adding friend:", err);
      setError("Failed to add friend. Ensure all fields are correct.");
    }
  };

  // Update a friend's label
  const handleUpdateFriend = async (
    id_prieten_utilizator,
    eticheta_prieten
  ) => {
    try {
      await PrietenAPI.updateFriendLabel(userId, {
        id_prieten_utilizator,
        eticheta_prieten,
      });
      setFriends((prev) =>
        prev.map((friend) =>
          friend.id_prieten_utilizator === id_prieten_utilizator
            ? { ...friend, eticheta_prieten }
            : friend
        )
      );
    } catch (err) {
      console.error("Error updating friend label:", err);
    }
  };

  // Delete a friend
  const handleDeleteFriend = async (id_prietenie) => {
    try {
      await PrietenAPI.deleteFriend(id_prietenie);
      setFriends((prev) =>
        prev.filter((friend) => friend.id_prietenie !== id_prietenie)
      );
    } catch (err) {
      console.error("Error deleting friend:", err);
    }
  };

  return (
    <div>
      <h2>Manage Friends</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleAddFriend}>
        <input
          type="number"
          placeholder="Friend's User ID"
          value={newFriend.id_prieten_utilizator}
          onChange={(e) =>
            setNewFriend({
              ...newFriend,
              id_prieten_utilizator: e.target.value,
            })
          }
          required
        />
        <input
          type="text"
          placeholder="Tag (e.g., Vegetarian)"
          value={newFriend.eticheta_prieten}
          onChange={(e) =>
            setNewFriend({ ...newFriend, eticheta_prieten: e.target.value })
          }
          required
        />
        <button type="submit">Add Friend</button>
      </form>
      <ul>
        {friends.map((friend) => (
          <li key={friend.id_prietenie}>
            Friend ID: {friend.id_prieten_utilizator} - Tag:{" "}
            {friend.eticheta_prieten}
            <input
              type="text"
              value={friend.eticheta_prieten}
              onChange={(e) =>
                handleUpdateFriend(friend.id_prieten_utilizator, e.target.value)
              }
            />
            <button onClick={() => handleDeleteFriend(friend.id_prietenie)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FriendGroups;
