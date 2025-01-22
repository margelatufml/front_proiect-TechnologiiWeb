// src/api/UtilizatorAPI.js

import axios from "axios";
import config from "../config";

const apiUrl = `${config.apibackend}/utilizator`;

// Helper function to get the token from localStorage
const getToken = () => localStorage.getItem("token");

const UtilizatorAPI = {
  registerUser: async (data) => {
    try {
      const response = await axios.post(`${apiUrl}/register`, data);
      return response.data;
    } catch (error) {
      console.error("Error registering user:", error);
      throw error;
    }
  },

  loginUser: async (data) => {
    try {
      // POST to /login
      const response = await axios.post(`${apiUrl}/login`, data);
      const { token } = response.data;

      // If we have a token, store it
      if (token) {
        localStorage.setItem("token", token);
      }

      return response.data; // Contains { message, token, user: {...} }
    } catch (error) {
      console.error("Error logging in user:", error);
      throw error;
    }
  },

  getAllUsers: async () => {
    try {
      const token = getToken();
      if (!token) {
        throw new Error("No token available. Please log in.");
      }

      const response = await axios.get(`${config.apibackend}/utilizatori`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error.response?.data || error);
      throw error;
    }
  },

  getUserByUsername: async (username) => {
    try {
      const token = getToken();
      if (!token) {
        throw new Error("No token available. Please log in.");
      }

      const response = await axios.get(`${apiUrl}/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching user by username:", error);
      throw error;
    }
  },
};

export default UtilizatorAPI;
