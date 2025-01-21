import React, { useState } from "react";
import PrietenAPI from "../api/prietenAPI";

const InviteFriends = ({ userId }) => {
  const [tag, setTag] = useState("");
  const [friends, setFriends] = useState([]);
  const [error, setError] = useState("");

  const handleInvite = async () => {
    try {
      const allFriends = await PrietenAPI.getFriendsByUser(userId);
      const taggedFriends = allFriends.filter(
        (friend) => friend.eticheta_prieten === tag
      );
      setFriends(taggedFriends);
      if (taggedFriends.length === 0) {
        setError("No friends found with this tag.");
      } else {
        setError("");
      }
    } catch (err) {
      console.error("Error inviting friends:", err);
      setError("Failed to fetch friends.");
    }
  };

  return (
    <div className="p-4 bg-base-200 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold">Invite Friends</h2>
      <div className="form-control mt-4">
        <input
          type="text"
          placeholder="Enter Tag (e.g., Vegetarian)"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          className="input input-bordered"
        />
      </div>
      <button onClick={handleInvite} className="btn btn-primary mt-4">
        Invite
      </button>
      {error && <p className="text-error mt-4">{error}</p>}
      <ul className="space-y-4 mt-4">
        {friends.map((friend) => (
          <li
            key={friend.id_prietenie}
            className="p-4 bg-base-100 rounded-lg shadow-md"
          >
            Friend ID: {friend.id_prieten_utilizator} -{" "}
            {friend.eticheta_prieten}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InviteFriends;
