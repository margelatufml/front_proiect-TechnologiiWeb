import React, { useState } from "react";
import SearchAllUsers from "./SearchAllUsers";
import AddFriend from "./AddFriend";

const FriendManagement = ({ userId }) => {
  const [selectedFriendId, setSelectedFriendId] = useState(null);

  const handleSelectUser = (id) => {
    setSelectedFriendId(id);
  };

  return (
    <div className="p-6 bg-base-200 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6">Friend Management</h1>
      <SearchAllUsers onSelectUser={handleSelectUser} />
      {selectedFriendId && (
        <AddFriend userId={userId} selectedFriendId={selectedFriendId} />
      )}
    </div>
  );
};

export default FriendManagement;
