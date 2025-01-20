import React, { useState } from "react";
import PrietenAPI from "../api/PrietenAPI";

const AddFriend = ({ userId }) => {
  const [friendId, setFriendId] = useState("");
  const [tag, setTag] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleAddFriend = async (e) => {
    e.preventDefault();

    if (parseInt(friendId, 10) === userId) {
      setErrorMessage("You cannot add yourself as a friend.");
      setSuccessMessage("");
      return;
    }

    try {
      const data = {
        id_utilizator: userId,
        id_prieten_utilizator: friendId,
        eticheta_prieten: tag,
      };
      await PrietenAPI.addFriend(data);
      setSuccessMessage("Friend added successfully!");
      setErrorMessage("");
      setFriendId("");
      setTag("");
    } catch (error) {
      setErrorMessage(
        "Error adding friend. Friend relationship may already exist."
      );
      console.error("Error adding friend:", error);
    }
  };

  return (
    <div className="p-6 bg-base-200 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold">Add New Friend</h2>
      {successMessage && <p className="text-success">{successMessage}</p>}
      {errorMessage && <p className="text-error">{errorMessage}</p>}
      <form onSubmit={handleAddFriend} className="space-y-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Friend's User ID:</span>
          </label>
          <input
            type="number"
            value={friendId}
            onChange={(e) => setFriendId(e.target.value)}
            placeholder="Enter friend's user ID"
            className="input input-bordered w-full"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Tag:</span>
          </label>
          <input
            type="text"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            placeholder="Enter a tag (e.g., Best Friend)"
            className="input input-bordered w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={parseInt(friendId, 10) === userId}
        >
          Add Friend
        </button>
      </form>
    </div>
  );
};

export default AddFriend;
