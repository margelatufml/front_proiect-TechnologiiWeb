import React, { useEffect, useState } from "react";
import PrietenAPI from "../api/PrietenAPI";
import UtilizatorAPI from "../api/utilizatorAPI";
import { useUserContext } from "../context/UserContext";

const FriendsList = () => {
  const { user } = useUserContext();
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        // Fetch all friends for the logged-in user
        const friendsData = await PrietenAPI.getFriendsByUser(user.id);

        // Fetch all users and map friend details
        const allUsers = await UtilizatorAPI.getAllUsers();

        const friendsWithDetails = friendsData.map((friend) => {
          const userDetail = allUsers.find(
            (u) => u.id_utilizator === friend.id_prieten_utilizator
          );
          return {
            ...friend,
            username: userDetail ? userDetail.username : "Unknown",
          };
        });

        setFriends(friendsWithDetails);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching friends:", err);
        setError("Failed to load friends. Please try again.");
        setLoading(false);
      }
    };

    fetchFriends();
  }, [user.id]);

  if (loading) return <div className="loading">Loading friends...</div>;
  if (error) return <div className="text-error">{error}</div>;

  return (
    <div className="p-6 bg-base-200 rounded-lg shadow-lg">
      <p>FRIEND LIST </p>
      <h2 className="text-2xl font-bold mb-4">My Friends</h2>
      {friends.length === 0 ? (
        <p>No friends found.</p>
      ) : (
        <ul className="list-disc pl-6 space-y-2">
          {friends.map((friend) => (
            <li key={friend.id_prieten_utilizator} className="text-lg">
              {friend.username}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FriendsList;
