import React, { useState, useEffect } from "react";
import UtilizatorAPI from "../api/utilizatorAPI";

const SearchAllUsers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await UtilizatorAPI.getAllUsers();
        setUsers(data);
      } catch (err) {
        setError("Error fetching users.");
        console.error("Error fetching users:", err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="p-6 bg-base-200 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold">All Users</h2>
      {error && <p className="text-error">{error}</p>}
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id_utilizator}>
                <td>{user.id_utilizator}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SearchAllUsers;
