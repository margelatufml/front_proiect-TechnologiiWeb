import axios from "axios";
import config from "../config";

const apiUrl = `${config.apibackend}/prieten`;

const PrietenAPI = {
  addFriend: async (data) => {
    try {
      const response = await axios.post(apiUrl, data);
      return response.data;
    } catch (error) {
      console.error("Error adding friend:", error);
      throw error;
    }
  },

  getAllFriends: async () => {
    try {
      const response = await axios.get(`${config.apibackend}/prieteni`);
      return response.data;
    } catch (error) {
      console.error("Error fetching friends:", error);
      throw error;
    }
  },

  getFriendsByUser: async (id_utilizator) => {
    try {
      const response = await axios.get(`${apiUrl}/utilizator/${id_utilizator}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching friends by user:", error);
      throw error;
    }
  },

  updateFriendLabel: async (id_utilizator, data) => {
    try {
      const response = await axios.put(`${apiUrl}/${id_utilizator}`, data);
      return response.data;
    } catch (error) {
      console.error("Error updating friend label:", error);
      throw error;
    }
  },

  deleteFriend: async (id_prietenie) => {
    try {
      const response = await axios.delete(`${apiUrl}/${id_prietenie}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting friend:", error);
      throw error;
    }
  },
};

export default PrietenAPI;
