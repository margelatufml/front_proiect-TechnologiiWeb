import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import UtilizatorAPI from "../api/utilizatorAPI";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [parola, setParola] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUser } = useUserContext();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await UtilizatorAPI.loginUser({ username, parola });

      if (response && response.message === "Login successful.") {
        // Store the token and user data in localStorage
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));

        // Update the user context
        setUser(response.user);

        // Redirect to the fridge page
        navigate("/fridge");
      } else {
        setError("Invalid username or password.");
      }
    } catch (err) {
      setError("Failed to log in. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center">
      <div className="w-full max-w-md p-6 bg-base-100 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="form-control">
            <label htmlFor="username" className="label">
              <span className="label-text">Username:</span>
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="form-control">
            <label htmlFor="parola" className="label">
              <span className="label-text">Password:</span>
            </label>
            <input
              type="password"
              id="parola"
              value={parola}
              onChange={(e) => setParola(e.target.value)}
              placeholder="Enter your password"
              className="input input-bordered w-full"
              required
            />
          </div>
          {error && <p className="text-error text-center">{error}</p>}
          <button type="submit" className="btn btn-primary w-full">
            Login
          </button>
        </form>
        <p className="text-center mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="link link-primary">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
