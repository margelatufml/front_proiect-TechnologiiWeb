import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import UtilizatorAPI from "../api/utilizatorAPI";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [parola, setParola] = useState("");
  const [confirmParola, setConfirmParola] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (parola !== confirmParola) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await UtilizatorAPI.registerUser({
        username,
        email,
        parola,
      });

      if (response) {
        setSuccessMessage("Registration successful! You can now log in.");
        setTimeout(() => navigate("/"), 2000); // Redirect to login page after 2 seconds
      }
    } catch (err) {
      if (err.response && err.response.status === 409) {
        setError("Username or email already in use.");
      } else {
        setError("Failed to register. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center">
      <div className="w-full max-w-md p-6 bg-base-100 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Register</h1>
        <form onSubmit={handleRegister} className="space-y-4">
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
            <label htmlFor="email" className="label">
              <span className="label-text">Email:</span>
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
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
          <div className="form-control">
            <label htmlFor="confirmParola" className="label">
              <span className="label-text">Confirm Password:</span>
            </label>
            <input
              type="password"
              id="confirmParola"
              value={confirmParola}
              onChange={(e) => setConfirmParola(e.target.value)}
              placeholder="Confirm your password"
              className="input input-bordered w-full"
              required
            />
          </div>
          {error && <p className="text-error text-center">{error}</p>}
          {successMessage && (
            <p className="text-success text-center">{successMessage}</p>
          )}
          <button type="submit" className="btn btn-primary w-full">
            Register
          </button>
        </form>
        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/" className="link link-primary">
            Log in here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
