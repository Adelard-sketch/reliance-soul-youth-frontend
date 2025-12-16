import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      © {new Date().getFullYear()} Reliance Soul International Youth Foundation —{" "}
      <Link to="/privacy" className="footer-link">
        Privacy
      </Link>
    </footer>
  );
}
