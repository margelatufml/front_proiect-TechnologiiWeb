import axios from "axios";
import config from "../config";

const apiUrl = `${config.apibackend}/prieten`;

const PrietenAPI = {
  addFriend: async (data) => {
    try {
      const response = await axios.post(apiUrl, data);
      return response.data;
    } catch (error) {
      console.error("Error adding friend:", error.response?.data || error);
      throw error;
    }
  },
};

export default PrietenAPI;
