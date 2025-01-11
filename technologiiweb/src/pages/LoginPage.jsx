import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import UtilizatorAPI from "../api/utilizatorAPI";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [parola, setParola] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await UtilizatorAPI.loginUser({ username, parola });

      if (response && response.message === "Login successful.") {
        navigate("/main");
      } else {
        setError("Invalid username or password.");
      }
    } catch (err) {
      setError("Failed to log in. Please try again.");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="parola">Parola:</label>
          <input
            type="password"
            id="parola"
            value={parola}
            onChange={(e) => setParola(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};

export default LoginPage;
