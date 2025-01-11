import React from "react";
import FriendGroups from "../components/FriendGroups";
import InviteFriends from "../components/InviteFriends";
import AvailableProducts from "../components/AvailableProducts";

const MainPage = ({ userId }) => {
  return (
    <div>
      <h1>Welcome to Your Dashboard</h1>
      <FriendGroups userId={userId} />
      <InviteFriends userId={userId} />
      <AvailableProducts userId={userId} />
    </div>
  );
};

export default MainPage;
