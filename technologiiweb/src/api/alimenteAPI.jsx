// src/api/alimenteAPI.js

import axios from "axios";
import config from "../config";

const apiUrl = `${config.apibackend}/aliment`;

// Helper to grab the token from localStorage
const getToken = () => localStorage.getItem("token");

const AlimentAPI = {
  createAliment: async (data) => {
    try {
      const token = getToken();
      const response = await axios.post(apiUrl, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error creating aliment:", error.response?.data || error);
      throw error;
    }
  },

  getAllAlimente: async () => {
    try {
      const token = getToken();
      const response = await axios.get(`${config.apibackend}/alimente`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching alimente:", error);
      throw error;
    }
  },

  // Fetch alimente by user
  getAlimenteByUser: async (userId) => {
    try {
      const token = getToken();
      const response = await axios.get(`${apiUrl}/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching alimente by user:", error);
      throw error;
    }
  },

  // Fetch alimente by category
  getAlimenteByCategory: async (userId, category) => {
    try {
      const token = getToken();
      const response = await axios.get(`${apiUrl}/${userId}/${category}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(
        "Error fetching alimente by category:",
        error.response?.data || error
      );
      throw error;
    }
  },

  getAlerts: async (userId) => {
    try {
      const token = getToken();
      const response = await axios.get(
        `${config.apibackend}/alerts/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching alerts:", error.response?.data || error);
      throw error;
    }
  },

  markAsAvailable: async (id) => {
    try {
      const token = getToken();
      const response = await axios.put(`${apiUrl}/${id}/toggle`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(
        "Error marking as available:",
        error.response?.data || error
      );
      throw error;
    }
  },

  claimAliment: async (id, userId) => {
    try {
      const token = getToken();
      const response = await axios.put(
        `${apiUrl}/${id}`,
        { id_utilizator: userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error claiming aliment:", error);
      throw error;
    }
  },

  toggleDisponibil: async (id) => {
    try {
      const token = getToken();
      const response = await axios.put(`${apiUrl}/${id}/toggle`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(
        "Error toggling disponibil:",
        error.response?.data || error
      );
      throw error;
    }
  },

  deleteAliment: async (id) => {
    try {
      const token = getToken();
      const response = await axios.delete(`${apiUrl}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error deleting aliment:", error.response?.data || error);
      throw error;
    }
  },
};

export default AlimentAPI;
