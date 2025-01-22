// src/components/ShareAvailableAlimente.jsx
import React, { useState, useEffect } from "react";
import { useUserContext } from "../context/UserContext";
import AlimentAPI from "../api/alimenteAPI";
import axios from "axios";
import config from "../config";

const ShareAvailableAlimente = ({ refreshKey }) => {
  const { user } = useUserContext();

  const [availableAlimente, setAvailableAlimente] = useState([]);
  const [shareMessage, setShareMessage] = useState("");
  const [error, setError] = useState("");
  const [copySuccess, setCopySuccess] = useState("");
  const [instagramPosting, setInstagramPosting] = useState(false);
  const [facebookPosting, setFacebookPosting] = useState(false);

  // --------------------------------------------
  // 1) Fetch available alimente when user or refreshKey changes
  // --------------------------------------------
  useEffect(() => {
    const fetchAvailableAlimente = async () => {
      try {
        if (!user || !user.id_utilizator) return;

        const alimenteData = await AlimentAPI.getAlimenteByUser(
          user.id_utilizator
        );
        console.log("Fetched alimente:", alimenteData);

        // Filter for 'disponibil === true'
        const available = alimenteData.filter((a) => a.disponibil);
        setAvailableAlimente(available);

        if (available.length > 0) {
          const lines = available.map(
            (aliment) => `• ${aliment.continut} (${aliment.categorie})`
          );
          setShareMessage(
            `I have the following products available to claim:\n${lines.join(
              "\n"
            )}`
          );
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

    // Run on mount, whenever user or refreshKey changes
    fetchAvailableAlimente();
  }, [user, refreshKey]);

  // --------------------------------------------
  // 2) Share on Facebook
  // --------------------------------------------
  const handleFacebookShare = () => {
    if (!shareMessage) {
      setError("No available products to share on Facebook.");
      return;
    }

    setFacebookPosting(true);

    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      "https://your-app-url.com"
    )}&quote=${encodeURIComponent(shareMessage)}`;

    window.open(url, "_blank", "noopener,noreferrer");
    setFacebookPosting(false);
  };

  // --------------------------------------------
  // 3) Share on Instagram
  // --------------------------------------------
  const handleInstagramShare = async () => {
    if (!shareMessage) {
      setError("No available products to share on Instagram.");
      return;
    }

    setInstagramPosting(true);
    setError("");
    setCopySuccess("");

    try {
      const response = await axios.post(
        `${config.apibackend}/aliment/instagram/post`,
        { userId: user?.id_utilizator }
      );

      if (response.data && response.data.postId) {
        setCopySuccess("Instagram post created successfully!");
      } else {
        setError("Failed to create Instagram post.");
      }
    } catch (err) {
      console.error("Error posting to Instagram:", err.response?.data || err);
      setError("Failed to create Instagram post.");
    } finally {
      setInstagramPosting(false);
    }
  };

  // --------------------------------------------
  // 4) Render
  // --------------------------------------------
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
