import React, { useState } from "react";
import { contactApi } from "../services/api";
import LoadingSpinner from "../Components/LoadingSpinner";
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
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }
    
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    setStatus("");

    try {
      const response = await contactApi.send(formData);
      if (response.success) {
        setStatus("✅ Thank you! Your message has been received.");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setErrors({});
      } else {
        setStatus("⚠️ Something went wrong. Please try again.");
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Failed to send message. Please try again later.";
      setStatus(`❌ ${errorMessage}`);
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
        <form onSubmit={handleSubmit} className="contact-form" noValidate>
          <div className="form-field">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? 'error' : ''}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-field">
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-field">
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              className={errors.subject ? 'error' : ''}
            />
            {errors.subject && <span className="error-message">{errors.subject}</span>}
          </div>
          <div className="form-field">
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              className={errors.message ? 'error' : ''}
            ></textarea>
            {errors.message && <span className="error-message">{errors.message}</span>}
          </div>

          <button type="submit" disabled={loading}>
            {loading ? <LoadingSpinner size="small" text="" /> : "Send Message"}
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
