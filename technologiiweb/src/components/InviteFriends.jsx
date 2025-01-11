import React, { useState } from "react";
import PrietenAPI from "../api/prietenAPI";

const InviteFriends = ({ userId }) => {
  const [tag, setTag] = useState("");
  const [friends, setFriends] = useState([]);
  const [error, setError] = useState("");

  // Fetch friends by tag
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
    <div>
      <h2>Invite Friends</h2>
      <input
        type="text"
        placeholder="Enter Tag (e.g., Vegetarian)"
        value={tag}
        onChange={(e) => setTag(e.target.value)}
      />
      <button onClick={handleInvite}>Invite</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {friends.map((friend) => (
          <li key={friend.id_prietenie}>
            Friend ID: {friend.id_prieten_utilizator} -{" "}
            {friend.eticheta_prieten}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InviteFriends;
