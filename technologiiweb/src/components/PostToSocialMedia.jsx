import React from "react";
import MetaAPI from "../api/metaAPI";

const PostToSocialMedia = ({ product }) => {
  const handlePostToFacebook = async () => {
    const pageAccessToken = "your-facebook-page-access-token";
    const pageId = "your-facebook-page-id";

    try {
      const response = await MetaAPI.postToFacebook(pageAccessToken, pageId, product);
      alert("Posted to Facebook successfully!");
    } catch (err) {
      console.error("Error posting to Facebook:", err);
      alert("Failed to post to Facebook.");
    }
  };

  const handlePostToInstagram = async () => {
    const igUserId = "your-instagram-user-id";
    const accessToken = "your-instagram-access-token";

    try {
      const response = await MetaAPI.postToInstagram(igUserId, accessToken, product);
      alert("Posted to Instagram successfully!");
    } catch (err) {
      console.error("Error posting to Instagram:", err);
      alert("Failed to post to Instagram.");
    }
  };

  return (
    <div>
      <h3>{product.continut}</h3>
      <button onClick={handlePostToFacebook}>Post to Facebook</button>
      <button onClick={handlePostToInstagram}>Post to Instagram</button>
    </div>
  );
};

export default PostToSocialMedia;
