import React, { useState, useEffect } from "react";
import UtilizatorAPI from "../api/utilizatorAPI";
import PrietenAPI from "../api/prietenAPI";


const AddFriend = ({ userId }) => {
  const [allUsers, setAllUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [tag, setTag] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const tags = [
    "vegetarieni",
    "carnivori",
    "iubitori de zacusca",
    "iubitori de legume",
    "iubitori de toate categoriile",
  ];

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await UtilizatorAPI.getAllUsers();
        const filteredUsers = users.filter(
          (user) => user.id_utilizator !== userId
        );
        setAllUsers(filteredUsers);
        setFilteredUsers(filteredUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
        setErrorMessage("Failed to fetch users.");
      }
    };

    fetchUsers();
  }, [userId]);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredUsers(
      query
        ? allUsers.filter((user) => user.username.toLowerCase().includes(query))
        : allUsers
    );
  };

  const handleAddFriend = async (e) => {
    e.preventDefault();

    if (!selectedUser || !tag) {
      setErrorMessage("Please select a friend and tag.");
      return;
    }

    try {
      const data = {
        id_utilizator: userId,
        id_prieten_utilizator: selectedUser,
        eticheta_prieten: tag,
      };
      await PrietenAPI.addFriend(data);

      // Emit a custom event to refresh FriendGroups
      const event = new CustomEvent("friendAdded", { detail: selectedUser });
      window.dispatchEvent(event);

      setSuccessMessage("Friend added successfully!");
      setErrorMessage("");
      setSelectedUser("");
      setTag("");
      setSearchQuery("");
      setFilteredUsers(allUsers);
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
          <label className="label">Search Friend by Name:</label>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Type a friend's name"
            className="input input-bordered w-full"
          />
          {filteredUsers.length > 0 && (
            <ul className="list-none mt-2 bg-base-100 rounded-lg shadow-lg max-h-40 overflow-y-auto">
              {filteredUsers.map((user) => (
                <li
                  key={user.id_utilizator}
                  onClick={() => {
                    setSelectedUser(user.id_utilizator);
                    setSearchQuery(user.username);
                    setFilteredUsers([]);
                  }}
                  className="p-2 cursor-pointer hover:bg-base-200"
                >
                  {user.username}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="form-control">
          <label className="label">Tag:</label>
          <select
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            className="select select-bordered w-full"
            required
          >
            <option value="" disabled>
              Select a tag
            </option>
            {tags.map((tagOption) => (
              <option key={tagOption} value={tagOption}>
                {tagOption}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={!selectedUser || !tag}
        >
          Add Friend
        </button>
      </form>
    </div>
  );
};

export default AddFriend;
