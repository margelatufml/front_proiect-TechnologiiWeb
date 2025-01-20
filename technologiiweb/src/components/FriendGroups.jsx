import React, { useState, useEffect } from "react";
import PrietenAPI from "../api/PrietenAPI";

const FriendGroups = ({ userId }) => {
  const [friends, setFriends] = useState([]);
  const [newFriend, setNewFriend] = useState({
    id_prieten_utilizator: "",
    eticheta_prieten: "",
  });
  const [error, setError] = useState("");

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

  const handleUpdateFriend = async (id, label) => {
    try {
      await PrietenAPI.updateFriendLabel(userId, {
        id_prieten_utilizator: id,
        eticheta_prieten: label,
      });
      setFriends((prev) =>
        prev.map((friend) =>
          friend.id_prieten_utilizator === id
            ? { ...friend, eticheta_prieten: label }
            : friend
        )
      );
    } catch (err) {
      console.error("Error updating friend label:", err);
    }
  };

  const handleDeleteFriend = async (id) => {
    try {
      await PrietenAPI.deleteFriend(id);
      setFriends((prev) => prev.filter((friend) => friend.id_prietenie !== id));
    } catch (err) {
      console.error("Error deleting friend:", err);
    }
  };

  return (
    <div className="p-4 bg-base-200 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold">Manage Friends</h2>
      {error && <p className="text-error">{error}</p>}
      <form onSubmit={handleAddFriend} className="space-y-4 mt-4">
        <div className="form-control">
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
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <input
            type="text"
            placeholder="Tag (e.g., Vegetarian)"
            value={newFriend.eticheta_prieten}
            onChange={(e) =>
              setNewFriend({ ...newFriend, eticheta_prieten: e.target.value })
            }
            className="input input-bordered"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Friend
        </button>
      </form>
      <ul className="space-y-4 mt-4">
        {friends.map((friend) => (
          <li
            key={friend.id_prietenie}
            className="p-4 bg-base-100 rounded-lg shadow-md flex justify-between items-center"
          >
            <span>
              Friend ID: {friend.id_prieten_utilizator} - Tag:{" "}
              {friend.eticheta_prieten}
            </span>
            <div className="space-x-2">
              <input
                type="text"
                value={friend.eticheta_prieten}
                onChange={(e) =>
                  handleUpdateFriend(
                    friend.id_prieten_utilizator,
                    e.target.value
                  )
                }
                className="input input-bordered w-48"
              />
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
    </div>
  );
};

export default FriendGroups;
