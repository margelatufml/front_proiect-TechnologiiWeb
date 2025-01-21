// src/pages/FriendsPage.jsx
import React, { useState } from "react";
import NavBar from "../components/Navbar";
import FriendGroups from "../components/FriendGroups";
import InviteFriends from "../components/InviteFriends";
import SearchAllUsers from "../components/SearchAllUsers";
import AddFriend from "../components/AddFriend";
import { useUserContext } from "../context/UserContext";

const FriendsPage = () => {
  const { user } = useUserContext();
  const [friendsRefreshKey, setFriendsRefreshKey] = useState(0);

  const handleAddComplete = () => {
    setFriendsRefreshKey((prevKey) => prevKey + 1);
  };

  return (
    <div>
      <NavBar />
      <FriendGroups
        userId={user.id}
        refreshKey={friendsRefreshKey} // Refresh key for FriendGroups
      />
      <InviteFriends userId={user.id} />
      <SearchAllUsers />
      <AddFriend
        userId={user.id}
        onAddComplete={handleAddComplete} // Trigger refresh for FriendGroups
      />
    </div>
  );
};

export default FriendsPage;
