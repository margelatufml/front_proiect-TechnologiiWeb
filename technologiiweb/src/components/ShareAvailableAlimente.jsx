// src/components/ShareAvailableAlimente.jsx
import React, { useState, useEffect } from "react";
import { useUserContext } from "../context/UserContext";
import AlimentAPI from "../api/alimenteAPI";
import axios from "axios";
import config from "../config";

const ShareAvailableAlimente = () => {
  const { user } = useUserContext();
  const [availableAlimente, setAvailableAlimente] = useState([]);
  const [shareMessage, setShareMessage] = useState("");
  const [error, setError] = useState("");
  const [copySuccess, setCopySuccess] = useState("");
  const [instagramPosting, setInstagramPosting] = useState(false);
  const [facebookPosting, setFacebookPosting] = useState(false);

  useEffect(() => {
    const fetchAvailableAlimente = async () => {
      try {
        const alimenteData = await AlimentAPI.getAlimenteByUser(user.id);
        const available = alimenteData.filter(
          (aliment) => aliment.disponibil === true
        );
        setAvailableAlimente(available);

        if (available.length > 0) {
          const messageLines = available.map(
            (aliment) => `• ${aliment.continut} (${aliment.categorie})`
          );
          const message = `I have the following products available to claim:\n${messageLines.join(
            "\n"
          )}`;
          setShareMessage(message);
        } else {
          setShareMessage(
            "I have no products available to claim at the moment."
          );
        }
      } catch (err) {
        console.error("Error fetching available alimente:", err);
        setError("Failed to load available products for sharing.");
      }
    };

    if (user && user.id) {
      fetchAvailableAlimente();
    }
  }, [user]);

  const handleFacebookShare = () => {
    if (!shareMessage) {
      setError("No available products to share on Facebook.");
      return;
    }

    setFacebookPosting(true);
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      "https://your-app-url.com" // Replace with your app's URL or a specific page
    )}&quote=${encodeURIComponent(shareMessage)}`;
    window.open(facebookShareUrl, "_blank", "noopener,noreferrer");
    setFacebookPosting(false);
  };

  const handleInstagramShare = async () => {
    if (!shareMessage) {
      setError("No available products to share on Instagram.");
      return;
    }

    setInstagramPosting(true);
    setError("");
    setCopySuccess("");

    try {
      // Call the backend endpoint to post to Instagram
      const response = await axios.post(
        `${config.apibackend}/aliment/instagram/post`,
        {
          userId: user.id,
        }
      );

      if (response.data && response.data.postId) {
        setCopySuccess("Instagram post created successfully!");
      } else {
        setError("Failed to create Instagram post.");
      }
    } catch (err) {
      console.error(
        "Error posting to Instagram:",
        err.response?.data || err.message
      );
      setError("Failed to create Instagram post.");
    } finally {
      setInstagramPosting(false);
    }
  };

  return (
    <div className="p-4 bg-base-200 rounded-lg shadow-lg mt-6">
      <h2 className="text-xl font-bold mb-4">Share Available Products</h2>
      {error && <p className="text-error mb-4">{error}</p>}
      <p className="mb-4 whitespace-pre-line">{shareMessage}</p>
      <div className="flex space-x-4">
        <button
          onClick={handleFacebookShare}
          className={`btn btn-primary ${facebookPosting ? "loading" : ""}`}
          disabled={facebookPosting}
        >
          Share on Facebook
        </button>
        <button
          onClick={handleInstagramShare}
          className={`btn btn-secondary ${instagramPosting ? "loading" : ""}`}
          disabled={instagramPosting}
        >
          Share on Instagram
        </button>
      </div>
      {copySuccess && <p className="text-success mt-2">{copySuccess}</p>}
    </div>
  );
};

export default ShareAvailableAlimente;
