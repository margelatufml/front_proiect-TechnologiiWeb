import axios from "axios";
import config from "../config";

const apiUrl = `${config.apibackend}/aliment`;

const AlimentAPI = {
  createAliment: async (data) => {
    try {
      const response = await axios.post(apiUrl, data);
      return response.data;
    } catch (error) {
      console.error("Error creating aliment:", error);
      throw error;
    }
  },

  getAllAlimente: async () => {
    try {
      const response = await axios.get(`${config.apibackend}/alimente`);
      return response.data;
    } catch (error) {
      console.error("Error fetching alimente:", error);
      throw error;
    }
  },

  getAlimenteByUser: async (id_utilizator) => {
    try {
      const response = await axios.get(`${apiUrl}/${id_utilizator}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching alimente by user:", error);
      throw error;
    }
  },

  toggleDisponibil: async (id) => {
    try {
      const response = await axios.put(`${apiUrl}/${id}/toggle`);
      return response.data;
    } catch (error) {
      console.error("Error toggling disponibil:", error);
      throw error;
    }
  },

  deleteAliment: async (id) => {
    try {
      const response = await axios.delete(`${apiUrl}/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting aliment:", error);
      throw error;
    }
  },
};

export default AlimentAPI;
