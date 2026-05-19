import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Quick Links</h3>
          <nav className="footer-nav">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/gallery">Gallery</Link>
            <Link to="/team">Team</Link>
            <Link to="/stories">Stories</Link>
          </nav>
        </div>
        
        <div className="footer-section">
          <h3>Get Involved</h3>
          <nav className="footer-nav">
            <Link to="/donate">Donate</Link>
            <Link to="/book-studio">Book Studio</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/faq">FAQ</Link>
          </nav>
        </div>
        
        <div className="footer-section">
          <h3>Connect</h3>
          <div className="footer-social">
            <a href="https://www.facebook.com/profile.php?id=100093395088925" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://www.instagram.com/reliancesoulyouth/" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://www.youtube.com/@RelianceSoulYouthInitiative" target="_blank" rel="noopener noreferrer">YouTube</a>
          </div>
          <p className="footer-contact">
            📧 info@reliancesoulfdn.org<br />
            📞 +256 777 969 984
          </p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Reliance Soul International Youth Foundation. All rights reserved.</p>
        <Link to="/privacy" className="footer-link">Privacy Policy</Link>
      </div>
    </footer>
  );
}
