// src/pages/FriendsPage.jsx
import React, { useState } from "react";
import NavBar from "../components/Navbar";
import FriendGroups from "../components/FriendGroups";
import AddFriend from "../components/AddFriend";
import { useUserContext } from "../context/UserContext";

const FriendsPage = () => {
  const { user } = useUserContext();
  const [friendsRefreshKey, setFriendsRefreshKey] = useState(0);

  const handleAddComplete = () => {
    setFriendsRefreshKey((prevKey) => prevKey + 1);
  };

  // ----------------------------------
  // 1) If 'user' is null, show a fallback (e.g. loading)
  // ----------------------------------
  if (!user) {
    return (
      <div>
        <NavBar />
        <p>Loading user data...</p>
      </div>
    );
  }

  // ----------------------------------
  // 2) If user exists but no ID, handle gracefully
  //    (Depending on your backend, this might be user.id or user.id_utilizator)
  // ----------------------------------
  if (!user.id_utilizator) {
    return (
      <div>
        <NavBar />
        <p>No valid user ID found. Please re-login.</p>
      </div>
    );
  }

  // ----------------------------------
  // 3) Main render after passing checks
  // ----------------------------------
  return (
    <div>
      <NavBar />
      <FriendGroups
        userId={user.id_utilizator}
        refreshKey={friendsRefreshKey} // Pass refresh key for FriendGroups
      />

      <AddFriend
        userId={user.id_utilizator}
        onAddComplete={handleAddComplete}
      />
    </div>
  );
};

export default FriendsPage;
