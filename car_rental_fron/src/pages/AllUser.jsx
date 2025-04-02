import React, { useEffect, useState } from "react";
import { fetchUsers } from "../api/auth.js"; // Import API call

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetchUsers(); // Call API
        setUsers(response.data);
      } catch (err) {
        setError("Failed to fetch users. Please try again.");
      }
    };
    getUsers();
  }, []);

  return (
    <div className="container">
      <h2>All Users</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {users.length > 0 ? (
          users.map((user) => (
            <li key={user._id}>
              <strong>{user.name}</strong> - {user.email}
            </li>
          ))
        ) : (
          <p>No users found.</p>
        )}
      </ul>
    </div>
  );
};

export default UsersPage;
