// src/api/prietenAPI.js

import axios from "axios";
import config from "../config";

const apiUrl = `${config.apibackend}/prieten`;

// Helper to get token from localStorage
const getToken = () => localStorage.getItem("token");

const PrietenAPI = {
  addFriend: async (data) => {
    try {
      const token = getToken();
      const response = await axios.post(apiUrl, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error adding friend:", error.response?.data || error);
      throw error;
    }
  },

  // Fetch all friends for a specific user
  getFriendsByUser: async (userId) => {
    try {
      const token = getToken();
      const response = await axios.get(
        `${config.apibackend}/prieteni/utilizator/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching friends:", error.response?.data || error);
      throw error;
    }
  },

  updateFriendLabel: async (id_utilizator, data) => {
    try {
      const token = getToken();
      const response = await axios.put(`${apiUrl}/${id_utilizator}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(
        "Error updating friend label:",
        error.response?.data || error
      );
      throw error;
    }
  },

  deleteFriend: async (id_prietenie) => {
    try {
      const token = getToken();
      const response = await axios.delete(`${apiUrl}/${id_prietenie}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error deleting friend:", error.response?.data || error);
      throw error;
    }
  },
};

export default PrietenAPI;
