import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./BookStudio.css";
import bgImage from "../assets/sky.jpg";
import podcastImg from "../assets/PODCAST.jpg";
import musicImg from "../assets/sing_studio.jpg";
import photoImg from "../assets/photoshoot.jpeg";
import masteringImg from "../assets/mastering.jpg";
import videoImg from "../assets/videobook.jpg";
import soundImg from "../assets/soundsystem.png";

const BookStudio = () => {
  const location = useLocation(); 
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    category: "",
    date: "",
    time: "",
    duration: "",
    notes: "",
  });

  const [status, setStatus] = useState({ loading: false, message: "" });

  // ✅ Fix: Reset scroll + force background reflow on navigation
  useEffect(() => {
    window.scrollTo(0, 0);
    const bg = document.querySelector(".booking-background");
    if (bg) {
      bg.style.backgroundImage = `url(${bgImage})`;
      bg.style.backgroundAttachment = "fixed"; // enforce fixed positioning
    }
  }, [location]); // rerun every time route changes

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategorySelect = (category: string) => {
    setFormData((prev) => ({ ...prev, category }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, message: "" });

    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const res = await fetch(`${API_URL}/api/book`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        setStatus({
          loading: false,
          message: "✅ Booking confirmed! Check your email.",
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          category: "",
          date: "",
          time: "",
          duration: "",
          notes: "",
        });
      } else {
        setStatus({
          loading: false,
          message: "❌ Something went wrong. Try again.",
        });
      }
    } catch (error) {
      console.error(error);
      setStatus({
        loading: false,
        message: "⚠️ Server error. Please try later.",
      });
    }
  };

  const studioOptions = [
    {
      name: "Podcast Room",
      value: "Podcast",
      image: podcastImg,
      desc: "Record your podcast with premium mics and acoustic walls.",
      icon: "🎙️",
    },
    {
      name: "Music Studio",
      value: "Song Recording",
      image: musicImg,
      desc: "Professional setup for vocal and instrumental recording.",
      icon: "🎵",
    },
    {
      name: "Mastering Suite",
      value: "Mastering",
      image: masteringImg,
      desc: "Mix and master your sound with high-end equipment.",
      icon: "🎚️",
    },
    {
      name: "Video Studio",
      value: "Video Equipment",
      image: videoImg,
      desc: "Film and edit high-quality video projects.",
      icon: "📹",
    },
    {
      name: "Sound System Rental",
      value: "Sound System",
      image: soundImg,
      desc: "Rent speakers and gear for your next event.",
      icon: "🔊",
    },
    {
      name: "Photo Studio",
      value: "Photo Shoot",
      image: photoImg,
      desc: "Shoot stunning portraits with perfect lighting.",
      icon: "📸",
    },
  ];

  return (
    // ✅ Key forces React to remount on navigation (solves layout glitch)
    <div
      key={location.pathname}
      className="booking-background"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="overlay">
        <div className="hero-section fade-in">
          <h1 className="hero-title">Welcome to Reliance Soul Studios</h1>
          <p className="hero-vision">
            We open our doors to dreamers, innovators, and creators. <br />
            Shape your story with our world-class spaces and equipment.
          </p>
        </div>

        <div className="booking-section">
          {/* Left: Studio Options */}
          <section className="studio-options">
            <h2>Select Your Studio Space</h2>
            <div className="studio-grid">
              {studioOptions.map((studio) => (
                <div
                  key={studio.value}
                  className={`studio-card ${
                    formData.category === studio.value ? "selected" : ""
                  }`}
                  onClick={() => handleCategorySelect(studio.value)}
                >
                  <img src={studio.image} alt={studio.name} />
                  <div className="studio-info">
                    <h3>
                      {studio.icon} {studio.name}
                    </h3>
                    <p>{studio.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Right: Booking Form */}
          <div className="booking-container">
            <h2 className="booking-title">Book Your Session</h2>
            {formData.category && (
              <div className="selected-studio">
                <p>
                  <strong>Selected:</strong> {formData.category}
                </p>
              </div>
            )}

            <form className="booking-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Date</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Time</label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Duration (hours)</label>
                <input
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  min="1"
                  max="8"
                  required
                />
              </div>

              <div className="form-group form-notes">
                <label>Notes (optional)</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Special requests or equipment needs?"
                />
              </div>

              <button
                type="submit"
                className="booking-btn"
                disabled={status.loading}
              >
                {status.loading ? "Sending..." : "Confirm Booking"}
              </button>

              {status.message && (
                <p className="status-message">{status.message}</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookStudio;
