import React, { useState } from "react";
import "./Donate.css";
import thankImage from "../assets/Ezekiel.jpg"; 

const Donate = () => {
  const [mode, setMode] = useState<"stripe" | "manual">("stripe");
  const [amount, setAmount] = useState("");
  const [email, setEmail] = useState("");
  const [manualInfo, setManualInfo] = useState({ name: "", contact: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Stripe donation
  const handleStripeDonate = async () => {
    if (!amount || !email) {
      alert("Please enter both amount and email.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const res = await fetch(`${API_URL}/api/donate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: parseFloat(amount),
          donorEmail: email,
        }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setMessage("⚠️ Could not start donation session.");
      }
    } catch (err) {
      console.error("Donation error:", err);
      setMessage("❌ Something went wrong, please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Manual donation option
  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualInfo.name || !manualInfo.contact) {
      alert("Please fill in both fields.");
      return;
    }

    setMessage("✅ Thank you! We'll contact you soon to assist with your donation.");
    setManualInfo({ name: "", contact: "" });
  };

  return (
    <div className="donate-page">
      {/* Left Section: Donation Form */}
      <div className="donate-left">
        <h1>Support Reliance Soul International Youth Foundation 🙏</h1>
        <p>
          Every contribution helps us empower <strong>young refugees and IDPs</strong> through creativity,
          innovation, and opportunity.
        </p>

        <div className="donate-options">
          <button
            className={`btn-primary ${mode === "stripe" ? "active" : ""}`}
            onClick={() => setMode("stripe")}
          >
            Donate with card 💳
          </button>
          <button
            className={`btn-secondary ${mode === "manual" ? "active" : ""}`}
            onClick={() => setMode("manual")}
          >
            Manual donation (bank transfer) 🏦
          </button>
        </div>

        {mode === "stripe" ? (
          <div className="donate-form">
            <input
              type="email"
              placeholder="Your Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Donation Amount (USD)"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
            <button onClick={handleStripeDonate} disabled={loading} className="donate-cta">
              {loading ? "Processing..." : "Donate now ❤️"}
            </button>
          </div>
        ) : (
          <form className="manual-form" onSubmit={handleManualSubmit}>
            <input
              type="text"
              placeholder="Your Name"
              value={manualInfo.name}
              onChange={(e) => setManualInfo({ ...manualInfo, name: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Email or WhatsApp Number"
              value={manualInfo.contact}
              onChange={(e) => setManualInfo({ ...manualInfo, contact: e.target.value })}
              required
            />
            <button type="submit">Submit information ✉️</button>
          </form>
        )}

        {message && <p className="status-message">{message}</p>}
      </div>

      {/* Right Section: Image + Message */}
      <div className="donate-right">
        <img
          src={thankImage} // ✅ use imported image
          alt="Thank you for supporting refugees"
          className="donate-image"
        />
        <div className="donate-message">
          <h2>Thank You 💙</h2>
          <p>
            Your generosity fuels hope and helps young refugees and internally displaced persons
            build a brighter future.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Donate;
