// src/pages/Gallery.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Gallery.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const Gallery = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch gallery items from server
  const fetchGallery = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/admin/gallery`);
      setItems(res.data);
      console.log("Fetched gallery items:", res.data);
      setError(null);
    } catch (err) {
      console.error("❌ Failed to fetch gallery:", err);
      setError("Failed to load gallery images. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  // Handle image load error
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement | HTMLVideoElement, Event>) => {
    const target = e.currentTarget as HTMLImageElement | HTMLVideoElement;
    console.error("Image failed to load:", target.src);
    target.style.display = "none";
    const parent = target.parentElement;
    if (parent) {
      const errorMsg = document.createElement("div");
      errorMsg.className = "image-error";
      errorMsg.textContent = "Image unavailable";
      parent.appendChild(errorMsg);
    }
  };

  if (loading) return <p className="loading">Loading gallery...</p>;
  if (error) return <p className="error">{error}</p>;

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
                  src={item.mediaUrl && (item.mediaUrl.startsWith('http') || item.mediaUrl.startsWith('https')) ? item.mediaUrl : `${API_URL}${item.mediaUrl}`}
                  controls
                  muted
                  preload="metadata"
                  onError={handleImageError}
                />
              ) : (
                <img 
                  src={item.mediaUrl && (item.mediaUrl.startsWith('http') || item.mediaUrl.startsWith('https')) ? item.mediaUrl : `${API_URL}${item.mediaUrl}`} 
                  alt={item.caption || item.title || "Gallery image"}
                  loading="lazy"
                  onError={handleImageError}
                />
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
