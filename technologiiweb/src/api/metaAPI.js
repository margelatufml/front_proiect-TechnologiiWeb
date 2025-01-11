import axios from "axios";
import config from "../config";

const metaApiUrl = `${config.apibackend}/meta`;

const MetaAPI = {
  postToFacebook: async (pageAccessToken, pageId, product) => {
    try {
      const response = await axios.post(`${metaApiUrl}/post/facebook`, {
        pageAccessToken,
        pageId,
        product,
      });
      return response.data;
    } catch (error) {
      console.error("Error posting to Facebook:", error);
      throw error;
    }
  },

  postToInstagram: async (igUserId, accessToken, product) => {
    try {
      const response = await axios.post(`${metaApiUrl}/post/instagram`, {
        igUserId,
        accessToken,
        product,
      });
      return response.data;
    } catch (error) {
      console.error("Error posting to Instagram:", error);
      throw error;
    }
  },
};

export default MetaAPI;
