import React, { useState } from "react";
import axios from "axios";
import "./Contact.css";
import contactImage from "../assets/joyce1.jpg"; 

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      const res = await axios.post("http://localhost:5000/api/contact", formData);
      if (res.data.success) {
        setStatus("✅ Thank you! Your message has been received.");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("⚠️ Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setStatus("❌ Failed to send message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-wrapper">
      {/* === Left: Info & Form === */}
      <div className="contact-form-section">
        <h1 className="contact-title">We are happy to hear from you or Partner with you 💫</h1>
        <p className="contact-subtitle">
          Whether you want to collaborate, support our mission, or just say hi — we'd love to connect!
        </p>

        {/* === Contact Info Display === */}
        <div className="contact-email">
          <p>
            📧 <strong>Email us directly:</strong>{" "}
            <a href="mailto:info@reliancesoulfdn.org" className="email-link">
              info@reliancesoulfdn.org
            </a>
          </p>

          <p>
            💬 <strong>WhatsApp:</strong>{" "}
            <a
              href="https://wa.me/256777969984" 
              target="_blank"
              rel="noopener noreferrer"
              className="email-link"
            >
              +256 777 969 984 , +233 538 453 0458            </a>
          </p>

          <p>
            📞 <strong>Call us:</strong>{" "}
            <a href="tel:+256700123456" className="email-link">
              +256 777 969 984
            </a>
          </p>
        </div>


        {/* === Contact Form === */}
        <form onSubmit={handleSubmit} className="contact-form">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            rows="5"
            required
          ></textarea>

          <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>

        {status && <p className="contact-status">{status}</p>}
      </div>

      {/* === Right: Image === */}
      <div className="contact-image">
        <img src={contactImage} alt="Contact Us" />
      </div>
    </div>
  );
};

export default Contact;
