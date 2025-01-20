import axios from "axios";
import config from "../config";

const apiUrl = `${config.apibackend}/utilizator`;

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
      const response = await axios.post(`${apiUrl}/login`, data);
      return response.data;
    } catch (error) {
      console.error("Error logging in user:", error);
      throw error;
    }
  },

  getAllUsers: async () => {
    try {
      const response = await axios.get(`${config.apibackend}/utilizatori`);
      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error.response?.data || error);
      throw error;
    }
  },

  getUserByUsername: async (username) => {
    try {
      const response = await axios.get(`${apiUrl}/${username}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching user by username:", error);
      throw error;
    }
  },
};

export default UtilizatorAPI;
