// src/pages/Gallery.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Gallery.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const Gallery = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch gallery items from server
  const fetchGallery = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/admin/gallery`);
      setItems(res.data);
    } catch (err) {
      console.error("❌ Failed to fetch gallery:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  if (loading) return <p className="loading">Loading gallery...</p>;

  return (
    <div className="gallery-page">
      <h1>Gallery</h1>

      {items.length === 0 ? (
        <p className="empty">No photos or videos uploaded yet.</p>
      ) : (
        <div className="gallery-grid">
          {items.map((item) => (
            <div key={item._id} className="gallery-card">
              {item.mediaType === "video" ? (
                <video
                  src={`${API_URL}${item.mediaUrl}`}
                  controls
                  muted
                  preload="metadata"
                />
              ) : (
                <img src={`${API_URL}${item.mediaUrl}`} alt={item.caption} />
              )}
              <div className="caption">{item.caption}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Gallery;
