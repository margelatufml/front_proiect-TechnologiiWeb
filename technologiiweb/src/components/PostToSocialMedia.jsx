import React from "react";
import MetaAPI from "../api/metaAPI";

const PostToSocialMedia = ({ product }) => {
  const handlePostToFacebook = async () => {
    const pageAccessToken = "your-facebook-page-access-token";
    const pageId = "your-facebook-page-id";

    try {
      await MetaAPI.postToFacebook(pageAccessToken, pageId, product);
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
      await MetaAPI.postToInstagram(igUserId, accessToken, product);
      alert("Posted to Instagram successfully!");
    } catch (err) {
      console.error("Error posting to Instagram:", err);
      alert("Failed to post to Instagram.");
    }
  };

  return (
    <div className="p-4 bg-base-100 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold">{product.continut}</h3>
      <div className="space-x-4 mt-2">
        <button onClick={handlePostToFacebook} className="btn btn-primary">
          Post to Facebook
        </button>
        <button onClick={handlePostToInstagram} className="btn btn-secondary">
          Post to Instagram
        </button>
      </div>
    </div>
  );
};

export default PostToSocialMedia;
